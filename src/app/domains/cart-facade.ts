import { Injectable } from "@angular/core";
import { Accommodation } from "../shared/models/accommodation.model";
import { Category } from "../shared/models/category.model";
import { CategoryFacade } from "./category-facade";
import { Observable } from "rxjs";
import { CoreService } from "../shared/services/core.service";

@Injectable()

export class CartFacade {

constructor(private categoryFacade: CategoryFacade, private coreService: CoreService) {}

items: Accommodation[] = [];
category!: Category;
categoryName!: string;


}
