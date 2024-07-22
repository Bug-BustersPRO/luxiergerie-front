import { CommonModule } from '@angular/common';
import { Component, effect, EventEmitter, Output } from '@angular/core';
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

  getRoleName(role: string) {
    switch (role) {
      case 'ROLE_ADMIN':
        return 'Admin';
      case 'ROLE_EMPLOYEE':
        return 'Employé(e)';
      default:
        return;
    }
  }

  getId(id: any) {
    console.log('3333333333333333333 id: ', id);
    return id;
  }

  getRoleWithIdAndName(roleId: Event): any {
    console.log('2222222222222222222 roleId: ', roleId);
    console.log('roles: ', this.roles);
    return 'role';
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
          this.employeeService.getAll();
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
