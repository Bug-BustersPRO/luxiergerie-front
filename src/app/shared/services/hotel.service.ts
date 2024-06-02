import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private url: string = "http://localhost:8090/api/hotel";
  private headers = new HttpHeaders({
    'Authorization': 'Bearer ' + this.cookieService.get('jwt-token')
  });

  constructor(private cookieService: CookieService, private httpClient: HttpClient) { }

  public getHotel(): Observable<any> {
    return this.httpClient.get(`${this.url}`, { headers: this.headers });
  }

  public getHotelImage(): Observable<Blob> {
    return this.httpClient.get(`${this.url}/image`, { headers: this.headers, responseType: 'blob' })
  }

  public createHotel(formData: any): Observable<any> {
    return this.httpClient.post(`${this.url}`, formData, { headers: this.headers });
  }

}
