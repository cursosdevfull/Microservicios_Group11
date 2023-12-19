import { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import { UserResponseDto } from "../../../application/dtos/user-response.dto";
import { UserApplication } from "../../../application/user.application";
import { User, UserProperties } from "../../../domain/user";

export class UserController {
  constructor(private readonly application: UserApplication) {}

  async insert(req: Request, res: Response, next: NextFunction) {
    const body = req.body;
    const id = uuidv4();
    const refreshToken = uuidv4();

    const userProperties: UserProperties = body;
    const user = new User({ ...userProperties, id, refreshToken });

    await this.application.save(user);

    res.status(201).send();
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;

    const user = await this.application.findById(id);

    if (!user) {
      res.status(404).send("User not found");
      return;
    }

    res.status(200).json(user);
  }

  async getUserByEmail(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;

    const user = await this.application.findByEmail(email);

    if (!user) {
      res.status(404).send("User not found");
      return;
    }

    res.status(200).json(user);
  }

  async get(req: Request, res: Response, next: NextFunction) {
    const users = await this.application.find();

    res.status(200).json(users);
  }

  async getByPage(req: Request, res: Response, next: NextFunction) {
    const page = parseInt(req.query.page as string);
    const pageSize = parseInt(req.query.pageSize as string);

    const result = await this.application.getByPage(page, pageSize);
    if (!result) {
      res.status(204).send();
      return;
    }
    const [users, count] = result;

    res.status(200).json({
      data: UserResponseDto.fromDomainToResponse(users as User[]),
      count,
      page,
      pageSize,
    });
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const body = req.body;

    const userProperties: UserProperties = body;

    await this.application.update(userProperties, id);

    res.status(204).send();
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;

    await this.application.delete(id);

    res.status(204).send();
  }
}
