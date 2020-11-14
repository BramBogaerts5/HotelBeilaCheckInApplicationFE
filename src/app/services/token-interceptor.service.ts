import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {StateManagerService} from './state-manager.service';
import {Observable} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private stateManagerService: StateManagerService, private cookieService: CookieService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.cookieService.get('guestToken')}`
        }
      });
    return next.handle(request);
  }
}
