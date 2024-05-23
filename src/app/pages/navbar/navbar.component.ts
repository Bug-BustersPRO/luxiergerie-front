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
  public hotel!: Hotel;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.getHotels();
    this.getHotelImage(this.hotel.id)
    console.log(this.hotel.id)
  }

  getHotels(): void {
    this.hotelService.getHotels().subscribe({
      next: response => {
        this.hotel = response[0];
        console.log(this.hotel)
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  // FIX ME
  getHotelImage(hotel_id: string): void {
    this.hotelService.getHotelImage(hotel_id).subscribe({
      next: response => {
        console.log(response)
      },
      error: (error) => {
        console.error(error)
      }
    })
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
