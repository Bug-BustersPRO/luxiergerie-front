import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoginClient } from '../../models/loginClient.model';
import { CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from "@angular/animations";
import { catchError, of } from "rxjs";
import { Hotel } from '../../models/hotel.model';
import { HotelService } from '../../services/hotel.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      state('*', style({
        opacity: 1
      })),
      transition(':enter', animate('500ms ease-in')),
      transition(':leave', animate('500ms ease-out'))
    ])
  ]
})
export class LoginModalComponent {
  public loginForm: FormGroup
  public loginClient?: LoginClient
  public step: number = 1
  public invalidLogin: boolean = false
  public hotel: Hotel = {} as Hotel;
  public keys = [
    ...Array.from({ length: 9 }, (_, i) => ({ type: 'number', value: i + 1 })),
    { type: 'action', value: 'erase', symbol: `&#8592;` },
    { type: 'number', value: 0 },
    { type: 'action', value: 'submit', symbol: `&#10004;` }
  ]
  @Input() isOpen: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private hotelService: HotelService,
    private toastr: ToastrService) {
    this.loginForm = this.formBuilder.group({
      sojournIdentifier: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.hotelService.getHotels().subscribe(() => {
      this.hotel = this.hotelService.hotel;
      if (this.hotel) {
        this.hotelService.applyColors(this.hotel?.colors);
      } else {
        this.hotelService.applyColors(["#FDFBF5"]);
      }
    });
  }

  onKey(key: number | string) {
    let password = this.loginForm.get('password')?.value || ''
    if (typeof key === 'number' && password.length < 4) {
      password += key
      this.loginForm.get('password')?.setValue(password)
    }
  }

  onSubmit() {
    if (this.step === 1) {
      this.step++;
    } else if (this.loginForm.valid) {
      this.loginClient = new LoginClient(this.loginForm.value.sojournIdentifier, this.loginForm.value.password)
      this.authService.clientLogin(this.loginClient).pipe(
        catchError((error) => {
          this.invalidLogin = true
          console.log(this.invalidLogin)
          this.toastr.error('Erreur de connexion');
          return of(error)
        })
      ).subscribe(response => {
        if (response.status === 200) {
          localStorage.setItem('current_client', JSON.stringify(response.body));
          this.toastr.success('Connexion réussie');
          this.router.navigate(['/'])
        }
      });
    } else {
      this.invalidLogin = true
    }
  }

  onErase() {
    let password = this.loginForm.get('password')?.value || ''
    if (password.length > 0) {
      password = password.slice(0, -1)
      this.loginForm.get('password')?.setValue(password)
    }
  }

  getKeyDisplay(key: { type: string, value: number | string, symbol?: string }) {
    return key.type === 'number' ? key.value : key.symbol
  }

  onEditsojournIdentifier() {
    this.step = 1
  }

}