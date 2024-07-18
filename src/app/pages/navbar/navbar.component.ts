import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { CartComponent } from 'src/app/shared/components/cart/cart.component';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { Client } from 'src/app/shared/models/client.model';
import { Hotel } from 'src/app/shared/models/hotel.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { HotelService } from 'src/app/shared/services/hotel.service';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ModalComponent, CartComponent, ButtonComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public hotel: Hotel = {} as Hotel;
  public hotelImageUrl!: string;
  public isModalOpen: boolean = false;
  public currentClient!: Client;

  constructor(private router: Router, private hotelService: HotelService, private cartService: CartService, private authService: AuthService) {
    this.hotelService.getHotels().subscribe(() => {
      this.hotel = this.hotelService.hotel;
      if (this.hotel) {
        this.hotelService.applyColors(this.hotel?.colors);
        this.hotelService.hotelImageUrlUpdate$.subscribe((url) => {
          this.hotelImageUrl = url;
        });
      } else {
        this.hotelService.applyColors(["#FDFBF5"]);
      }
    });
  }

  ngOnInit(): void {
    this.currentClient = localStorage.getItem('client') ? JSON.parse(localStorage.getItem('client') as string) : {} as Client;
    console.log(this.currentClient);
  }

  public openModal() {
    this.isModalOpen = true;
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  openCart(): void {
    this.isModalOpen = true;
    this.cartService.loadCart();
  }

  logout(): void {
    this.authService.logOut(false);
  }

}