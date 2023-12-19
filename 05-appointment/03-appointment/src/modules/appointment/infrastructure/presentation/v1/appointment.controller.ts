import { Request, Response } from 'express';
import { AppointmentApplication } from 'src/modules/appointment/application/appointment.application';

import { Appointment, AppointmentProps } from '../../../domain/appointment';

export class AppointmentController {
  constructor(private readonly application: AppointmentApplication) {}

  async create(req: Request, res: Response) {
    const {
      name,
      lastname,
      email,
      date,
      medicId,
      specialtyId,
      centerId,
      isoCountryCode,
    } = req.body;
    const props: AppointmentProps = {
      name,
      lastname,
      email,
      date,
      medicId,
      specialtyId,
      centerId,
      isoCountryCode,
    };

    const appointment = new Appointment(props);

    const appointmentResult = await this.application.save(appointment);
    if (appointmentResult.isErr()) {
      return res.status(500).json(appointmentResult.error);
    }

    res.json(appointmentResult.value);
  }
}
