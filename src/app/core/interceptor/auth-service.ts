import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { jwtDecode } from "jwt-decode";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
  })
  export class AuthService {
    constructor(private http: HttpClient, private cookieService: CookieService) {}
    logout() {
      this.cookieService.delete('jwt-token');
    }
  
    isLoggedIn() {
      return this.cookieService.check('jwt-token');
    }
  
    getUserToken(): string | null {
      const token = this.cookieService.get('jwt-token');
      const payload: any = jwtDecode(token);
      return payload?.userId;
    }
  
    getUserConnected(): Observable<string> {
      const userId = this.getUserToken();
      const userConnectedUrl = `environment.apiUrl + /users/${userId}`;
      return this.http.get<string>(userConnectedUrl);
    }
  }