
export class Employee {
  public id?: string;
  public firstName: string;
  public lastName: string;
  public serialNumber?: string;
  public password: string;
  public roles: { name: string }[];

  constructor(
    id: string,
    firstName: string,
    lastName: string,
    serialNumber: string,
    password: string,
    roles: { name: string }[]) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.serialNumber = serialNumber;
    this.password = password;
    this.roles = roles;
  }

}
