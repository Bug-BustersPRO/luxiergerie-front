import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SectionPage } from './pages/section/section-page';
import {  HomePageComponent } from './pages/home/home-page.component';
import { CategoryPage } from './pages/category/category-page';
import { AccommodationPage } from './pages/accommodation-page/accommodation-page.component';
import { LoginClientPageComponent } from "./pages/security/room/login-client.page/login-client.page.component";
import { LoginEmployeeComponent } from './pages/login-employee/login-employee.component';

const routes: Routes = [
  // { path: '', component: HomePageComponent },
  { path: '', component: SectionPage, canActivate: ['authRoom'] },
  { path: 'sections/:id/categories', component: CategoryPage, canActivate: ['authRoom'] },
  { path: 'categories/:id/accommodations', component: AccommodationPage, canActivate: ['authRoom'] },
  { path: '', component: HomePageComponent, canActivate: ['authRoom'] },
  { path: 'sections', component: SectionPage, canActivate: ['authRoom'] },
  { path: 'login/room', component: LoginClientPageComponent, canActivate: ['authRoom'] },
  { path: 'sections/:id/categories', component: CategoryPage, canActivate: ['authRoom'] },
  { path: 'login/employee', component: LoginEmployeeComponent, canActivate: ['authEmployee']}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
