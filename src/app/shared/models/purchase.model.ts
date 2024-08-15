import { Accommodation } from "./accommodation.model";
import { Client } from "./client.model";

export class Purchase {
  public id?: string;
  public date: Date;
  public client: Client;
  public status: string;
  public accommodations: Accommodation[];
  public totalPrice: string;

  constructor(
    date: Date,
    client: Client,
    status: string,
    accommodations: Accommodation[],
    totalPrice: string,
    id?: string) {
    this.id = id;
    this.date = date;
    this.client = client;
    this.status = status;
    this.accommodations = accommodations;
    this.totalPrice = totalPrice;
  }

}