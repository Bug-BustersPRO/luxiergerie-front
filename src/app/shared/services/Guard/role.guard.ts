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

          const isEmployeeLoggedIn = JSON.parse(localStorage.getItem('employee')!);
          const isClientLoggedIn = JSON.parse(localStorage.getItem('client')!);
          const restrictedRoutes = ['/admin', '/config-hotel', '/login/employee'];
          const isRestrictedRoute = restrictedRoutes.some(route => state.url.includes(route)) || state.url.startsWith('/admin');

          if (isEmployeeLoggedIn) {
            return true;
          } else if (isClientLoggedIn && isRestrictedRoute) {
            this.router.navigate(['/sections']);
            return false;
          } else if (!isClientLoggedIn) {
            this.router.navigate(['/sections']);
            return false;
          }

          return true;
        })
      );
    };
  }

}