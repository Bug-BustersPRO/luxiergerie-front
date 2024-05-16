import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Accommodation } from '../../models/accommodation.model';
import { CartFacade } from 'src/app/domains/cart-facade';



@Component({
  selector: 'app-accommodation-card',
  templateUrl: './accommodation-card.component.html',
  styleUrls: ['./accommodation-card.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class AccommodationCardComponent {
  @Input() item!: Accommodation;

  constructor(private cartFacade: CartFacade){}

  addQuantity(): void {
    this.cartFacade.addtoCart(this.item);
  }

  lessQuantity(): number {
    if (this.item.quantity === 0) {
      return 0;
    }
    this.cartFacade.removeItem(this.item);
    return this.item.quantity--;
  }

}
