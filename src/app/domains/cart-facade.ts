import { Injectable } from "@angular/core";
import { Accommodation } from "../shared/models/accommodation.model";
import { Category } from "../shared/models/category.model";
import { CategoryFacade } from "./category-facade";
import { Observable } from "rxjs";
import { CoreService } from "../shared/services/core.service";

@Injectable()

export class CartFacade {

constructor(private categoryFacade: CategoryFacade, private coreService: CoreService) {}

items: Accommodation[] = [];
category!: Category;
categoryName!: string;

addtoCart(addedItem: Accommodation): void {
  const intemInCart = this.items.find(item => item.id === addedItem.id)
  if (!intemInCart) {
  this.items.push(addedItem);
  console.log(this.items);
  console.log(this.items[0].category);
  addedItem.quantity = 1;

  } else {
    intemInCart.quantity++;
  }
  this.saveCart();
}

removeItem(item: Accommodation): void {
  const index = this.items.findIndex(o => o.id === item.id);

  if (index > -1) {
    this.items.splice(index, 1);
    this.saveCart();
  }
}

isItemInCart(item: Accommodation): void {
}

getItems() {
  return this.items;
}

saveCart(): void {
localStorage.setItem('cart_items', JSON.stringify(this.items));
}

loadCart(): void {
  const cartItems = localStorage.getItem('cart_items');
  this.items = cartItems ? JSON.parse(cartItems) : [];
}

clearCart(): void {
  this.items = []
  localStorage.removeItem("cart_items")
}

//getCategory(addedItem: Accommodation): void {
//this.categoryFacade.getCategoryById(JSON.stringify(addedItem.category)).subscribe((category) =>
//this.category = category)
//}

getCategory(addedItem: Accommodation): void {
    this.coreService.getCategoryNameByAccommodation(addedItem.id).subscribe((categoryName) =>
     this.categoryName = categoryName.body)
    console.log(this.categoryName)
    console.log(addedItem.id)
}

}
