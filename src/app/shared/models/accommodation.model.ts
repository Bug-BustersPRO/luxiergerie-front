import { Category } from './category.model'
import { Purchase } from './purchase.model'

export class Accommodation {
  public id: string
  public name: string
  public description: string
  public image: string
  public urlImage: string
  public price: number
  public category: any
  public purchases: Purchase[]
  public reservable: boolean
  public quantity: number = 0
  public priceToDisplay: string

  constructor(
    id: string,
    name: string,
    description: string,
    image: string,
    urlImage: string,
    price: number,
    category: Category,
    purchases: Purchase[],
    reservable: boolean,
    quantity: number,
    priceToDisplay: string
  ) {
    this.id = id
    this.name = name
    this.description = description
    this.image = image
    this.urlImage = urlImage
    this.price = price
    this.category = category
    this.purchases = purchases
    this.reservable = reservable
    this.quantity = quantity
    this.priceToDisplay = priceToDisplay
  }

}