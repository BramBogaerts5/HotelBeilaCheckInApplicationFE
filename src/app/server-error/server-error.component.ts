import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {StateManagerService} from '../services/state-manager.service';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.css']
})
export class ServerErrorComponent implements OnInit {

  constructor(private router: Router, private stateManagerService: StateManagerService) { }

  ngOnInit(): void {
  }

  proceedToLogin(){
    if(this.stateManagerService.isLoggedIn == true){
      console.log("ToDo: to main page");
    } else {
      this.router.navigateByUrl('/login');
    }
  }

}
