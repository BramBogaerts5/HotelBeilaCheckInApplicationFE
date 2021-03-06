export class Guest{
  userId: number;
  bookingName: string;
  userFirstName: string;
  userLastName: string;
  userEmailAddress: string;
  password: string;
  roleId: number;
  roleCode: string;
  token: string;
  checkInDate: string;
  checkInHour: string;
  paymentAmount: number;
  payed: boolean;
  checkedIn: boolean;
  birthDate: string;
  placeOfBirth: string;
  nationality: string;
  cardNo: string;
  visible: boolean;
  message: string;

  constructor(userId: number, bookingName: string, userFirstName: string, userLastName: string, userEmailAddress: string,
              password: string, roleId: number, roleCode: string, token: string, checkInDate: string,
              checkInHour: string, paymentAmount: number, payed: boolean, checkedIn: boolean,
              birthDate: string, placeOfBirth: string, nationality: string, cardNo: string, visible: boolean, message: string){
    this.userId = userId;
    this.bookingName = bookingName;
    this.userFirstName = userFirstName;
    this.userLastName = userLastName;
    this.userEmailAddress = userEmailAddress;
    this.password = password;
    this.roleId = roleId;
    this.roleCode = roleCode;
    this.token = token;
    this.checkInDate = checkInDate;
    this.checkInHour = checkInHour;
    this.paymentAmount = paymentAmount;
    this.payed = payed;
    this.checkedIn = checkedIn;
    this.birthDate = birthDate;
    this.placeOfBirth = placeOfBirth;
    this.nationality = nationality;
    this.cardNo = cardNo;
    this.visible = visible;
    this.message = message;
  }
}
