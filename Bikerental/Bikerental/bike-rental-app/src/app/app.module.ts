import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';
import { BikeComponent } from './components/bike/bike.component';
import { RentBikeComponent } from './components/bike/rent-bike/rent-bike.component';
import { EventComponent } from './components/event/event.component';
import { ListEventComponent } from './components/event/list-event/list-event.component';

// Auth Interceptor to add JWT token to requests
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { VelorentListComponent } from './components/bike/rent-bike/velorent-list/velorent-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    BikeComponent,
    RentBikeComponent,
    EventComponent,
    ListEventComponent,
    VelorentListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
