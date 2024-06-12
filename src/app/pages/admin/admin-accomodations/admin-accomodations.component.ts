import { Component } from '@angular/core';
import { AdminAccomodationCardComponent } from '../admin-accomodation-card/admin-accomodation-card.component';

@Component({
  selector: 'app-admin-accomodations',
  templateUrl: './admin-accomodations.component.html',
  styleUrls: ['./admin-accomodations.component.scss'],
  standalone: true,
  imports: [AdminAccomodationCardComponent]
})
export class AdminAccomodationsComponent {

}
