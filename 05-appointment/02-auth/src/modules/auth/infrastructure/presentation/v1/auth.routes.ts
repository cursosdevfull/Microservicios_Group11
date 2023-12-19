import { Router } from "express";

import { AuthApplication } from "../../../application/auth.application";
import { AuthRepository } from "../../../domain/repositories/auth";
import { AuthInfrastructure } from "../../auth.infrastructure";
import { AuthController } from "./auth.controller";

const repository: AuthRepository = new AuthInfrastructure();
const application = new AuthApplication(repository);
const controller = new AuthController(application);

class AuthRoute {
  private router: Router;

  constructor() {
    this.router = Router();
    this.addRoutes();
  }

  addRoutes() {
    this.router.post("/login", controller.login.bind(controller));
  }

  getRouter(): Router {
    return this.router;
  }
}

export default new AuthRoute().getRouter();
