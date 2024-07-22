import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, WritableSignal, computed, signal } from '@angular/core';
import { Role } from '../models/role.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }
  private url: string = "http://localhost:8090/api";
  private getHeaders(): HttpHeaders {
    const token = this.cookieService.get('jwt-token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
  private getAllRoles$: WritableSignal<Role[]> = signal([]);
  getAllRolesSig = computed(() => this.getAllRoles$());
  public getRoleById!: Role;

  // Roles API - call vers le backend

  public getRoles(): void {
    this.http.get<Role[]>(`${this.url}/role`, { headers: this.getHeaders() })
      .subscribe({ 
        next: roles => this.getAllRoles$.set(roles),
        error: (error: HttpErrorResponse) => console.log(error, "There was an error while fetching roles")
      }
      );
  }

  public getById(id: number): void {
    this.http.get<Role>(`${this.url}/role/${id}`, { headers: this.getHeaders() })
      .subscribe({
        next: role => this.getRoleById = role,
        error: (error: HttpErrorResponse) => console.log(error, "There was an error while fetching role")
      });
  }

  public addNewRole(role: Role): void {
    this.http.post(`${this.url}/role`, role, { headers: this.getHeaders() })
      .subscribe({
        next: () => console.log("Role created successfully"),
        error: (error: HttpErrorResponse) => console.log(error, "There was an error while creating role")
      });
  }

  public updateRole(role: Role): void {
    this.http.put(`${this.url}/role/${role.id}`, role, { headers: this.getHeaders() })
      .subscribe({
        next: () => console.log("Role updated successfully"),
        error: (error: HttpErrorResponse) => console.log(error, "There was an error while updating role with id: " + role.id)
      });
  }

  public deleteRole(id: number): void {
    this.http.delete(`${this.url}/role/${id}`, { headers: this.getHeaders() })
      .subscribe({
        next: () => console.log("Role deleted successfully"),
        error: (error: HttpErrorResponse) => console.log(error, "There was an error while deleting role with id: " + id)
      });
  }
}
