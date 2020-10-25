import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {Guest} from '../models/guest.model';
import {environment} from '../../environments/environment';
import {catchError} from 'rxjs/internal/operators';

@Injectable()
export class GuestService{
  constructor(private http: HttpClient, private router: Router){}

  getAllGuests(): Observable<Guest[]>{
    return this.http.get<Guest[]>(`${environment.baseApiUrl}guest`).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  getGuestById(userId: number): any{
    return this.http.get<Guest>(`${environment.baseApiUrl}guest/${userId}`).pipe(
      catchError(err => this.handleError(err))
    );
  }

  getGuestByName(userLastName: string):any{
    return this.http.get<Guest>(`${environment.baseApiUrl}guest/${userLastName}/getByName`).pipe(
      catchError(err => this.handleError(err))
    );
  }

  putGuest(userId: number, updatedGuest: Guest): Observable<any>{
    return this.http.put<Guest>(`${environment.baseApiUrl}guest/${userId}`,updatedGuest,{observe: 'response'}).pipe(
      catchError(err => this.handleError(err))
    );
  }

  changeVisibility(userId: number): Observable<any>{
    return this.http.post<Guest>(`${environment.baseApiUrl}guest/${userId}/visible`, userId,{observe:'response'}).pipe(
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
