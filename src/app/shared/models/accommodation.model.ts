import { Category } from "./category.model";
import { Purchase } from "./purchase.model";

export class Accommodation {
  public id: string;
  public name: string;
  public description: string;
  public image: string;
  public price: number;
  public category: Category;
  public purchases: Purchase[];

  constructor(id: string, name: string, description: string, image: string, price: number, category: Category, purchases: Purchase[]) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.image = image;
    this.price = price;
    this.category = category;
    this.purchases = purchases;
  }
}