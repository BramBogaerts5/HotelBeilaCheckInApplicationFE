import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {Login} from '../models/login.model';
import {environment} from 'src/environments/environment';
import {catchError} from 'rxjs/internal/operators';
import {of} from 'rxjs';

@Injectable()
export class GuestService{
  constructor(private http: HttpClient, private router: Router){}

  login(login: Login): any{
    return this.http.post<Login>(`${environment.baseApiUrl}login`, login,{observe:'response'}).pipe(
      catchError(err => this.handleError(err))
    );
  }

  handleError(err: HttpErrorResponse) {
    if (err.status == 401) {
      return of(err.message);
    } else {
      if (err.status == 409) {
        return of(err.message);
      } else {
        this.router.navigateByUrl('/server-error');
      }
    }
  }
}
