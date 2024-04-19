import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreService } from './shared/services/core.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SectionPage } from './pages/section/section-page';
import { SectionFacade } from './domains/section-facade';
import { CardComponent } from './shared/components/card/card.component';
import { CardsListComponent } from './shared/components/cards-list/cards-list.component';

@NgModule({
  declarations: [
    AppComponent,
    SectionPage,
    CardComponent,
    CardsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [CoreService, SectionFacade],
  bootstrap: [AppComponent]
})
export class AppModule { }
