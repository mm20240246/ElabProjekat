import { useNavigate, useParams } from "react-router-dom";

import Button from "../components/Button";

import { eventService } from "../services/EventService";

 

function EventDetailsPage() {

  const { id } = useParams();

  const navigate = useNavigate();

 

  const event = id ? eventService.getEventById(id) : undefined;

 

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

              <span>Datum</span>

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

 

          <div className="reservation-preview-box">

            <h2>Rezervacija</h2>

            <p>

              U sledećem koraku ovde dodajemo funkcionalnu formu za broj

              telefona i broj osoba.

            </p>

 

            <Button type="button" onClick={() => navigate("/events")}>

              Nazad na sve žurke

            </Button>

          </div>

        </div>

      </section>

    </main>

  );

}

 

export default EventDetailsPage;