import IORedis from "ioredis";

import { Parameter } from "../core/parameter";
import { BootstrapReturn, IBootstrap } from "./bootstrap.interface";

export class RedisBootstrap implements IBootstrap {
  private static client: IORedis;

  init(): Promise<BootstrapReturn> {
    return new Promise((resolve, reject) => {
      const redisConfig = Parameter.redis_config;
      RedisBootstrap.client = new IORedis(redisConfig);

      RedisBootstrap.client
        .on("connect", () => {
          console.log("Redis connected");
          resolve(true);
        })
        .on("error", (error: Error) => {
          console.log(`Error: ${error.message}`);
          reject(error);
        });
    });
  }

  close() {
    console.log("Closing redis");
    RedisBootstrap.client?.disconnect();
  }

  static get connection(): IORedis {
    return this.client;
  }

  static async set(key: string, value: string) {
    await this.client.set(key, value, "PX", 24 * 60 * 60 * 1000);
  }

  static async get(key: string) {
    return await this.client.get(key);
  }

  static async cleanByPrefix(prefix: string = "") {
    const keys = await this.client.keys(`${prefix}*`);
    if (keys.length > 0) {
      await this.client.del(...keys);
    }
  }
}
