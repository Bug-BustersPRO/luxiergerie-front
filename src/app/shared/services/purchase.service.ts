import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, WritableSignal, computed, inject, signal } from '@angular/core';
import { Purchase } from '../models/purchase.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor() { }

  http = inject(HttpClient);
  cookieService = inject(CookieService);
  private url: string = "http://localhost:8090/api";
  private headers = new HttpHeaders({
    'Authorization': 'Bearer ' + this.cookieService.get('jwt-token')
  });
  public getAllPurchases$: WritableSignal<Purchase[]> = signal([]);
  getAllPurchasesSig = computed(() => this.getAllPurchases$());
  public getPurchaseById!: Purchase;

  // Purchases API - call vers le backend

  // GET
  public getAll(): void {
    this.http.get<Purchase[]>(`${this.url}/purchases`, { headers: this.headers })
      .subscribe({
        next: purchases => this.getAllPurchases$.set(purchases),
        error: (error: HttpErrorResponse) => console.log(error, "There was an error while fetching purchases")
      });
  }

  public getById(id: number): void {
    this.http.get<Purchase>(`${this.url}/purchases/${id}`, { headers: this.headers })
      .subscribe({
        next: purchase => this.getPurchaseById = purchase,
        error: (error: HttpErrorResponse) => console.log(error, "There was an error while fetching purchase")
      });
  }

  // CREATE
  public createPurchase(purchase: Purchase): void {
    this.http.post(`${this.url}/purchases`, purchase, { headers: this.headers })
      .subscribe({
        next: () => console.log("Purchase created successfully"),
        error: (error: HttpErrorResponse) => console.log(error, "There was an error while creating purchase")
      });
  }

  // UPDATE
  public updatePurchase(purchase: Purchase): void {
    this.http.put(`${this.url}/purchases/${purchase.id}`, purchase, { headers: this.headers })
      .subscribe({
        next: () => console.log("Purchase updated successfully"),
        error: (error: HttpErrorResponse) => console.log(error, "There was an error while updating purchase with id: " + purchase.id)
      });
  }

  // DELETE
  public deletePurchase(id: number): void {
    this.http.delete(`${this.url}/purchases/${id}`, { headers: this.headers })
      .subscribe({
        next: () => console.log("Purchase deleted successfully"),
        error: (error: HttpErrorResponse) => console.log(error, "There was an error while deleting purchase with id: " + id)
      });
  }
}
