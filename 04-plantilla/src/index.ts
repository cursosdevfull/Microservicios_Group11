import dotenv from "dotenv";

import app from "./app";
import { MysqlBootstrap } from "./bootstrap/mysql.bootstrap";
import { RabbitmqBootstrap } from "./bootstrap/rabbitmq.bootstrap";
import { ServerBootstrap } from "./bootstrap/server.bootstrap";

dotenv.config();
const serverBootstrap = new ServerBootstrap(app);
const mysqlBootstrap = new MysqlBootstrap();
const rabbitmqBootstrap = new RabbitmqBootstrap();

(async () => {
  try {
    const listPromises = [];
    listPromises.push(serverBootstrap.init());
    listPromises.push(mysqlBootstrap.init());
    listPromises.push(rabbitmqBootstrap.init());

    await Promise.all(listPromises);

    console.log("Server mysql initialized");
  } catch (error) {
    serverBootstrap.close();
    mysqlBootstrap.close();
  }
})();
