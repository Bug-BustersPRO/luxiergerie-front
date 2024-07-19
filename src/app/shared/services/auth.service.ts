import { HttpClient, HttpResponse } from '@angular/common/http';
import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, catchError, of, tap } from 'rxjs';
import { LoginClient } from '../models/loginClient.model';
import { LoginEmployee } from '../models/loginEmployee.model';
import { Employee } from '../models/employee.model';
import { Router } from '@angular/router';
import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url: string = 'http://localhost:8090/api/auth';
  public currentUserRole: string = '';
  private employee$: WritableSignal<Employee> = signal({} as Employee);
  public employee = computed(() => this.employee$());
  private client$: WritableSignal<Client> = signal({} as Client);
  public client = computed(() => this.client$());
  constructor(
    private cookieService: CookieService,
    private http: HttpClient,
    private router: Router
  ) {}

  // faire une vérification différente quand on est connecté via le serial number de l'employée, la solution est pour le moment uniquement via le client room
  public clientLogin(loginClient: LoginClient): Observable<HttpResponse<any>> {
    return this.http
      .post('http://localhost:8090/api/auth/room/login', loginClient, {
        observe: 'response',
        withCredentials: true,
      })
      .pipe(
        tap((response: HttpResponse<any>) => {
          if (response.status === 200) this.client$.set(response.body);
          localStorage.setItem('client', JSON.stringify(response.body));
        })
      );
  }

  isUserLoggedIn() {
    const token = this.getToken();
    const headers = {
      Authorization: token ? `Bearer ${token}` : '',
      Token: token ? token : '',
    };
    return this.http
      .get('http://localhost:8090/api/auth/validate-token', {
        observe: 'response',
        headers: headers,
        responseType: 'text',
      })
      .pipe(
        catchError((error) => {
          console.error('Error:', error);
          return of(
            new HttpResponse({
              status: 500,
              statusText: 'Internal Server Error',
            })
          );
        })
      );
  }

  getToken(): string | null {
    return this.cookieService.get('jwt-token');
  }

  public login(loginEmployee: LoginEmployee): Observable<HttpResponse<any>> {
    return this.http
      .post(`${this.url}/login`, loginEmployee, {
        withCredentials: true,
        observe: 'response',
        responseType: 'json',
      })
      .pipe(
        tap((response: HttpResponse<any>) => {
          if (response.status === 200) this.employee$.set(response.body);
          localStorage.setItem('employee', JSON.stringify(response.body));
        })
      );
  }

  public logOut(isEmployee: boolean): void {
    if (isEmployee === true) {
      localStorage.removeItem('employee');
      this.router.navigate(['/login/employee']);
    } else {
      localStorage.removeItem('client');
      this.router.navigate(['/login/room']);
    }
    this.cookieService.delete('jwt-token');
    this.http
      .get('http://localhost:8090/api/auth/logout', {
        withCredentials: true,
        observe: 'response',
        responseType: 'text',
      })
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.error('Error while logging out: ', error);
        },
      });
  }
}