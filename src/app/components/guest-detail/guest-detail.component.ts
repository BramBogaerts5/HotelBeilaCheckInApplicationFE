import {Component, Input, OnInit} from '@angular/core';
import {Guest} from '../../models/guest.model';
import {GuestService} from '../../services/guest.service';

@Component({
  selector: 'app-guest-detail',
  templateUrl: './guest-detail.component.html',
  styleUrls: ['./guest-detail.component.css']
})
export class GuestDetailComponent implements OnInit {
  showSpinner: boolean = false;
  @Input() guest: Guest;

  constructor(private guestService: GuestService) { }

  ngOnInit(): void {
  }

  deleteGuest(){
    this.guestService.changeVisibility(this.guest.userId).subscribe();
    window.location.reload();
  }

  deleteAllGuests(){
    this.guestService.changeVisibilityBeforeDate(this.guest.checkInDate).subscribe(res=>
    window.location.reload());
  }

}
