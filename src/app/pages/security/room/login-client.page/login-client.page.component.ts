import {
  Component,
  OnDestroy,
  Renderer2,
  ElementRef,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import * as Hammer from 'hammerjs';

@Component({
  selector: 'app-login-client.page',
  templateUrl: './login-client.page.component.html',
  styleUrls: ['./login-client.page.component.scss']
})
export class LoginClientPageComponent implements OnDestroy, AfterViewInit {
  startY = 0;
  arrowClass = '';
  hammer!: HammerManager;
  openModal = false;

  @ViewChild('arrow') arrow!: ElementRef;

  constructor(private renderer: Renderer2, private cdRef: ChangeDetectorRef) {
    this.renderer.setStyle(document.body, 'background', 'linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ),url("30557618.jpg")');
    this.renderer.setStyle(document.body, 'background-size', 'cover');
    this.renderer.setStyle(document.body, 'background-repeat', 'no-repeat');
    this.renderer.setStyle(document.body, 'background-attachment', 'fixed');
    this.renderer.setStyle(document.body, 'background-position', 'center');
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
