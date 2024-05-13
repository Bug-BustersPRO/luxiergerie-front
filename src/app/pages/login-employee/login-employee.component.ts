import { Component } from '@angular/core';

@Component({
  selector: 'app-login-employee',
  templateUrl: './login-employee.component.html',
  styleUrls: ['./login-employee.component.scss']
})
export class LoginEmployeeComponent {

  public serialNumber!: number;
  public password!: string;

  constructor() { }



}
