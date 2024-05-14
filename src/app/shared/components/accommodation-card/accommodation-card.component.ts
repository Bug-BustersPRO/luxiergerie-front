import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-accommodation-card',
  templateUrl: './accommodation-card.component.html',
  styleUrls: ['./accommodation-card.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class AccommodationCardComponent {
  @Input() title: string = 'café';
  @Input() description: string = "c'est bon";
  @Input() picture: string = '../../../../assets/golfer.jpg';
  @Input() price: string = '2,50 euros';
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
