import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Hotel } from 'src/app/shared/models/hotel.model';
import { ToastrService } from 'ngx-toastr';
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

  constructor(
    public authService: AuthService,
    public router: Router,
    private hotelService: HotelService,
    private toastr: ToastrService) {
      this.hotelService.getHotels().subscribe(() => {
        this.hotel = this.hotelService.hotel;
        if (this.hotel) {
          this.hotelService.applyColors(this.hotel?.colors);
          this.hotelService.hotelImageUrlUpdate$.subscribe((url) => {
            this.hotelImageUrl = url;
          });
        } else {
          this.hotelService.applyColors(["#FDFBF5"]);
        }
      });
    }

  async login() {
    this.loginEmployee.serialNumber = this.serialNumber;
    this.loginEmployee.password = this.password;
    this.authService.login(this.loginEmployee).subscribe({
      next: response => {
        if (response.status === 200) {
          this.router.navigate(['/admin']);
          this.toastr.success('Connexion réussie');
        }
      },
      error: (error) => {
        console.log(error);
        this.toastr.error('Erreur de connexion');
        this.isNotLoggedIn = true;
      }
    });
  }

  public get canValidate() {
    if (this.password == "" || (this.serialNumber == null || undefined || '')) return false;
    return true;
  }

}
