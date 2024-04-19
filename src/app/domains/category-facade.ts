import { Injectable } from "@angular/core";
import { CoreService } from "../shared/services/core.service";
import { Observable, map } from "rxjs";
import { Category } from "../shared/models/category.model";
import { Section } from "../shared/models/section.model";

@Injectable()
export class CategoryFacade {
   private categories: Category[] = [];

  constructor(private coreService: CoreService) { }

  // Création des méthodes liées aux categories depuis le CALL API du CoreService

  getAllCategories(): Observable<Category[]> {
     return this.coreService.getCategories().pipe(
       map((categories) => {
         this.categories = categories;
         return categories;
       })
     );
  }

  getCategoryById(id: number): Observable<Category> {
     return this.coreService.getCategoryById(id);
  }

  getAccommodationsByCategory(id: number): Observable<any> {
     return this.coreService.getAccommodationsByCategory(id);
  }

  createCategory(category: Category, section: Section): Observable<any> {
     return this.coreService.createCategory(category, section);
  }

  updateCategory(category: Category): Observable<any> {
     return this.coreService.updateCategory(category);
  }

  deleteCategory(id: number): Observable<any> {
     return this.coreService.deleteCategory(id);
  }


}
