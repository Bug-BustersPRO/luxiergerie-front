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

  // Sections API - call vers le backend

  // GET
  public getSections(): Observable<Section[]> {
    return this.httpClient.get<Section[]>(`${this.url}/sections`, { headers: this.headers });
  }

  public getSectionById(id: number): Observable<any> {
    return this.httpClient.get(`${this.url}/sections/${id}`, { headers: this.headers });
  }

  public getCategoriesBySection(id: string): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${this.url}/sections/${id}/categories`, { headers: this.headers });
  }

  // CREATE
  public createSection(section: Section): Observable<any> {
    return this.httpClient.post(`${this.url}/sections`, section, { headers: this.headers });
  }

  // UPDATE
  public updateSection(section: Section): Observable<any> {
    return this.httpClient.put(`${this.url}/sections/${section.id}`, section, { headers: this.headers });
  }

  // DELETE
  public deleteSection(id: number): Observable<any> {
    return this.httpClient.delete(`${this.url}/sections/${id}`, { headers: this.headers });
  }

  // Catégories API - call vers le backend

  // GET
  public getCategories(): Observable<any> {
    return this.httpClient.get(`${this.url}/categories`, { headers: this.headers });
  }

  public getCategoryById(id: number): Observable<any> {
    return this.httpClient.get(`${this.url}/categories/${id}`, { headers: this.headers });
  }

  public getAccommodationsByCategory(id: string): Observable<Accommodation[]> {
    return this.httpClient.get<Accommodation[]>(`${this.url}/categories/${id}/accommodations`, { headers: this.headers });
  }

  // CREATE
  public createCategory(category: Category, section: Section): Observable<any> {
    return this.httpClient.post(`${this.url}/sections/${section.id}/categories`, category, { headers: this.headers });
  }

  // UPDATE
  public updateCategory(category: Category): Observable<any> {
    return this.httpClient.put(`${this.url}/categories/categories/${category.id}`, category, { headers: this.headers });
  }

  // DELETE
  public deleteCategory(id: number): Observable<any> {
    return this.httpClient.delete(`${this.url}/categories/categories/${id}`, { headers: this.headers });
  }

  //GET Category image
  public getCategoryImage(id: number): Observable<Blob> {
    return this.httpClient.get(`${this.url}/categories/${id}/image`, { headers: this.headers, responseType: 'blob' });
  }

  // Accommodations API - call vers le backend

  // GET
  public getAccommodations(): Observable<any> {
    return this.httpClient.get(`${this.url}/accommodations`, { headers: this.headers });
  }


  public getAccommodationById(id: number): Observable<any> {
    return this.httpClient.get(`${this.url}/accommodations/${id}`, { headers: this.headers });
  }

  // CREATE
  public createAccommodation(accommodation: Accommodation, category: Category): Observable<any> {
    return this.httpClient.post(`${this.url}/categories/${category.id}/accommodations`, accommodation, { headers: this.headers });
  }

  // UPDATE
  public updateAccommodation(accommodation: Accommodation): Observable<any> {
    return this.httpClient.put(`${this.url}/accommodations/${accommodation.id}`, accommodation, { headers: this.headers });
  }

  // DELETE
  public deleteAccommodation(id: number): Observable<any> {
    return this.httpClient.delete(`${this.url}/accommodations/${id}`, { headers: this.headers });
  }

  // Purchases API - call vers le backend

  // GET
  public getPurchases(): Observable<any> {
    return this.httpClient.get(`${this.url}/purchases`, { headers: this.headers });
  }

  public getBillByClient(): Observable<any> {
    return this.httpClient.get(`${this.url}/purchases/billByClient`, { headers: this.headers });
  }

  public getPurchaseById(id: number): Observable<any> {
    return this.httpClient.get(`${this.url}/purchases/${id}`, { headers: this.headers });
  }

  // CREATE
  public createPurchase(purchase: Purchase): Observable<any> {
    return this.httpClient.post(`${this.url}/purchases`, purchase, { headers: this.headers });
  }

  // UPDATE
  public updatePurchase(purchase: Purchase): Observable<any> {
    return this.httpClient.put(`${this.url}/purchases/${purchase.id}`, purchase, { headers: this.headers });
  }

  // DELETE
  public deletePurchase(id: number): Observable<any> {
    return this.httpClient.delete(`${this.url}/purchases/${id}`, { headers: this.headers });
  }
}
