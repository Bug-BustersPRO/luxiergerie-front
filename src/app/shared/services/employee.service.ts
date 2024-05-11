import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, WritableSignal, computed, inject, signal } from '@angular/core';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor() { }

  public http = inject(HttpClient);
  private url: string = "http://localhost:8090/api";
  private headers = new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('jwt-token')
  });
  public getAllEmployees$: WritableSignal<Employee[]> = signal([]);
  getAllEmployeesSig = computed(() => this.getAllEmployees$);
  public getEmployeeById!: Employee;

  // Employee API - call vers le backend

  public getAll(): void {
    this.http.get<Employee[]>(`${this.url}/employee`, { headers: this.headers })
      .subscribe({
        next: employees => this.getAllEmployees$.set(employees),
        error: error => console.log(error, "There was an error while fetching employees")
      });
  }

  public getRolesById(id: number): void {
    this.http.get<Employee>(`${this.url}/employee/${id}`, { headers: this.headers })
      .subscribe({
        next: employee => this.getEmployeeById = employee,
        error: error => console.log(error, "There was an error while fetching employee")
      });
  }
  public getById(id: number): void {
    this.http.get<Employee>(`${this.url}/employee/${id}`, { headers: this.headers })
      .subscribe({
        next: employee => this.getEmployeeById = employee,
        error: error => console.log(error, "There was an error while fetching employee")
      });
  }
}
