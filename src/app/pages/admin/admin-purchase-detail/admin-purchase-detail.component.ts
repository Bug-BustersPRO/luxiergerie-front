import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AccommodationCardComponent } from 'src/app/shared/components/accommodation-card/accommodation-card.component';
import { Purchase } from 'src/app/shared/models/purchase.model';

@Component({
  selector: 'app-admin-purchase-detail',
  standalone: true,
  imports: [CommonModule, AccommodationCardComponent],
 // providers: [AccommodationCardComponent],
  templateUrl: './admin-purchase-detail.component.html',
  styleUrl: './admin-purchase-detail.component.scss'
})
export class AdminPurchaseDetailComponent {
  @Input() purchase!: Purchase;
}
