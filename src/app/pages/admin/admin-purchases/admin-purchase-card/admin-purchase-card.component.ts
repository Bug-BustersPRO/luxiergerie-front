import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AdminPurchaseDetailComponent } from '../admin-purchase-detail/admin-purchase-detail.component';
import { Bill } from 'src/app/shared/models/bill.model';
import { AdminPurchasesComponent } from '../admin-purchases.component';


@Component({
  selector: 'app-admin-purchase-card',
  templateUrl: './admin-purchase-card.component.html',
  styleUrls: ['./admin-purchase-card.component.scss'],
  standalone: true,
  imports: [CommonModule, AdminPurchasesComponent, AdminPurchaseDetailComponent, CurrencyPipe],
})
export class AdminPurchaseCardComponent {
  @Input() bill!: Bill;
  openDetailSwitch: boolean = false;

  constructor(private router: Router) { }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  openDetail(): void {
    this.openDetailSwitch = !this.openDetailSwitch;
  }

}