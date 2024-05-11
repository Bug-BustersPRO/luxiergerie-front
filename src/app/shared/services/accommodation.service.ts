import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, WritableSignal, computed, inject, signal } from '@angular/core';
import { Accommodation } from '../models/accommodation.model';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {

  constructor() { }

  public http = inject(HttpClient);
  private url: string = "http://localhost:8090/api";
  private headers = new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('jwt-token')
  });
  public getAllAccomodations$: WritableSignal<Accommodation[]> = signal([]);
  getAllAccomodations = computed(this.getAllAccomodations$);
  public getAccommodationById!: Accommodation;


  // Accommodations API - call vers le backend

  // GET
  public getAll(): void {
    this.http.get<Accommodation[]>(`${this.url}/accommodations`, { headers: this.headers })
      .subscribe({
        next: accommodations => this.getAllAccomodations$.set(accommodations),
        error: (error: HttpErrorResponse) => console.log(error, "There was an error while fetching accommodations")
      });
  }


  public getById(id: number): void {
    this.http.get<Accommodation>(`${this.url}/accommodations/${id}`, { headers: this.headers })
      .subscribe({
        next: accommodation => this.getAccommodationById = accommodation,
        error: (error: HttpErrorResponse) => console.log(error, "There was an error while fetching accommodation whith id: " + id)
      });
  }

  // CREATE
  public createAccommodation(accommodation: Accommodation, category: Category): void {
    this.http.post(`${this.url}/categories/${category.id}/accommodations`, accommodation, { headers: this.headers })
      .subscribe({
        next: () => console.log("Accommodation created successfully"),
        error: (error: HttpErrorResponse) => console.log(error, "There was an error while creating accommodation")
      });
  }


  // UPDATE
  public updateAccommodation(accommodation: Accommodation): void {
    this.http.put(`${this.url}/accommodations/${accommodation.id}`, accommodation, { headers: this.headers })
      .subscribe({
        next: () => console.log("Accommodation updated successfully"),
        error: (error: HttpErrorResponse) => console.log(error, "There was an error while updating accommodation with id: " + accommodation.id)
      });
  }

  // DELETE
  public deleteAccommodation(id: number): void {
    this.http.delete(`${this.url}/accommodations/${id}`, { headers: this.headers })
      .subscribe({
        next: () => console.log("Accommodation deleted successfully"),
        error: (error: HttpErrorResponse) => console.log(error, "There was an error while deleting accommodation with id: " + id)
      });
  }

}
