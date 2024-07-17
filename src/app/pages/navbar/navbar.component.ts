import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Hotel } from 'src/app/shared/models/hotel.model';
import { HotelService } from 'src/app/shared/services/hotel.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  public hotel: Hotel = {} as Hotel;
  public hotelImageUrl!: string;

  constructor(private router: Router, private hotelService: HotelService) {
    this.hotelService.getHotels().subscribe(() => {
      this.hotel = this.hotelService.hotel;
      if (this.hotel) {
        this.hotelService.applyColors(this.hotel?.colors);
        this.hotelService.hotelImageUrlUpdate$.subscribe((url) => {
          this.hotelImageUrl = url;
        });
      } else {
        this.hotelService.applyColors(["#FDFBF5"]);
      }
    });
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}