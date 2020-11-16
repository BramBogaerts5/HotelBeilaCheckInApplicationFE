import { Component, OnInit } from '@angular/core';
import {Guest} from '../../models/guest.model';
import {GuestService} from '../../services/guest.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-admin-main-page',
  templateUrl: './admin-main-page.component.html',
  styleUrls: ['./admin-main-page.component.css']
})
export class AdminMainPageComponent implements OnInit {
  showSpinner: boolean = false;
  addGuestBtnClicked: boolean = false;
  guestList: Guest[];

  constructor(private guestService: GuestService, private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Hotel Beila - Administrator');
    this.loadData();
  }

  loadData(){
    this.guestService.getAllGuests().subscribe(res => {
      this.guestList = res;
      this.guestList.sort((a,b)=>(a.checkInDate<b.checkInDate ? -1 : 1));
    });
  }

  addGuest(){
    if(this.addGuestBtnClicked){
      this.addGuestBtnClicked = false;
    } else {
      this.addGuestBtnClicked = true;
    }
  }

}
