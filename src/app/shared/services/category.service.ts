import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, WritableSignal, computed, inject, signal } from '@angular/core';
import { Category } from '../models/category.model';
import { Section } from '../models/section.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }

  public http = inject(HttpClient);
  private url: string = "http://localhost:8090/api";
  private headers = new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('jwt-token')
  });
  public getAllCategories$: WritableSignal<Category[]> = signal([]);
  getAllCategoriesSig = computed(() => this.getAllCategories$());
  public getCategoryById!: Category;

  // Catégories API - call vers le backend

  // GET
  public getAll(): void {
    this.http.get<Category[]>(`${this.url}/categories`, { headers: this.headers })
      .subscribe({
        next: categories => this.getAllCategories$.set(categories),
        error: (error: HttpErrorResponse) => console.log(error, "There was an error while fetching categories")
      });
  }

  public getById(id: number): void {
    this.http.get<Category>(`${this.url}/categories/${id}`, { headers: this.headers })
      .subscribe({
        next: category => this.getCategoryById = category,
        error: (error: HttpErrorResponse) => console.log(error, "There was an error while fetching category whith id: " + id)
      });
  }

  public getAccommodationsByCategory(id: number): void {
    this.http.get(`${this.url}/categories/${id}/accommodations`, { headers: this.headers })
      .subscribe({
        next: accommodations => console.log(accommodations),
        error: (error: HttpErrorResponse) => console.log(error, "There was an error while fetching accommodations")
      });
  }

  // CREATE
  public createCategory(category: Category, section: Section): void {
    this.http.post(`${this.url}/sections/${section.id}/categories`, category, { headers: this.headers })
      .subscribe({
        next: () => console.log("Category created successfully"),
        error: (error: HttpErrorResponse) => console.log(error, "There was an error while creating category")
      });
  }

  // UPDATE
  public updateCategory(category: Category): void {
    this.http.put(`${this.url}/categories/${category.id}`, category, { headers: this.headers })
      .subscribe({
        next: () => console.log("Category updated successfully"),
        error: (error: HttpErrorResponse) => console.log(error, "There was an error while updating category with id: " + category.id)
      });
  }

  // DELETE
  public deleteCategory(id: number): void {
    this.http.delete(`${this.url}/categories/${id}`, { headers: this.headers })
      .subscribe({
        next: () => console.log("Category deleted successfully"),
        error: (error: HttpErrorResponse) => console.log(error, "There was an error while deleting category with id: " + id)
      });
  }
}
