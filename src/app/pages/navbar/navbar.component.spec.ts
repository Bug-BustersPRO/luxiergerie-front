// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { NavbarComponent } from './navbar.component';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { ToastrModule } from 'ngx-toastr';
// import { Router } from '@angular/router';
// import { of } from 'rxjs';
// import { ChangeDetectorRef, EventEmitter } from '@angular/core';
// import { AuthService } from 'src/app/shared/services/auth.service';
// import { CartService } from 'src/app/shared/services/cart.service';
// import { HotelService } from 'src/app/shared/services/hotel.service';

// describe('NavbarComponent', () => {
//   let component: NavbarComponent;
//   let fixture: ComponentFixture<NavbarComponent>;
//   let router: Router;
//   let hotelService: jasmine.SpyObj<HotelService>;
//   let cartService: jasmine.SpyObj<CartService>;
//   let authService: jasmine.SpyObj<AuthService>;
//   let cdr: ChangeDetectorRef;

//   beforeEach(async () => {
//     const hotelServiceSpy = jasmine.createSpyObj('HotelService', ['getHotels', 'applyColors', 'hotelImageUrlUpdate$']);
//     const cartServiceSpy = jasmine.createSpyObj('CartService', ['changeTitle', 'loadCart']);
//     const authServiceSpy = jasmine.createSpyObj('AuthService', ['logOut']);

//     await TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule, ToastrModule.forRoot(), NavbarComponent],
//       declarations: [],
//       providers: [
//         { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },
//         { provide: HotelService, useValue: hotelServiceSpy },
//         { provide: CartService, useValue: cartServiceSpy },
//         { provide: AuthService, useValue: authServiceSpy },
//         { provide: ChangeDetectorRef, useValue: { detectChanges: jasmine.createSpy('detectChanges') } }
//       ]
//     })
//     .compileComponents();

//     hotelServiceSpy.hotelImageUrlUpdate$ = of('test-url');
//     hotelServiceSpy.getHotels.and.returnValue(of({}));
//     cartServiceSpy.changeTitle = new EventEmitter<string>();
//     cartServiceSpy.getCartItems.and.returnValue(of([]));

//     fixture = TestBed.createComponent(NavbarComponent);
//     component = fixture.componentInstance;
//     router = TestBed.inject(Router);
//     hotelService = TestBed.inject(HotelService) as jasmine.SpyObj<HotelService>;
//     cartService = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;
//     authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
//     cdr = TestBed.inject(ChangeDetectorRef);

//     hotelService.getHotels.and.returnValue(of({}));
//     cartService.changeTitle.emit('New Title');

//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should initialize currentClient and subscribe to changeTitle on ngOnInit', () => {
//     spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify({ name: 'Test Client' }));
//     component.ngOnInit();
//     expect(component.currentClient.lastName).toBe('Test Client');
//     expect(component.cartModalTitle).toBe('New Title');
//   });

//   it('should set isModalOpen to true when openModal is called', () => {
//     component.openModal();
//     expect(component.isModalOpen).toBeTrue();
//   });

//   it('should navigate to the correct route when navigateTo is called', () => {
//     const route = '/test-route';
//     component.navigateTo(route);
//     expect(router.navigate).toHaveBeenCalledWith([route]);
//   });

//   it('should set isModalOpen to true and call loadCart when openCart is called', () => {
//     component.openCart();
//     expect(component.isModalOpen).toBeTrue();
//     expect(cartService.loadCart).toHaveBeenCalled();
//   });

//   it('should call logOut on authService when logout is called', () => {
//     component.logout();
//     expect(authService.logOut).toHaveBeenCalledWith(false);
//   });
// });
