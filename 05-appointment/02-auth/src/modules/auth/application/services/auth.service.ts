import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

import { Parameter } from "../../../../core/parameter";

export class AuthService {
  static async validatePassword(password: string, passwordHash: string) {
    return await bcrypt.compare(password, passwordHash);
  }

  static generateAccessToken(
    name: string,
    lastname: string,
    email: string,
    roles: number[]
  ): string {
    return jwt.sign({ name, lastname, email, roles }, Parameter.jwt_secret, {
      expiresIn: Parameter.jwt_expiration_time,
    });
  }
}
