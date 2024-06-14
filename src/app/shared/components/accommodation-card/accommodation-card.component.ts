import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { Accommodation } from '../../models/accommodation.model';
import { CartService } from '../../services/cart.service';
import { Subscription, EMPTY } from 'rxjs';


@Component({
  selector: 'app-accommodation-card',
  templateUrl: './accommodation-card.component.html',
  styleUrls: ['./accommodation-card.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class AccommodationCardComponent implements OnInit, OnDestroy {
  @Input() item!: Accommodation;
  private subscription: Subscription = EMPTY.subscribe();

  constructor(private cartService: CartService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.updateQuantity();
  }

  updateQuantity() {
    this.subscription = this.cartService.getCartItems().subscribe(items => {

      const itemInCart = items.find(i => i.id === this.item.id);
      if (itemInCart) {
        this.item.quantity = itemInCart.quantity;
      } else {
        this.item.quantity = 0;
      }
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  increaseQuantity(): void {
    this.cartService.addToCart(this.item);
    this.cdr.detectChanges();
  }

  decreaseQuantity(): void {
    this.cartService.removeItem(this.item);
    this.cdr.detectChanges();
  }
}
