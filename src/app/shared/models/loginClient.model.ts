export class LoginClient {
  public roomNumber: string;
  public password: string;

  constructor(roomNumber: string, password: string) {
    this.roomNumber = roomNumber;
    this.password = password;
  }
}
