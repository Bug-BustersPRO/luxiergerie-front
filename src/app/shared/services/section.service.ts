import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, WritableSignal, computed, inject, signal } from '@angular/core';
import { Section } from '../models/section.model';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  constructor() { }

  public http = inject(HttpClient);
  private url: string = "http://localhost:8090/api";
  private headers = new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('jwt-token')
  });
  public getAllSections$: WritableSignal<Section[]> = signal([]);
  getAllSectionsSig = computed(() => this.getAllSections$());
  public getSectionById!: Section;

   // Sections API - call vers le backend

  // GET
  public getSections(): void {
    this.http.get<Section[]>(`${this.url}/sections`, { headers: this.headers })
      .subscribe({
        next: sections => this.getAllSections$.set(sections),
        error: (error: HttpErrorResponse) => console.log(error, "There was an error while fetching sections")
      });
  }

  public getById(id: number): void {
    this.http.get<Section>(`${this.url}/sections/${id}`, { headers: this.headers })
      .subscribe({
        next: section => this.getSectionById = section,
        error: (error: HttpErrorResponse) => console.log(error, "There was an error while fetching section")
      });
  }

  public getCategoriesBySection(id: number): void {
    this.http.get<Category[]>(`${this.url}/sections/${id}/categories`, { headers: this.headers })
      .subscribe({
        next: categories => console.log(categories),
        error: (error: HttpErrorResponse) => console.log(error, "There was an error while fetching categories")
      });
  }

  // CREATE
  public createSection(section: Section): void {
    this.http.post(`${this.url}/sections`, section, { headers: this.headers })
      .subscribe({
        next: () => console.log("Section created successfully"),
        error: (error: HttpErrorResponse) => console.log(error, "There was an error while creating section")
      });
  }

  // UPDATE
  public updateSection(section: Section): void {
    this.http.put(`${this.url}/sections/${section.id}`, section, { headers: this.headers })
      .subscribe({
        next: () => console.log("Section updated successfully"),
        error: (error: HttpErrorResponse) => console.log(error, "There was an error while updating section with id: " + section.id)
      });
  }

  // DELETE
  public deleteSection(id: number): void {
    this.http.delete(`${this.url}/sections/${id}`, { headers: this.headers })
      .subscribe({
        next: () => console.log("Section deleted successfully"),
        error: (error: HttpErrorResponse) => console.log(error, "There was an error while deleting section with id: " + id)
      });
  }
}
