import { Employee } from "./employee.model";
import { Room } from "./room.model";

export class Role {
  public id: string;
  public name: string;
  public employees: Employee[];
  public rooms: Room[];

  constructor(id: string, name: string, employees: Employee[], rooms: Room[]) {
    this.id = id;
    this.name = name;
    this.employees = employees;
    this.rooms = rooms;
  }
}