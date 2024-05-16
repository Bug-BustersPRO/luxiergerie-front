import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginEmployee } from 'src/app/shared/models/loginEmployee.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login-employee',
  templateUrl: './login-employee.component.html',
  styleUrls: ['./login-employee.component.scss']
})
export class LoginEmployeeComponent {

  private authService = inject(AuthService);
  private router = inject(Router);
  public serialNumber!: string;
  public password!: string;
  public loginEmployee: LoginEmployee = { serialNumber: "", password: "" }
  public isNotLoggedIn: boolean = false;

  constructor() { }

  async login() {
    this.loginEmployee.serialNumber = this.serialNumber;
    this.loginEmployee.password = this.password;
    this.authService.login(this.loginEmployee).subscribe({
      next: response => {
        console.log(response)
        if (response.status === 200) {
          this.router.navigate(['/sections']);
        }
      },
      error: (error) => {
        console.error(error);
        this.isNotLoggedIn = true;
      }
    });
  }

  public get canValidate() {
    if (this.password == "" || (this.serialNumber == null || undefined)) return false;
    return true;
  }

}
