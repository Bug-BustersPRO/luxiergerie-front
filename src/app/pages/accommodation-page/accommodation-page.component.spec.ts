import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccommodationPageComponent} from './accommodation-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';

describe('AccommodationPage', () => {
  let component: AccommodationPageComponent;
  let fixture: ComponentFixture<AccommodationPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccommodationPageComponent],
      imports: [HttpClientTestingModule,
        RouterModule.forRoot([]),
        ButtonComponent]
    });
    fixture = TestBed.createComponent(AccommodationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
