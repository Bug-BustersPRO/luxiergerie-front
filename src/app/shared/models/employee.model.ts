import { Role } from "./role.model";

export class Employee {
  public id: string;
  public firstName: string;
  public lastName: string;
  public serialNumber: string;
  public password: string;
  public roles: Role[];

  constructor(id: string, firstName: string, lastName: string, serialNumber: string, password: string, roles: Role[]) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.serialNumber = serialNumber;
    this.password = password;
    this.roles = roles;
  }
}