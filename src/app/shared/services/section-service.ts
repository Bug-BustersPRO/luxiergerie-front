import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class SectionService {
  constructor(private httpClient: HttpClient) {}

  private url: string = "http://localhost:8090/api"
  getSections(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('jwt-token')
    });
    return this.httpClient.get(`${this.url}/sections`, { headers: headers });
  }

  getSection(id: number) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('jwt-token')
    });
    return this.httpClient.get(`${this.url}/sections/${id}`, { headers: headers });
  }

}