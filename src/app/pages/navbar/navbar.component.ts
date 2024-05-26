import { Component, OnInit, inject } from '@angular/core';
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
export class NavbarComponent implements OnInit {

  hotelService = inject(HotelService);
  public hotel: Hotel = {} as Hotel;
  public hotelImageUrl!: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.getHotels();
  }

  async getHotels() {
    await this.hotelService.getHotels().subscribe({
      next: response => {
        this.hotel = response[0];
        this.applyColors(this.hotel.colors);
        this.getHotelImage(this.hotel.id)
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  getHotelImage(hotelId: string): void {
    this.hotelService.getHotelImage(hotelId).subscribe({
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
