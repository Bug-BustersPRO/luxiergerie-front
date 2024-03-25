import { Client } from "./client.model";
import { Purchase } from "./purchase.model";
import { Role } from "./role.model";

export class Room {
  public id: string;
  public roomNumber: number;
  public floor: number;
  public role: Role;
  public client: Client;
  public purchases: Purchase[];

  constructor(id: string, roomNumber: number, floor: number, role: any, client: any, purchases: any[]) {
    this.id = id;
    this.roomNumber = roomNumber;
    this.floor = floor;
    this.role = role;
    this.client = client;
    this.purchases = purchases;
  }
}