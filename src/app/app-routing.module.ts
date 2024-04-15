import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SectionPage } from './pages/section/section-page';
import { LoginClientPageComponent } from "./pages/security/room/login-client.page/login-client.page.component";
import { AuthGuardService } from './shared/services/Guard/auth-room.guard';

const routes: Routes = [
  { path: '', component: AppComponent, canActivate: [AuthGuardService] },
  { path: 'sections', component: SectionPage, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginClientPageComponent, canActivate: [AuthGuardService] }
  {path: 'sections/:id/categories', component: CategoryPage},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuardService]
})
export class AppRoutingModule { }
