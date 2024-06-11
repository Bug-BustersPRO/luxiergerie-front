import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginEmployee } from 'src/app/shared/models/loginEmployee.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login-employee',
  templateUrl: './login-employee.component.html',
  styleUrls: ['./login-employee.component.scss']
})
export class LoginEmployeeComponent {
  public serialNumber!: string;
  public password!: string;
  public loginEmployee: LoginEmployee = { serialNumber: "", password: "" }
  public isNotLoggedIn: boolean = false;

  constructor(public authService: AuthService, public router: Router) { }

  async login() {
    this.loginEmployee.serialNumber = this.serialNumber;
    this.loginEmployee.password = this.password;
    this.authService.login(this.loginEmployee).subscribe({
      next: response => {
        if (response.status === 200) {
          this.router.navigate(['/config-hotel']);
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
