import { Component } from '@angular/core';
import { ConfigHotelComponent } from '../../config-hotel/config-hotel.component';

@Component({
  selector: 'app-admin-hotel',
  standalone: true,
  imports: [ConfigHotelComponent],
  templateUrl: './admin-hotel.component.html',
  styleUrl: './admin-hotel.component.scss'
})
export class AdminHotelComponent {

}
