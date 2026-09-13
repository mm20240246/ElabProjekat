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

  country?: {

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

  page?: {

    totalElements?: number;

  };

};

type TicketmasterQueryAttempt ={
    label: string;
    params: Record<string, string>;
};

export class TicketmasterService {

  private apiKey = import.meta.env.VITE_TICKETMASTER_API_KEY;  private baseUrl = "https://app.ticketmaster.com/discovery/v2/events.json";
 

  async getEvents(): Promise<EventModel[]> {

    if (!this.apiKey) {

      console.warn(

        "Ticketmaster API key nije podešen. Koriste se samo lokalni događaji."

      );

 

      return [];

    }

 

    const queryAttempts: TicketmasterQueryAttempt[] = [

      {

        label: "Belgrade",

        params: {

          city: "Belgrade",

          size: "20",

          sort: "date,asc",

        },

      },

      {

        label: "Serbia",

        params: {

          countryCode: "RS",

          size: "20",

          sort: "date,asc",

        },

      },

      {

        label: "Music keyword",

        params: {

          keyword: "music",

          size: "20",

          sort: "date,asc",

        },

      },

      {

        label: "London music",

        params: {

          city: "London",

          keyword: "music",

          size: "20",

          sort: "date,asc",

        },

      },

      {

        label: "New York music",

        params: {

          city: "New York",

          keyword: "music",

          size: "20",

          sort: "date,asc",

        },

      },

    ];

 

    for (const attempt of queryAttempts) {

      const events = await this.fetchEvents(attempt.params, attempt.label);

 

      if (events.length > 0) {

        console.log(

          `Ticketmaster API: učitano ${events.length} događaja za upit "${attempt.label}".`

        );

 

        return events;

      }

    }

 

    console.warn(

      "Ticketmaster API nije vratio događaje ni za jedan upit. Koriste se samo lokalni događaji."

    );

 

    return [];

  }

 

  private async fetchEvents(

    params: Record<string, string>,

    label: string

  ): Promise<EventModel[]> {

    const url = new URL(this.baseUrl);

 

    url.searchParams.set("apikey", this.apiKey);

 

    Object.entries(params).forEach(([key, value]) => {

      url.searchParams.set(key, value);

    });

 

    try {

      const response = await fetch(url.toString());

 

      if (!response.ok) {

        console.warn(

          `Ticketmaster API greška za upit "${label}":`,

          response.status,

          response.statusText

        );

 

        return [];

      }

 

      const data: TicketmasterResponse = await response.json();

 

      const apiEvents = data._embedded?.events ?? [];

 

      console.log(

        `Ticketmaster API upit "${label}" vratio je ${apiEvents.length} događaja.`

      );

 

      return apiEvents.map((ticketmasterEvent, index) =>

        this.mapToEventModel(ticketmasterEvent, index)

      );

    } catch (error) {

      console.warn(

        `Greška prilikom Ticketmaster API poziva za upit "${label}":`,

        error

      );

 

      return [];

    }

  }

 

  private mapToEventModel(

    ticketmasterEvent: TicketmasterEvent,

    index: number

  ): EventModel {

    const venue = ticketmasterEvent._embedded?.venues?.[0];

 

    const date =

      ticketmasterEvent.dates?.start?.localDate ?? new Date().toISOString();

 

    const location = [venue?.name, venue?.city?.name, venue?.country?.name]

      .filter(Boolean)

      .join(", ");

 

    const image = this.getBestImage(ticketmasterEvent.images);

 

    const category = this.mapCategory(ticketmasterEvent);

    const ageLimit = this.mapAgeLimit(index);

 

    const description =

      ticketmasterEvent.info ||

      ticketmasterEvent.pleaseNote ||

      "Događaj preuzet sa javnog Ticketmaster API-ja. Podaci su uniformno formatirani i prikazani u aplikaciji.";

 

    return new EventModel(

      `api-${ticketmasterEvent.id}`,

      ticketmasterEvent.name,

      category,

      ageLimit,

      date,

      location || "Lokacija nije dostupna",

      image,

      description,

      1500 + index * 100

    );

  }

 

  private getBestImage(images?: TicketmasterImage[]): string {

    const fallbackImage =

      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=900&q=80";

 

    if (!images || images.length === 0) {

      return fallbackImage;

    }

 

    const sortedImages = [...images].sort((a, b) => {

      const firstSize = (a.width ?? 0) * (a.height ?? 0);

      const secondSize = (b.width ?? 0) * (b.height ?? 0);

 

      return secondSize - firstSize;

    });

 

    return sortedImages[0]?.url ?? fallbackImage;

  }

 

  private mapCategory(ticketmasterEvent: TicketmasterEvent): EventCategory {

    const genre =

      ticketmasterEvent.classifications?.[0]?.genre?.name?.toLowerCase() ?? "";

 

    const segment =

      ticketmasterEvent.classifications?.[0]?.segment?.name?.toLowerCase() ??

      "";

 

    const combined = `${genre} ${segment}`;

 

    if (

      combined.includes("club") ||

      combined.includes("dance") ||

      combined.includes("electronic")

    ) {

      return "nocni-klub";

    }

 

    if (

      combined.includes("food") ||

      combined.includes("folk") ||

      combined.includes("traditional")

    ) {

      return "kafana";

    }

 

    if (

      combined.includes("festival") ||

      combined.includes("music") ||

      combined.includes("concert")

    ) {

      return "splav";

    }

 

    return "matinee";

  }

 

  private mapAgeLimit(index: number): AgeLimit {

    const ageLimits: AgeLimit[] = [18, 21, 23];

 

    return ageLimits[index % ageLimits.length] ?? 18;

  }

}

 

export const ticketmasterService = new TicketmasterService();