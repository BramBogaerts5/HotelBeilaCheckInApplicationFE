import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WelcomeScreenComponent } from './components/welcome-screen/welcome-screen.component';
import { GuestScreenComponent } from './components/guest-screen/guest-screen.component';
import { AdminScreenComponent } from './components/admin-screen/admin-screen.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './routing/app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginService} from './services/login.service';
import {StateManagerService} from './services/state-manager.service';
import {TokenInterceptorService} from './services/token-interceptor.service';
import { ServerErrorComponent } from './server-error/server-error.component';
import {GuestGuard} from './guards/guest.guard';
import { AdminMainPageComponent } from './components/admin-main-page/admin-main-page.component';
import {GuestService} from './services/guest.service';
import {AdminGuard} from './guards/admin.guard';
import { AddGuestComponent } from './components/add-guest/add-guest.component';
import { GuestDetailComponent } from './components/guest-detail/guest-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeScreenComponent,
    GuestScreenComponent,
    AdminScreenComponent,
    ServerErrorComponent,
    AdminMainPageComponent,
    AddGuestComponent,
    GuestDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
  ],
  providers: [
    LoginService,
    GuestService,
    StateManagerService,
    GuestGuard,
    AdminGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
