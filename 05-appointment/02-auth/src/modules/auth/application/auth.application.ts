import { err, ok, Result } from 'neverthrow';

import { IError } from '../../../core/utils/ierror.interface';
import { Auth } from '../domain/auth';
import { AuthRepository, AuthTokens } from '../domain/repositories/auth';
import { AuthService } from './services/auth.service';

//export type AuthTokens = { accessToken: string; refreshToken: string };

export type AuthLogin = Result<AuthTokens, IError>;

export class AuthApplication {
  constructor(private readonly repository: AuthRepository) {}

  async login(auth: Auth): Promise<AuthLogin> {
    const userResult = await this.repository.getUserByEmail(
      auth.properties().email
    );
    if (userResult.isErr()) {
      const error: IError = new Error(userResult.error.message);
      error.status = 500;
      return err(error);
    }

    const user = userResult.value;

    if (
      !AuthService.validatePassword(auth.properties().password, user.password)
    ) {
      const error: IError = new Error("Invalid password");
      error.status = 401;
      return err(error);
    }

    const { name, lastname, email, roles, refreshToken } = user;
    return ok({
      accessToken: AuthService.generateAccessToken(
        name,
        lastname,
        email,
        roles
      ),
      refreshToken,
    });
  }
}
