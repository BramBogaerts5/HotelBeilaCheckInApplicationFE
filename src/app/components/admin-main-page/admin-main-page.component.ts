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
  guestList: Guest[];

  constructor(private guestService: GuestService, private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Hotel Beila - Administrator');
  }

}
