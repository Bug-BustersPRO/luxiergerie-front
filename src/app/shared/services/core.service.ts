import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class CoreService {
  constructor(private httpClient: HttpClient) {}

  private url: string = "http://localhost:8090/api"

  // Sections API - call vers le backend
  getSections(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('jwt-token')
    });
    return this.httpClient.get(`${this.url}/sections`, { headers: headers });
  }

  getSection(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('jwt-token')
    });
    return this.httpClient.get(`${this.url}/sections/${id}`, { headers: headers });
  }

  // Catégories API - call vers le backend

  getCategories(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('jwt-token')
    });
    return this.httpClient.get(`${this.url}/categories`, { headers: headers });
  }

  getCategory(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('jwt-token')
    });
    return this.httpClient.get(`${this.url}/categories/${id}`, { headers: headers });
  }

  // Accommodations API - call vers le backend

  // Purchases API - call vers le backend

}