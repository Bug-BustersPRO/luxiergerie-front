import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccommodationPage} from './accommodation-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AccommodationPage', () => {
  let component: AccommodationPage;
  let fixture: ComponentFixture<AccommodationPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccommodationPage],
      imports: [HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(AccommodationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
