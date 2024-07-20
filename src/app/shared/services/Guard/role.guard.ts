import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard{

  constructor(private authService: AuthService, private router: Router) {}

  public roleGuard(): boolean {
    const userRole = this.authService.currentUserRole()[0];
    // Le signal disparait après avoir refresh la page.
    // Voir pour récupérer le role depuis localStorage
    if (!this.authService.isUserLoggedIn()) {
      if (userRole?.name === 'ROLE_ADMIN' || userRole?.name === 'ROLE_EMPLOYEE') {
        return true
      }
      this.router.navigate(['/admin']);
      return false;
    }
    else if (userRole?.name !== 'ROLE_ADMIN' && userRole?.name !== 'ROLE_EMPLOYEE') {
      this.router.navigate(['/sections']);
      return false;
    }
    return true;
  }

}