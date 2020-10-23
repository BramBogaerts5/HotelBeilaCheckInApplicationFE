import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WelcomeScreenComponent } from './components/welcome-screen/welcome-screen.component';
import { GuestScreenComponent } from './components/guest-screen/guest-screen.component';
import { AdminScreenComponent } from './components/admin-screen/admin-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeScreenComponent,
    GuestScreenComponent,
    AdminScreenComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
