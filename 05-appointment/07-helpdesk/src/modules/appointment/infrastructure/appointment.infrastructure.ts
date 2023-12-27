import { err, ok, Result } from "neverthrow";

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
    try {
      const appointmentEntity = AppointmentDto.fromDomainToData(appointment);
      const repository =
        MysqlBootstrap.dataSource.getRepository(AppointmentEntity);
      await repository.save(appointmentEntity);
      return ok(appointment);
    } catch (error) {
      console.log(error);
      const errObj = new Error("Error saving appointment");
      return err(errObj);
    }
  }

  async receive(consumer: (message: any) => void): Promise<void> {
    const channel = RabbitmqBootstrap.channel;
    const exchangeName = Parameter.exchange_name_dlq;
    const exchangeType = Parameter.exchange_type;
    const exchangeOptions = { durable: true };
    const routingKey = Parameter.routing_key_dlq;

    await channel.assertExchange(exchangeName, exchangeType, exchangeOptions);

    const queue = await channel.assertQueue("", {
      exclusive: true,
    });
    await channel.bindQueue(queue.queue, exchangeName, routingKey);

    await channel.consume(queue.queue, consumer, { noAck: false });
  }
}
