import { RabbitmqBootstrap } from "../../../bootstrap/rabbitmq.bootstrap";
import { Appointment } from "../domain/appointment";
import { AppointmentRepository } from "../domain/repositories/appointment";

export class AppointmentApplication {
  constructor(private readonly repository: AppointmentRepository) {
    this.consumerMessageConfirmed = this.consumerMessageConfirmed.bind(this);
  }

  async save(appointment: Appointment) {
    return await this.repository.save(appointment);
  }

  async receiveMessageConfirmed() {
    await this.repository.receiveMessageConfirmed(
      this.consumerMessageConfirmed
    );
  }

  async consumerMessageConfirmed(message: any) {
    if (message) {
      const content = JSON.parse(message.content.toString());
      const foundResult = await this.repository.findById(content.id);

      if (foundResult.isErr()) {
        return;
      }

      const appointment = foundResult.value;
      appointment.update(content.state);

      await this.repository.saveToDatabase(appointment);

      RabbitmqBootstrap.channel.ack(message);

      console.log("Message received: ", message.content.toString());
    }
  }
}
