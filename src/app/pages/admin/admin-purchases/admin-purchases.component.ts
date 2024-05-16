import { Component } from '@angular/core';
import { AdminPurchaseCardComponent } from '../admin-purchase-card/admin-purchase-card.component';
import { CoreService } from 'src/app/shared/services/core.service';
import { Purchase } from 'src/app/shared/models/purchase.model';

@Component({
  selector: 'app-admin-purchases',
  templateUrl: './admin-purchases.component.html',
  styleUrls: ['./admin-purchases.component.scss'],
  standalone: true,
  imports: [AdminPurchaseCardComponent]
})
export class AdminPurchasesComponent {
 public purchases: Purchase[] = [];
constructor(private purchasesService: CoreService) 
{
  this.getAllPurchases();
 }

getAllPurchases() {
  this.purchasesService.getPurchases().subscribe((purchases) => {
    this.purchases = purchases;
  console.log(this.purchases);
});
  return this.purchases;
}
}
