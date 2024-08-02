import { ChangeDetectorRef, Component, OnInit, EventEmitter, Output, Input, OnChanges } from '@angular/core';
import { Accommodation } from '../../models/accommodation.model';
import { Category } from '../../models/category.model';
import { CartService } from '../../services/cart.service';
import bigDecimal from 'js-big-decimal';
import { ToastrService } from 'ngx-toastr';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { HotelService } from '../../services/hotel.service';
import { Hotel } from '../../models/hotel.model';
import { ButtonComponent } from '../button/button.component';
import { Purchase } from '../../models/purchase.model';
import { Client } from '../../models/client.model';
import { PurchaseService } from '../../services/purchase.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  imports: [CommonModule, ButtonComponent],
  providers: [CurrencyPipe],
  standalone: true
})
export class CartComponent implements OnInit, OnChanges {
  items: Accommodation[] = [];
  categories: { category: Category; totalPricePerCat: bigDecimal }[] = [];
  totalPrice: bigDecimal = this.cartService.getTotalPrice().round(2);
  currentClient!: Client;
  roomNumber!: string;
  purchase!: Purchase;

  public hotel!: Hotel;
  public hotelImageUrl!: string;

  @Output() changeTitle: EventEmitter<string> = new EventEmitter();
  @Output() closeModalEventButton: EventEmitter<void> = new EventEmitter();
  @Input() orderConfirmed: boolean = false;
  @Input() modalClosed!: boolean;

  constructor(
    private cartService: CartService,
    private toastr: ToastrService,
    private hotelService: HotelService,
    private cdr: ChangeDetectorRef,
    private purchaseService: PurchaseService,
    private currencyPipe: CurrencyPipe,
    private router: Router
  ) {
    this.hotelService.getHotels().subscribe(() => {
      this.hotel = this.hotelService.hotel;
      if (this.hotel) {
        this.hotelService.applyColors(this.hotel?.colors);
        this.hotelService.hotelImageUrlUpdate$.subscribe((url) => {
          this.hotelImageUrl = url;
          this.cdr.detectChanges();
        });
      } else {
        this.hotelService.applyColors(["#FDFBF5"]);
      }
      this.cdr.detectChanges();
    });
    this.loadCart();
  }

  ngOnInit() {

    this.cartService.changeTitle.subscribe((title) => {
      this.changeTitle.emit(title);
      this.cdr.detectChanges();
    });
    this.closeConfirmation();
    this.cartService.cartItems.subscribe(items => {
      this.items = items;
      this.cdr.markForCheck();
    });

    this.cartService.categoriesSubject.subscribe(categories => {
      this.categories = categories;
      this.cdr.markForCheck();
    });

    this.cartService.totalPriceSubject.subscribe(totalPrice => {
      this.totalPrice = totalPrice;
      this.cdr.markForCheck();
    });

    this.getCurrentClientAndRoom();
  }

  ngOnChanges() {
    this.closeConfirmation();
    this.cdr.detectChanges();
  }

  formatPrice(price: bigDecimal): string {
    const formattedPrice = this.currencyPipe.transform(price.getValue(), 'EUR', 'symbol', '1.2-2');
    return formattedPrice ?? '';
  }

  getCurrentClientAndRoom() {
    const clientStored = localStorage.getItem('current_client');
    this.currentClient = clientStored ? JSON.parse(clientStored)! : '';
    const roomStored = localStorage.getItem('room_number');
    this.roomNumber = roomStored ? JSON.parse(roomStored)! : '';
  }

  loadCart(): void {
    this.items = this.cartService.getItems();
    this.categories = (this.cartService.getCategories());
  }

  clearCart(showToast: boolean = true): void {
    this.items = [];
    this.categories = [];
    this.totalPrice = new bigDecimal(0);
    localStorage.removeItem("cart_items");
    localStorage.removeItem("total_price");
    localStorage.removeItem("cart_categories");
    if (showToast) {
      this.toastr.info('Votre panier a été vidé avec succès');
    }
  }

  removeItem(item: Accommodation) {
    this.cartService.removeItem(item);
    this.toastr.info('Article retiré du panier');
  }

  addQuantity(item: Accommodation): void {
    this.cartService.addToCart(item);
    this.toastr.info('Article ajouté au panier');
  }

  createNewPurchase(purchase: Purchase) {
    this.purchaseService.createPurchase(purchase).subscribe({
      next: (response: Purchase) => {
        this.changeTitle.emit('Confirmation');
        this.orderConfirmed = true;
        this.cdr.detectChanges();
        this.toastr.success('Votre commande a été validée avec succès');
        this.clearCart(false);
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error("Une erreur est survenue, n'hésitez pas à contacter l'accueil");

      }
    });
  }

  order() {
    this.purchase = new Purchase(new Date(), this.currentClient, "Validée", this.cartService.items, this.roomNumber, this.cartService.getTotalPrice().getValue());
    this.createNewPurchase(this.purchase);
    this.router.navigate(['/']);
  }

  closeModal() {
    this.closeModalEventButton.emit();
  }

  closeConfirmation() {
    if (this.modalClosed && this.orderConfirmed) {
      this.orderConfirmed = false;
      this.cartService.changeTitle.emit('Mon Panier');
      this.cdr.detectChanges();
    }
  }

}