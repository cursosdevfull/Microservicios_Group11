import {
  UserByPage,
  UserFound,
  UserFoundByIdOrEmail,
  UserSaved,
} from "../../infrastructure/user.infrastructure";
import { User } from "../user";

export interface UserRepository {
  save(user: User): Promise<UserSaved>;
  findById(id: string): Promise<UserFoundByIdOrEmail>;
  find(): Promise<UserFound>;
  getByPage(page: number, pageSize: number): Promise<UserByPage>;
  findByEmail(email: string): Promise<UserFoundByIdOrEmail>;
}
