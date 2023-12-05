export class Parameter {
  static get port() {
    return Number(process.env.PORT) || 3000;
  }

  static get mysql_config() {
    return {
      host: process.env.MYSQL_HOST || "localhost",
      port: Number(process.env.MYSQL_PORT) || 3306,
      entities: [process.env.MYSQL_ENTITIES || "src/**/**.entity{.ts,.js}"],
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

  static get rabbitmq_host() {
    return process.env.RABBITMQ_HOST || "localhost";
  }
}
