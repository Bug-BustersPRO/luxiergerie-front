import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, WritableSignal, computed, signal } from '@angular/core';
import { Purchase } from '../models/purchase.model';
import { CookieService } from 'ngx-cookie-service';
import { Bill } from '../models/bill.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }
  private url: string = "http://localhost:8090/api";
  private getHeaders(): HttpHeaders {
    const token = this.cookieService.get('jwt-token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
  private getAllPurchases$: WritableSignal<Purchase[]> = signal([]);
  getAllPurchasesSig = computed(() => this.getAllPurchases$());
  public getPurchaseById!: Purchase;

  // Purchases API - call vers le backend

  // GET
  public getAll(): void {
    this.http.get<Purchase[]>(`${this.url}/purchases`, { headers: this.getHeaders() })
      .subscribe({
        next: purchases => this.getAllPurchases$.set(purchases),
        error: (error: HttpErrorResponse) => console.log(error, "There was an error while fetching purchases")
      });
  }

  public getById(id: number): void {
    this.http.get<Purchase>(`${this.url}/purchases/${id}`, { headers: this.getHeaders() })
      .subscribe({
        next: purchase => this.getPurchaseById = purchase,
        error: (error: HttpErrorResponse) => console.log(error, "There was an error while fetching purchase")
      });
  }

  public getBillByClient(): Observable<any> {
    return this.http.get<Bill>(`${this.url}/purchases/billByClient`, { headers: this.getHeaders() });
  }


  // CREATE
  public createPurchase(purchase: Purchase): Observable<Purchase> {
    return this.http.post<Purchase>(`${this.url}/purchases`, purchase, { headers: this.getHeaders() });
  }

  // UPDATE
  public updatePurchase(purchase: Purchase): void {
    this.http.put(`${this.url}/purchases/${purchase.id}`, purchase, { headers: this.getHeaders() })
      .subscribe({
        next: () => console.log("Purchase updated successfully"),
        error: (error: HttpErrorResponse) => console.log(error, "There was an error while updating purchase with id: " + purchase.id)
      });
  }

  // DELETE
  public deletePurchase(id: number): void {
    this.http.delete(`${this.url}/purchases/${id}`, { headers: this.getHeaders() })
      .subscribe({
        next: () => console.log("Purchase deleted successfully"),
        error: (error: HttpErrorResponse) => console.log(error, "There was an error while deleting purchase with id: " + id)
      });
  }
}
