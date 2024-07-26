import { Client } from "./client.model";
import { Purchase } from "./purchase.model";
import { Role } from "./role.model";
import { Sojourn } from "./sojourn.model";

export class Room {
  public id: string;
  public roomNumber: number;
  public floor: number;
  public role: Role;
  public client: Client;
  public purchases: Purchase[];
  public sojourns: Sojourn[];

  constructor(id: string, roomNumber: number, floor: number, role: Role, client: Client, purchases: Purchase[], sojourns: Sojourn[]) {
    this.id = id;
    this.roomNumber = roomNumber;
    this.floor = floor;
    this.role = role;
    this.client = client;
    this.purchases = purchases;
    this.sojourns = sojourns;
  }
}