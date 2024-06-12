import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AdminPurchasesComponent } from '../admin-purchases/admin-purchases.component';

import { Purchase } from 'src/app/shared/models/purchase.model';
import { Router } from '@angular/router';
import { AdminPurchaseDetailComponent } from '../admin-purchase-detail/admin-purchase-detail.component';
import { Bill } from 'src/app/shared/models/bill.model';


@Component({
  selector: 'app-admin-purchase-card',
  templateUrl: './admin-purchase-card.component.html',
  styleUrls: ['./admin-purchase-card.component.scss'],
  standalone: true,
  imports: [CommonModule, AdminPurchasesComponent, AdminPurchaseDetailComponent],
})
export class AdminPurchaseCardComponent {
  @Input() bill!: Bill;
  openDetailSwitch: boolean = false;
  
  constructor(private router: Router) { }

  navigateTo(route: string): void {
    this.router.navigate([route]);
    console.log(route);
    
  }

  openDetail(): void {
    this.openDetailSwitch = !this.openDetailSwitch;
  }

}