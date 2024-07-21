import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth.service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard {
  constructor(private authService: AuthService, private router: Router) { }

  public roleGuard(): CanActivateFn {
    return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => {
      return this.authService.isUserLoggedIn().pipe(
        map(() => {
          const employee = JSON.parse(localStorage.getItem('employee')!);
          const client = JSON.parse(localStorage.getItem('client')!);
          const restrictedRoutes = ['/admin', '/login/employee', '/config-hotel'];
          const isRestrictedRoute = restrictedRoutes.some(route => state.url.includes(route)) || state.url.startsWith('/admin/');

          if (employee) {
            return true;
          } else if (client && isRestrictedRoute) {
            this.router.navigate(['/sections']);
            return false;
          }
          return true;
        })
      );
    };
  }

}