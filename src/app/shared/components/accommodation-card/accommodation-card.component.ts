import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { Accommodation } from '../../models/accommodation.model';
import { CartService } from '../../services/cart.service';
import { Category } from '../../models/category.model';



@Component({
  selector: 'app-accommodation-card',
  templateUrl: './accommodation-card.component.html',
  styleUrls: ['./accommodation-card.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class AccommodationCardComponent {
  @Input() item!: Accommodation;

  constructor(private cartService: CartService){}

  addQuantity(): void {
    this.cartService.addtoCart(this.item);
    this.cartService.getItems;
  }

  lessQuantity(): number {
    if (this.item.quantity === 0) {
      return 0;
    }
    this.cartService.removeItem(this.item);
    return this.item.quantity--;
  }

}
