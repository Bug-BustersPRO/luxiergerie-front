import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Accommodation } from '../../models/accommodation.model';
import { Category } from '../../models/category.model';
import { CartService } from '../../services/cart.service';
import bigDecimal from 'js-big-decimal';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { HotelService } from '../../services/hotel.service';
import { Hotel } from '../../models/hotel.model';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  imports: [CommonModule, ButtonComponent],
  standalone: true
})
export class CartComponent implements OnInit {
  items: Accommodation[] = [];
  categories: { category: Category; totalPricePerCat: bigDecimal }[] = [];
  totalPrice: bigDecimal = this.cartService.getTotalPrice().round(2);
  public hotel!: Hotel;
  public hotelImageUrl!: string;

  constructor(private cartService: CartService, private toastr: ToastrService, private hotelService: HotelService, private cdr: ChangeDetectorRef)
  {this.hotelService.getHotels().subscribe(() => {
    this.hotel = this.hotelService.hotel;
    if (this.hotel) {
      this.hotelService.applyColors(this.hotel?.colors);
      this.hotelService.hotelImageUrlUpdate$.subscribe((url) => {
        this.hotelImageUrl = url;
      });
    } else {
      this.hotelService.applyColors(["#FDFBF5"]);
    }
  });
  this.loadCart();
  }

  ngOnInit() {
    this.cartService.cartItems.subscribe(items => {
      this.items = items;
      this.cdr.markForCheck(); // Trigger change detection
    });

    this.cartService.categoriesSubject.subscribe(categories => {
      this.categories = categories;
      this.cdr.markForCheck(); // Trigger change detection
    });

    this.cartService.totalPriceSubject.subscribe(totalPrice => {
      this.totalPrice = totalPrice;
      this.cdr.markForCheck(); // Trigger change detection
    });
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
    this.toastr.info('Article retiré du panier');
  }

  addQuantity(item: Accommodation): void {
    this.cartService.addToCart(item);
    this.toastr.info('Article ajouté au panier');
  }
}
