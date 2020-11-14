import {Injectable} from '@angular/core';

@Injectable()
export class StateManagerService{
  isLoggedIn: boolean = false;

  reset(){
    this.isLoggedIn = false;
  }
}
