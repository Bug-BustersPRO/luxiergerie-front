import { Component } from '@angular/core';
import { RouterLink} from '@angular/router';
import { AdminHomeComponent } from '../admin-home/admin-home.component';
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.scss'],
  standalone: true,
  imports: [AdminHomeComponent, RouterLink, AdminDashboardComponent]
})


export class AdminNavbarComponent {
}
