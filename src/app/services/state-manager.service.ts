import {Injectable} from '@angular/core';

@Injectable()
export class StateManagerService{
  userId: number;
  userBookingName: string;
  isLoggedIn: boolean = false;
  token: string;

  reset(){
    this.userBookingName = null;
    this.userId = 0;
    this.isLoggedIn = false;
    this.token = null;
  }
}
