import { Component } from '@angular/core';
import { AdminPurchaseCardComponent } from '../admin-purchase-card/admin-purchase-card.component';
import { take } from 'rxjs';
import { Bill } from 'src/app/shared/models/bill.model';
import { PurchaseService } from 'src/app/shared/services/purchase.service';

@Component({
  selector: 'app-admin-purchases',
  templateUrl: './admin-purchases.component.html',
  styleUrls: ['./admin-purchases.component.scss'],
  standalone: true,
  imports: [AdminPurchaseCardComponent]
})
export class AdminPurchasesComponent {
  public bills: Bill[] = [];
  constructor(private purchasesService: PurchaseService) {
    this.getBillByClient();
  }

  getBillByClient() {
    this.purchasesService.getBillByClient()
      .pipe(
        take(1))
      .subscribe((bills: Bill[]) => {
        this.bills = bills;
        console.log(this.bills);
      });
  }
}
