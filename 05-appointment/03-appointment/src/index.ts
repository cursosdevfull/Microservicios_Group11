import dotenv from "dotenv";

import app from "./app";
import { MysqlBootstrap } from "./bootstrap/mysql.bootstrap";
import { RabbitmqBootstrap } from "./bootstrap/rabbitmq.bootstrap";
import { ServerBootstrap } from "./bootstrap/server.bootstrap";
import { AppointmentApplication } from "./modules/appointment/application/appointment.application";
import { AppointmentRepository } from "./modules/appointment/domain/repositories/appointment";
import { AppointmentInfrastructure } from "./modules/appointment/infrastructure/appointment.infrastructure";
import { AppointmentController } from "./modules/appointment/infrastructure/presentation/v1/appointment.controller";

dotenv.config();
const serverBootstrap = new ServerBootstrap(app);
const mysqlBootstrap = new MysqlBootstrap();
const rabbitmqBootstrap = new RabbitmqBootstrap();

const repository: AppointmentRepository = new AppointmentInfrastructure();
const application = new AppointmentApplication(repository);
const controller = new AppointmentController(application);

(async () => {
  try {
    const listPromises = [];
    listPromises.push(serverBootstrap.init());
    listPromises.push(mysqlBootstrap.init());
    listPromises.push(rabbitmqBootstrap.init());

    await Promise.all(listPromises);

    controller.receive();

    console.log("Servers initialized");
  } catch (error) {
    console.log(error);
    serverBootstrap.close();
    mysqlBootstrap.close();
    rabbitmqBootstrap.close();
    //redisBootstrap.close();
  }
})();
