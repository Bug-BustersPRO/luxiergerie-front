import { CommonModule } from '@angular/common';
import {
  Component,
  effect,
  EventEmitter,
  Output,
  Input,
  OnInit,
  AfterViewInit,
  OnChanges,
  ChangeDetectorRef,
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
  imports: [CommonModule, FormsModule, ButtonComponent],
  templateUrl: './register-employee.component.html',
  styleUrl: './register-employee.component.scss',
})
export class RegisterEmployeeComponent implements OnChanges {
  showPassword: boolean = false;
  text: string = 'visibility_off';
  @Output() closeModal = new EventEmitter<void>();
  roles!: Role[];
  @Input() isCreateEmployee: boolean = true;
  @Input() selectedEmployee!: Employee;

  model: Employee = new Employee('', '', '', '', '', [{ name: '' }]);

  constructor(
    private roleService: RoleService,
    private employeeService: EmployeeService,
    private toastr: ToastrService,
    private cdRef: ChangeDetectorRef
  ) {
    this.roleService.getRoles();
    effect(() => {
      this.roles = this.roleService
        .getAllRolesSig()
        .filter(
          (role: Role) =>
            role.name !== 'ROLE_DIAMOND' && role.name !== 'ROLE_GOLD'
        );
    });
  }

  ngOnChanges(): void {
    this.getEmployeeById();
  }

  getRoleName(role: string) {
    switch (role) {
    switch (role) {
      case 'ROLE_ADMIN':
        return 'Admin';
      case 'ROLE_EMPLOYEE':
        return 'Employé(e)';
      default:
        return;
    }
  }

  public getEmployeeById(): void {
    console.log('selectedEmployee: ', this.selectedEmployee);
    if (this.isCreateEmployee === false) {
      this.model.id = this.selectedEmployee.id;
      this.model.firstName = this.selectedEmployee.firstName;
      this.model.lastName = this.selectedEmployee.lastName;

      this.model.roles = this.roles.filter((role: Role) => {
        return this.selectedEmployee.roles.find(
          (roleName: { name: string }) => roleName.name === role.name
        );
      });
    } else {
      this.model = new Employee('', '', '', '', '', [{ name: '' }]);
    }
    this.cdRef.detectChanges();
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
      if (this.isCreateEmployee) {
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
      } else {
        this.employeeService
          .updateEmployee(this.model, this.model.id!)
          .subscribe(
            (response) => {
              this.employeeService.getAll();
              this.closeModal.emit();
              this.toastr.success('Employé(e) modifié(e) avec succès');
              console.log('employee updated succesfully: ', response);
            },
            (error) => {
              console.error('Error updating employees', error);
            }
          );
      }
    }
  }
}
