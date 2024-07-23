import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccommodationComponent } from './accommodation.component';
import { AccommodationCardComponent } from '../accommodation-card/accommodation-card.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';

describe('AccommodationComponent', () => {
  let component: AccommodationComponent;
  let fixture: ComponentFixture<AccommodationComponent>;
  const mockAccommodation = {
    id: '1',
    name: 'Test Accommodation',
    description: 'Test Description',
    price: 100,
    image: 'test.jpg',
    category: 'Test Category',
    reservable: false,
    quantity: 0,
    priceToDisplay: '100 €'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccommodationComponent],
      imports: [AccommodationCardComponent,
        HttpClientTestingModule,
      ToastrModule.forRoot()],
    });
    fixture = TestBed.createComponent(AccommodationComponent);
    component = fixture.componentInstance;
    component.accommodation = mockAccommodation;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
