import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit, OnDestroy {
  @Input() images: string[] = [];
  public currentIndex: number = 0;
  public interval: any;

  // To use compo in another one :
  // set an images variables like : public images: string[] = [];
  // set images on the variables or by pushing it in the ngOnInit like :
  // this.images.push('assets/beach.jpg', 'assets/hotel.jpg', 'assets/towel.jpg');
  // in the template use : <app-carousel [images]="images"></app-carousel>

  ngOnInit(): void {
    this.startCarousel();
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  startCarousel() {
    this.interval = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }, 4000);
  }

  getTransform() {
    return `translateX(-${this.currentIndex * 100}%)`;
  }

  previousSlide() {
    this.currentIndex = this.currentIndex === 0 ? this.images.length - 1 : this.currentIndex - 1;
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }
}
