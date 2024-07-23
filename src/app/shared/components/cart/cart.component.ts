import { ChangeDetectorRef, Component, OnInit, EventEmitter, Output, Input, OnDestroy, OnChanges } from '@angular/core';
import { Accommodation } from '../../models/accommodation.model';
import { Category } from '../../models/category.model';
import { CartService } from '../../services/cart.service';
import bigDecimal from 'js-big-decimal';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { HotelService } from '../../services/hotel.service';
import { Hotel } from '../../models/hotel.model';
import { ButtonComponent } from '../button/button.component';
import { Purchase } from '../../models/purchase.model';
import { Client } from '../../models/client.model';
import { PurchaseService } from '../../services/purchase.service';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  imports: [CommonModule, ButtonComponent],
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
     private purchaseService: PurchaseService
    )
    {
      this.hotelService.getHotels().subscribe(() => {
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

    this.cartService.changeTitle.subscribe((title) => {
      this.changeTitle.emit(title);
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


  getCurrentClientAndRoom() {
    const clientStored = localStorage.getItem('current_client');
    this.currentClient = clientStored? JSON.parse(clientStored) : null;
    const roomStored = localStorage.getItem('room_number');
    this.roomNumber = roomStored? JSON.parse(roomStored) : null;
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

  createNewPurchase(purchase: Purchase) {
    this.purchaseService.createPurchase(purchase).subscribe({
      next: (response: Purchase) => {
        console.log('Purchase created successfully', response);
        this.changeTitle.emit('Confirmation');
        this.orderConfirmed = true;
        this.cdr.detectChanges();
      },
      error: (error: HttpErrorResponse) => {
        console.log('There was an error while creating purchase', error);
      }
    });
  }

   order(){
    this.purchase = new Purchase(new Date(), this.currentClient, "Validée", this.cartService.items, this.roomNumber, this.cartService.getTotalPrice().getValue());
    this.createNewPurchase(this.purchase);
    this.clearCart();
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
