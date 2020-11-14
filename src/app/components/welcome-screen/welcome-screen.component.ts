import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {StateManagerService} from '../../services/state-manager.service';
import {Title} from '@angular/platform-browser';
import {Login} from '../../models/login.model';
import {HttpResponse} from '@angular/common/http';
import {LoginService} from '../../services/login.service';
import {CookieService} from 'ngx-cookie-service';

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

  constructor(private cookieService: CookieService, private loginService: LoginService, private router: Router, private stateManagerService: StateManagerService, public titleService: Title) { }

  ngOnInit(): void {
    this.stateManagerService.isLoggedIn = false;
    this.titleService.setTitle('Hotel Beila - Welcome');
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
    if(res.toString().includes('401') || res.body.roleCode == 'Admin'){
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
    this.cookieService.set('guestId', res.body.userId);
    this.cookieService.set('userBookingName', res.body.bookingName);
    this.cookieService.set('guestToken', res.body.token);
    this.cookieService.set('roleCode', res.body.roleCode);
    this.cookieService.set('checkInDate', res.body.checkInDate);
    this.cookieService.set('paymentAmount', res.body.paymentAmount);
    this.cookieService.set('userEmailAddress', res.body.userEmailAddress);
    this.cookieService.set('password', res.body.password);
    this.cookieService.set('roleId', res.body.roleId);
    this.cookieService.set('visible', res.body.visible);
    this.cookieService.set('payed', res.body.payed);
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
