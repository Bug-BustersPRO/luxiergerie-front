import {Component, Input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Accommodation} from 'src/app/shared/models/accommodation.model';
import {Category} from 'src/app/shared/models/category.model';
import {HotelService} from 'src/app/shared/services/hotel.service';
import {Hotel} from 'src/app/shared/models/hotel.model';
import {AccommodationService} from 'src/app/shared/services/accommodation.service';
import {CategoryService} from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-accommodation-page',
  templateUrl: './accommodation-page.component.html',
  styleUrls: ['./accommodation-page.component.scss'],
})
export class AccommodationPageComponent {
  public accommodations: Accommodation[] = [];
  public accommodation!: Accommodation;
  public hotel!: Hotel;
  public hotelImageUrl!: string;
  public carouselItems: any[] = [];
  @Input() category!: Category;

  constructor(
    private route: ActivatedRoute,
    private accommodationService: AccommodationService,
    private hotelService: HotelService,
    private categoryService: CategoryService,
  ) {
    this.hotelService.getHotels().subscribe(() => {
      this.hotel = this.hotelService.hotel;
      if (this.hotel) {
        this.hotelService.applyColors(this.hotel?.colors);
        this.hotelService.hotelImageUrlUpdate$.subscribe((url) => {
          this.hotelImageUrl = url;
        });
      } else {
        this.hotelService.applyColors(['#FDFBF5']);
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
    this.accommodationService.getAccommodationsByCategory(categoryId).subscribe((accommodations) => {
      let accommodationsProcessed = 0;
      const totalAccommodations = accommodations.length;
      accommodations.forEach((accommodation: Accommodation) => {
        this.accommodationService.getAccomodationImageById(accommodation.id).subscribe((accommodationImage) => {
          const reader = new FileReader();
          reader.readAsDataURL(accommodationImage);
          reader.onloadend = () => {
            accommodation.urlImage = reader.result as string;
            accommodationsProcessed++;
            if (accommodationsProcessed === totalAccommodations) {
              this.accommodations = accommodations;
              this.setCarouselImg();
            }
          };
        });
      });
    });
  }

  setCarouselImg() {
    this.carouselItems = this.accommodations.map((element) => ({
      title: element.name,
      description: element.description,
      image: element.urlImage,
    }));
  }

}