import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {StateManagerService} from '../../services/state-manager.service';
import {Title} from '@angular/platform-browser';
import {Login} from '../../models/login.model';
import {HttpResponse} from '@angular/common/http';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-welcome-screen',
  templateUrl: './welcome-screen.component.html',
  styleUrls: ['./welcome-screen.component.css']
})
export class WelcomeScreenComponent implements OnInit {
  guestCheckinForm: FormGroup;
  inputEmpty: boolean = false;
  inputWrong: boolean = false;
  showSpinner: boolean= false;

  constructor(private loginService: LoginService, private router: Router, private stateManagerService: StateManagerService, public titleService: Title) { }

  ngOnInit(): void {
    this.stateManagerService.isLoggedIn = false;
    this.titleService.setTitle('Hotel Beila - Check In');
    this.createForm();
  }

  createForm(){
    this.guestCheckinForm = new FormGroup({
      guestLastName: new FormControl(null, [Validators.required]),
      guestPassword: new FormControl(null, [Validators.required])
    });
  }

  guestCheckIn(){
    this.showSpinner = true;
    if(this.guestCheckinForm.get('guestLastName').value == '' || this.guestCheckinForm.get('guestPassword').value == ''){
      this.inputWrong = false;
      this.inputEmpty = true;
      this.showSpinner = false;
    }
    if(this.guestCheckinForm.valid){
      let login: Login = this.createLoginObject();
      this.loginService.login(login).subscribe(res =>
        this.login(res));
    } else{
      this.showSpinner = false;
    }
  }

  createLoginObject(): Login{
    let guestLastName: string = this.guestCheckinForm.get('guestLastName').value;
    let guestPassword: string = this.guestCheckinForm.get('guestPassword').value;

    return new Login(guestLastName, guestPassword);
  }

  login(res: HttpResponse<any>){
    if(res.toString().includes('401')){
      this.inputEmpty = false;
      this.inputWrong = true;
      this.showSpinner = false;
    } else {
      this.resetForm();
      this.fillStateManager(res);
      this.navigateToNextPage();
    }
  }

  fillStateManager(res){
    this.stateManagerService.isLoggedIn = true;
    this.stateManagerService.userId = res.body.userId;
    this.stateManagerService.userBookingName = res.body.userLastName;
    this.stateManagerService.token = res.body.token;
    this.stateManagerService.roleCode = res.body.roleCode;
  }

  navigateToNextPage(){
    this.showSpinner = false;
    this.router.navigateByUrl('/guest');
  }

  resetForm(){
    this.inputEmpty = false;
    this.inputWrong = false;
  }

}
