import { Injectable } from "@angular/core";
import { CoreService } from "../shared/services/core.service";
import { Observable, map } from "rxjs";
import { Purchase } from "../shared/models/purchase.model";


@Injectable()

export class PurchaseFacade {

  constructor(private coreService: CoreService) { }

  private purchases: Purchase[] = [];

  // Création des méthodes liées aux purchases depuis le CALL API du CoreService

  getAllPurchases(): Observable<Purchase[]> {
    return this.coreService.getPurchases().pipe(
      map((purchases) => {
        this.purchases = purchases;
        return purchases;
      })
    );
  }

  getPurchaseById(id: number): Observable<Purchase> {
    return this.coreService.getPurchaseById(id);
  }

  createPurchase(purchase: Purchase): Observable<any> {
    return this.coreService.createPurchase(purchase);
  }

  updatePurchase(purchase: Purchase): Observable<any> {
    return this.coreService.updatePurchase(purchase);
  }

  deletePurchase(id: number): Observable<any> {
    return this.coreService.deletePurchase(id);
  }

}