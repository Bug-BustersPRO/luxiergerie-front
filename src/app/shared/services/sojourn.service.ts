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
  public createSojourn(sojourn: Sojourn): Observable<Sojourn> {
    return this.http.post<Sojourn>(this.url, sojourn, { headers: this.getHeaders() });
  }

  // UPDATE
  public updateSojourn(sojourn: Sojourn): Observable<Sojourn> {
    return this.http.put<Sojourn>(`${this.url}/${sojourn.id}`, sojourn, { headers: this.getHeaders() });
  }

  // DELETE
  public deleteSojourn(id: string): Observable<Sojourn> {
    return this.http.delete<Sojourn>(`${this.url}/${id}`, { headers: this.getHeaders() });
  }
}
