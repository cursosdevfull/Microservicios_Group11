import dotenv from "dotenv";

import app from "./app";
import { MysqlBootstrap } from "./bootstrap/mysql.bootstrap";
import { RedisBootstrap } from "./bootstrap/redis.bootstrap";
import { ServerBootstrap } from "./bootstrap/server.bootstrap";

dotenv.config();
const serverBootstrap = new ServerBootstrap(app);
const mysqlBootstrap = new MysqlBootstrap();
//const rabbitmqBootstrap = new RabbitmqBootstrap();
const redisBootstrap = new RedisBootstrap();

(async () => {
  try {
    const listPromises = [];
    listPromises.push(serverBootstrap.init());
    listPromises.push(mysqlBootstrap.init());
    //listPromises.push(rabbitmqBootstrap.init());
    listPromises.push(redisBootstrap.init());

    await Promise.all(listPromises);

    console.log("Servers initialized");
  } catch (error) {
    console.log(error);
    serverBootstrap.close();
    mysqlBootstrap.close();
    //rabbitmqBootstrap.close();
    redisBootstrap.close();
  }
})();
