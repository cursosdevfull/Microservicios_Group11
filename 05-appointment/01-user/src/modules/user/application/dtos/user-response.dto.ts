import { User } from "../../domain/user";

export class UserResponse {
  id: string;
  name: string;
  lastname: string;
  email: string;
  roles: number[];
  password: string;
  refreshToken: string;
}

export class UserResponseDto {
  static fromDomainToResponse(
    user: User | User[],
    includePassword = false
  ): UserResponse | UserResponse[] {
    if (Array.isArray(user)) {
      return user.map((item) =>
        this.fromDomainToResponse(item)
      ) as UserResponse[];
    }
    const props = user.properties();
    const userResponse = new UserResponse();
    userResponse.id = props.id;
    userResponse.name = props.name;
    userResponse.lastname = props.lastname;
    userResponse.email = props.email;
    userResponse.roles = props.roles;
    if (includePassword) {
      userResponse.password = props.password;
      userResponse.refreshToken = props.refreshToken;
    }
    return userResponse;
  }
}
