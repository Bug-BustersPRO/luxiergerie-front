import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselComponent } from './carousel.component';

describe('CarouselComponent', () => {
  let component: CarouselComponent;
  let fixture: ComponentFixture<CarouselComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarouselComponent]
    });
    fixture = TestBed.createComponent(CarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start carousel on init', () => {
    spyOn(component, 'startCarousel');
    component.ngOnInit();
    expect(component.startCarousel).toHaveBeenCalled();
  });

  it('should clear interval on destroy', () => {
    component.interval = setInterval(() => {}, 1000);
    spyOn(window, 'clearInterval');
    component.ngOnDestroy();
    expect(window.clearInterval).toHaveBeenCalledWith(component.interval);
  });

  it('should update currentIndex in startCarousel', (done) => {
    component.images = ['image1.jpg', 'image2.jpg', 'image3.jpg'];
    component.startCarousel();
    setTimeout(() => {
      expect(component.currentIndex).toBe(2);
      done();
    }, 4100);
  });

  it('should get correct transform', () => {
    component.currentIndex = 2;
    expect(component.getTransform()).toBe('translateX(-200%)');
  });

  it('should go to previous slide', () => {
    component.images = ['image1.jpg', 'image2.jpg', 'image3.jpg'];
    component.currentIndex = 2;
    component.previousSlide();
    expect(component.currentIndex).toBe(1);
  });

  it('should go to next slide', () => {
    component.images = ['image1.jpg', 'image2.jpg', 'image3.jpg'];
    component.currentIndex = 1;
    component.nextSlide();
    expect(component.currentIndex).toBe(2);
  });
});
