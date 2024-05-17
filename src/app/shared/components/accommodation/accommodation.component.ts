import { Component, Input } from '@angular/core';
import { Accommodation } from '../../models/accommodation.model';

@Component({
  selector: 'app-accommodation',
  templateUrl: './accommodation.component.html',
  styleUrls: ['./accommodation.component.scss']
})
export class AccommodationComponent {

  @Input() accommodation!: Accommodation;
}
