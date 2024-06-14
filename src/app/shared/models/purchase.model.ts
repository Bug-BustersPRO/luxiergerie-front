import { Accommodation } from "./accommodation.model";
import { Client } from "./client.model";

export class Purchase {
  public id: string;
  public date: Date;
  public client: Client;
  public status: string;
  public accommodations: Accommodation[];
  public roomNumber: number;
  public totalPrice: number;


  constructor(id: string, 
    date: Date, 
    client: Client, 
    status: string, 
    accommodations: Accommodation[], 
    roomNumber: number, 
    totalPrice: number) {
    this.id = id;
    this.date = date;
    this.client = client;
    this.status = status;
    this.accommodations = accommodations;
    this.roomNumber = roomNumber;
    this.totalPrice = totalPrice;
  }
}
