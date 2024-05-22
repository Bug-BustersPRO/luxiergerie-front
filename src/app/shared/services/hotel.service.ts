import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

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

  public getHotels(): Observable<any> {
    return this.httpClient.get(`${this.url}/hotel`, { headers: this.headers });
  }

  public getHotelById(id: number): Observable<any> {
    return this.httpClient.get(`${this.url}/hotel/${id}`, { headers: this.headers });
  }

  public createHotel(): Observable<any> {
    return this.httpClient.post(`${this.url}/hotel`, { headers: this.headers });
  }

}
