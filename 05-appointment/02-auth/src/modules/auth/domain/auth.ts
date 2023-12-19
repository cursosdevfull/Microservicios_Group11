export interface AuthEssentials {
  readonly email: string;
  readonly password: string;
}

export class Auth {
  private readonly email: string;
  private readonly password: string;

  constructor(props: AuthEssentials) {
    if (!props.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/))
      throw new Error("Invalid email");
    if (props.password.length < 3) throw new Error("Invalid password");

    Object.assign(this, props);
  }

  properties() {
    return {
      email: this.email,
      password: this.password,
    };
  }
}
