import {  EventEmitter, Injectable } from '@angular/core';
import { Accommodation } from '../models/accommodation.model';
import { Category } from '../models/category.model';
import { BehaviorSubject, Observable } from 'rxjs';
import bigDecimal from 'js-big-decimal';
import { AccommodationService } from './accommodation.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public items: Accommodation[] = [];
  public categories: { category: Category, totalPricePerCat: bigDecimal }[] = [];
  public totalPrice: bigDecimal = new bigDecimal(0);
  public cartItems = new BehaviorSubject<Accommodation[]>([]);
  public categoriesSubject = new BehaviorSubject<{ category: Category, totalPricePerCat: bigDecimal }[]>([]);
  public totalPriceSubject = new BehaviorSubject<bigDecimal>(new bigDecimal(0));
  public changeTitle: EventEmitter<string> = new EventEmitter();
  public countItems: number = 0;

  constructor(private accomodationService: AccommodationService) {
    this.loadCart();
    this.updateCount();
  }

  getCartItems(): Observable<Accommodation[]> {
    const cartItems = localStorage.getItem('cart_items');
    this.items = cartItems ? JSON.parse(cartItems) : [];
    this.cartItems.next(this.items);
    this.updateCount();
    return this.cartItems.asObservable();
  }

  addToCart(addedItem: Accommodation): void {
    this.getCategory(addedItem).subscribe({
      next: (categoryName: string) => {
        addedItem.category = categoryName;
        this.saveCategories(addedItem);

        const itemInCart = this.items.find(item => item.id === addedItem.id);
        if (!itemInCart) {
          this.items.push({...addedItem, quantity: 1});
          this.totalPrice = this.totalPrice.add(new bigDecimal(addedItem.price));
        } else {
          itemInCart.quantity++;
          this.totalPrice = this.totalPrice.add(new bigDecimal(addedItem.price));
        }
        this.saveCart();
        this.cartItems.next(this.items);
        this.totalPriceSubject.next(this.totalPrice);
        this.updateCount();
      },
      error: () => {},
      complete: () => this.updateCategoriesAndTotalPrice()
    });

  }

  removeItem(item: Accommodation): void {
    const itemIndex = this.items.findIndex(o => o.id === item.id);
    if (itemIndex > -1) {
      const itemRemoved = this.items[itemIndex];
      const categoryIndex = this.categories.findIndex(c => c.category === itemRemoved.category);
      const cat = this.categories[categoryIndex];

      if (itemRemoved.quantity <= 1) {
        this.items.splice(itemIndex, 1);
      } else {
        itemRemoved.quantity--;
      }

      if (cat) {
        cat.totalPricePerCat = cat.totalPricePerCat.subtract(new bigDecimal(itemRemoved.price));
        if (cat.totalPricePerCat.compareTo(new bigDecimal(0)) === 0) {
          this.categories.splice(categoryIndex, 1);
        }
      }

      this.totalPrice = this.totalPrice.subtract(new bigDecimal(itemRemoved.price));
      this.saveCart();
    }
    this.cartItems.next(this.items);
    this.updateCategoriesAndTotalPrice();
    this.updateCount();
  }

  private saveCart(): void {
    localStorage.setItem('cart_items', JSON.stringify(this.items));
    localStorage.setItem('cart_categories', JSON.stringify(this.categories));
    localStorage.setItem('total_price', JSON.stringify(this.totalPrice));
  }

  private updateCategoriesAndTotalPrice(): void {
    this.categoriesSubject.next(this.categories);
    this.totalPriceSubject.next(this.totalPrice);
  }

  getItems(): Accommodation[] {
    return this.items;
  }

  getCategories(): { category: Category; totalPricePerCat: bigDecimal }[] {
    return this.categories;
  }

  getTotalPrice(): bigDecimal {
    return this.totalPrice;
  }

  loadCart(): void {
    const cartItems = localStorage.getItem('cart_items');
    this.items = cartItems ? JSON.parse(cartItems) : [];

    const savedCategories = localStorage.getItem('cart_categories');
    this.categories = savedCategories ? JSON.parse(savedCategories) : [];
    this.categories.forEach((c) => {
      const price = c.totalPricePerCat as any;
      const priceCat = new bigDecimal(price?.value);
      c.totalPricePerCat = priceCat || new bigDecimal(0);
    })

    const savedTotalPrice = localStorage.getItem('total_price');
    const price = savedTotalPrice ? JSON.parse(savedTotalPrice) : null;
    const priceNum = new bigDecimal(price?.value);
    this.totalPrice = priceNum || new bigDecimal(0);
    this.updateCount();
  }

  saveTotalPrice(item: Accommodation) {
    this.totalPrice = this.totalPrice.add(new bigDecimal(item.price));
  }

  saveCategories(addedItem: Accommodation): void {
    const existingCategory = this.categories.find(c => c.category === addedItem.category);
    if (existingCategory) {
      existingCategory.totalPricePerCat = existingCategory.totalPricePerCat.add(new bigDecimal(addedItem.price));
    } else {
      this.categories.push({
        category: addedItem.category, totalPricePerCat: new bigDecimal(addedItem.price)
      });
    }
    this.saveCart();
  }

  getCategory(addedItem: Accommodation): Observable<string> {
    return new Observable<string>((observer) => {
      this.accomodationService.getCategoryNameByAccommodation(addedItem.id)
        .subscribe({
          next: (categoryName) => {
            observer.next(categoryName.body);
          },
          complete: () => observer.complete()
        });
    });
  }

  changingTitle(newTitle: string) {
    this.changeTitle.emit(newTitle);
  }

  private getTotalQuantity(): number {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  // New method to update notification
  private updateCount(): void {
    this.countItems = this.getTotalQuantity();
  }
}
