import { Injectable } from "@angular/core";
import { CoreService } from "../shared/services/core.service";
import { Observable, map } from "rxjs";
import { Accommodation } from "../shared/models/accommodation.model";
import { Category } from "../shared/models/category.model";

@Injectable()

export class AccommodationFacade {
  constructor(private coreService: CoreService) { }

  private accommodations: Accommodation[] = [];

  // Création des méthodes liées aux accommodations depuis le CALL API du CoreService

  getAllAccommodations(): Observable<Accommodation[]> {
    return this.coreService.getAccommodations().pipe(
      map((accommodations) => {
        this.accommodations = accommodations;
        return accommodations;
      })
    );
  }

  getAccommodationById(id: number): Observable<Accommodation> {
    return this.coreService.getAccommodationById(id);
  }

  createAccommodation(accommodation: Accommodation, category: Category): Observable<any> {
    return this.coreService.createAccommodation(accommodation, category);
  }

  updateAccommodation(accommodation: Accommodation): Observable<any> {
    return this.coreService.updateAccommodation(accommodation);
  }

  deleteAccommodation(id: number): Observable<any> {
    return this.coreService.deleteAccommodation(id);
  }
}