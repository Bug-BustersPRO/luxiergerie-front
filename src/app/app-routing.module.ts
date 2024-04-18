import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SectionPage } from './pages/section/section-page';
import {  HomePageComponent } from './pages/home/home-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'sections', component: SectionPage }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
