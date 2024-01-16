import { Request, Response } from "express";
import { ApiApplication } from "src/modules/application/api.application";

import { Parameter } from "../../../core/parameter";

export class ApiController {
  constructor(private readonly application: ApiApplication) {}

  async appointment(req: Request, res: Response) {
    const data = req.body;

    const result = await this.application.endpoint(
      Parameter.service_appointment,
      "POST",
      data
    );
    if (result.isErr()) {
      res.status(500).json({ message: result.error.message });
    } else {
      res.status(200).json(result.value);
    }
  }
}
