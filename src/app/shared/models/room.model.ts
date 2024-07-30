import { Client } from "./client.model";
import { Purchase } from "./purchase.model";
import { Role } from "./role.model";
import { Sojourn } from "./sojourn.model";

export class Room {
  public id: string;
  public roomNumber: number;
  public floor: number;
  public role: { name: string }[];;
  public client: Client | null;
  public purchases: Purchase[] | null;
  public sojourns: Sojourn[] | null;

  constructor(
    id: string,
    roomNumber: number,
    floor: number,
    role: { name: string }[],
    client: Client | null,
    purchases: Purchase[] | null,
    sojourns: Sojourn[] | null) {
    this.id = id;
    this.roomNumber = roomNumber;
    this.floor = floor;
    this.role = role;
    this.client = client;
    this.purchases = purchases;
    this.sojourns = sojourns;
  }
}