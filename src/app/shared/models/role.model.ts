import { Employee } from "./employee.model";
import { Room } from "./room.model";

export class Role {
  public id: string;
  public name: string;
  public employees: Employee[] | null;
  public rooms: Room[] | null;

  constructor(id: string, name: string, employees: Employee[] | null, rooms: Room[] | null) {
    this.id = id;
    this.name = name;
    this.employees = employees;
    this.rooms = rooms;
  }

}