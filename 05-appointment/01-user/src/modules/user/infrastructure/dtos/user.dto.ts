import { User, UserProperties } from "../../domain/user";
import { RoleEntity } from "../entities/role.entity";
import { UserEntity } from "../entities/user.entity";

export class UserDto {
  static fromDomainToData(user: User): UserEntity {
    const props = user.properties();
    const userEntity = new UserEntity();
    userEntity.id = props.id;
    userEntity.name = props.name;
    userEntity.lastname = props.lastname;
    userEntity.email = props.email;
    userEntity.password = props.password;
    userEntity.refreshToken = props.refreshToken;
    userEntity.createdAt = props.createdAt;
    userEntity.updatedAt = props.updatedAt;
    userEntity.deletedAt = props.deletedAt;
    userEntity.roles = props.roles.map((role: any) => {
      const roleEntity = new RoleEntity();
      roleEntity.id = role;
      return roleEntity;
    });
    return userEntity;
  }

  static fromDataToDomain(data: UserEntity | UserEntity[]): User | User[] {
    if (Array.isArray(data)) {
      return data.map((item) => this.fromDataToDomain(item)) as User[];
    }

    const props: UserProperties = {
      ...data,
      roles: data.roles.map((role) => role.id),
    };
    return new User(props);
  }
}
