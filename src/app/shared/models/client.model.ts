import { Room } from "./room.model";

export class Client {
  public id: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  public phoneNumber: string;
  public pin: Number;
  public room: Room;

  constructor(id: string, firstName: string, lastName: string, email: string, phoneNumber: string, pin: Number, room: Room) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.pin = pin;
    this.room = room;
  }
}