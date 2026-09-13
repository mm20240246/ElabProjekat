import type { AgeLimit, EventCategory } from "../models/Event";

import { EventModel } from "../models/Event";

 

type TicketmasterImage = {

  url: string;

  width?: number;

  height?: number;

};

 

type TicketmasterVenue = {

  name?: string;

  city?: {

    name?: string;

  };

};

 

type TicketmasterEvent = {

  id: string;

  name: string;

  info?: string;

  pleaseNote?: string;

  images?: TicketmasterImage[];

  dates?: {

    start?: {

      localDate?: string;

    };

  };

  classifications?: Array<{

    segment?: {

      name?: string;

    };

    genre?: {

      name?: string;

    };

  }>;

  _embedded?: {

    venues?: TicketmasterVenue[];

  };

};

 

type TicketmasterResponse = {

  _embedded?: {

    events?: TicketmasterEvent[];

  };

};

 

export class TicketmasterService {

  private apiKey = import.meta.env.VITE_TICKETMASTER_API_KEY;

  private baseUrl = "https://app.ticketmaster.com/discovery/v2/events.json";

 

  async getEvents(): Promise<EventModel[]> {

    if (!this.apiKey) {

      console.warn("Ticketmaster API key nije podešen. Koriste se lokalni događaji.");

      return [];

    }

 

    const url = new URL(this.baseUrl);

 

    url.searchParams.set("apikey", this.apiKey);

    url.searchParams.set("city", "Belgrade");

    url.searchParams.set("size", "20");

    url.searchParams.set("sort", "date,asc");

 

    try {

      const response = await fetch(url.toString());

 

      if (!response.ok) {

        console.warn("Ticketmaster API nije uspešno vratio podatke.");

        return [];

      }

 

      const data: TicketmasterResponse = await response.json();

 

      const apiEvents = data._embedded?.events ?? [];

 

      return apiEvents.map((event, index) => this.mapToEventModel(event, index));

    } catch (error) {

      console.warn("Greška prilikom poziva Ticketmaster API-ja:", error);

      return [];

    }

  }

 

  private mapToEventModel(event: TicketmasterEvent, index: number): EventModel {

    const venue = event._embedded?.venues?.[0];

 

    const date = event.dates?.start?.localDate ?? new Date().toISOString();

 

    const location = [

      venue?.name,

      venue?.city?.name,

    ]

      .filter(Boolean)

      .join(", ");

 

    const image = this.getBestImage(event.images);

 

    const category = this.mapCategory(event);

    const ageLimit = this.mapAgeLimit(index);

 

    const description =

      event.info ||

      event.pleaseNote ||

      "Događaj preuzet sa javnog Ticketmaster API-ja. Dodatne informacije dostupne su na stranici događaja.";

 

    return new EventModel(

      `api-${event.id}`,

      event.name,

      category,

      ageLimit,

      date,

      location || "Beograd",

      image,

      description,

      1500 + index * 100

    );

  }

 

  private getBestImage(images?: TicketmasterImage[]): string {

    if (!images || images.length === 0) {

      return "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=900&q=80";

    }

    const sortedImages = [...images].sort((a, b) => {

      const firstSize = (a.width ?? 0) * (a.height ?? 0);

      const secondSize = (b.width ?? 0) * (b.height ?? 0);

      return secondSize - firstSize;

    });

    return sortedImages[0]?.url ?? "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=900&q=80";

  }

 

  private mapCategory(event: TicketmasterEvent): EventCategory {

    const genre = event.classifications?.[0]?.genre?.name?.toLowerCase() ?? "";

    const segment = event.classifications?.[0]?.segment?.name?.toLowerCase() ?? "";

    const combined = `${genre} ${segment}`;

 

    if (combined.includes("club") || combined.includes("dance")) {

      return "nocni-klub";

    }

 

    if (combined.includes("food") || combined.includes("folk")) {

      return "kafana";

    }

 

    if (combined.includes("festival") || combined.includes("music")) {

      return "splav";

    }

 

    return "matinee";

  }

 

  private mapAgeLimit(index: number): AgeLimit {

    const ageLimits: AgeLimit[] = [18, 21, 23];

 

    return ageLimits[index % ageLimits.length];

  }

}

 

export const ticketmasterService = new TicketmasterService();