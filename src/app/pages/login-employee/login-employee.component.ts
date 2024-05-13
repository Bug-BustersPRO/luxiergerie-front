import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login-employee',
  templateUrl: './login-employee.component.html',
  styleUrls: ['./login-employee.component.scss']
})
export class LoginEmployeeComponent {

  private authService = inject(AuthService);
  private router = inject(Router);
  public serialNumber!: number;
  public password!: string;

  constructor() { }

  login() {
    console.log('Serial Number: ', this.serialNumber);
    console.log('Password, ', this.password);
    this.authService.login(this.serialNumber, this.password).subscribe((response) => {
      console.log(response);
      console.log(response.status)
      if (response.token) {
        window.localStorage.setItem('jwt-token', response.token);
        this.router.navigate(['/sections']);
      } else {
        console.log(response.message);
      }
    });
  }

}
