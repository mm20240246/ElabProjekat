import { localEvents } from "../data/events";

import type { AgeLimit, EventCategory } from "../models/Event";

import { EventModel } from "../models/Event";

 

type EventFilterOptions = {

  search?: string;

  category?: EventCategory | null;

  ageLimit?: AgeLimit | null;

};

 

export class EventService {

  getAllEvents(): EventModel[] {

    return localEvents;

  }

 

  getEventById(id: string): EventModel | undefined {

    return localEvents.find((event) => event.id === id);

  }

 

  filterEvents(options: EventFilterOptions): EventModel[] {

    const { search = "", category = null, ageLimit = null } = options;

 

    return localEvents.filter((event) => {

      const matchesSearch = event.matchesSearch(search);

      const matchesCategory = category ? event.category === category : true;

      const matchesAge = ageLimit ? event.ageLimit === ageLimit : true;

 

      return matchesSearch && matchesCategory && matchesAge;

    });

  }

}

 

export const eventService = new EventService();