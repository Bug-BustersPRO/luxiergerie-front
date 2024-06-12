import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SectionPage } from './pages/section/section-page';
import { LoginClientPageComponent } from "./pages/security/room/login-client.page/login-client.page.component";
import {CategoryPage} from "./pages/category/category-page";
import {HomePageComponent} from "./pages/home/home-page.component";
import { AdminHomeComponent } from './pages/admin/admin-home/admin-home.component';
import { AdminPurchasesComponent } from './pages/admin/admin-purchases/admin-purchases.component';
import { AdminAccomodationsComponent } from './pages/admin/admin-accomodations/admin-accomodations.component';
import { LoginEmployeeComponent } from './pages/login-employee/login-employee.component';
import { AdminPurchaseDetailComponent } from './pages/admin/admin-purchase-detail/admin-purchase-detail.component';

const routes: Routes = [
  { path: '', component: HomePageComponent, canActivate: ['authRoom'], canActivate: ['authRoom'] },
  { path: 'sections', component: SectionPage, canActivate: ['authRoom'], canActivate: ['authRoom'] },
  { path: 'login', component: LoginClientPageComponent, canActivate: ['authRoom'] },
  {  path: 'login/room', component: LoginClientPageComponent, canActivate: ['authRoom'] },
  { path: 'sections/:id/categories', component: CategoryPage, canActivate: ['authRoom'] , canActivate: ['authRoom'] },
  { path: 'admin', component: AdminHomeComponent, children: [
    { path: 'purchases', component: AdminPurchasesComponent},
    { path: 'accomodations', component:AdminAccomodationsComponent }
]}
  { path: 'login/employee', component: LoginEmployeeComponent, canActivate: ['authEmployee']}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
