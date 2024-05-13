import { NgModule } from '@angular/core';
import {BrowserModule, HammerModule} from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreService } from './shared/services/core.service';
import { HttpClientModule } from '@angular/common/http';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { SectionPage } from './pages/section/section-page';
import { SectionFacade } from './domains/section-facade';
import { LoginClientPageComponent } from './pages/security/room/login-client.page/login-client.page.component';
import {AuthGuardService} from "./shared/services/Guard/auth-room.guard";
import {ReactiveFormsModule} from "@angular/forms";
import {LoginModalComponent} from "./shared/components/login-modal/login-modal.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import { CardComponent } from './shared/components/card/card.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { SectionListComponent } from './pages/section/section-list/section-list.component';
import { HomePageComponent } from './pages/home/home-page.component';
import { CarouselComponent } from './shared/components/carousel/carousel.component';
import { AccommodationCardComponent } from './shared/components/accommodation-card/accommodation-card.component';
import { ModalComponent } from './shared/components/modal/modal.component';
import { SectionComponent } from './shared/components/section/section.component';
import { CategoryPage } from './pages/category/category-page';
import { CategoryFacade } from './domains/category-facade';
import { CategoryComponent } from './shared/components/category/category.component';
import { LoginEmployeeComponent } from './pages/login-employee/login-employee.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginClientPageComponent,
    SectionPage,
    CardComponent,
    HomePageComponent,
    CarouselComponent,
    ModalComponent,
    HomePageComponent,
    CategoryPage,
    SectionComponent,
    CategoryComponent
    LoginEmployeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    HammerModule,
    LoginModalComponent,
    BrowserAnimationsModule,
    NavbarComponent,
    SectionListComponent,
    AccommodationCardComponent
  ],
  providers: [
    CoreService,
    SectionFacade,
    {
    provide: 'authRoom',
    useFactory: (service: AuthGuardService) => service.authRoom(),
    deps: [AuthGuardService]
    },
    CategoryFacade
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
