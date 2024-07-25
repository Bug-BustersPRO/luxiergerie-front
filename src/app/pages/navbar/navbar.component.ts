import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { CartComponent } from 'src/app/shared/components/cart/cart.component';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { Client } from 'src/app/shared/models/client.model';
import { Hotel } from 'src/app/shared/models/hotel.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { HotelService } from 'src/app/shared/services/hotel.service';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ModalComponent, CartComponent, ButtonComponent, MatBadgeModule, MatButtonModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public hotel: Hotel = {} as Hotel;
  public hotelImageUrl!: string;
  public isModalOpen: boolean = false;
  public currentClient!: Client;
  public cartModalTitle: string = "Mon Panier";
  public notification: number = 0;

  constructor(
    private router: Router,
    private hotelService: HotelService,
    protected cartService: CartService,
    private authService: AuthService,
    private cdr:ChangeDetectorRef) {
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
    this.cartService.changeTitle.subscribe((newTitle: string) => {
      this.cartModalTitle = newTitle;
      this.cdr.detectChanges();
    });

    this.cartService.getCartItems().subscribe((items) => {
      this.notification = items.length;
      this.cdr.detectChanges();
    });
  }

  public openModal() {
    this.isModalOpen = true;
    this.cdr.detectChanges();
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  openCart(): void {
    this.isModalOpen = true;
    this.cartService.loadCart();
    this.cdr.detectChanges();
  }

  logout(): void {
    this.authService.logOut(false);
  }

}
