import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Section } from "../models/section.model";
import { Category } from "../models/category.model";
import { Accommodation } from "../models/accommodation.model";
import { Purchase } from "../models/purchase.model";

@Injectable()
export class CoreService {
  constructor(private httpClient: HttpClient) {}

  private url: string = "http://localhost:8090/api";
  private headers = new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('jwt-token')
  });

  // Sections API - call vers le backend

  // GET
  public getSections(): Observable<Section[]> {
    return this.httpClient.get<Section[]>(`${this.url}/sections`, { headers: this.headers });
  }

  public getSectionById(id: number): Observable<any> {
    return this.httpClient.get(`${this.url}/sections/${id}`, { headers: this.headers });
  }

  public getCategoriesBySection(id: number): Observable<any> {
    return this.httpClient.get(`${this.url}/sections/${id}/categories`, { headers: this.headers });
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

  public getAccommodationsByCategory(id: number): Observable<any> {
    return this.httpClient.get(`${this.url}/categories/${id}/accommodations`, { headers: this.headers });
  }

  // CREATE
  public createCategory(category: Category, section: Section): Observable<any> {
    return this.httpClient.post(`${this.url}/sections/${section.id}/categories`, category, { headers: this.headers });
  }

  // UPDATE
  public updateCategory(category: Category): Observable<any> {
    return this.httpClient.put(`${this.url}/categories/${category.id}`, category, { headers: this.headers });
  }

  // DELETE
  public deleteCategory(id: number): Observable<any> {
    return this.httpClient.delete(`${this.url}/categories/${id}`, { headers: this.headers });
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
