import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AdminHomeComponent } from '../admin-home/admin-home.component';
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';
import { Hotel } from 'src/app/shared/models/hotel.model';
import { HotelService } from 'src/app/shared/services/hotel.service';
import { AccommodationFacade } from 'src/app/domains/accommodation-facade';
import { Employee } from 'src/app/shared/models/employee.model';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.scss'],
  standalone: true,
  imports: [AdminHomeComponent, RouterLink, AdminDashboardComponent],
  providers: [AccommodationFacade]
})

export class AdminNavbarComponent {

  constructor(private hotelService: HotelService, private cookieService: CookieService) { }

  public hotel: Hotel = {} as Hotel;
  public hotelImageUrl!: string;

  public navItems = [
    {
      name: 'Commandes',
      route: 'purchases',
      icon: 'shopping_cart'
    },
    {
      name: 'Services',
      route: 'accomodations',
      icon: 'list_alt'
    },
    {
      name: 'Informations',
      route: 'info',
      icon: 'note_alt'
    },
    {
      name: 'Chambres',
      route: 'config',
      icon: 'key'
    },
    {
      name: 'Carousel',
      route: 'carousel',
      icon: 'note_alt'
    },
    {
      name: 'Ajouter un employé',
      route: 'employee',
      icon: 'person'
    },
    {
      name: 'Mon établissement',
      route: 'hotel',
      icon: 'business'
    }
  ]

  ngOnInit(): void {
    this.hotelService.hotelUpdate$.subscribe({
      next: (hotel) => {
        this.hotel = hotel;
        this.getHotelImage();
      }
    });
    this.getHotels();
  }

  getHotels() {
    const cookie = this.cookieService.get('jwt-token');
    if (cookie !== '') {
      this.hotelService.getHotel().subscribe({
        next: response => {
          this.hotel = response[0];
          if (this.hotel !== undefined && this.hotel !== null) {
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
}
