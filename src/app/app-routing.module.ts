import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SectionPage } from './pages/section/section-page';
import { CategoryPage } from './pages/category/category-page';
import { AccommodationPage } from './pages/accommodation-page/accommodation-page.component';
import { LoginClientPageComponent } from "./pages/security/room/login-client.page/login-client.page.component";
import { AdminHomeComponent } from './pages/admin/admin-home/admin-home.component';
import { AdminPurchasesComponent } from './pages/admin/admin-purchases/admin-purchases.component';
import { AdminAccomodationsComponent } from './pages/admin/admin-services/admin-services.component';
import { LoginEmployeeComponent } from './pages/login-employee/login-employee.component';
import { ConfigHotelComponent } from './pages/config-hotel/config-hotel.component';
import { AdminPurchaseDetailComponent } from './pages/admin/admin-purchase-detail/admin-purchase-detail.component';
import { CartComponent } from './shared/components/cart/cart.component';
import { AdminHotelComponent } from './pages/admin/admin-hotel/admin-hotel.component';
import { AdminEmployeeComponent } from './pages/admin/admin-employee/admin-employee.component';
import { AdminRoomComponent } from './pages/admin/admin-room/admin-room.component';

const routes: Routes = [
  { path: '', redirectTo: 'sections', pathMatch: 'full' },
  { path: 'sections', component: SectionPage, canActivate: ['authRoom'] },
  { path: 'sections/:id/categories', component: CategoryPage, canActivate: ['authRoom'] },
  { path: 'categories/:id/accommodations', component: AccommodationPage, canActivate: ['authRoom'] },
  { path: 'login/room', component: LoginClientPageComponent, canActivate: ['authRoom'] },
  {
    path: 'admin', component: AdminHomeComponent, canActivate: ['authEmployee', 'configHotel', 'roleGuard'],
    children: [
      { path: 'purchases', component: AdminPurchasesComponent },
      { path: 'purchases/:id', component: AdminPurchaseDetailComponent },
      { path: 'accomodations', component: AdminAccomodationsComponent },
      { path: 'employee', component: AdminEmployeeComponent, canActivate: ['roleGuardAdmin'] },
      { path: 'hotel', component: AdminHotelComponent, canActivate: ['roleGuardAdmin'] },
      { path: 'room', component: AdminRoomComponent, canActivate: ['roleGuard'] }
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