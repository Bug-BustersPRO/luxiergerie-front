import { CommonModule } from '@angular/common';
import { Component, effect, EventEmitter, Output, Input, OnChanges, ChangeDetectorRef, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { Employee } from 'src/app/shared/models/employee.model';
import { Role } from 'src/app/shared/models/role.model';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { RoleService } from 'src/app/shared/services/role.service';

@Component({
  selector: 'app-register-employee',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent],
  templateUrl: './register-employee.component.html',
  styleUrl: './register-employee.component.scss',
})
export class RegisterEmployeeComponent implements OnChanges {
  showPassword: boolean = false;
  text: string = 'visibility_off';
  roles!: Role[];
  model: Employee = new Employee('', '', '', '', '', [{ name: '' }]);

  @Input() isCreateEmployee: boolean = true;
  @Input() selectedEmployee!: Employee;
  @Output() closeModal = new EventEmitter<void>();

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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedEmployee'] && changes['selectedEmployee'].currentValue) {
      this.getEmployeeById();
    }
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

  public getEmployeeById(): void {
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
    if (!this.model.lastName || !this.model.firstName || !this.model.roles[0].name || !this.model.password) {
      this.toastr.error('Veuillez remplir tous les champs obligatoires');
      return;
    }
    if (form.valid) {
      if (this.isCreateEmployee) {
        this.employeeService.createEmployee(this.model).subscribe(
          () => {
            this.employeeService.getAll();
            this.closeModal.emit();
            this.toastr.success('Employé(e) créé(e) avec succès');
            this.model = new Employee('', '', '', '', '', [{ name: '' }]);
          },
          (error) => {
            this.toastr.error('Il y a eu une erreur lors de la création de l\'employé(e)');
            console.error('Error creating employees', error);
          }
        );
      } else {
        if (this.model.roles[0].name === 'ROLE_ADMIN') {
          this.toastr.error('Vous ne pouvez pas modifier un admin');
          return;
        } else {
          this.employeeService
            .updateEmployee(this.model, this.model.id!)
            .subscribe(
              () => {
                this.employeeService.getAll();
                this.closeModal.emit();
                this.toastr.success('Employé(e) modifié(e) avec succès');
              },
              (error) => {
                console.error('Error updating employees', error);
                this.toastr.error('Il y a eu une erreur lors de la modification de l\'employé(e)');
              }
            );
        }
      }
    }
  }

  resetForm() {
    this.model = new Employee('', '', '', '', '', [{ name: '' }]);
    this.cdRef.detectChanges();
  }

}