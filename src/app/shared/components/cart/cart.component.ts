import { Component, OnInit } from '@angular/core';
import { Accommodation } from '../../models/accommodation.model';
import { Category } from '../../models/category.model';
import { CartService } from '../../services/cart.service';
import bigDecimal from 'js-big-decimal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  items: Accommodation[] = [];
  categories: { category: Category; totalPricePerCat: bigDecimal }[] = [];
  totalPrice: bigDecimal = this.cartService.getTotalPrice().round(2);

  constructor(private cartService: CartService, private toastr: ToastrService) { }

  ngOnInit() {
    this.loadCart();
  }

  loadCart(): void {
    this.items = this.cartService.getItems();
    this.categories = (this.cartService.getCategories());
  }

  clearCart(): void {
    this.items = [];
    this.categories = [];
    this.totalPrice = new bigDecimal(0);
    localStorage.removeItem("cart_items");
    localStorage.removeItem("total_price");
    localStorage.removeItem("cart_categories");
    this.toastr.info('Votre panier a été vidé avec succès');
  }

  removeItem(item: Accommodation) {
    this.cartService.removeItem(item);
    this.totalPrice = this.cartService.getTotalPrice().round(2);
    this.toastr.info('Article retiré du panier');
  }

  addQuantity(item: Accommodation): void {
    this.cartService.addToCart(item);
    this.totalPrice = this.cartService.getTotalPrice().round(2);
    this.toastr.info('Article ajouté au panier');
  }
}
