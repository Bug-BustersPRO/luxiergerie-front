import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SectionPage } from './pages/section/section-page';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'sections', component: SectionPage }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
