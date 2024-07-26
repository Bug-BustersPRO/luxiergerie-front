import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Sojourn } from '../models/sojourn.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SojournService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }
  private url: string = "http://localhost:8090/api/sojourns";
  private getHeaders(): HttpHeaders {
    const token = this.cookieService.get('jwt-token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
  private getAllSojourns$: WritableSignal<Sojourn[]> = signal([]);
  getAllSojournsSig = computed(() => this.getAllSojourns$());

  // Sojourns API - call vers le backend

  // GET
  public getSojourns(): void {
    this.http.get<Sojourn[]>(this.url, { headers: this.getHeaders() })
      .subscribe({
        next: sojourns => this.getAllSojourns$.set(sojourns),
        error: error => console.log(error, "There was an error while fetching sojourns")
      });
  }

  public getById(id: string): Observable<Sojourn> {
    return this.http.get<Sojourn>(`${this.url}/${id}`, { headers: this.getHeaders() });
  }

  // CREATE
  public createSojourn(sojourn: Sojourn): Observable<any> {
    return this.http.post(this.url, sojourn, { headers: this.getHeaders() });
  }

  // UPDATE
  public updateSojourn(sojourn: Sojourn): void {
    this.http.put(`${this.url}/${sojourn.id}`, sojourn, { headers: this.getHeaders() })
      .subscribe({
        next: () => console.log("Sojourn updated successfully"),
        error: error => console.log(error, "There was an error while updating sojourn")
      });
  }

  // DELETE
  public deleteSojourn(id: string): void {
    this.http.delete(`${this.url}/${id}`, { headers: this.getHeaders() })
      .subscribe({
        next: () => console.log("Sojourn deleted successfully"),
        error: error => console.log(error, "There was an error while deleting sojourn")
      });
  }
}
