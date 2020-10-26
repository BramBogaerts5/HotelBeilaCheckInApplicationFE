import {RouterModule, Routes} from '@angular/router';
import {WelcomeScreenComponent} from '../components/welcome-screen/welcome-screen.component';
import {GuestScreenComponent} from '../components/guest-screen/guest-screen.component';
import {NgModule} from '@angular/core';
import {ServerErrorComponent} from '../server-error/server-error.component';
import {GuestGuard} from '../guards/guest.guard';
import {AdminScreenComponent} from '../components/admin-screen/admin-screen.component';
import {AdminMainPageComponent} from '../components/admin-main-page/admin-main-page.component';
import {AdminGuard} from '../guards/admin.guard';

const routes: Routes = [
  {path: 'login', component: WelcomeScreenComponent},
  {path: 'guest', component: GuestScreenComponent},
  {path: 'admin', component: AdminScreenComponent},
  {path: 'adminMain', component: AdminMainPageComponent, canActivate: [AdminGuard]},
  {path: 'server-error', component: ServerErrorComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: '**', component: ServerErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule{}
