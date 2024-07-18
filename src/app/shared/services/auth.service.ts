import { HttpClient, HttpResponse } from '@angular/common/http';
import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, catchError, of, tap } from 'rxjs';
import { LoginClient } from '../models/loginClient.model';
import { LoginEmployee } from '../models/loginEmployee.model';
import { Employee } from '../models/employee.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url: string = "http://localhost:8090/api/auth";
  private employee$: WritableSignal<Employee> = signal({} as Employee);
  public employee = computed(() => this.employee$());
  constructor(private cookieService: CookieService, private http: HttpClient, private router: Router) { }

  // faire une vérification différente quand on est connecté via le serial number de l'employée, la solution est pour le moment uniquement via le client room
  clientLogin(loginClient: LoginClient): Observable<HttpResponse<any>> {
    return this.http.post('http://localhost:8090/api/auth/room/login', loginClient, {
      observe: 'response',
      withCredentials: true
    });
  }

  isUserLoggedIn() {
    const token = this.getToken();
    const headers = {
      'Authorization': token ? `Bearer ${token}` : '',
      'Token': token ? token : ''
    };
    return this.http.get('http://localhost:8090/api/auth/validate-token', {
      observe: 'response',
      headers: headers,
      responseType: 'text'
    }).pipe(
      catchError(error => {
        console.error('Error:', error);
        return of(new HttpResponse({ status: 500, statusText: 'Internal Server Error' }));
      })
    );
  }

  getToken(): string | null {
    return this.cookieService.get('jwt-token');
  }

  public login(loginEmployee: LoginEmployee): Observable<HttpResponse<any>> {
    return this.http.post(`${this.url}/login`, loginEmployee, {
      withCredentials: true,
      observe: 'response',
      responseType: 'json',
    }).pipe(tap((response: HttpResponse<any>) => {
      if (response.status === 200) this.employee$.set(response.body);
      localStorage.setItem('employee', JSON.stringify(response.body));
    }));
  }

  public logOut(): void {
    this.cookieService.delete('jwt-token');
    localStorage.removeItem('employee');
    this.http.get('http://localhost:8090/api/auth/logout', {
      withCredentials: true,
    })
    this.router.navigate(['/login/employee']);
  }

}