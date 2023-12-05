import { DataSource } from "typeorm";

import { Parameter } from "../core/parameter";
import { BootstrapReturn, IBootstrap } from "./bootstrap.interface";

export class MysqlBootstrap implements IBootstrap {
  private static appDataSource: DataSource;

  init(): Promise<BootstrapReturn> {
    const mysqlConfig = Parameter.mysql_config;
    MysqlBootstrap.appDataSource = new DataSource({
      type: "mysql",
      ...mysqlConfig,
    });

    return MysqlBootstrap.appDataSource.initialize();
  }

  close() {
    console.log("Closing mysql");
    MysqlBootstrap.appDataSource?.destroy();
  }

  static get dataSource(): DataSource {
    return MysqlBootstrap.appDataSource;
  }
}
