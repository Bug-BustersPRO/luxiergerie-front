import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  cookieService = inject(CookieService);
  httpClient = inject(HttpClient)
  private url: string = "http://localhost:8090/api";
  private headers = new HttpHeaders({
    'Authorization': 'Bearer ' + this.cookieService.get('jwt-token')
  });

  constructor() { }

  public getHotel(): Observable<any> {
    return this.httpClient.get(`${this.url}/hotel`, { headers: this.headers });
  }

  public getHotelImage(): Observable<Blob> {
    return this.httpClient.get(`${this.url}/hotel/image`, { headers: this.headers, responseType: 'blob' })
  }

  public createHotel(formData: any): Observable<any> {
    return this.httpClient.post(`${this.url}/hotel`, formData, { headers: this.headers });
  }

  public hasHotel(): Observable<boolean> {
    return this.httpClient.get<any[]>(this.url).pipe(
      map((hotels: any[]) => hotels.length > 0)
    );
  }

}
