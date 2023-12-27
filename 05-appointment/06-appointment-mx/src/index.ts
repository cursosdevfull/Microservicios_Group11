import dotenv from "dotenv";

import app from "./app";
import { RabbitmqBootstrap } from "./bootstrap/rabbitmq.bootstrap";
import { ServerBootstrap } from "./bootstrap/server.bootstrap";
import { AppointmentApplication } from "./modules/appointment/application/appointment.application";
import { AppointmentRepository } from "./modules/appointment/domain/repositories/appointment";
import { AppointmentInfrastructure } from "./modules/appointment/infrastructure/appointment.infrastructure";
import { AppointmentController } from "./modules/appointment/infrastructure/presentation/appointment.controller";

const repository: AppointmentRepository = new AppointmentInfrastructure();
const application = new AppointmentApplication(repository);
const controller = new AppointmentController(application);

dotenv.config();
const serverBootstrap = new ServerBootstrap(app);

const rabbitmqBootstrap = new RabbitmqBootstrap();

(async () => {
  try {
    const listPromises = [];
    listPromises.push(serverBootstrap.init());
    listPromises.push(rabbitmqBootstrap.init());

    await Promise.all(listPromises);
    controller.listen();

    console.log("Servers initialized");
  } catch (error) {
    console.log(error);
    serverBootstrap.close();
    rabbitmqBootstrap.close();
  }
})();
