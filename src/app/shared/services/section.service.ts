import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, WritableSignal, computed, signal } from '@angular/core';
import { Section } from '../models/section.model';
import { Category } from '../models/category.model';
import { Observable } from 'rxjs';
import { CookieService } from "ngx-cookie-service";


@Injectable({
  providedIn: 'root'
})
export class SectionService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }
  private url: string = "http://localhost:8090/api";
  private getHeaders(): HttpHeaders {
    const token = this.cookieService.get('jwt-token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
  public getAllSections$: WritableSignal<Section[]> = signal([]);
  getAllSectionsSig = computed(() => this.getAllSections$());
  public getSectionById!: Section;

  // Sections API - call vers le backend

  // GET
  public getSections(): void {
    this.http.get<Section[]>(`${this.url}/sections`, { headers: this.getHeaders() })
      .subscribe({
        next: sections => this.getAllSections$.set(sections),
        error: (error: HttpErrorResponse) => console.log(error, "There was an error while fetching sections")
      });
  }

  public getById(id: string): void {
    this.http.get<Section>(`${this.url}/sections/${id}`, { headers: this.getHeaders() })
      .subscribe({
        next: section => this.getSectionById = section,
        error: (error: HttpErrorResponse) => console.log(error, "There was an error while fetching section")
      });
  }

  public getCategoriesBySection(id: string): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.url}/sections/${id}/categories`, { headers: this.getHeaders() })
  }

  // CREATE
  public createSection(section: Section): void {
    this.http.post(`${this.url}/sections`, section, { headers: this.getHeaders() })
      .subscribe({
        next: () => console.log("Section created successfully"),
        error: (error: HttpErrorResponse) => console.log(error, "There was an error while creating section")
      });
  }

  // UPDATE
  public updateSection(section: Section): void {
    this.http.put(`${this.url}/sections/${section.id}`, section, { headers: this.getHeaders() })
      .subscribe({
        next: () => console.log("Section updated successfully"),
        error: (error: HttpErrorResponse) => console.log(error, "There was an error while updating section with id: " + section.id)
      });
  }

  // DELETE
  public deleteSection(id: number): void {
    this.http.delete(`${this.url}/sections/${id}`, { headers: this.getHeaders() })
      .subscribe({
        next: () => console.log("Section deleted successfully"),
        error: (error: HttpErrorResponse) => console.log(error, "There was an error while deleting section with id: " + id)
      });
  }
}
