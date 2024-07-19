import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class roleGuard{

  constructor(private authService: AuthService, private router: Router) {}

  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): boolean {
  //   const userRole = ??
  //   if (!this.authService.isUserLoggedIn()) {
  //     this.router.navigate(['/login']);
  //     return false;
  //   } else if (next.data.roles && next.data.roles.indexOf(userRole) === -1) {
  //     this.router.navigate(['/unauthorized']);
  //     return false;
  //   }
  //   return true;
  // }
}
