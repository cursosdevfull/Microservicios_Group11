import { Appointment } from '../domain/appointment';
import { AppointmentRepository } from '../domain/repositories/appointment';

export class AppointmentApplication {
  constructor(private readonly repository: AppointmentRepository) {}

  async save(appointment: Appointment) {
    return await this.repository.save(appointment);
  }
}
