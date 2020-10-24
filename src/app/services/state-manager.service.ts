import {Injectable} from '@angular/core';

@Injectable()
export class StateManagerService{
  userId: number;
  userBookingName: string;
  isLoggedIn: boolean = false;
  token: string;
  roleCode: string;

  reset(){
    this.userBookingName = null;
    this.userId = 0;
    this.isLoggedIn = false;
    this.token = null;
    this.roleCode = null;
  }
}
