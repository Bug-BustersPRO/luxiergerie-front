import { Component } from '@angular/core';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss'],
  standalone: true,
  imports: [AdminNavbarComponent, AdminDashboardComponent, RouterOutlet]
})
export class AdminHomeComponent {

}
