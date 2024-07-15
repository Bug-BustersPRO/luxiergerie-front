import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';
import { CoreService } from '../../services/core.service';
import { Role } from '../../models/role.model';
<<<<<<< HEAD
import { Employee } from '../../models/employee.model';
=======
>>>>>>> e09b07145e18dc79ce63561a43e67523426f261b

@Component({
  selector: 'app-register-employee',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent,],
  templateUrl: './register-employee.component.html',
  styleUrl: './register-employee.component.scss',
})
export class RegisterEmployeeComponent {

  showPassword: boolean = false;
  text: string = 'visibility_off';
  
<<<<<<< HEAD
  model: any = {
    firstName: '',
    lastName: '',
    roles: [],
=======
  model = {
    lastName: '',
    firstName: '',
    roles: [] as Role[],
>>>>>>> e09b07145e18dc79ce63561a43e67523426f261b
    password: ''
  }

  constructor(private coreService: CoreService) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    if (this.showPassword) {
      this.text = 'visibility';
    } else {
      this.text = 'visibility_off';
    }
  }

  onSubmit(form: { valid: any; }) {
<<<<<<< HEAD
    console.log('form: ', form);
=======
>>>>>>> e09b07145e18dc79ce63561a43e67523426f261b
    if(form.valid) {
      this.coreService.createEmployee(this.model).subscribe(
        response => {
          console.log('employee created succesfully: ', response);
        },
        error => {
          console.error('Error creating employees' ,error)
        }
      );      
    }
  }

}
