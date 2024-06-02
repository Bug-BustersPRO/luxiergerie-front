import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SectionPage } from './pages/section/section-page';
import {  HomePageComponent } from './pages/home/home-page.component';
import { CategoryPage } from './pages/category/category-page';
import { AccommodationPage } from './pages/accommodation-page/accommodation-page.component';
import { LoginClientPageComponent } from "./pages/security/room/login-client.page/login-client.page.component";
import { LoginEmployeeComponent } from './pages/login-employee/login-employee.component';
import { ConfigHotelComponent } from './pages/config-hotel/config-hotel.component';


const routes: Routes = [
  { path: '', component: HomePageComponent, canActivate: ['authRoom']},
  { path: 'sections', component: SectionPage, canActivate: ['authRoom', 'configHotel'] },
  { path: 'sections/:id/categories', component: CategoryPage, canActivate: ['authRoom', 'configHotel'] },
  { path: 'categories/:id/accommodations', component: AccommodationPage, canActivate: ['authRoom', 'configHotel'] },
  { path: '', component: HomePageComponent, canActivate: ['authRoom', 'configHotel'] },
  { path: 'login/room', component: LoginClientPageComponent, canActivate: ['authRoom', 'configHotel'] },
  { path: 'sections/:id/categories', component: CategoryPage, canActivate: ['authRoom', 'configHotel'] },
  { path: 'login/employee', component: LoginEmployeeComponent, canActivate: ['authEmployee'] },
  { path: 'config-hotel', component: ConfigHotelComponent, canActivate: ['configHotel']}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
