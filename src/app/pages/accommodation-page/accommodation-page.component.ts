import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccommodationFacade } from 'src/app/domains/accommodation-facade';
import { Accommodation } from 'src/app/shared/models/accommodation.model';
import { Category } from 'src/app/shared/models/category.model';
import { HotelService } from 'src/app/shared/services/hotel.service';
import { Hotel } from 'src/app/shared/models/hotel.model';

@Component({
  selector: 'app-accommodation-page',
  templateUrl: './accommodation-page.component.html',
  styleUrls: ['./accommodation-page.component.scss']
})
export class AccommodationPage {
  public accommodations: Accommodation[] = [];
  public accommodation!: Accommodation;
  @Input() category!: Category;
  public hotel!: Hotel;
  public hotelImageUrl!: string;

  constructor(
    private accommodationFacade: AccommodationFacade,
    private route: ActivatedRoute,
    private hotelService: HotelService) {
    this.hotelService.getHotels().subscribe(() => {
      this.hotel = this.hotelService.hotel;
      if (this.hotel) {
        this.hotelService.applyColors(this.hotel?.colors);
        this.hotelService.hotelImageUrlUpdate$.subscribe((url) => {
          this.hotelImageUrl = url;
        });
      } else {
        this.hotelService.applyColors(["#FDFBF5"]);
      }
    });
  }

  ngOnInit(): void {
    const categoryId = this.route.snapshot.paramMap.get('id');
    if (categoryId) {
      this.getAccommodationsByCategory(categoryId);
    }
  }

  getAccommodationsByCategory(categoryId: string) {
    this.accommodationFacade.getAccommodationsByCategory(categoryId).subscribe((accommodations) =>
      this.accommodations = accommodations)
  }

}
