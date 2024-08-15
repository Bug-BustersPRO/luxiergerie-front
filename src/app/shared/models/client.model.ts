import { Room } from "./room.model";

export class Client {
  public id: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  public phoneNumber: string;
  public pin: number;
  public room: Room | null;

  constructor(
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    pin: number,
    room: Room | null) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.pin = pin;
    this.room = room;
  }

}