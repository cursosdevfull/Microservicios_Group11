import { err, ok, Result } from "neverthrow";
import { IsNull } from "typeorm";

import { MysqlBootstrap } from "../../../bootstrap/mysql.bootstrap";
import { UserRepository } from "../domain/repositories/user";
import { User } from "../domain/user";
import { UserDto } from "./dtos/user.dto";
import { UserEntity } from "./entities/user.entity";

export type UserFoundByIdOrEmail = Result<User | null, Error>;
export type UserFound = Result<User[] | null, Error>;
export type UserByPage = Result<[User[], number] | null, Error>;
export type UserSaved = Result<void, Error>;

export class UserInfrastructure implements UserRepository {
  async save(user: User): Promise<UserSaved> {
    try {
      const repository = MysqlBootstrap.dataSource.getRepository(UserEntity);
      const userEntity = UserDto.fromDomainToData(user);

      await repository.save(userEntity);
      return ok(undefined);
    } catch (error) {
      console.log(error);
      const errobj = new Error();
      errobj.message = (error as Error).message;
      return err(errobj);
    }
  }
  async findById(id: string): Promise<UserFoundByIdOrEmail> {
    try {
      const repository = MysqlBootstrap.dataSource.getRepository(UserEntity);
      const userEntity = await repository.findOne({
        where: { id, deletedAt: IsNull() },
        relations: ["roles"],
      });
      if (!userEntity) {
        return ok(null);
      }

      return ok(UserDto.fromDataToDomain(userEntity) as User);
    } catch (error) {
      console.log(error);
      const errobj = new Error();
      errobj.message = (error as Error).message;
      return err(errobj);
    }
  }

  async findByEmail(email: string): Promise<UserFoundByIdOrEmail> {
    try {
      const repository = MysqlBootstrap.dataSource.getRepository(UserEntity);
      const userEntity = await repository.findOne({
        where: { email, deletedAt: IsNull() },
        relations: ["roles"],
      });
      if (!userEntity) {
        return ok(null);
      }

      return ok(UserDto.fromDataToDomain(userEntity) as User);
    } catch (error) {
      console.log(error);
      const errobj = new Error();
      errobj.message = (error as Error).message;
      return err(errobj);
    }
  }

  async find(): Promise<UserFound> {
    try {
      const repository = MysqlBootstrap.dataSource.getRepository(UserEntity);
      const users = await repository.find({
        where: { deletedAt: IsNull() },
        relations: ["roles"],
      });
      if (!users) {
        return ok(null);
      }

      return ok(UserDto.fromDataToDomain(users) as User[]);
    } catch (error) {
      console.log(error);
      const errobj = new Error();
      errobj.message = (error as Error).message;
      return err(errobj);
    }
  }

  async getByPage(page: number, pageSize: number): Promise<UserByPage> {
    try {
      const repository = MysqlBootstrap.dataSource.getRepository(UserEntity);
      const [users, count] = await repository.findAndCount({
        where: { deletedAt: IsNull() },
        skip: (page - 1) * pageSize,
        take: pageSize,
        relations: ["roles"],
      });

      if (!users) {
        return ok(null);
      }

      const usersDomain = UserDto.fromDataToDomain(users) as User[];
      return ok([usersDomain, count]);
    } catch (error) {
      console.log(error);
      const errobj = new Error();
      errobj.message = (error as Error).message;
      return err(errobj);
    }
  }
}
