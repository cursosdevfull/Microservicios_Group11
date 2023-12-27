import { Column, Entity, PrimaryColumn } from "typeorm";

import { TCountry } from "../../domain/appointment";

@Entity({ name: "appointment-help-desk" })
export class AppointmentEntity {
  @PrimaryColumn()
  id: string;

  @Column({ type: "varchar", length: 50 })
  name: string;

  @Column({ type: "varchar", length: 50 })
  lastname: string;

  @Column({ type: "varchar", length: 100 })
  email: string;

  @Column({ type: "timestamp" })
  date: Date;

  @Column({ type: "int" })
  medicId: number;

  @Column({ type: "int" })
  specialtyId: number;

  @Column({ type: "int" })
  centerId: number;

  @Column({ type: "varchar", length: 2 })
  isoCountryCode: TCountry;

  @Column({ type: "varchar", length: 10 })
  state: string;

  @Column({ type: "timestamp" })
  createdAt: Date;

  @Column({ type: "timestamp" })
  dateSystem: Date;
}
