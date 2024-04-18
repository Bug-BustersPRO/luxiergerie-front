import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SectionPage } from './pages/section/section-page';
import { LoginClientPageComponent } from "./pages/security/room/login-client.page/login-client.page.component";

const routes: Routes = [
  { path: '', component: AppComponent, canActivate: ['authRoom'] },
  { path: 'sections', component: SectionPage, canActivate: ['authRoom'] },
  { path: 'login', component: LoginClientPageComponent, canActivate: ['authRoom'] }
  { path: 'sections/:id/categories', component: CategoryPage, canActivate: ['authRoom'] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
