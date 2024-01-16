import { RabbitmqBootstrap } from "../../../bootstrap/rabbitmq.bootstrap";
import { Appointment, AppointmentProps } from "../domain/appointment";
import { AppointmentRepository } from "../domain/repositories/appointment";

export class AppointmentApplication {
  constructor(private readonly repository: AppointmentRepository) {
    this.consumer = this.consumer.bind(this);
  }

  async receive() {
    await this.repository.receive(this.consumer);
  }

  async consumer(message: any) {
    if (message) {
      const content = JSON.parse(message.content.toString());
      RabbitmqBootstrap.channel.ack(message);
      const properties: AppointmentProps = {
        ...content,
        dateSystem: new Date(),
      };
      const appointment = new Appointment(properties);

      this.repository.save(appointment);
      console.log("Message received: ", message.content.toString());
    }
  }
}