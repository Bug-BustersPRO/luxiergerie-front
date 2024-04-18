import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { LoginClient } from "../models/loginClient.model";
import { Observable } from "rxjs";
import { HttpClient, HttpResponse } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private cookieService: CookieService, private http: HttpClient) {}

  // faire une vérification différente quand on est connecté via le serial number de l'employée, la solution est pour le moment uniquement via le client room
  clientLogin(loginClient: LoginClient): Observable<HttpResponse<any>> {
    return this.http.post('http://localhost:8090/api/auth/room/login', loginClient, {
      observe: 'response',
      withCredentials: true
    });
  }

  isUserLoggedIn(): boolean {
    return this.cookieService.check('client-JWT-token');
  }

  getToken(): string | null {
    return this.cookieService.get('client-JWT-token');
  }

  logout(): void {
    this.cookieService.delete('client-JWT-token');
  }
}
