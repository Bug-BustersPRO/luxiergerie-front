export class LoginClient {
  public sojournIdentifier: string;
  public password: string;

  constructor(sojournIdentifier: string, password: string) {
    this.sojournIdentifier = sojournIdentifier;
    this.password = password;
  }

}