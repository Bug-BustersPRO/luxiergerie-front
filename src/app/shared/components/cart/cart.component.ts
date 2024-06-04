import { Component } from '@angular/core';
import { Accommodation } from '../../models/accommodation.model';
import { Category } from '../../models/category.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  items: Accommodation[] = [];
  item!: Accommodation;
  category!: Category;
  categoryName!: string;
  categories: Category[] = this.cartService.categories;


constructor(private cartService: CartService){}

ngOnInit() {
  this.loadCart;
  this.items = this.cartService.getItems();}

isItemInCart(item: Accommodation): void {
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
