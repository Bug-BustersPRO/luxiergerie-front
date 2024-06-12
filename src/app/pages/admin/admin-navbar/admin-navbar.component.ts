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

  public navItems = [
    {
      name: 'Commandes',
      route: 'admin/purchases',
      icon: 'shopping_cart'
    },
    {
      name: 'Services',
      route: 'admin/accomodations',
      icon: 'list_alt'
    },
    {
      name: 'Informations',
      route: 'admin/info',
      icon: 'note_alt'
    },
    {
      name: 'Chambres',
      route: 'admin/config',
      icon: 'key'
    },
    {
      name: 'Carousel',
      route: 'admin/carousel',
      icon: 'note_alt'
    },
    {
      name: 'Mon hôtel',
      route: 'admin/config',
      icon: 'settings'
    }
  ];
}
