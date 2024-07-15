import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, WritableSignal, computed, signal } from '@angular/core';
import { Category } from '../models/category.model';
import { Section } from '../models/section.model';
import { CookieService } from 'ngx-cookie-service';

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

  public getById(id: number): void {
    this.http.get<Category>(`${this.url}/categories/${id}`, { headers: this.getHeaders() })
      .subscribe({
        next: category => this.getCategoryById = category,
        error: (error: HttpErrorResponse) => console.log(error, "There was an error while fetching category whith id: " + id)
      });
  }

  public getAccommodationsByCategory(id: number): void {
    this.http.get(`${this.url}/categories/${id}/accommodations`, { headers: this.getHeaders() })
      .subscribe({
        next: accommodations => console.log(accommodations),
        error: (error: HttpErrorResponse) => console.log(error, "There was an error while fetching accommodations")
      });
  }

  // CREATE
  public createCategory(category: Category, section: Section): void {
    this.http.post(`${this.url}/sections/${section.id}/categories`, category, { headers: this.getHeaders() })
      .subscribe({
        next: () => console.log("Category created successfully"),
        error: (error: HttpErrorResponse) => console.log(error, "There was an error while creating category")
      });
  }

  // UPDATE
  public updateCategory(category: Category): void {
    this.http.put(`${this.url}/categories/${category.id}`, category, { headers: this.getHeaders() })
      .subscribe({
        next: () => console.log("Category updated successfully"),
        error: (error: HttpErrorResponse) => console.log(error, "There was an error while updating category with id: " + category.id)
      });
  }

  // DELETE
  public deleteCategory(id: number): void {
    this.http.delete(`${this.url}/categories/${id}`, { headers: this.getHeaders() })
      .subscribe({
        next: () => console.log("Category deleted successfully"),
        error: (error: HttpErrorResponse) => console.log(error, "There was an error while deleting category with id: " + id)
      });
  }
}
