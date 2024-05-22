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
    const hotels = this.hotelService.getHotels().subscribe({
      next: response => {
        console.log(response)
        this.hotel = response;
      },
      error: (error) => {
        console.error(error);
      }
    });
    console.log(hotels)
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
