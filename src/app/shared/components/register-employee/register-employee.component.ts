import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';
import { CoreService } from '../../services/core.service';
import { Employee } from '../../models/employee.model';
import { Role } from '../../models/role.model';
import { UserService } from '../../services/user.service';

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

  roles!: Role[];
  
   model: Employee = new Employee(
    "",
    "",
    "",
    '',
    '',
    [{ name: '' }],
  );

  constructor(private coreService: CoreService, private userService: UserService) {
    this.userService.getRoles().subscribe(
      response => {
        this.roles = response.filter((role: Role) => role.name !== 'ROLE_DIAMOND' && role.name !== 'ROLE_GOLD');
         console.log('roles: ', this.roles);     
      },
     
      error => {
        console.error('Error getting roles', error);
   });
  }

  getRoleName(role: string) {
    switch(role) {
      case 'ROLE_ADMIN':
        return 'Admin';
      case 'ROLE_EMPLOYEE':
        return 'Employé(e)';
      default:
        return 'Employé(e)';
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    if (this.showPassword) {
      this.text = 'visibility';
    } else {
      this.text = 'visibility_off';
    }
  }

  onSubmit(form: { valid: any; }) {
    console.log('form: ', form);
    if(form.valid) {
      console.log('model: ', this.model);-+
      this.coreService.createEmployee(this.model).subscribe(
        response => {
          console.log('employee created succesfully: ', response);
        },
        error => {
          console.error('Error creating employees' ,error)
        }
      );  
      //fermer la modale   
      //fetch les employés et les afficher (serialnumber !!!)
    }
  }

}
