// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { AccommodationPageComponent} from './accommodation-page.component';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { RouterModule } from '@angular/router';
// import { ButtonComponent } from 'src/app/shared/components/button/button.component';
// import { AccommodationService } from 'src/app/shared/services/accommodation.service';
// import { Accommodation } from 'src/app/shared/models/accommodation.model';
// import { of } from 'rxjs';
// import { CarouselComponent } from 'src/app/shared/components/carousel/carousel.component';

// describe('AccommodationPage', () => {
//   let component: AccommodationPageComponent;
//   let fixture: ComponentFixture<AccommodationPageComponent>;
//   let accommodationService: jasmine.SpyObj<AccommodationService>;

//   beforeEach(() => {
//     const accommodationServiceSpy = jasmine.createSpyObj('AccommodationService', ['getAccommodationsByCategory']);
//     TestBed.configureTestingModule({
//       declarations: [AccommodationPageComponent, CarouselComponent],
//       imports: [HttpClientTestingModule,
//         RouterModule.forRoot([]),
//         ButtonComponent],
//          providers: [
//           { provide: AccommodationService, useValue: accommodationServiceSpy }
//         ]
//     });
//     fixture = TestBed.createComponent(AccommodationPageComponent);
//     component = fixture.componentInstance;
//     accommodationService = TestBed.inject(AccommodationService) as jasmine.SpyObj<AccommodationService>;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should fetch accommodations by category', () => {
//     const mockAccommodations: Accommodation[] = [{ reservable: true }, { reservable: false }] as Accommodation[];
//     accommodationService.getAccommodationsByCategory.and.returnValue(of(mockAccommodations));

//     component.getAccommodationsByCategory('1');
//     expect(accommodationService.getAccommodationsByCategory).toHaveBeenCalledWith('1');
//     expect(component.accommodations).toEqual(mockAccommodations);
//   });
// });
