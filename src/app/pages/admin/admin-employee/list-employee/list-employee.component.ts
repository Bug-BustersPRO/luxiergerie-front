import { AfterViewInit, Component, effect } from '@angular/core';
import { Employee } from 'src/app/shared/models/employee.model';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-employee',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-employee.component.html',
  styleUrl: './list-employee.component.scss'
})
export class ListEmployeeComponent implements AfterViewInit{

  employees!: Employee[];

  constructor(private employeeService: EmployeeService) {
    this.employeeService.getAll();
    effect(() => {
      this.employees = this.employeeService.getAllEmployeesSig();
      console.log(this.employees);
   });


  
  
   
}
  ngAfterViewInit(): void {
    this.employeeService.getAll();
  }
}
