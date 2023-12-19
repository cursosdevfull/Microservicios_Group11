import axios from 'axios';
import { err, ok, Result } from 'neverthrow';

import { AuthRepository } from '../domain/repositories/auth';
import { AuthDto, AuthUser } from './dtos/auth.dto';
import { IOptions, UserByEmailCircuitBreakerService } from './services/user-by-email.service';

export type AuthFindByEmail = Result<AuthUser, Error>;

const options: IOptions = {
  openBreakerTimeout: 5000,
  closeBreakerTimeout: 5000,
  minSuccesses: 2,
  maxFailures: 3,
};

const service = new UserByEmailCircuitBreakerService(axios.post, options);

export class AuthInfrastructure implements AuthRepository {
  async getUserByEmail(email: string): Promise<AuthFindByEmail> {
    //try {

    try {
      const response = await service.fire(
        "http://localhost:3000/user/v1/user-by-email",
        {
          email,
        }
      );
      console.log("response", response);
      return ok(AuthDto.fromDataToDomain(response));
    } catch (error: any) {
      return err(new Error(error.message));
    }

    /*const response = await axios.post(
        "http://localhost:3000/user/v1/user-by-email",
        { email }
      );
      return ok(AuthDto.fromDataToDomain(response.data));
    } catch (error: any) {
      return err(new Error(error.message));
    }*/
  }
}
