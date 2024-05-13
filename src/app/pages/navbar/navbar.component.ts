import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/shared/services/core.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  private coreService = inject(CoreService);
  constructor(private router: Router) { }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  logout(): void {
    this.coreService.logout();
    localStorage.removeItem('jwt-token');
    this.router.navigate(['/']);
  }
}
