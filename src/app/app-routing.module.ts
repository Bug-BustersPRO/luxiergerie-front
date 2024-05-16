import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SectionPage } from './pages/section/section-page';
import { LoginClientPageComponent } from "./pages/security/room/login-client.page/login-client.page.component";
import {CategoryPage} from "./pages/category/category-page";
import {HomePageComponent} from "./pages/home/home-page.component";
import { AdminHomeComponent } from './pages/admin/admin-home/admin-home.component';
import { AdminPurchasesComponent } from './pages/admin/admin-purchases/admin-purchases.component';
import { AdminAccomodationsComponent } from './pages/admin/admin-accomodations/admin-accomodations.component';

const routes: Routes = [
  { path: '', component: HomePageComponent, canActivate: ['authRoom'] },
  { path: 'sections', component: SectionPage, canActivate: ['authRoom'] },
  { path: 'login', component: LoginClientPageComponent, canActivate: ['authRoom'] },
  { path: 'sections/:id/categories', component: CategoryPage, canActivate: ['authRoom'] },
  { path: 'admin', component: AdminHomeComponent, children: [
    { path: 'purchases', component: AdminPurchasesComponent},
    { path: 'accomodations', component:AdminAccomodationsComponent }
]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
