import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth.service';
import { map, Observable } from "rxjs";
import { HttpResponse, HttpStatusCode } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  private status: any
  constructor(private authService: AuthService, private router: Router) {
  }

  public authRoom(): CanActivateFn {
    return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => {
      return this.authService.isUserLoggedIn().pipe(
        map((response: HttpResponse<any>) => {
          const status = response.status
          const isLoginPage = state.url.includes('/login/room')
          if (status !== HttpStatusCode.Ok && !isLoginPage) {
            this.router.navigate(['/login/room'])
            return false
          } else if (status === HttpStatusCode.Ok && isLoginPage) {
            this.router.navigate(['/sections'])
            return false
          }
          return true
        })
      );
    }
  }

  public authEmployee(): CanActivateFn {
    return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => {
      return this.authService.isUserLoggedIn().pipe(
        map((response: HttpResponse<any>) => {
          const status = response.status;
          const isLoginEmployeePage = state.url.includes('/login/employee');
          if (status !== HttpStatusCode.Ok && !isLoginEmployeePage) {
            this.router.navigate(['/login/employee'])
            return false
          } else if (status === HttpStatusCode.Ok && isLoginEmployeePage) {
            this.router.navigate(['/admin'])
            return false
          }
          return true
        })
      );
    }
  }

}