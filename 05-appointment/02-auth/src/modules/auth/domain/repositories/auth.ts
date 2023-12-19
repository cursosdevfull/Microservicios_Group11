import { AuthFindByEmail } from "../../infrastructure/auth.infrastructure";

export type AuthTokens = { accessToken: string; refreshToken: string };

export interface AuthRepository {
  getUserByEmail(email: string): Promise<AuthFindByEmail>;
}
