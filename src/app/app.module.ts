import * as Cookies from "js-cookie";
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfigService } from './config/config.service';
import { Config } from './config/config';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { JwtModule } from '@auth0/angular-jwt';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './panel/users/users.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FoodsComponent } from './panel/foods/foods.component';
import { DashboardComponent } from './panel/dashboard/dashboard.component';
import { PanelComponent } from './panel/panel.component';
import { AllergensComponent } from './panel/allergens/allergens.component';
import { CategoriesComponent } from './panel/categories/categories.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RestaurantsComponent } from './panel/restaurants/restaurants.component';

function tokenGetter() {
  return Cookies.get("token");
}

function config(configService: ConfigService) {
  return () => { return configService.load() }
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavBarComponent,
    PanelComponent,
    DashboardComponent,
    FoodsComponent,
    AllergensComponent,
    CategoriesComponent,
    UsersComponent,
    RestaurantsComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["localhost:8000"]
      }
    }),
  ],
  providers: [
    {
      provide: Config,
      deps: [HttpClient],
      useExisting: ConfigService
    },
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [ConfigService],
      useFactory: config
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
