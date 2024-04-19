import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { Employee } from "../shared/models/employee.model";
import { UserService } from "../shared/services/user.service";


@Injectable()

export class EmployeeFacade {

  constructor(private userService: UserService) { }

  private employees: Employee[] = [];

  // Création des méthodes liées aux employees depuis le CALL API du CoreService

  getAllEmployees(): Observable<Employee[]> {
    return this.userService.getEmployees().pipe(
      map((employees) => {
        this.employees = employees;
        return employees;
      })
    );
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.userService.getEmployeeById(id);
  }

}