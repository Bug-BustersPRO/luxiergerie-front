import { Injectable } from '@angular/core';
import { Accommodation } from '../models/accommodation.model';
import { Category } from '../models/category.model';
import { CoreService } from './core.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

items: Accommodation[] = [];
category!: Category;
categoryName!: string;


  constructor(private coreService: CoreService) { }

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

  saveCart(): void {
    localStorage.setItem('cart_items', JSON.stringify(this.items));
    }


getCategory(addedItem: Accommodation): void {
  this.coreService.getCategoryNameByAccommodation(addedItem.id).subscribe((categoryName) =>
   this.categoryName = categoryName.body)
  console.log(this.categoryName)
  console.log(addedItem.id)
}
}
