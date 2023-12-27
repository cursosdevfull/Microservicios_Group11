import { ok, Result } from "neverthrow";

import { MysqlBootstrap } from "../../../bootstrap/mysql.bootstrap";
import { RabbitmqBootstrap } from "../../../bootstrap/rabbitmq.bootstrap";
import { Parameter } from "../../../core/parameter";
import { Appointment } from "../domain/appointment";
import { AppointmentRepository } from "../domain/repositories/appointment";
import { AppointmentDto } from "./dtos/appointment.dto";
import { AppointmentEntity } from "./entities/appointment.entity";

export type AppointmentResult = Result<Appointment, Error>;

export class AppointmentInfrastructure implements AppointmentRepository {
  async save(appointment: Appointment): Promise<AppointmentResult> {
    await this.saveToDatabase(appointment);
    await this.sendToQueue(appointment);

    return Promise.resolve(ok(appointment));
  }

  async findById(id: string): Promise<AppointmentResult> {
    const repository =
      MysqlBootstrap.dataSource.getRepository(AppointmentEntity);
    const appointmentEntity = await repository.findOne({ where: { id } });
    console.log("FOUND", appointmentEntity);
    console.log("WHERE", { where: { id } });

    const appointment = AppointmentDto.fromDataToDomain(appointmentEntity);

    return Promise.resolve(ok(appointment));
  }

  async saveToDatabase(appointment: Appointment) {
    const appointmentEntity = AppointmentDto.fromDomainToData(appointment);
    const repository =
      MysqlBootstrap.dataSource.getRepository(AppointmentEntity);
    await repository.save(appointmentEntity);
  }

  private async sendToQueue(appointment: Appointment) {
    const channel = RabbitmqBootstrap.channel;
    const exchangeName = Parameter.exchange_name;
    const exchangeType = Parameter.exchange_type;
    const exchangeOptions = { durable: true };
    const routingKey = appointment.properties().isoCountryCode;

    channel.assertExchange(exchangeName, exchangeType, exchangeOptions);
    channel.publish(
      exchangeName,
      routingKey,
      Buffer.from(JSON.stringify(appointment.properties()))
    );
  }

  async receiveMessageConfirmed(
    consumer: (message: any) => void
  ): Promise<void> {
    const channel = RabbitmqBootstrap.channel;
    const exchangeName = Parameter.exchange_name;
    const exchangeType = Parameter.exchange_type;
    const exchangeOptions = { durable: true };
    const routingKey = Parameter.routing_key_message_confirmed;

    await channel.assertExchange(exchangeName, exchangeType, exchangeOptions);

    const queue = await channel.assertQueue("", { exclusive: true });
    await channel.bindQueue(queue.queue, exchangeName, routingKey);

    await channel.consume(queue.queue, consumer, { noAck: false });
  }
}
