import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faHome,
  faCartShopping,
  faClipboard,
  faUser,
  faListCheck,
  faKey,
  faImages
  } from '@fortawesome/free-solid-svg-icons';
import { AdminHomeComponent } from '../admin-home/admin-home.component';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.scss'],
  standalone: true,
  imports: [FontAwesomeModule, AdminHomeComponent, RouterLink]
})


export class AdminNavbarComponent {

  home = faHome;
  cart = faCartShopping;
  list = faListCheck;
  clipBoard = faClipboard;
  user = faUser;
  key =faKey;
  carousel = faImages;
  adminFirstname = "Kéké";

  constructor(private router: Router) { }
  
  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
