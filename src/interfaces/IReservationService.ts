import type { Reservation } from "../models/Reservation";

 

export interface IReservationService {

  addReservation(reservation: Reservation): void;

  getReservationsForUser(userEmail: string): Reservation[];

  deleteReservation(reservationId: string): void;

}