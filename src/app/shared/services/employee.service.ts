import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, WritableSignal, computed, signal } from '@angular/core';
import { Employee } from '../models/employee.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }
  private url: string = "http://localhost:8090/api";
  private getHeaders(): HttpHeaders {
    const token = this.cookieService.get('jwt-token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
  public getAllEmployees$: WritableSignal<Employee[]> = signal([]);
  getAllEmployeesSig = computed(() => this.getAllEmployees$);
  public employeeById!: Employee;

  // Employee API - call vers le backend

  public getAll(): void {
    this.http.get<Employee[]>(`${this.url}/employee`, { headers: this.getHeaders() })
      .subscribe({
        next: employees => this.getAllEmployees$.set(employees),
        error: error => console.log(error, "There was an error while fetching employees")
      });
  }

  public getRolesByEmployeeId(id: number): void {
    this.http.get<Employee>(`${this.url}/employee/${id}`, { headers: this.getHeaders() })
      .subscribe({
        next: employee => this.employeeById = employee,
        error: error => console.log(error, "There was an error while fetching employee")
      });
  }
  public getEmployeeById(id: number): void {
    this.http.get<Employee>(`${this.url}/employee/${id}`, { headers: this.getHeaders() })
      .subscribe({
        next: employee => this.employeeById = employee,
        error: error => console.log(error, "There was an error while fetching employee")
      });
  }
}
