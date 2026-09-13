import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import Button from "../components/Button";

import FormInput from "../components/FormInput";

import { useAuth } from "../context/AuthContext";

import type { EventModel } from "../models/Event";

import { Reservation } from "../models/Reservation";

import type { WeatherData } from "../models/Weather";

import { eventService } from "../services/EventService";

import { reservationService } from "../services/ReservationService";

import { weatherService } from "../services/WeatherService";

 

function EventDetailsPage() {

  const { id } = useParams();

  const navigate = useNavigate();

  const { currentUser } = useAuth();

 

  const [event, setEvent] = useState<EventModel | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const [loadError, setLoadError] = useState("");

 

  const [weather, setWeather] = useState<WeatherData | null>(null);

  const [isWeatherLoading, setIsWeatherLoading] = useState(false);

  const [weatherError, setWeatherError] = useState("");

 

  const [phoneNumber, setPhoneNumber] = useState("");

  const [numberOfPeople, setNumberOfPeople] = useState(1);

  const [reservationDate, setReservationDate] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

 

  useEffect(() => {

    let isMounted = true;

 

    async function loadEvent() {

      if (!id) {

        setLoadError("Događaj nije pronađen.");

        setIsLoading(false);

        return;

      }

 

      try {

        setIsLoading(true);

        setLoadError("");

 

        const foundEvent = await eventService.getEventById(id);

 

        if (!isMounted) {

          return;

        }

 

        if (!foundEvent) {

          setLoadError("Događaj nije pronađen.");

          setEvent(null);

          return;

        }

 

        setEvent(foundEvent);

        setReservationDate(foundEvent.date);

      } catch {

        if (isMounted) {

          setLoadError("Došlo je do greške prilikom učitavanja događaja.");

        }

      } finally {

        if (isMounted) {

          setIsLoading(false);

        }

      }

    }

 

    loadEvent();

 

    return () => {

      isMounted = false;

    };

  }, [id]);

 

  useEffect(() => {

    let isMounted = true;

 

    async function loadWeather() {

      if (!event) {

        return;

      }

 

      try {

        setIsWeatherLoading(true);

        setWeatherError("");

 

        const weatherData = await weatherService.getWeatherForLocation(

          event.location

        );

 

        if (!isMounted) {

          return;

        }

 

        if (!weatherData) {

          setWeatherError("Vremenski podaci trenutno nisu dostupni.");

          setWeather(null);

          return;

        }

 

        setWeather(weatherData);

      } catch {

        if (isMounted) {

          setWeatherError("Došlo je do greške prilikom učitavanja vremena.");

        }

      } finally {

        if (isMounted) {

          setIsWeatherLoading(false);

        }

      }

    }

 

    loadWeather();

 

    return () => {

      isMounted = false;

    };

  }, [event]);

 

  function handleReservationSubmit(

    eventSubmit: React.FormEvent<HTMLFormElement>

  ) {

    eventSubmit.preventDefault();

 

    setErrorMessage("");

    setSuccessMessage("");

 

    if (!event) {

      setErrorMessage("Događaj nije učitan.");

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

 

  if (isLoading) {

    return (

      <main className="page-container">

        <section className="not-found-card">

          <h1>Učitavanje...</h1>

          <p>Molimo sačekajte dok se događaj učitava.</p>

        </section>

      </main>

    );

  }

 

  if (loadError || !event) {

    return (

      <main className="page-container">

        <section className="not-found-card">

          <h1>Događaj nije pronađen</h1>

          <p>{loadError || "Izabrani događaj ne postoji."}</p>

 

          <Button type="button" onClick={() => navigate("/events")}>

            Nazad na sve žurke

          </Button>

        </section>

      </main>

    );

  }

 

  return (

    <main className="event-details-page">

      <section className="event-details-card">

        <div className="event-details-image-wrapper">

          <img src={event.image} alt={event.title} />

 

          <span className="event-details-age">{event.ageLimit}+</span>

        </div>

 

        <div className="event-details-content">

          <div className="event-details-top-meta">

  <p className="event-details-category">{event.getCategoryLabel()}</p>

 

  <span

    className={

      event.source === "api"

        ? "event-details-source event-details-source--api"

        : "event-details-source event-details-source--local"

    }

  >

    Izvor: {event.getSourceLabel()}

  </span>

</div>

 

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

 

          <section className="weather-card">

            <h2>Vreme za lokaciju događaja</h2>

 

            {isWeatherLoading && (

              <p className="weather-message">Učitavanje vremenskih podataka...</p>

            )}

 

            {!isWeatherLoading && weatherError && (

              <p className="weather-message">{weatherError}</p>

            )}

 

            {!isWeatherLoading && weather && (

              <div className="weather-content">

                <div className="weather-main">

                  <span className="weather-temperature">

                    {Math.round(weather.temperature)}°C

                  </span>

 

                  <span className="weather-description">

                    {weather.description}

                  </span>

                </div>

 

                <div className="weather-details">

                  <p>

                    <span>Grad:</span> {weather.city}

                    {weather.country ? `, ${weather.country}` : ""}

                  </p>

 

                  <p>

                    <span>Vlažnost:</span> {weather.humidity}%

                  </p>

 

                  <p>

                    <span>Vetar:</span> {weather.windSpeed} km/h

                  </p>

                </div>

              </div>

            )}

          </section>

 

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