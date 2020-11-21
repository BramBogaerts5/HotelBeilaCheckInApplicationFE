import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

@Injectable()
export class GuestGuard implements CanActivate{

  constructor(private router:Router, private cookieService: CookieService){}

  canActivate(): boolean{
    let roleCode: string = this.cookieService.get('roleCode');
    if(roleCode != 'Guest'){
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }
}
