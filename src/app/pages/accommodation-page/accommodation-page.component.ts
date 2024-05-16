import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccommodationFacade } from 'src/app/domains/accommodation-facade';
import { Accommodation } from 'src/app/shared/models/accommodation.model';
import { Category } from 'src/app/shared/models/category.model';
import { CartComponent } from 'src/app/shared/components/cart/cart.component';

@Component({
  selector: 'app-accommodation-page',
  templateUrl: './accommodation-page.component.html',
  styleUrls: ['./accommodation-page.component.scss']
})
export class AccommodationPage{
  public accommodations: Accommodation[] = [];
  public accommodation!: Accommodation;
  @Input() category!: Category;

  constructor(private accommodationFacade: AccommodationFacade, private route: ActivatedRoute) {
  }

  ngOnInit():void {
    const categoryId = this.route.snapshot.paramMap.get('id');
    if(categoryId){
      this.getAccommodationsByCategory(categoryId);
    }
  }

  getAccommodationsByCategory(categoryId: string){
    this.accommodationFacade.getAccommodationsByCategory(categoryId).subscribe((accommodations) =>
    this.accommodations = accommodations)
  }

}
