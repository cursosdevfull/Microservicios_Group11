import { Application } from "express";
import http from "http";

import { Parameter } from "../core/parameter";
import { BootstrapReturn, IBootstrap } from "./bootstrap.interface";

export class ServerBootstrap implements IBootstrap {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  init(): Promise<BootstrapReturn> {
    return new Promise((resolve, reject) => {
      const server = http.createServer(this.app);

      const port = Parameter.port;

      server
        .listen(port)
        .on("listening", () => {
          console.log(`Server running on port ${port}`);
          resolve(true);
        })
        .on("error", (error: Error) => {
          console.log(`Error: ${error.message}`);
          reject(error);
        });
    });
  }

  close() {
    console.log("Closing server");
    process.exit(0);
  }
}
