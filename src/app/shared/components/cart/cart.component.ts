import { Component } from '@angular/core';
import { CartFacade } from 'src/app/domains/cart-facade';
import { Accommodation } from '../../models/accommodation.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  items: Accommodation[] = [];

constructor(private cartFacade: CartFacade){}

ngOnInit() {
  console.log(this.items)
  this.cartFacade.loadCart;
  this.items = this.cartFacade.getItems();
}

}
