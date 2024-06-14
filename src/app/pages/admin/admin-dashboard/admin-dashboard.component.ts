import { Component } from '@angular/core';
import { AdminPurchaseCardComponent } from '../admin-purchase-card/admin-purchase-card.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  standalone: true,
  imports: [AdminPurchaseCardComponent]
})
export class AdminDashboardComponent {

}
