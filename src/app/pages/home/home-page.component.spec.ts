import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageComponent } from './home-page.component';
import { SectionPageComponent } from '../section/section-page';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CarouselComponent } from 'src/app/shared/components/carousel/carousel.component';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomePageComponent, SectionPageComponent, CarouselComponent],
      imports: [HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
