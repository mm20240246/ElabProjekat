import { useNavigate } from "react-router-dom";

import type { EventModel } from "../models/Event";

import Button from "./Button";

 

type EventCardProps = {

  event: EventModel;

};

 

function EventCard({ event }: EventCardProps) {

  const navigate = useNavigate();

 

  function openDetails() {

    navigate(`/events/${event.id}`);

  }

 

  return (

    <article className="event-card">

      <div className="event-card-image-wrapper">

        <img src={event.image} alt={event.title} className="event-card-image" />

 

        <span className="event-card-age">{event.ageLimit}+</span>

 

        <span className="event-card-category">{event.getCategoryLabel()}</span>

 

        <span

          className={

            event.source === "api"

              ? "event-card-source event-card-source--api"

              : "event-card-source event-card-source--local"

          }

        >

          {event.getSourceLabel()}

        </span>

      </div>

 

      <div className="event-card-content">

        <h2>{event.title}</h2>

 

        <p className="event-card-location">{event.location}</p>

 

        <p className="event-card-date">{event.getFormattedDate()}</p>

 

        <p className="event-card-price">{event.price} RSD</p>

 

        <Button type="button" fullWidth onClick={openDetails}>

          Rezerviši

        </Button>

      </div>

    </article>

  );

}

 

export default EventCard;