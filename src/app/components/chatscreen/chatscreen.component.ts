import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {GuestService} from '../../services/guest.service';
import {Guest} from '../../models/guest.model';

@Component({
  selector: 'app-chatscreen',
  templateUrl: './chatscreen.component.html',
  styleUrls: ['./chatscreen.component.css']
})
export class ChatscreenComponent implements OnInit {
  @Output() childValueChange = new EventEmitter();
  @Input() activeGuest: Guest;
  minimizeClicked:boolean = false;
  questionClicked:boolean = false;
  openQuestionClicked: boolean = false;
  genericAnswer:boolean = false;
  answer: string = "An error occurred. Please try again later";
  questionForm: FormGroup;
  showSpinner: boolean = false;
  messagesent: boolean = false;

  constructor(private guestService:GuestService) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.questionForm = new FormGroup({
      question: new FormControl(null,[Validators.required])
    });
  }

  askQuestion(){
    this.showSpinner = true;
    this.activeGuest.message = this.questionForm.get('question').value;
    this.guestService.sendEmail(this.activeGuest).subscribe(res =>{
      this.showSpinner = false;
      this.messagesent = true;
      this.questionForm.reset();
    });
  }

  minimize(){
    this.childValueChange.emit(this.minimizeClicked);
  }

  goBack(){
    this.questionClicked = false;
    this.genericAnswer = false;
    this.openQuestionClicked = false;
  }

  clickQuestion1(){
    this.questionClicked = true;
    this.genericAnswer = true;
    this.answer = "You can fill in 00:00 in the estimated time of arrival field. It would be greatly appreciated if you'd let us know your time of arrival later, you can contact us through info@hotelbeila.be or you can fill in this page again.";
  }
  clickQuestion2(){
    this.questionClicked = true;
    this.genericAnswer = true;
    this.answer = "You probably can! If you booked through Booking or Expedia, you can log in there and cancel your booking via their website. If you booked any other way, please contact us through info@hotelbeila.be";
  }
  clickQuestion3(){
    this.questionClicked = true;
    this.genericAnswer = true;
    this.answer = "Yes you can! We have a storage room where your bicycle can be left safely. It would be appreciated if you'd let us know via info@hotelbeila.be so we can make sure there's plenty of room.";
  }
  clickQuestion4(){
    this.questionClicked = true;
    this.genericAnswer = true;
    this.answer = "We recommend parking Korenbloem right in front of the hotel. You can park for two hours using your parking disk and it's free in between 9am and 6pm, and on Sundays. Lang term parking is possible in the Sint Martinusstraat";
  }
  clickQuestion5(){
    this.questionClicked = true;
    this.genericAnswer = true;
    this.answer = "Although we have a cocktail bar in the hotel, lunch or dinner is not possible within the building. There are plenty of nice restaurants in walking distance, though. Please contact us through info@hotelbeila.be for recommondations."
  }
  clickQuestion6(){
    this.openQuestionClicked = true;
  }

}
