import { Component } from '@angular/core';
import { CartFacade } from 'src/app/domains/cart-facade';
import { Accommodation } from '../../models/accommodation.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

constructor(public cartFacade: CartFacade){}


}
