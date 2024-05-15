import {Component, Input} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoginClient } from '../../models/loginClient.model';
import { CommonModule } from '@angular/common';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {catchError, of} from "rxjs";

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
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
  loginForm: FormGroup
  loginClient?: LoginClient
  step: number = 1
  invalidLogin: boolean = false
  @Input() isOpen: boolean = false

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      roomNumber: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  onKey(key: number) {
    let password = this.loginForm.get('password')?.value || ''
    if (password.length < 4) {
      password += key
      this.loginForm.get('password')?.setValue(password)
    }
  }

  onSubmit() {
    if (this.step === 1) {
      this.step++;
    } else if (this.loginForm.valid) {
      this.loginClient = new LoginClient(this.loginForm.value.roomNumber, this.loginForm.value.password)
      this.authService.clientLogin(this.loginClient).pipe(
        catchError((error) => {
          this.invalidLogin = true
          console.log(this.invalidLogin)
          return of(error)
        })
      ).subscribe(response => {
        if (response.status === 200) {
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

  onEditRoomNumber() {
    this.step = 1
  }
}
