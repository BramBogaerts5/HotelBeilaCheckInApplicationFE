import {RouterModule, Routes} from '@angular/router';
import {WelcomeScreenComponent} from '../components/welcome-screen/welcome-screen.component';
import {GuestScreenComponent} from '../components/guest-screen/guest-screen.component';
import {NgModule} from '@angular/core';

const routes: Routes = [
  {path: 'login', component: WelcomeScreenComponent},
  {path: 'guestScreen', component: GuestScreenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule{}
