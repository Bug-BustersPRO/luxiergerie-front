import { Component, OnInit } from '@angular/core';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Employee } from 'src/app/shared/models/employee.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss'],
  standalone: true,
  imports: [
    AdminNavbarComponent,
    RouterOutlet,
    RouterLink,
  ],
})
export class AdminHomeComponent implements OnInit {
  public currentEmployee!: Employee;
  public roles: string[] = [];

  constructor(private authService: AuthService) {
    this.currentEmployee = localStorage.getItem('employee')
      ? JSON.parse(localStorage.getItem('employee') as string)
      : ({} as Employee);
  }

  ngOnInit(): void {
    this.roles = this.currentEmployee.roles.map((role) => role.name);
  }

  getRoleName(role: string) {
    switch (role) {
      case 'ROLE_ADMIN':
        return 'Admin';
      case 'ROLE_EMPLOYEE':
        return 'Employé(e)';
      default:
        return 'Employé(e)';
    }
  }

  logout() {
    this.authService.logOut(true);
  }

}