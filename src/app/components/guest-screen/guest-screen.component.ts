import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {GuestService} from '../../services/guest.service';
import {StateManagerService} from '../../services/state-manager.service';
import {Title} from '@angular/platform-browser';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Guest} from '../../models/guest.model';
import {HttpResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Mollie} from 'mollie-api';

@Component({
  selector: 'app-guest-screen',
  templateUrl: './guest-screen.component.html',
  styleUrls: ['./guest-screen.component.css']
})
export class GuestScreenComponent implements OnInit {
  checkInForm: FormGroup;
  inputWrong: boolean = false;
  inputEmpty: boolean = false;
  inputSent: boolean = false;
  bookingName: string = 'Unknown';
  checkInDate: string = 'Unknown';
  paymentAmount: number = null;
  showSpinner: boolean = false;
  btnSendClicked: boolean = false;

  constructor(private router: Router, private guestService: GuestService, private stateManagerService: StateManagerService, public titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Hotel Beila - Check In');
    this.bookingName = this.stateManagerService.userBookingName;
    this.checkInDate = this.stateManagerService.checkInDate;
    this.paymentAmount = this.stateManagerService.paymentAmount;
    this.showSpinner = false;
    this.createForm();
  }

  createForm(){
    this.checkInForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
      lastName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(150)]),
      birthDate: new FormControl(null, [Validators.required]),
      placeOfBirth: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
      nationality: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
      cardNo: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      checkInHour: new FormControl(null, [Validators.required])
    });
  }

  checkIn(){
    this.showSpinner = true;
    this.btnSendClicked = true;
    this.inputSent = false;
    if(this.checkInForm.get('firstName').value == '' ||
        this.checkInForm.get('lastName').value == '' ||
        this.checkInForm.get('birthDate').value == null ||
        this.checkInForm.get('placeOfBirth').value == '' ||
        this.checkInForm.get('nationality').value == '' ||
        this.checkInForm.get('cardNo').value == '' ||
        this.checkInForm.get('checkInHour').value == null){
      this.inputWrong = false;
      this.inputEmpty = true;
      this.showSpinner = false;
    }
    if(this.checkInForm.valid){
      let guest: Guest = this.createGuestObject();
      this.guestService.putGuest(this.stateManagerService.userId, guest).subscribe(res =>
        this.sendGuestInformation(res));
    } else{
      this.showSpinner = false;
    }
  }

  sendGuestInformation(res: HttpResponse<any>){
    if(res.toString().includes('401')){
      this.inputEmpty = false;
      this.inputWrong = true;
      this.showSpinner = false;
      this.btnSendClicked = false;
    } else {
       this.checkInForm.reset();
       this.inputWrong = false;
       this.inputEmpty = false;
       this.showSpinner = false;
       this.inputSent = true;
    }
  }

  createGuestObject(): Guest{
    let userId: number = this.stateManagerService.userId;
    let bookingName: string = this.stateManagerService.userBookingName;
    let paymentAmount : number = this.stateManagerService.paymentAmount;
    let checkInDate : string = this.stateManagerService.checkInDate;
    let roleCode : string = this.stateManagerService.roleCode;
    let userFirstName: string = this.checkInForm.get('firstName').value;
    let userLastName: string = this.checkInForm.get('lastName').value;
    let checkInHour: string = this.checkInForm.get('checkInHour').value;
    let nationality: string = this.checkInForm.get('nationality').value;
    let cardNo: string = this.checkInForm.get('cardNo').value;
    let placeOfBirth: string = this.checkInForm.get('placeOfBirth').value;
    let birthDate: string = this.checkInForm.get('birthDate').value;
    let userEmailAddress: string =  this.stateManagerService.userEmailAddress;
    let password: string = this.stateManagerService.password;
    let checkedIn: boolean = true;
    let roleId: number = this.stateManagerService.roleId;
    let visible: boolean = this.stateManagerService.visible;
    let payed: boolean = this.stateManagerService.payed;

    return new Guest(userId,bookingName,userFirstName,userLastName,userEmailAddress,password,roleId, roleCode,
      null,checkInDate, checkInHour, paymentAmount,payed, checkedIn, birthDate, placeOfBirth, nationality, cardNo, visible);
  }

  payStay(){
    const mollie: Mollie = new Mollie({
      apiKey: 'test_5gymzRPzqQrkRkUtfHj9B4a4thvj5H',
    });
    mollie.payments.create({
      amount: this.stateManagerService.paymentAmount,
      description: 'Payment for your stay in Hotel Beila',
      redirectUrl: environment.baseApiUrl,
      webhookUrl: environment.baseApiUrl,
    });
  }
}
