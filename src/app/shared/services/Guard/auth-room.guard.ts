import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth.service';
import { map, Observable} from "rxjs";
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
          }
          return true
        })
      );
    }
  }

}
