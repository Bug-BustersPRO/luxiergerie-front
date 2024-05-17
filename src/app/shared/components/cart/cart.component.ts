import { Component } from '@angular/core';
import { CartFacade } from 'src/app/domains/cart-facade';
import { Accommodation } from '../../models/accommodation.model';
import { Category } from '../../models/category.model';
import { CoreService } from '../../services/core.service';

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

constructor(private cartFacade: CartFacade, private coreService: CoreService){}

ngOnInit() {
  this.loadCart;
  this.items = this.getItems();
}

isItemInCart(item: Accommodation): void {
}

getItems() {
  return this.items;
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
