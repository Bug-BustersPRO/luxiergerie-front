import {Component, OnInit} from '@angular/core';
import {LoginClient} from "../../../../shared/models/loginClient.model";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-login-client.page',
  templateUrl: './login-client.page.component.html',
  styleUrls: ['./login-client.page.component.scss']
})
export class LoginClientPageComponent implements OnInit {

  loginForm: FormGroup;
  loginClient?: LoginClient;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.loginForm = this.formBuilder.group({
      roomNumber: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loginClient = new LoginClient(this.loginForm.value.roomNumber, this.loginForm.value.password);
      this.authService.clientLogin(this.loginClient).subscribe(response => {
        console.log(response.headers);
      });
    }
  }
}
