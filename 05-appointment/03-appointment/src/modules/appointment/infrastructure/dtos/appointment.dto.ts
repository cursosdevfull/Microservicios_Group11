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
    appointmentEntity.state = appointment.properties().state;
    appointmentEntity.createdAt = appointment.properties().createdAt;
    appointmentEntity.updatedAt = appointment.properties().updatedAt;

    return appointmentEntity;
  }

  static fromDataToDomain(appointment: AppointmentEntity): Appointment {
    console.log("fromDataToDomain", appointment);
    const appointmentProps = {
      id: appointment.id,
      name: appointment.name,
      lastname: appointment.lastname,
      email: appointment.email,
      date: appointment.date.toISOString(),
      medicId: appointment.medicId,
      specialtyId: appointment.specialtyId,
      centerId: appointment.centerId,
      isoCountryCode: appointment.isoCountryCode,
      state: appointment.state,
      createdAt: appointment.createdAt,
      updatedAt: appointment.updatedAt,
    };

    return new Appointment(appointmentProps);
  }
}
