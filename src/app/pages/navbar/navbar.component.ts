import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Hotel } from 'src/app/shared/models/hotel.model';
import { HotelService } from 'src/app/shared/services/hotel.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public hotel: Hotel = {} as Hotel;
  public hotelImageUrl!: string;

  constructor(private router: Router, private hotelService: HotelService, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.getHotels();
  }

  getHotels() {
    const cookie = this.cookieService.get('jwt-token');
    if (cookie !== '') {
      this.hotelService.getHotel().subscribe({
        next: response => {
          this.hotel = response[0];
          if (this.hotel !== undefined && this.hotel !== null) {
            this.applyColors(this.hotel?.colors);
            this.getHotelImage();
          }
        },
        error: (error) => {
          console.error(error);
        }
      });
    }

  }

  getHotelImage(): void {
    this.hotelService.getHotelImage().subscribe({
      next: (response) => {
        const reader = new FileReader();
        reader.readAsDataURL(response);
        reader.onloadend = () => {
          this.hotelImageUrl = reader.result as string;
        };
      },
      error: error => {
        console.error(error);
      }
    });
  }

  applyColors(colors: string[]): void {
    document.documentElement.style.setProperty('--primary-background-color', colors[0]);
    document.documentElement.style.setProperty('--secondary-background-color', colors[1]);
    document.documentElement.style.setProperty('--tertiary-background-color', colors[2]);
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
