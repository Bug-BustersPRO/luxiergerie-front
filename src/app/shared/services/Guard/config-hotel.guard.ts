import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateFn } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HotelService } from '../hotel.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigHotelGuard {

  constructor(private hotelService: HotelService, private router: Router) { }

  public configHotel(): CanActivateFn {
    return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> => {
      return this.hotelService.getHotel().pipe(
        map((hotels: any[]) => {
          if (hotels.length === 0 && !state.url.includes('/config-hotel')) {
            this.router.navigate(['/config-hotel']);
            return false;
          } else if (hotels.length > 0) {
            if (state.url.includes('/config-hotel')) {
              this.router.navigate(['/admin']);
              return false;
            }
          }
          return true;
        })
      );
    }
  }

}