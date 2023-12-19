export class AuthUser {
  id: string;
  name: string;
  lastname: string;
  email: string;
  roles: number[];
  password: string;
  refreshToken: string;
}

export class AuthDto {
  static fromDataToDomain(data: any): AuthUser {
    const authUser = new AuthUser();
    authUser.id = data.id;
    authUser.name = data.name;
    authUser.lastname = data.lastname;
    authUser.email = data.email;
    authUser.roles = data.roles;
    authUser.password = data.password;
    authUser.refreshToken = data.refreshToken;

    return authUser;
  }
}
