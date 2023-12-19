import { ok, Result } from 'neverthrow';

import { RabbitmqBootstrap } from '../../../bootstrap/rabbitmq.bootstrap';
import { Parameter } from '../../../core/parameter';
import { Appointment } from '../domain/appointment';
import { AppointmentRepository } from '../domain/repositories/appointment';

export type AppointmentResult = Result<Appointment, Error>;

export class AppointmentInfrastructure implements AppointmentRepository {
  save(appointment: Appointment): Promise<AppointmentResult> {
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

    return Promise.resolve(ok(appointment));
  }
  receive(consumer: (message: any) => void): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
