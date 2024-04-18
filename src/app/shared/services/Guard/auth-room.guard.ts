import {Injectable} from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  constructor(private authService: AuthService, private router: Router) {}

  public authRoom(): CanActivateFn {
    return (route, state) => {
      const isLoggedIn = this.authService.isUserLoggedIn();
      const isLoginPage = state.url.includes('/login');

      if (isLoggedIn && isLoginPage) {
        this.router.navigate(['/']);
        return false;
      } else if (!isLoggedIn && !isLoginPage) {
        this.router.navigate(['/login']);
        return false;
      }
      return true;
    };
  }

}
