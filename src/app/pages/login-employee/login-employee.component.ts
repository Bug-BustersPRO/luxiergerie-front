import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Hotel } from 'src/app/shared/models/hotel.model';
import { LoginEmployee } from 'src/app/shared/models/loginEmployee.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { HotelService } from 'src/app/shared/services/hotel.service';

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
  public hotel!: Hotel;
  public hotelImageUrl!: string;

  constructor(public authService: AuthService, public router: Router, private hotelService: HotelService) {
    this.getHotels();
    if (this.hotel) {
      this.applyColors(this.hotel?.colors);
    } else {
      this.applyColors(["#FDFBF5"]);
    }
  }

  async login() {
    this.loginEmployee.serialNumber = this.serialNumber;
    this.loginEmployee.password = this.password;
    this.authService.login(this.loginEmployee).subscribe({
      next: response => {
        if (response.status === 200) {
          this.router.navigate(['/admin']);
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

  getHotels() {
    this.hotelService.getHotel().subscribe({
      next: response => {
        this.hotel = response[0];
        if (this.hotel !== undefined && this.hotel !== null) {
          this.getHotelImage();
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  getHotelImage(): void {
    this.hotelService.getHotelImage().subscribe({
      next: (response) => {
        const reader = new FileReader();
        reader.readAsDataURL(response);
        reader.onloadend = () => {
          this.hotelImageUrl = reader.result as string;
        };
      },
      error: error => {
        console.error(error);
      }
    });
  }

  applyColors(colors: string[]): void {
    document.documentElement.style.setProperty('--primary-background-color', colors[0]);
    document.documentElement.style.setProperty('--secondary-background-color', colors[1]);
    document.documentElement.style.setProperty('--tertiary-background-color', colors[2]);
  }

}
