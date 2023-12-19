export type TCountry = "CO" | "PE" | "MX";

export interface AppointmentEssentials {
  readonly name: string;
  readonly lastname: string;
  readonly email: string;
  readonly date: string;
  readonly medicId: number;
  readonly specialtyId: number;
  readonly centerId: number;
  readonly isoCountryCode: TCountry;
}

export type AppointmentProps = AppointmentEssentials;

export class Appointment {
  private readonly name: string;
  private readonly lastname: string;
  private readonly email: string;
  private readonly date: string;
  private readonly medicId: number;
  private readonly specialtyId: number;
  private readonly centerId: number;
  private readonly isoCountryCode: TCountry;

  constructor(props: AppointmentProps) {
    if (props.name.length < 3)
      throw new Error("Name must be at least 3 characters long");
    if (props.lastname.length < 3)
      throw new Error("Lastname must be at least 3 characters long");
    if (props.email.length < 3)
      throw new Error("Email must be at least 3 characters long");
    if (props.date.length < 3)
      throw new Error("Date must be at least 3 characters long");
    if (props.medicId < 1) throw new Error("Medic id must be at least 1");
    if (props.specialtyId < 1)
      throw new Error("Specialty id must be at least 1");
    if (props.centerId < 1) throw new Error("Center id must be at least 1");

    Object.assign(this, props);
  }

  properties() {
    return {
      name: this.name,
      lastname: this.lastname,
      email: this.email,
      date: this.date,
      medicId: this.medicId,
      specialtyId: this.specialtyId,
      centerId: this.centerId,
      isoCountryCode: this.isoCountryCode,
    };
  }
}
