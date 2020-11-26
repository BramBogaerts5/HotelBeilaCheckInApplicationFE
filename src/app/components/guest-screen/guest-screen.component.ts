import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {GuestService} from '../../services/guest.service';
import {Title} from '@angular/platform-browser';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Guest} from '../../models/guest.model';
import {HttpResponse} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';

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
  paymentAmount: string = null;
  showSpinner: boolean = false;
  btnSendClicked: boolean = false;
  alreadyPaid: boolean = false;
  paidBtnClicked: boolean = false;

  constructor(private router: Router, private cookieService: CookieService, private guestService: GuestService, public titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Hotel Beila - Check In');
    this.guestService.getGuestById(+this.cookieService.get('guestId')).subscribe(res =>
      this.fillCredentials(res)
    );
    this.showSpinner = false;
    this.createForm();
  }

  fillCredentials(res){
    this.bookingName = this.cookieService.get('userBookingName');
    this.checkInDate = this.cookieService.get('checkInDate');
    this.cookieService.set('paymentAmount', res.paymentAmount);
    this.cookieService.set('payed', res.payed);
    this.paymentAmount = res.paymentAmount;
    if(this.paymentAmount == '0'){
      this.paymentAmount = 'this booking is already paid!';
      this.alreadyPaid = true;
    }
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
      this.guestService.putGuest(guest.userId, guest).subscribe(res =>
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
    let userId: number = +this.cookieService.get('guestId');
    let bookingName: string = this.cookieService.get('userBookingName');
    let paymentAmount : number = +this.cookieService.get('paymentAmount');
    let checkInDate : string = this.cookieService.get('checkInDate');
    let roleCode : string = this.cookieService.get('roleCode');
    let userFirstName: string = this.checkInForm.get('firstName').value;
    let userLastName: string = this.checkInForm.get('lastName').value;
    let checkInHour: string = this.checkInForm.get('checkInHour').value;
    let nationality: string = this.checkInForm.get('nationality').value;
    let cardNo: string = this.checkInForm.get('cardNo').value;
    let placeOfBirth: string = this.checkInForm.get('placeOfBirth').value;
    let birthDate: string = this.checkInForm.get('birthDate').value;
    let userEmailAddress: string = this.cookieService.get('userEmailAddress');
    let password: string = this.cookieService.get('password');
    let checkedIn: boolean = true;
    let roleId: number = +this.cookieService.get('roleId');
    let visible: boolean = JSON.parse(this.cookieService.get('visible'));
    let payed: boolean = JSON.parse(this.cookieService.get('payed'));

    return new Guest(userId,bookingName,userFirstName,userLastName,userEmailAddress,password,roleId, roleCode,
      null,checkInDate, checkInHour, paymentAmount,payed, checkedIn, birthDate, placeOfBirth, nationality, cardNo, visible);
  }


  payStay(){
    this.paidBtnClicked = true;
    if(!this.alreadyPaid){
      this.guestService.payThroughMollie(+this.cookieService.get('paymentAmount'), this.cookieService.get('userBookingName')).subscribe(res => {
        window.location.href = res.body.redirectUrl;
      });
    }
  }
}
