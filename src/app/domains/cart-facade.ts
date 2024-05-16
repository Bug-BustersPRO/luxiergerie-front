import { Injectable } from "@angular/core";
import { Accommodation } from "../shared/models/accommodation.model";

@Injectable()

export class CartFacade {

constructor() {}

items: Accommodation[] = [];

addtoCart(addedItem: Accommodation): void {
  this.items.push(addedItem);
  this.saveCart();
}

removeItem(item: Accommodation): void {
  const index = this.items.findIndex(o => o.id === item.id);

  if (index > -1) {
    this.items.splice(index, 1);
    this.saveCart();
  }
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

}
