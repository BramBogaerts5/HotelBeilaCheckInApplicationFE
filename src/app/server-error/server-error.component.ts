import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {StateManagerService} from '../services/state-manager.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.css']
})
export class ServerErrorComponent implements OnInit {

  constructor(private router: Router, private stateManagerService: StateManagerService, private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Hotel Beila - Error');
  }

  proceedToLogin(){
    if(this.stateManagerService.isLoggedIn == true){
      this.router.navigateByUrl('/guest');
    } else {
      this.router.navigateByUrl('/login');
    }
  }

}
