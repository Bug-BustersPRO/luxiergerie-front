import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Accommodation } from '../../models/accommodation.model';
import { Category } from '../../models/category.model';
import { CartService } from '../../services/cart.service';
import bigDecimal from 'js-big-decimal';
import { RoundingModes } from 'js-big-decimal/dist/node/roundingModes';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  items: Accommodation[] = [];
  categories: { category: Category; totalPricePerCat: bigDecimal }[] = [];
  totalPrice: bigDecimal = new bigDecimal(0);


constructor(private cartService: CartService){}

  ngOnInit() {
    this.loadCart();
  }

  loadCart(): void {
    this.items = this.cartService.getItems();
    this.categories = (this.cartService.getCategories());
    this.totalPrice = (this.cartService.getTotalPrice()).round(2);
  }

  clearCart(): void {
    this.items = [];
    this.totalPrice = new bigDecimal(0);
    localStorage.removeItem("cart_items");
    localStorage.removeItem("total_price");
  }

  clearCategories() {
    this.categories = [];
    localStorage.removeItem("cart_categories");
  }

  removeItem(item: Accommodation) {
    this.cartService.removeItem(item);
    setTimeout(() => this.loadCart(), 0);
  }

  addQuantity(item: Accommodation): void {

    this.cartService.addToCart(item);
  }
}
