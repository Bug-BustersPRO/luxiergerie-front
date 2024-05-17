import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Section } from "../models/section.model";
import { Category } from "../models/category.model";
import { Accommodation } from "../models/accommodation.model";
import { Purchase } from "../models/purchase.model";
import {CookieService} from "ngx-cookie-service";

@Injectable()
export class CoreService {
  constructor(private httpClient: HttpClient, private cookieService: CookieService) {}

  // faire une vérification différente quand on est connecté via le serial number de l'employée, la solution est pour le moment uniquement via le client room
  private url: string = "http://localhost:8090/api";
  private headers = new HttpHeaders({
    'Authorization': 'Bearer ' + this.cookieService.get('jwt-token')
  });



  public getCategoriesBySection(id: string): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${this.url}/sections/${id}/categories`, { headers: this.headers });
  }



  public getAccommodationsByCategory(id: string): Observable<Accommodation[]> {
    return this.httpClient.get<Accommodation[]>(`${this.url}/categories/${id}/accommodations`, { headers: this.headers });
  }








}
