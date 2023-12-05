import amqp from "amqplib";

import { Parameter } from "../core/parameter";
import { BootstrapReturn, IBootstrap } from "./bootstrap.interface";

export class RabbitmqBootstrap implements IBootstrap {
  static channel: amqp.Channel;
  connection!: amqp.Connection;

  init(): Promise<BootstrapReturn> {
    return new Promise(async (resolve, reject) => {
      const host = Parameter.rabbitmq_host;

      try {
        const connection = await amqp.connect(`amqp://${host}`);
        this.connection = connection;
        RabbitmqBootstrap.channel = await connection.createChannel();
        console.log("Rabbitmq initialized");
        resolve(true);
      } catch (error) {
        console.log(`Error: ${error}`);
        reject(error);
      }
    });
  }

  close() {
    console.log("Closing rabbitmq");
    this.connection?.close();
  }
}
