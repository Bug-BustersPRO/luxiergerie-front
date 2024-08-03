import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Hotel } from '../../models/hotel.model';
import { HotelService } from '../../services/hotel.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  public hotel: Hotel = {} as Hotel;
  constructor(
    private router: Router,
    private hotelService: HotelService) {
    this.hotelService.getHotels().subscribe(() => {
      this.hotel = this.hotelService.hotel;
      if (this.hotel) {
        this.hotelService.applyColors(this.hotel?.colors);
      } else {
        this.hotelService.applyColors(["#FDFBF5"]);
      }
    });
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
    window.scrollTo(0, 0);
  }

}