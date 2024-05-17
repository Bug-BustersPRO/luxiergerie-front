import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Accommodation } from 'src/app/shared/models/accommodation.model';
import { Category } from 'src/app/shared/models/category.model';
import { AccommodationService } from 'src/app/shared/services/accommodation.service';

@Component({
  selector: 'app-accommodation-page',
  templateUrl: './accommodation-page.component.html',
  styleUrls: ['./accommodation-page.component.scss']
})
export class AccommodationPage {
  public accommodations: Accommodation[] = [];
  public accommodation!: Accommodation;
  @Input() category!: Category;
  accommodationService = inject(AccommodationService);

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const categoryId = this.route.snapshot.paramMap.get('id');
    if (categoryId) {
      this.getAccommodationsByCategory(categoryId);
    }
  }

  getAccommodationsByCategory(categoryId: string) {
    this.accommodationService.getAccommodationsByCategory(categoryId).subscribe((accommodations) =>
      this.accommodations = accommodations)
  }

}
