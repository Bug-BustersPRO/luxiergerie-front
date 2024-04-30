import { Accommodation } from "./accommodation.model";
import { Room } from "./room.model";

export class Purchase {
  public id: string;
  public date: Date;
  public room: Room;
  public status: string;
  public accommodations: Accommodation[];


  constructor(id: string, date: Date, room: Room, status: string, accommodations: Accommodation[]) {
    this.id = id;
    this.date = date;
    this.room = room;
    this.status = status;
    this.accommodations = accommodations;
  }
}