import { Component } from '@angular/core';
import { AdminHomeComponent } from '../admin-home/admin-home.component';

@Component({
  selector: 'app-admin-accomodation-card',
  templateUrl: './admin-accomodation-card.component.html',
  styleUrls: ['./admin-accomodation-card.component.scss'],
  standalone: true,
  imports: [AdminHomeComponent]
})
export class AdminAccomodationCardComponent {

}
