import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SectionPageComponent } from './pages/section/section-page';
import { HomePageComponent } from './pages/home/home-page.component';
import { CategoryPageComponent } from './pages/category/category-page';
import { AccommodationPageComponent } from './pages/accommodation-page/accommodation-page.component';
import { LoginClientPageComponent } from './pages/security/login-client.page/login-client.page.component';
import { AdminHomeComponent } from './pages/admin/admin-home/admin-home.component';
import { AdminPurchasesComponent } from './pages/admin/admin-purchases/admin-purchases.component';
import { AdminAccomodationsComponent } from './pages/admin/admin-services/admin-services.component';
import { ConfigHotelComponent } from './pages/config-hotel/config-hotel.component';
import { CartComponent } from './shared/components/cart/cart.component';
import { AdminHotelComponent } from './pages/admin/admin-hotel/admin-hotel.component';
import { AdminEmployeeComponent } from './pages/admin/admin-employee/admin-employee.component';
import { AdminSojournComponent } from './pages/admin/admin-sojourn/admin-sojourn.component';
import { AdminRoomComponent } from './pages/admin/admin-room/admin-room.component';
import { AdminClientComponent } from './pages/admin/admin-client/admin-client.component';
import { AdminPurchaseDetailComponent } from './pages/admin/admin-purchases/admin-purchase-detail/admin-purchase-detail.component';
import { LoginEmployeeComponent } from './pages/security/login-employee/login-employee.component';

const routes: Routes = [
  { path: '', redirectTo: 'sections', pathMatch: 'full' },
  { path: 'sections', component: SectionPageComponent, canActivate: ['authRoom'] },
  { path: 'sections/:id/categories', component: CategoryPageComponent, canActivate: ['authRoom'] },
  { path: 'categories/:id/accommodations', component: AccommodationPageComponent, canActivate: ['authRoom'] },
  { path: 'login/room', component: LoginClientPageComponent, canActivate: ['authRoom'] },
  {
    path: 'admin', component: AdminHomeComponent, canActivate: ['authEmployee', 'configHotel', 'roleGuard'],
    children: [
      { path: 'purchases', component: AdminPurchasesComponent },
      { path: 'purchases/:id', component: AdminPurchaseDetailComponent },
      { path: 'accomodations', component: AdminAccomodationsComponent },
      { path: 'employee', component: AdminEmployeeComponent, canActivate: ['roleGuardAdmin'] },
      { path: 'hotel', component: AdminHotelComponent, canActivate: ['roleGuardAdmin'] },
      { path: 'sojourn', component: AdminSojournComponent, canActivate: ['roleGuard'] },
      { path: 'room', component: AdminRoomComponent, canActivate: ['roleGuard'] },
      { path: 'client', component: AdminClientComponent, canActivate: ['roleGuard'] }
    ]
  },
  { path: 'login/employee', component: LoginEmployeeComponent, canActivate: ['authEmployee'] },
  { path: 'config-hotel', component: ConfigHotelComponent, canActivate: ['authEmployee', 'configHotel', 'roleGuard', 'roleGuardAdmin'] },
  { path: 'cart', component: CartComponent, canActivate: ['authRoom'] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
