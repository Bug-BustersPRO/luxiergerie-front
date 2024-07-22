import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private url: string = "http://localhost:8090/api/hotel";

  constructor(private cookieService: CookieService, private httpClient: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = this.cookieService.get('jwt-token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  public getHotel(): Observable<any> {
    return this.httpClient.get(`${this.url}/infos`);
  }

  public getHotelImage(): Observable<Blob> {
    return this.httpClient.get(`${this.url}/image`, { headers: this.getHeaders(), responseType: 'blob' });
  }

  public createHotel(formData: any): Observable<any> {
    console.log(formData);
    
    return this.httpClient.post(`${this.url}`, formData, { headers: this.getHeaders() });
  }

}
