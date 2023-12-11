import { DataSource } from "typeorm";

export type BootstrapReturn = boolean | string | DataSource | Error;

export interface IBootstrap {
  init(): Promise<BootstrapReturn>;
  close(): void;
}
