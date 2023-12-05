import express, { Application } from "express";
import { request } from "http";

class App {
  private readonly expressApp: Application;

  constructor() {
    this.expressApp = express();
    this.handleHealthcheck();
  }

  handleHealthcheck() {
    this.expressApp.get("/healthcheck", (request, response) => {
      response.status(200).json({ status: "ok" });
    });
  }

  getApp(): Application {
    return this.expressApp;
  }
}

export default new App().getApp();
