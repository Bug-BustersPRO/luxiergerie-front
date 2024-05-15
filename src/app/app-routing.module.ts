import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SectionPage } from './pages/section/section-page';
import {  HomePageComponent } from './pages/home/home-page.component';
import { CategoryPage } from './pages/category/category-page';
import { AccommodationPage } from './pages/accommodation-page/accommodation-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'sections', component: SectionPage },
  {path: 'sections/:id/categories', component: CategoryPage},
  {path: 'categories/:id/accommodations', component: AccommodationPage}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
