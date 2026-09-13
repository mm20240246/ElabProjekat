import { useEffect, useState } from "react";

import Button from "../components/Button";

import { useAuth } from "../context/AuthContext";

import type { Reservation } from "../models/Reservation";

import { reservationService } from "../services/ReservationService";

 

function ReservationsPage() {

  const { currentUser } = useAuth();

  const [reservations, setReservations] = useState<Reservation[]>([]);

 

  useEffect(() => {

    if (!currentUser) {

      return;

    }

 

    const userReservations = reservationService.getReservationsForUser(

      currentUser.email

    );

 

    setReservations(userReservations);

  }, [currentUser]);

 

  function handleDeleteReservation(reservationId: string) {

    reservationService.deleteReservation(reservationId);

 

    setReservations((currentReservations) =>

      currentReservations.filter(

        (reservation) => reservation.id !== reservationId

      )

    );

  }

 

  if (!currentUser) {

    return (

      <main className="page-container">

        <section className="not-found-card">

          <h1>Niste prijavljeni</h1>

          <p>Morate biti prijavljeni da biste videli rezervacije.</p>

        </section>

      </main>

    );

  }

 

  return (

    <main className="reservations-page">

      <section className="reservations-header">

        <h1>Moje rezervacije</h1>

        <p>

          Ovde možete videti sve svoje rezervacije i obrisati rezervaciju ako

          više ne želite da prisustvujete događaju.

        </p>

      </section>

 

      {reservations.length === 0 ? (

        <section className="empty-reservations-card">

          <h2>Nemate aktivnih rezervacija</h2>

          <p>

            Otvorite stranicu “Sve žurke”, izaberite događaj i napravite prvu

            rezervaciju.

          </p>

        </section>

      ) : (

        <section className="reservations-list">

          {reservations.map((reservation) => (

            <article key={reservation.id} className="reservation-card">

              <img

                src={reservation.eventImage}

                alt={reservation.eventTitle}

                className="reservation-card-image"

              />

 

              <div className="reservation-card-content">

                <h2>{reservation.eventTitle}</h2>

 

                <p>

                  <span>Lokacija:</span> {reservation.eventLocation}

                </p>

 

                <p>

                  <span>Datum rezervacije:</span>{" "}

                  {reservation.getFormattedReservationDate()}

                </p>

 

                <p>

                  <span>Broj telefona:</span> {reservation.phoneNumber}

                </p>

 

                <p>

                  <span>Broj osoba:</span> {reservation.numberOfPeople}

                </p>

 

                <p className="reservation-summary">

                  {reservation.getSummary()}

                </p>

 

                <Button

                  type="button"

                  variant="danger"

                  onClick={() => handleDeleteReservation(reservation.id)}

                >

                  Obriši rezervaciju

                </Button>

              </div>

            </article>

          ))}

        </section>

      )}

    </main>

  );

}

 

export default ReservationsPage;