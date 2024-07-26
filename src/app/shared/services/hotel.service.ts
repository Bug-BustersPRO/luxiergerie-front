import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, Subject, tap } from 'rxjs';
import { Hotel } from '../models/hotel.model';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private url: string = "http://localhost:8090/api/hotel";
  public hotel: Hotel = {} as Hotel;
  public hotelImageUrl!: string;
  public backgroundImageUrl!: string;
  private hotelUpdateSubject = new Subject<Hotel>();
  public hotelUpdate$ = this.hotelUpdateSubject.asObservable();
  public hotelImageUrlUpdateSubject = new Subject<string>();
  public backgroundImageUrlUpdateSubject = new Subject<string>();
  public hotelImageUrlUpdate$ = this.hotelImageUrlUpdateSubject.asObservable();
  public backgroundImageUrlUpdate$ = this.backgroundImageUrlUpdateSubject.asObservable();

  constructor(private cookieService: CookieService, private httpClient: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = this.cookieService.get('jwt-token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // Methods

  getHotels(): Observable<any> {
    return this.getHotel().pipe(
      tap(response => {
        this.hotel = response[0];
        if (this.hotel !== undefined && this.hotel !== null) {
          this.getHotelImageSub();
          this.getBackgroundHotelImageSub();
        }
      })
    );
  }

  getHotelImageSub(): void {
    this.getHotelImage().subscribe({
      next: (response) => {
        const reader = new FileReader();
        reader.readAsDataURL(response);
        reader.onloadend = () => {
          this.hotelImageUrl = reader.result as string;
          this.hotelImageUrlUpdateSubject.next(this.hotelImageUrl);
        };
      },
      error: error => {
        console.error(error);
      }
    });
  }

  getBackgroundHotelImageSub(): void {
    this.getBackgroundHotelImage().subscribe({
      next: (response) => {
        const reader = new FileReader();
        reader.readAsDataURL(response);
        reader.onloadend = () => {
          this.backgroundImageUrl = reader.result as string;
          this.backgroundImageUrlUpdateSubject.next(this.backgroundImageUrl);
        };
      },
      error: error => {
        console.error(error);
      }
    });
  }

  applyColors(colors: string[]): void {
    document.documentElement.style.setProperty('--primary-background-color', colors[0]);
    document.documentElement.style.setProperty('--secondary-background-color', colors[1]);
    document.documentElement.style.setProperty('--tertiary-background-color', colors[2]);
  }

  public emitHotelUpdate(hotel: Hotel) {
    this.hotelUpdateSubject.next(hotel);
  }

  // Call API

  public getHotel(): Observable<any> {
    return this.httpClient.get(`${this.url}/infos`);
  }

  public getHotelImage(): Observable<Blob> {
    return this.httpClient.get(`${this.url}/image`, { responseType: 'blob' });
  }

  public getBackgroundHotelImage(): Observable<Blob> {
    return this.httpClient.get(`${this.url}/background-image`, { responseType: 'blob' });
  }

  public createHotel(formData: any): Observable<any> {    
    return this.httpClient.post(`${this.url}`, formData, { headers: this.getHeaders() });
  }

  public updateHotel(formData: any, id: string): Observable<any> {
    return this.httpClient.put(`${this.url}/${id}`, formData, { headers: this.getHeaders() });
  }

}