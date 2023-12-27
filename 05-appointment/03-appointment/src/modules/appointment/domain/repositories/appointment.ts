import { AppointmentResult } from "../../infrastructure/appointment.infrastructure";
import { Appointment } from "../appointment";

export interface AppointmentRepository {
  save(appointment: Appointment): Promise<AppointmentResult>;
  receiveMessageConfirmed(consumer: (message: any) => void): Promise<void>;
  findById(id: string): Promise<AppointmentResult>;
  saveToDatabase(appointment: Appointment): Promise<void>;
}
