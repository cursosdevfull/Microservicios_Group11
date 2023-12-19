import { Router } from 'express';

import { AppointmentApplication } from '../../../application/appointment.application';
import { AppointmentRepository } from '../../../domain/repositories/appointment';
import { AppointmentInfrastructure } from '../../appointment.infrastructure';
import { AppointmentController } from './appointment.controller';

const repository: AppointmentRepository = new AppointmentInfrastructure();
const application = new AppointmentApplication(repository);
const controller = new AppointmentController(application);

class AppointmentRoute {
  private router: Router;

  constructor() {
    this.router = Router();
    this.addRoutes();
  }

  addRoutes() {
    this.router.post("/", controller.create.bind(controller));
  }

  getRouter(): Router {
    return this.router;
  }
}

export default new AppointmentRoute().getRouter();
