export class Reservation {

  id: string;

  userEmail: string;

  eventId: string;

  eventTitle: string;

  eventImage: string;

  eventLocation: string;

  reservationDate: string;

  phoneNumber: string;

  numberOfPeople: number;

  createdAt: string;

 

  constructor(

    id: string,

    userEmail: string,

    eventId: string,

    eventTitle: string,

    eventImage: string,

    eventLocation: string,

    reservationDate: string,

    phoneNumber: string,

    numberOfPeople: number,

    createdAt: string

  ) {

    this.id = id;

    this.userEmail = userEmail;

    this.eventId = eventId;

    this.eventTitle = eventTitle;

    this.eventImage = eventImage;

    this.eventLocation = eventLocation;

    this.reservationDate = reservationDate;

    this.phoneNumber = phoneNumber;

    this.numberOfPeople = numberOfPeople;

    this.createdAt = createdAt;

  }

 

  getFormattedReservationDate(): string {

    return new Date(this.reservationDate).toLocaleDateString("sr-RS", {

      day: "2-digit",

      month: "2-digit",

      year: "numeric",

    });

  }

 

  getSummary(): string {

    return `${this.eventTitle} - ${this.numberOfPeople} osoba`;

  }

}