import { Injectable } from "@angular/core";
import { CoreService } from "../shared/services/core.service";
import { Observable, map } from "rxjs";
import { Category } from "../shared/models/category.model";

@Injectable()
export class CategoryFace {
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
}