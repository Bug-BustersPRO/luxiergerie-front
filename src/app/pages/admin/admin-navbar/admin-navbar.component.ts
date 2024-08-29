import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AdminHomeComponent } from '../admin-home/admin-home.component';
import { Hotel } from 'src/app/shared/models/hotel.model';
import { HotelService } from 'src/app/shared/services/hotel.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.scss'],
  standalone: true,
  imports: [AdminHomeComponent, RouterLink, CommonModule],
  providers: [],
})

export class AdminNavbarComponent implements OnInit {
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
      name: 'Séjours',
      route: 'sojourn',
      icon: 'check_box',
    },
    {
      name: 'Chambres',
      route: 'room',
      icon: 'key',
    },
    {
      name: 'Clients',
      route: 'client',
      icon: 'person',
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
      name: 'Séjours',
      route: 'sojourn',
      icon: 'check_box',
    },
    {
      name: 'Chambres',
      route: 'config',
      icon: 'key',
    },
    {
      name: 'Clients',
      route: 'client',
      icon: 'person',
    },
  ];

  constructor(private hotelService: HotelService, private cookieService: CookieService, private router: Router) {
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

  isActive(route: string): boolean {
    switch (route) {
      default:
        return this.router.url.includes(route);
    }
  }
}
