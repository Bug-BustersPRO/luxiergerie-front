import { Client } from "./client.model";
import { Room } from "./room.model";

export enum SojournStatus {
  RESERVED = 'RESERVED',
  VALIDATED = 'VALIDATED',
  IN_PROGRESS = 'IN_PROGRESS',
  FINISHED = 'FINISHED',
  CANCELED = 'CANCELED'
}

export class Sojourn {
  public id: string;
  public entryDate: Date;
  public exitDate: Date;
  public status: SojournStatus;
  public client: Client;
  public room: Room;

  constructor(id: string, entryDate: Date, exitDate: Date, status: SojournStatus, client: Client, room: Room) {
    this.id = id;
    this.entryDate = entryDate;
    this.exitDate = exitDate;
    this.status = status;
    this.client = client;
    this.room = room;
  }

}