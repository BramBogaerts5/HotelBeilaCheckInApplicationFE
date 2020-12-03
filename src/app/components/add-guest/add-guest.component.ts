import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {GuestService} from '../../services/guest.service';
import {Guest} from '../../models/guest.model';
import {HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-add-guest',
  templateUrl: './add-guest.component.html',
  styleUrls: ['./add-guest.component.css']
})
export class AddGuestComponent implements OnInit {
  addGuestForm: FormGroup;
  inputEmpty: boolean = false;
  showSpinner: boolean = false;
  btnSendClicked: boolean = false;

  constructor(private guestService: GuestService) { }

  ngOnInit(): void {
    this.createForm();
    this.showSpinner = false;
  }

  createForm(){
    this.addGuestForm = new FormGroup({
      bookingName: new FormControl(null,[Validators.required]),
      checkInDate: new FormControl(null, [Validators.required]),
      bookingPrice: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      payed: new FormControl(null)
    });
  }

  addGuest(){
    this.showSpinner = true;
    this.btnSendClicked = true;
    if(this.addGuestForm.get('bookingName').value == '' ||
        this.addGuestForm.get('checkInDate').value == null ||
        this.addGuestForm.get('bookingPrice').value == null ||
        this.addGuestForm.get('email').value == ''){
      this.inputEmpty = true;
      this.showSpinner = false;
    }
    if(this.addGuestForm.valid){
      let guest: Guest = this.createGuestObject();
      this.guestService.postGuest(guest).subscribe(res =>
      this.sendGuestInformation(res));
    }
  }

  createGuestObject(): Guest{
    let bookingName: string = this.addGuestForm.get('bookingName').value;
    let checkInDate: string = this.addGuestForm.get('checkInDate').value;
    let bookingPrice: number = this.addGuestForm.get('bookingPrice').value;
    let email: string = this.addGuestForm.get('email').value;
    let payed: boolean = false;
    if(payed == null){
      payed = this.addGuestForm.get('payed').value;
    }

    return new Guest(null,bookingName,null,null,email,null,2,'Guest',null, checkInDate, null, bookingPrice,payed,false,null,null,null,null, true, null);
  }

  sendGuestInformation(res: HttpResponse<any>){
    if(res.toString().includes('401')){
      this.inputEmpty = false;
      this.showSpinner = false;
      this.btnSendClicked = false;
    } else {
      this.addGuestForm.reset();
      this.inputEmpty = false;
      this.showSpinner = false;
      window.location.reload();
    }
  }

}
