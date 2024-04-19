import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreService } from './shared/services/core.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SectionPage } from './pages/section/section-page';
import { SectionFacade } from './domains/section-facade';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { SectionListComponent } from './pages/section/section-list/section-list.component';
import { HomePageComponent } from './pages/home/home-page.component';
import { CategoryPage } from './pages/category/category-page';
import { CategoryFacade } from './domains/category-facade';
@NgModule({
  declarations: [
    AppComponent,
    SectionPage,
    HomePageComponent,
    CategoryPage,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    NavbarComponent,
    SectionListComponent
  ],
  providers: [CoreService, SectionFacade, CategoryFacade],
  bootstrap: [AppComponent]
})
export class AppModule { }
