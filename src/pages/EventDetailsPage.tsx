import { useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import Button from "../components/Button";

import FormInput from "../components/FormInput";

import { useAuth } from "../context/AuthContext";

import { Reservation } from "../models/Reservation";

import { eventService } from "../services/EventService";

import { reservationService } from "../services/ReservationService";

 

function EventDetailsPage() {

  const { id } = useParams();

  const navigate = useNavigate();

  const { currentUser } = useAuth();

 

  const event = id ? eventService.getEventById(id) : undefined;

 

  const [phoneNumber, setPhoneNumber] = useState("");

  const [numberOfPeople, setNumberOfPeople] = useState(1);

  const [reservationDate, setReservationDate] = useState(event?.date ?? "");

  const [errorMessage, setErrorMessage] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

 

  if (!event) {

    return (

      <main className="page-container">

        <section className="not-found-card">

          <h1>Događaj nije pronađen</h1>

          <p>Izabrani događaj ne postoji.</p>

 

          <Button type="button" onClick={() => navigate("/events")}>

            Nazad na sve žurke

          </Button>

        </section>

      </main>

    );

  }

 

  function handleReservationSubmit(eventSubmit: React.FormEvent<HTMLFormElement>) {

    eventSubmit.preventDefault();

    if (!event) {

      setErrorMessage("Događaj nije pronađen.");

      return;

    }

 

    if (!currentUser) {

      setErrorMessage("Morate biti prijavljeni da biste napravili rezervaciju.");

      return;

    }

 

    if (phoneNumber.trim().length < 6) {

      setErrorMessage("Unesite ispravan broj telefona.");

      return;

    }

 

    if (numberOfPeople < 1) {

      setErrorMessage("Broj osoba mora biti najmanje 1.");

      return;

    }

 

    if (!reservationDate) {

      setErrorMessage("Izaberite datum rezervacije.");

      return;

    }

 

    const newReservation = new Reservation(

      Date.now().toString(),

      currentUser.email,

      event.id,

      event.title,

      event.image,

      event.location,

      reservationDate,

      phoneNumber.trim(),

      numberOfPeople,

      new Date().toISOString()

    );

 

    reservationService.addReservation(newReservation);

 

    setSuccessMessage("Rezervacija je uspešno napravljena.");

 

    setPhoneNumber("");

    setNumberOfPeople(1);

    setReservationDate(event.date);

 

    setTimeout(() => {

      navigate("/reservations");

    }, 800);

  }

 

  return (

    <main className="event-details-page">

      <section className="event-details-card">

        <div className="event-details-image-wrapper">

          <img src={event.image} alt={event.title} />

 

          <span className="event-details-age">{event.ageLimit}+</span>

        </div>

 

        <div className="event-details-content">

          <p className="event-details-category">{event.getCategoryLabel()}</p>

 

          <h1>{event.title}</h1>

 

          <p className="event-details-description">{event.description}</p>

 

          <div className="event-details-info">

            <div>

              <span>Datum događaja</span>

              <strong>{event.getFormattedDate()}</strong>

            </div>

 

            <div>

              <span>Lokacija</span>

              <strong>{event.location}</strong>

            </div>

 

            <div>

              <span>Cena</span>

              <strong>{event.price} RSD</strong>

            </div>

          </div>

 

          <form className="reservation-form" onSubmit={handleReservationSubmit}>

            <h2>Rezervacija</h2>

 

            <FormInput

              id="reservation-phone"

              type="tel"

              label="Broj telefona"

              placeholder="Unesite broj telefona"

              value={phoneNumber}

              onChange={(eventInput) => setPhoneNumber(eventInput.target.value)}

              required

            />

 

            <FormInput

              id="reservation-people"

              type="number"

              label="Broj osoba"

              min={1}

              max={20}

              value={numberOfPeople}

              onChange={(eventInput) =>

                setNumberOfPeople(Number(eventInput.target.value))

              }

              required

            />

 

            <FormInput

              id="reservation-date"

              type="date"

              label="Datum rezervacije"

              value={reservationDate}

              onChange={(eventInput) =>

                setReservationDate(eventInput.target.value)

              }

              required

            />

 

            {errorMessage && <p className="reservation-error">{errorMessage}</p>}

            {successMessage && (

              <p className="reservation-success">{successMessage}</p>

            )}

 

            <Button type="submit" fullWidth>

              Rezerviši

            </Button>

 

            <Button

              type="button"

              variant="secondary"

              fullWidth

              onClick={() => navigate("/events")}

            >

              Nazad na sve žurke

            </Button>

          </form>

        </div>

      </section>

    </main>

  );

}

 

export default EventDetailsPage;