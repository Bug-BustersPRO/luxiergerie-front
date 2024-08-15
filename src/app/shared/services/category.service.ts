import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, WritableSignal, computed, signal } from '@angular/core';
import { Category } from '../models/category.model';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }
  private url: string = "http://localhost:8090/api";
  private getHeaders(): HttpHeaders {
    const token = this.cookieService.get('jwt-token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
  private getAllCategories$: WritableSignal<Category[]> = signal([]);
  getAllCategoriesSig = computed(() => this.getAllCategories$());
  public getCategoryById!: Category;

  // Catégories API - call vers le backend

  // GET
  public getAll(): void {
    this.http.get<Category[]>(`${this.url}/categories`, { headers: this.getHeaders() })
      .subscribe({
        next: categories => this.getAllCategories$.set(categories),
        error: (error: HttpErrorResponse) => console.log(error, "There was an error while fetching categories")
      });
  }

  public getById(id: any): Observable<Category> {
    return this.http.get<Category>(`${this.url}/categories/${id}`, { headers: this.getHeaders() })
  }

  public getAccommodationsByCategory(id: number): void {
    this.http.get(`${this.url}/categories/${id}/accommodations`, { headers: this.getHeaders() })
      .subscribe({
        next: accommodations => console.log(accommodations),
        error: (error: HttpErrorResponse) => console.error(error, "There was an error while fetching accommodations")
      });
  }

  public getCategoriesBySection(id: string): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.url}/sections/${id}/categories`, { headers: this.getHeaders() });
  }

  public getCategoryImageById(id: any): Observable<Blob> {
    return this.http.get(`${this.url}/categories/image/${id}`, { headers: this.getHeaders(), responseType: 'blob' });
  }

  // CREATE
  public createCategory(category: FormData, sectionId: any): Observable<any> {
    return this.http.post(`${this.url}/categories/sections/${sectionId}/categories`, category, { headers: this.getHeaders() });
  }

  // UPDATE
  public updateCategory(category: FormData, sectionId: any, categoryId: any): Observable<any> {
    return this.http.put(`${this.url}/categories/sections/${sectionId}/categories/${categoryId}`, category, { headers: this.getHeaders() });
  }


  // DELETE
  public deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.url}/categories/${id}`, { headers: this.getHeaders() });
  }

}