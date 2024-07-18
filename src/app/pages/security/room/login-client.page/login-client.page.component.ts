import { Component, OnDestroy, Renderer2, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as Hammer from 'hammerjs';
import { Hotel } from 'src/app/shared/models/hotel.model';
import { HotelService } from 'src/app/shared/services/hotel.service';

@Component({
  selector: 'app-login-client.page',
  templateUrl: './login-client.page.component.html',
  styleUrls: ['./login-client.page.component.scss'],
})
export class LoginClientPageComponent implements OnDestroy, AfterViewInit {
  public startY = 0;
  public arrowClass = '';
  public hammer!: HammerManager;
  public openModal = false;
  public hotel: Hotel = {} as Hotel;
  public hotelBackgroundImageUrl!: string;
  public hotelImageUrl!: string;
  @ViewChild('arrow') arrow!: ElementRef;

  constructor(private renderer: Renderer2, private hotelService: HotelService) {
    this.renderer.setStyle(
      document.body,
      'background',
      'linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ),url("30557618.jpg")'
    );
    this.renderer.setStyle(document.body, 'background-size', 'cover');
    this.renderer.setStyle(document.body, 'background-repeat', 'no-repeat');
    this.renderer.setStyle(document.body, 'background-attachment', 'fixed');
    this.renderer.setStyle(document.body, 'background-position', 'center');
    this.hotelService.getHotels().subscribe(() => {
      this.hotel = this.hotelService.hotel;
      if (this.hotel) {
        this.hotelService.backgroundImageUrlUpdate$.subscribe((url) => {
          this.hotelBackgroundImageUrl = url;
        });
        this.hotelService.hotelImageUrlUpdate$.subscribe((url) => {
          this.hotelImageUrl = url;
        });
      }
    });
  }

  ngAfterViewInit(): void {
    this.initializeHammer();
    this.arrow.nativeElement.addEventListener('animationend', () => {
      if (this.arrowClass === 'slideUpAndDisappear') {
        this.openModal = true;
      }
    });
  }

  ngOnDestroy(): void {
    this.renderer.removeStyle(document.body, 'background');
    this.renderer.removeStyle(document.body, 'background-size');
    this.renderer.removeStyle(document.body, 'background-repeat');
    this.renderer.removeStyle(document.body, 'background-attachment');
    this.renderer.removeStyle(document.body, 'background-position');
    if (this.hammer) {
      this.hammer.destroy();
    }
  }

  initializeHammer(): void {
    if (this.arrow.nativeElement) {
      this.hammer = new Hammer(this.arrow.nativeElement);
      this.hammer.get('pan').set({ direction: Hammer.DIRECTION_VERTICAL });

      this.hammer.on('panstart', (event: any) => {
        this.startY = event.center.y;
      });

      this.hammer.on('panup', (event: any) => {
        this.onPanUp(event);
      });
    }
  }

  onPanUp(event: any): void {
    if (this.startY - event.center.y > 60) {
      this.arrowClass = 'slideUpAndDisappear';
    }
  }
}