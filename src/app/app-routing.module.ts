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
  { path: '', component: HomePageComponent, canActivate: ['authRoom', 'authEmployee']},
  { path: 'sections', component: SectionPage, canActivate: ['authRoom', 'authEmployee'] },
  { path: 'sections/:id/categories', component: CategoryPage, canActivate: ['authRoom', 'authEmployee'] },
  { path: 'categories/:id/accommodations', component: AccommodationPage, canActivate: ['authRoom','authEmployee'] },
  { path: 'login/room', component: LoginClientPageComponent },
  { path: 'sections/:id/categories', component: CategoryPage, canActivate: ['authRoom','authEmployee'] },
  { path: 'login/employee', component: LoginEmployeeComponent },
  { path: 'config-hotel', component: ConfigHotelComponent, canActivate: ['authEmployee', 'configHotel']}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
