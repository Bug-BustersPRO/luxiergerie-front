export class Accommodation {
  public id: string;
  public name: string;
  public description: string;
  public image: string;
  public price: number;
  public category: any;
  public reservable: boolean;
  public quantity: number = 0;
  public priceToDisplay: string;

  constructor(id: string, name: string, description: string, image: string, price: number, category: any, reservable: boolean, quantity: number, priceToDisplay: string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.image = image;
    this.price = price;
    this.category = category;
    this.reservable = reservable;
    this.quantity = quantity;
    this.priceToDisplay = priceToDisplay;
  }

}
