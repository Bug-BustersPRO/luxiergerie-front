import { Component } from '@angular/core';
import { Router, RouterLink} from '@angular/router';
import { AdminHomeComponent } from '../admin-home/admin-home.component';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.scss'],
  standalone: true,
  imports: [AdminHomeComponent, RouterLink]
})


export class AdminNavbarComponent {

  adminFirstname = "Kéké";

  constructor(private router: Router) { }
  
  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
