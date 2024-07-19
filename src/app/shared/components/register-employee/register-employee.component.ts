import { CommonModule } from '@angular/common';
import {
  Component,
  effect,
  EventEmitter,
  OnInit,
  Output,
  output,
  ViewChild,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';
import { Employee } from '../../models/employee.model';
import { Role } from '../../models/role.model';
import { RoleService } from '../../services/role.service';
import { EmployeeService } from '../../services/employee.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register-employee',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent],
  templateUrl: './register-employee.component.html',
  styleUrl: './register-employee.component.scss',
})
export class RegisterEmployeeComponent {
  showPassword: boolean = false;
  text: string = 'visibility_off';
  @Output() closeModal = new EventEmitter<void>();
  roles!: Role[];

  model: Employee = new Employee('', '', '', '', '', [{ name: '' }]);

  constructor(
    private roleService: RoleService,
    private employeeService: EmployeeService,
    private toastr: ToastrService
  ) {
    this.roleService.getRoles();
    effect(() => {
      this.roles = this.roleService
        .getAllRolesSig()
        .filter(
          (role: Role) =>
            role.name !== 'ROLE_DIAMOND' && role.name !== 'ROLE_GOLD'
        );
      console.log('roles: ', this.roles);
    });
   
  }
  // ngOnInit(): void {
  //    this.roleService.getById("103111f6-d6f3-4587-98f2-fac7b9c55444");

  //   this.roleService.getRoleById();
  //   console.log("@@@@@@@@@@@@@@@@@@@@@" +this.roleService.getRoleById());
  // }

  getRoleName(role: string) {
    switch (role) {
      case 'ROLE_ADMIN':
        return 'Admin';
      case 'ROLE_EMPLOYEE':
        return 'Employé(e)';
      default:
        return 'Employé(e)';
    }
  }

  getId(id: any) {
    console.log('3333333333333333333id: ', id);
    return id;
  }

  getRoleWithIdAndName(roleId: string): any {
    console.log('11111111111111111111roleId: ', roleId);
    const role = this.roles.find((role) => role.id === roleId);
    this.model.roles[0] = role as Role;
    console.log('2222222222222222222role: ', role);
    return role;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    if (this.showPassword) {
      this.text = 'visibility';
    } else {
      this.text = 'visibility_off';
    }
  }

  onSubmit(form: { valid: any }) {
    console.log('form: ', form);
    if (form.valid) {
      console.log('model: ', this.model);
      this.employeeService.createEmployee(this.model).subscribe(
        (response) => {
          this.closeModal.emit();
          this.toastr.success('Employé(e) créé(e) avec succès');
          console.log('employee created succesfully: ', response);
        },
        (error) => {
          console.error('Error creating employees', error);
        }
      );
    }
  }
}
