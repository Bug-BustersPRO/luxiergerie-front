import { Injectable } from '@angular/core';
import { Accommodation } from '../models/accommodation.model';
import { Category } from '../models/category.model';
import { CoreService } from './core.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

items: Accommodation[] = [];
category!: Category;
categoryName!: string;
categories: Category[] = [];


  constructor(private coreService: CoreService) { }

  addtoCart(addedItem: Accommodation): void {
    this.getCategory(addedItem).subscribe((categoryName: string) => {
      addedItem.category = categoryName;
      this.saveCategories(addedItem);
    const intemInCart = this.items.find(item => item.id === addedItem.id)
    if (!intemInCart) {
    this.items.push(addedItem);
    addedItem.quantity = 1;

    } else {
      intemInCart.quantity++;
    }
      this.saveCart();
  });

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

  saveCategories(addedItem: Accommodation): void {
    if(!this.categories.some(cat => cat.id === addedItem.category.id)){
    this.categories.push(addedItem.category)
    }
  }


    getCategory(addedItem: Accommodation): Observable<string> {
      return new Observable<string>((observer) => {
        this.coreService.getCategoryNameByAccommodation(addedItem.id)
          .subscribe((categoryName) => {
            observer.next(categoryName.body);
            observer.complete();
          });
      });
    }
}
