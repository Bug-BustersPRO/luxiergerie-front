export class LoginEmployee {
  public serialNumber: string;
  public password: string;

  constructor(serialNumber: string, password: string) {
    this.serialNumber = serialNumber;
    this.password = password;
  }
}
