import {
  UserByPage,
  UserFound,
  UserFoundById,
  UserSaved,
} from "../../infrastructure/user.infrastructure";
import { User } from "../user";

export interface UserRepository {
  save(user: User): Promise<UserSaved>;
  findById(id: string): Promise<UserFoundById>;
  find(): Promise<UserFound>;
  getByPage(page: number, pageSize: number): Promise<UserByPage>;
}
