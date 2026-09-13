import type { IReservationService } from "../interfaces/IReservationService";

import { Reservation } from "../models/Reservation";

 

type StoredReservation = {

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

};

 

export class ReservationService implements IReservationService {

  private reservationsKey = "event_app_reservations";

 

  private getAllReservations(): Reservation[] {

    const reservationsJson = localStorage.getItem(this.reservationsKey);

 

    if (!reservationsJson) {

      return [];

    }

 

    const parsedReservations: StoredReservation[] = JSON.parse(reservationsJson);

 

    return parsedReservations.map(

      (reservation) =>

        new Reservation(

          reservation.id,

          reservation.userEmail,

          reservation.eventId,

          reservation.eventTitle,

          reservation.eventImage,

          reservation.eventLocation,

          reservation.reservationDate,

          reservation.phoneNumber,

          reservation.numberOfPeople,

          reservation.createdAt

        )

    );

  }

 

  private saveAllReservations(reservations: Reservation[]): void {

    localStorage.setItem(this.reservationsKey, JSON.stringify(reservations));

  }

 

  addReservation(reservation: Reservation): void {

    const reservations = this.getAllReservations();

 

    reservations.push(reservation);

 

    this.saveAllReservations(reservations);

  }

 

  getReservationsForUser(userEmail: string): Reservation[] {

    const reservations = this.getAllReservations();

 

    return reservations.filter(

      (reservation) =>

        reservation.userEmail.toLowerCase() === userEmail.toLowerCase()

    );

  }

 

  deleteReservation(reservationId: string): void {

    const reservations = this.getAllReservations();

 

    const updatedReservations = reservations.filter(

      (reservation) => reservation.id !== reservationId

    );

 

    this.saveAllReservations(updatedReservations);

  }

}

 

export const reservationService = new ReservationService();