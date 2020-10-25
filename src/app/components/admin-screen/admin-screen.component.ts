import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../../services/login.service';
import {Router} from '@angular/router';
import {StateManagerService} from '../../services/state-manager.service';
import {Title} from '@angular/platform-browser';
import {Login} from '../../models/login.model';
import {HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-admin-screen',
  templateUrl: './admin-screen.component.html',
  styleUrls: ['./admin-screen.component.css']
})
export class AdminScreenComponent implements OnInit {
  adminLoginForm: FormGroup;
  inputEmpty: boolean = false;
  inputWrong: boolean = false;
  showSpinner: boolean = false;

  constructor(private loginService: LoginService, private router: Router, private stateManagerService: StateManagerService, public titleService: Title) { }

  ngOnInit(): void {
    this.stateManagerService.isLoggedIn = false;
    this.titleService.setTitle('Hotel Beila - Admin Log In');
    this.createForm();
  }

  createForm(){
    this.adminLoginForm = new FormGroup({
      adminLastName: new FormControl(null, [Validators.required]),
      adminPassword: new FormControl(null, [Validators.required])
    });
  }

  adminLogIn(){
    this.showSpinner = true;
    if(this.adminLoginForm.get('adminLastName').value == '' || this.adminLoginForm.get('adminPassword').value == ''){
      this.inputEmpty = true;
      this.inputWrong = false;
      this.showSpinner = false;
    }
    if(this.adminLoginForm.valid){
      let login: Login = this.createLoginObject();
      this.loginService.login(login).subscribe(res =>
        this.login(res));
    }else{
      this.showSpinner = false;
    }
  }

  createLoginObject(): Login{
    let adminLastName: string = this.adminLoginForm.get('adminLastName').value;
    let adminPassword: string = this.adminLoginForm.get('adminPassword').value;

    return new Login(adminLastName, adminPassword);
  }

  login(res: HttpResponse<any>){
    if(res.toString().includes('401') || res.body.roleCode == 'Guest'){
      this.inputEmpty = false;
      this.inputWrong = true;
      this.showSpinner = false;
    } else{
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
    this.router.navigateByUrl('/adminMain');
  }

  resetForm(){
    this.inputEmpty = false;
    this.inputWrong = false;
  }

}
