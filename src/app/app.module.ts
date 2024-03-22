import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SectionFacade } from './3-domains/section-facade';
import { SectionHttpService } from './2-services/section-http-service/section-http-service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [SectionFacade, SectionHttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
