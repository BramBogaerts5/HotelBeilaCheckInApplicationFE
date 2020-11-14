import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {StateManagerService} from '../services/state-manager.service';
import {CookieService} from 'ngx-cookie-service';

@Injectable()
export class AdminGuard implements CanActivate{

  constructor(private router:Router, private stateManagerService: StateManagerService, private cookieService: CookieService){}

  canActivate(): boolean{
    let roleCode: string = this.cookieService.get('roleCode');
    if(!this.stateManagerService.isLoggedIn || roleCode != 'Admin'){
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }
}
