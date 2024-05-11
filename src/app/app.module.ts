import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SectionPage } from './pages/section/section-page';
import { CardComponent } from './shared/components/card/card.component';
import { CardsListComponent } from './shared/components/cards-list/cards-list.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { SectionListComponent } from './pages/section/section-list/section-list.component';
import { HomePageComponent } from './pages/home/home-page.component';
import { CarouselComponent } from './shared/components/carousel/carousel.component';

@NgModule({
  declarations: [
    AppComponent,
    SectionPage,
    CardComponent,
    CardsListComponent,
    HomePageComponent,
    CarouselComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    NavbarComponent,
    SectionListComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
