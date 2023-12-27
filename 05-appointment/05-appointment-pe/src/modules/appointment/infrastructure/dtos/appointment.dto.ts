import { Appointment } from "../../domain/appointment";
import { AppointmentEntity } from "../entities/appointment.entity";

export class AppointmentDto {
  static fromDomainToData(appointment: Appointment): AppointmentEntity {
    console.log(appointment.properties().date);
    const appointmentEntity = new AppointmentEntity();
    appointmentEntity.id = appointment.properties().id;
    appointmentEntity.name = appointment.properties().name;
    appointmentEntity.lastname = appointment.properties().lastname;
    appointmentEntity.email = appointment.properties().email;
    appointmentEntity.date = new Date(
      Date.parse(appointment.properties().date)
    );
    appointmentEntity.medicId = appointment.properties().medicId;
    appointmentEntity.specialtyId = appointment.properties().specialtyId;
    appointmentEntity.centerId = appointment.properties().centerId;
    appointmentEntity.isoCountryCode = appointment.properties().isoCountryCode;
    appointmentEntity.state = "QUEUED";
    appointmentEntity.createdAt = new Date();

    return appointmentEntity;
  }
}
