import { localEvents } from "../data/events";

import type { AgeLimit, EventCategory } from "../models/Event";

import { EventModel } from "../models/Event";

import { ticketmasterService } from "./TicketmasterService";

 

type EventFilterOptions = {

  search?: string;

  category?: EventCategory | null;

  ageLimit?: AgeLimit | null;

};

 

export class EventService {

  private cachedEvents: EventModel[] | null = null;

 

  async getAllEvents(): Promise<EventModel[]> {

    if (this.cachedEvents) {

      return this.cachedEvents;

    }

 

    const apiEvents = await ticketmasterService.getEvents();

 

    this.cachedEvents = [...localEvents, ...apiEvents];

 

    return this.cachedEvents;

  }

 

  async getEventById(id: string): Promise<EventModel | undefined> {

    const events = await this.getAllEvents();

 

    return events.find((event) => event.id === id);

  }

 

  async filterEvents(options: EventFilterOptions): Promise<EventModel[]> {

    const { search = "", category = null, ageLimit = null } = options;

 

    const events = await this.getAllEvents();

 

    return events.filter((event) => {

      const matchesSearch = event.matchesSearch(search);

      const matchesCategory = category ? event.category === category : true;

      const matchesAge = ageLimit ? event.ageLimit === ageLimit : true;

 

      return matchesSearch && matchesCategory && matchesAge;

    });

  }

 

  clearCache(): void {

    this.cachedEvents = null;

  }

}

 

export const eventService = new EventService();