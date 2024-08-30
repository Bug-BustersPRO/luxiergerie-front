import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, WritableSignal, computed, signal } from '@angular/core';
import { Accommodation } from '../models/accommodation.model';
import { Category } from '../models/category.model';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }
  private url: string = environment.apiUrl;
  private getHeaders(): HttpHeaders {
    const token = this.cookieService.get('jwt-token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
  private getAllAccomodations$: WritableSignal<Accommodation[]> = signal([]);
  getAllAccomodations = computed(() => this.getAllAccomodations$());
  public getAccommodationById!: Accommodation;


  // Accommodations API - call vers le backend

  // GET
  public getAll(): void {
    this.http.get<Accommodation[]>(`${this.url}/accommodations`, { headers: this.getHeaders() })
      .subscribe({
        next: accommodations => this.getAllAccomodations$.set(accommodations),
        error: (error: HttpErrorResponse) => console.log(error, "There was an error while fetching accommodations")
      });
  }

  public getCategoryNameByAccommodation(accommodationId: string): Observable<any> {
    return this.http.get(`${this.url}/categories/accommodations/${accommodationId}/category`, { headers: this.getHeaders(), observe: "response", responseType: 'text' });
  }

  public getById(id: any): Observable<Accommodation> {
    return this.http.get<Accommodation>(`${this.url}/accommodations/${id}`, { headers: this.getHeaders() })
  }

  public getAccommodationsByCategory(id: string): Observable<Accommodation[]> {
    return this.http.get<Accommodation[]>(`${this.url}/categories/${id}/accommodations`, { headers: this.getHeaders() });
  }

  public getAccomodationImageById(id: any): Observable<Blob> {
    return this.http.get(`${this.url}/accommodations/image/${id}`, { headers: this.getHeaders(), responseType: 'blob' });
  }

  // CREATE
  public createAccommodation(accommodation: FormData, categoryId: Category): Observable<any> {
    return this.http.post(`${this.url}/categories/${categoryId}/accommodations`, accommodation, { headers: this.getHeaders() })

  }

  // UPDATE
  public updateAccommodation(accommodation: FormData, categoryId: any, accommodationId: any): Observable<any> {
    return this.http.put(`${this.url}/accommodations/${accommodationId}/${categoryId}`, accommodation, { headers: this.getHeaders() });
  }

  // DELETE
  public deleteAccommodation(id: number): Observable<any> {
    return this.http.delete(`${this.url}/accommodations/${id}`, { headers: this.getHeaders() });
  }

}