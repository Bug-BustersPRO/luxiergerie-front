import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

  private router = inject(Router);
  constructor() { }

  clientLogin() {
    this.router.navigate(['/login-client']);
  }

  employeeLogin() {
    this.router.navigate(['/login-employee']);
  }

}
