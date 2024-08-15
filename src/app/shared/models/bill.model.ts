import { Client } from "./client.model";
import { Purchase } from "./purchase.model";

export class Bill {
  public id: string;
  public date: Date;
  public client: Client;
  public status: string;
  public purchasesForBillDTO: Purchase[];
  public roomNumber: number;
  public totalPrice: number;


  constructor(
    id: string,
    date: Date,
    client: Client,
    status: string,
    purchasesForBillDTO: Purchase[],
    roomNumber: number,
    totalPrice: number) {
    this.id = id;
    this.date = date;
    this.client = client;
    this.status = status;
    this.purchasesForBillDTO = purchasesForBillDTO;
    this.roomNumber = roomNumber;
    this.totalPrice = totalPrice;
  }

}