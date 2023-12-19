import { validate } from "uuid";

export interface UserEssentials {
  name: string;
  lastname: string;
  email: string;
  password: string;
  roles: number[];
}

export interface UserOptionals {
  id: string;
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export type UserProperties = UserEssentials & Partial<UserOptionals>;
export type UserUpdate = Partial<UserEssentials>;
export class User {
  private readonly id: string;
  private name: string;
  private lastname: string;
  private email: string;
  private password: string;
  private roles: number[];
  private refreshToken: string;
  private createdAt: Date;
  private updatedAt: Date | undefined;
  private deletedAt: Date | undefined;

  constructor(user: UserProperties) {
    if (!validate(user.id)) throw new Error("Invalid id");
    if (user.name.length < 3) throw new Error("Invalid name");
    if (user.lastname.length < 3) throw new Error("Invalid lastname");
    if (!user.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/))
      throw new Error("Invalid email");
    if (user.password.length < 3) throw new Error("Invalid password");
    if (user.roles.length < 1) throw new Error("Invalid roles");
    if (!validate(user.refreshToken)) throw new Error("Invalid refreshToken");

    Object.assign(this, user);
    this.createdAt = user.createdAt ? new Date(user.createdAt) : new Date();
  }

  properties() {
    return {
      id: this.id,
      name: this.name,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
      roles: this.roles,
      refreshToken: this.refreshToken,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }

  update(fieldsToUpdate: UserUpdate) {
    Object.assign(this, fieldsToUpdate);
    this.updatedAt = new Date();
  }

  delete() {
    this.deletedAt = new Date();
  }
}
