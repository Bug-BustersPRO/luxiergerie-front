import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Accommodation } from '../../models/accommodation.model';

@Component({
  selector: 'app-accommodation-card',
  templateUrl: './accommodation-card.component.html',
  styleUrls: ['./accommodation-card.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class AccommodationCardComponent {
  @Input() item!: Accommodation;
  @Input() quantity: number = 1;

  addQuantity(): number {
    return this.quantity++;
  }

  lessQuantity(): number {
    if (this.quantity === 0) {
      return 0;
    }
    return this.quantity--;
  }

}
