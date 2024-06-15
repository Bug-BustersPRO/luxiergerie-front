import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { Accommodation } from '../../models/accommodation.model';
import { CartService } from '../../services/cart.service';
import { Subscription, EMPTY } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


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

  constructor(private cartService: CartService, private cdr: ChangeDetectorRef, private toastr: ToastrService) {
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
    this.toastr.info('Article ajouté au panier');
    this.cdr.detectChanges();
  }

  decreaseQuantity(): void {
    this.cartService.removeItem(this.item);
    this.toastr.info('Article retiré du panier');
    this.cdr.detectChanges();
  }
}
