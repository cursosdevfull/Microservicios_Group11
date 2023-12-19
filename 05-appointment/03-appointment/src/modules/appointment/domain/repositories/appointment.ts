import { AppointmentResult } from '../../infrastructure/appointment.infrastructure';
import { Appointment } from '../appointment';

export interface AppointmentRepository {
  save(appointment: Appointment): Promise<AppointmentResult>;
  receive(consumer: (message: any) => void): Promise<void>;
}
