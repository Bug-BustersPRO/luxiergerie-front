import { AfterViewInit, Component, effect } from '@angular/core';
import { Employee } from 'src/app/shared/models/employee.model';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { CommonModule } from '@angular/common';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { RegisterEmployeeComponent } from 'src/app/shared/components/register-employee/register-employee.component';

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

  constructor(private employeeService: EmployeeService) {
    this.employeeService.getAll();
    effect(() => {
      this.employees = this.employeeService.getAllEmployeesSig();
      console.log(this.employees);
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
      error: (error) =>
        console.log(error, 'There was an error while fetching employee'),
    });
  }

  deleteEmployee(employeeId: string | undefined) {
    this.employeeService.deleteEmployee(employeeId!).subscribe({
      next: () => {
        this.employeeService.getAll();
        console.log('Employee deleted successfully');
      },
      error: (error) =>
        console.log(error, 'There was an error while deleting employee'),
    });
  }

  ngAfterViewInit(): void {
    this.employeeService.getAll();
  }
}
