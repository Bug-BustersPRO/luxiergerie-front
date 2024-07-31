import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Section } from '../../models/section.model';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit, OnDestroy {
  @Input() public items: Section[] = [];
  public currentIndex: number = 0;
  public interval: any;

  // To use compo in another one :
  // create in the component an CarouselItem array which will be filled with the data from the API
  // this carouselItems will take the same data as the interface CarouselItem
  // then push data from the API to the carouselItems array
  // then in the html of the component, add the carousel component and give it the carouselItems as input
  // <app-carousel [items]="carouselItems"></app-carousel>

  ngOnInit(): void {
    this.startCarousel();
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  startCarousel() {
    this.interval = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.items.length;
    }, 4000);
  }

  getTransform() {
    return `translateX(-${this.currentIndex * 100}%)`;
  }

  navigate(index: number) {
    this.currentIndex = index;
  }

  getCurrentItem() {
    return this.items[this.currentIndex];
  }

}
