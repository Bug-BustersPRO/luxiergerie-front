import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SectionPage } from './pages/section/section-page';
import {  HomePageComponent } from './pages/home/home-page.component';
import { CategoryPage } from './pages/category/category-page';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'sections', component: SectionPage },
  {path: 'categories', component: CategoryPage},
  {path: 'sections/:id/categories', component: CategoryPage},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
