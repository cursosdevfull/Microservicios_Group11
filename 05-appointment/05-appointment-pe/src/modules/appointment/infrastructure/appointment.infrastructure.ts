import { Result } from "neverthrow";

import { RabbitmqBootstrap } from "../../../bootstrap/rabbitmq.bootstrap";
import { Parameter } from "../../../core/parameter";
import { Appointment } from "../domain/appointment";
import { AppointmentRepository } from "../domain/repositories/appointment";

export type AppointmentResult = Result<Appointment, Error>;

export class AppointmentInfrastructure implements AppointmentRepository {
  async sendToQueueMessageConfirmed(id: string, state: string) {
    const channel = RabbitmqBootstrap.channel;
    const exchangeName = Parameter.exchange_name;
    const exchangeType = Parameter.exchange_type;
    const exchangeOptions = { durable: true };
    const routingKey = Parameter.routing_key_message_confirmed;

    channel.assertExchange(exchangeName, exchangeType, exchangeOptions);
    channel.publish(
      exchangeName,
      routingKey,
      Buffer.from(JSON.stringify({ id, state }))
    );
  }

  async receive(consumer: (message: any) => void): Promise<void> {
    const channel = RabbitmqBootstrap.channel;
    const exchangeName = Parameter.exchange_name;
    const exchangeType = Parameter.exchange_type;
    const exchangeOptions = { durable: true };
    const routingKey = Parameter.routing_key;

    const exchangeNameDLQ = Parameter.exchange_name_dlq;
    const routingKeyDLQ = Parameter.routing_key_dlq;

    await channel.assertExchange(exchangeName, exchangeType, exchangeOptions);

    await channel.assertExchange(
      exchangeNameDLQ,
      exchangeType,
      exchangeOptions
    );

    const queue = await channel.assertQueue("", {
      exclusive: true,
      deadLetterExchange: exchangeNameDLQ,
      deadLetterRoutingKey: routingKeyDLQ,
    });
    await channel.bindQueue(queue.queue, exchangeName, routingKey);

    await channel.consume(queue.queue, consumer, { noAck: false });
  }
}
