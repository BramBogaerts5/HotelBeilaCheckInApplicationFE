import {Injectable} from '@angular/core';

@Injectable()
export class StateManagerService{
  userId: number;
  userBookingName: string;
  paymentAmount : number;
  checkInDate: string;
  isLoggedIn: boolean = false;
  token: string;
  roleCode: string;
  roleId: number;
  userEmailAddress: string;
  password: string;
  visible: boolean;
  payed: boolean;

  reset(){
    this.userBookingName = null;
    this.checkInDate = null;
    this.userId = 0;
    this.isLoggedIn = false;
    this.token = null;
    this.roleCode = null;
    this.paymentAmount = 0;
    this.userEmailAddress = null;
    this.password = null;
    this.roleId = 0;
  }
}
