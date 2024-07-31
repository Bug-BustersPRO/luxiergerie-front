import { AfterViewInit, Component, effect } from '@angular/core';
import { Employee } from 'src/app/shared/models/employee.model';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { CommonModule } from '@angular/common';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { RegisterEmployeeComponent } from 'src/app/shared/components/register-employee/register-employee.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-employee',
  standalone: true,
  imports: [CommonModule, ModalComponent, RegisterEmployeeComponent],
  templateUrl: './list-employee.component.html',
  styleUrl: './list-employee.component.scss',
})
export class ListEmployeeComponent implements AfterViewInit {
  employees!: Employee[];
  isModalOpen!: boolean;
  selectedEmployee!: Employee;

  constructor(private employeeService: EmployeeService, private toastr: ToastrService) {
    this.employeeService.getAll();
    effect(() => {
      this.employees = this.employeeService.getAllEmployeesSig();
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

  closeModal() {
    this.isModalOpen = false;
  }

  modify(employeeId: string | undefined) {
    this.isModalOpen = true;
    this.employeeService.getEmployeeById(employeeId!).subscribe({
      next: (employee) => {
        this.selectedEmployee = employee;
      },
      error: () =>
        this.toastr.error('Il y a eu une erreur lors de la récupération de l\'employé'),
    });
  }

  deleteEmployee(employeeId: string | undefined) {
    this.employeeService.deleteEmployee(employeeId!).subscribe({
      next: () => {
        this.employeeService.getAll();
        this.toastr.success('Employé supprimé avec succès');
      },
      error: () =>
        this.toastr.error('Il y a eu une erreur lors de la suppression de l\'employé'),
    });
  }

  ngAfterViewInit(): void {
    this.employeeService.getAll();
  }

}