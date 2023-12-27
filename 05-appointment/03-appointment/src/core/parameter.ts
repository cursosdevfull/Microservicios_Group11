export class Parameter {
  static get port() {
    return Number(process.env.APPLICATION_PORT) || 3000;
  }

  static get mysql_config() {
    return {
      host: process.env.MYSQL_HOST || "localhost",
      port: Number(process.env.MYSQL_PORT) || 3306,
      entities: [
        process.env.MYSQL_ENTITIES || "src/**/infrastructure/**/*.entity.ts",
      ],
      username: process.env.MYSQL_USER || "user",
      password: process.env.MYSQL_PASSWORD || "12345",
      database: process.env.MYSQL_DATABASE || "db",
      synchronize: Boolean(process.env.MYSQL_SYNCHRONIZE) || true,
      logging: Boolean(process.env.MYSQL_LOGGING) || true,
      poolSize: Number(process.env.MYSQL_POOL_SIZE) || 10,
      maxQueryExecutionTime:
        Number(process.env.MYSQL_MAX_QUERY_EXECUTION_TIME) || 10000,
    };
  }

  static get redis_config() {
    return {
      host: process.env.REDIS_HOST || "localhost",
      port: Number(process.env.REDIS_PORT) || 6379,
      password: process.env.REDIS_PASSWORD || "12345",
      maxRetriesPerRequest:
        Number(process.env.REDIS_MAX_RETRIES_PER_REQUEST) || 10,
    };
  }

  static get rabbitmq_host() {
    return process.env.RABBITMQ_HOST || "localhost";
  }

  static get exchange_name() {
    return process.env.RABBITMQ_EXCHANGE_NAME || "exchange";
  }

  static get exchange_type() {
    return process.env.RABBITMQ_EXCHANGE_TYPE || "direct";
  }

  static get exchange_name_error() {
    return process.env.RABBITMQ_EXCHANGE_NAME_ERROR || "exchange_error";
  }

  static get routing_key_message_confirmed() {
    return (
      process.env.RABBITMQ_ROUTING_KEY_MESSAGE_CONFIRMED || "message_confirmed"
    );
  }
}
