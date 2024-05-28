import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateFn } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HotelService } from '../hotel.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigHotelGuard {

  constructor(private hotelService: HotelService, private router: Router) {}

  public configHotel(): CanActivateFn {
    return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => {
      return this.hotelService.hasHotel().pipe(
        map((hasHotel: boolean) => {
          if (hasHotel) {
            this.router.navigate(['/config-hotel']);
            return false;
          }
          return true;
        })
      );
    }
  }
}