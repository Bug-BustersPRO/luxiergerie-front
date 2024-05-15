import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AdminPurchasesComponent } from '../admin-purchases/admin-purchases.component';


@Component({
  selector: 'app-admin-purchase-card',
  templateUrl: './admin-purchase-card.component.html',
  styleUrls: ['./admin-purchase-card.component.scss'],
  standalone: true,
  imports: [CommonModule, AdminPurchasesComponent],
})
export class AdminPurchaseCardComponent {
   purchase = {
    id: "31000-0000-0000-0000",
    date: new Date("2021-10-10"),
    roomNumber : 1,
    totalPrice : 1000,
  }
}