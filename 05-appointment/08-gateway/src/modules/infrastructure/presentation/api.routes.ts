import { Router } from "express";

import { ApiApplication } from "../../application/api.application";
import { ApiRepository } from "../../domain/repositories/api.repository";
import { ApiInfrastructure } from "../api.infrastructure";
import { ApiController } from "./api.controller";

const repository: ApiRepository = new ApiInfrastructure();
const application = new ApiApplication(repository);
const controller = new ApiController(application);

class ApiRoute {
  private readonly router: Router;

  constructor() {
    this.router = Router();
    this.addRoutes();
  }

  private addRoutes() {
    this.router.post("/appointment", controller.appointment.bind(controller));
  }

  getRouter() {
    return this.router;
  }
}

export default new ApiRoute().getRouter();
