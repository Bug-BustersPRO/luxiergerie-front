import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AdminHomeComponent } from '../admin-home/admin-home.component';
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';
import { Hotel } from 'src/app/shared/models/hotel.model';
import { HotelService } from 'src/app/shared/services/hotel.service';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.scss'],
  standalone: true,
  imports: [AdminHomeComponent, RouterLink, AdminDashboardComponent],
  providers: [],
})
export class AdminNavbarComponent {
  public hotel: Hotel = {} as Hotel;
  public hotelImageUrl!: string;
  isAdmin!: boolean;

  public navItemsAdmin = [
    {
      name: 'Commandes',
      route: 'purchases',
      icon: 'shopping_cart',
    },
    {
      name: 'Services',
      route: 'accomodations',
      icon: 'list_alt',
    },
    {
      name: 'Chambres',
      route: 'room',
      icon: 'key',
    },
    {
      name: 'Carousel',
      route: 'carousel',
      icon: 'note_alt',
    },
    {
      name: 'Employé(e)s',
      route: 'employee',
      icon: 'person',
    },
    {
      name: 'Mon établissement',
      route: 'hotel',
      icon: 'business',
    },
  ];

  public navItemsEmployee = [
    {
      name: 'Commandes',
      route: 'purchases',
      icon: 'shopping_cart',
    },
    {
      name: 'Services',
      route: 'accomodations',
      icon: 'list_alt',
    },
    {
      name: 'Chambres',
      route: 'config',
      icon: 'key',
    },
  ];

  constructor(
    private hotelService: HotelService,
    private cookieService: CookieService
  ) {
    this.hotelService.getHotels().subscribe(() => {
      this.hotel = this.hotelService.hotel;
      if (this.hotel) {
        this.hotelService.applyColors(this.hotel?.colors);
        this.hotelService.hotelImageUrlUpdate$.subscribe((url) => {
          this.hotelImageUrl = url;
        });
      } else {
        this.hotelService.applyColors(['#FDFBF5']);
      }
    });
  }

  ngOnInit(): void {
    const employee = JSON.parse(localStorage.getItem('employee')!);
    if (employee.roles[0].name === 'ROLE_ADMIN') {
      this.isAdmin = true;
    }

    this.hotelService.hotelUpdate$.subscribe({
      next: (hotel) => {
        this.hotel = hotel;
        this.hotelService.getHotelImageSub();
      },
    });
  }
}
