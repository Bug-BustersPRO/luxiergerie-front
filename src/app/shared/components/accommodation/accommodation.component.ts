import { Component, Input } from '@angular/core';
import { Accommodation } from '../../models/accommodation.model';
import { CartFacade } from 'src/app/domains/cart-facade';

@Component({
  selector: 'app-accommodation',
  templateUrl: './accommodation.component.html',
  styleUrls: ['./accommodation.component.scss']
})
export class AccommodationComponent {

  @Input() accommodation!: Accommodation;

  constructor(private cartFacade: CartFacade){}

  ngOnInit() {
    this.accommodation.quantity = 0;
  }

}
