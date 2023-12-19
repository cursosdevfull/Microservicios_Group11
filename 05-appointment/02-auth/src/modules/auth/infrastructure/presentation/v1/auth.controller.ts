import { Request, Response } from "express";

import { AuthApplication } from "../../../application/auth.application";
import { Auth } from "../../../domain/auth";

export class AuthController {
  constructor(private readonly authApplication: AuthApplication) {}

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const auth = new Auth({ email, password });

    const result = await this.authApplication.login(auth);
    if (result.isErr()) {
      return res
        .status(result.error.status)
        .json({ message: result.error.message });
    }
    return res.status(200).json(result.value);
  }
}
