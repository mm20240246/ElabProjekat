import type { WeatherData } from "../models/Weather";

 

type GeocodingResult = {

  name: string;

  latitude: number;

  longitude: number;

  country?: string;

};

 

type GeocodingResponse = {

  results?: GeocodingResult[];

};

 

type ForecastResponse = {

  current?: {

    temperature_2m?: number;

    relative_humidity_2m?: number;

    wind_speed_10m?: number;

    weather_code?: number;

  };

};

 

export class WeatherService {

  private geocodingUrl = "https://geocoding-api.open-meteo.com/v1/search";

  private forecastUrl = "https://api.open-meteo.com/v1/forecast";

  private cache = new Map<string, WeatherData | null>();

 

  async getWeatherForLocation(location: string): Promise<WeatherData | null> {

    const cityCandidates = this.getCityCandidates(location);

 

    for (const city of cityCandidates) {

      const cachedWeather = this.cache.get(city);

 

      if (cachedWeather !== undefined) {

        return cachedWeather;

      }

 

      const coordinates = await this.getCoordinates(city);

 

      if (!coordinates) {

        this.cache.set(city, null);

        continue;

      }

 

      const weather = await this.getCurrentWeather(

        coordinates.name,

        coordinates.country ?? "",

        coordinates.latitude,

        coordinates.longitude

      );

 

      this.cache.set(city, weather);

 

      if (weather) {

        return weather;

      }

    }

 

    return null;

  }

 

  private getCityCandidates(location: string): string[] {

    const normalizedLocation = location.toLowerCase();

 

    if (

      normalizedLocation.includes("beograd") ||

      normalizedLocation.includes("belgrade")

    ) {

      return ["Belgrade"];

    }

 

    if (normalizedLocation.includes("london")) {

      return ["London"];

    }

 

    if (

      normalizedLocation.includes("new york") ||

      normalizedLocation.includes("nyc")

    ) {

      return ["New York"];

    }

 

    const locationParts = location

      .split(",")

      .map((part) => part.trim())

      .filter(Boolean);

 

    const reversedParts = [...locationParts].reverse();

 

    const candidates = [...reversedParts, "Belgrade"];

 

    return Array.from(new Set(candidates));

  }

 

  private async getCoordinates(city: string): Promise<GeocodingResult | null> {

    const url = new URL(this.geocodingUrl);

 

    url.searchParams.set("name", city);

    url.searchParams.set("count", "1");

    url.searchParams.set("language", "sr");

    url.searchParams.set("format", "json");

 

    try {

      const response = await fetch(url.toString());

 

      if (!response.ok) {

        console.warn("Open-Meteo geocoding API nije vratio podatke.");

        return null;

      }

 

      const data: GeocodingResponse = await response.json();

 

      return data.results?.[0] ?? null;

    } catch (error) {

      console.warn("Greška prilikom geocoding API poziva:", error);

      return null;

    }

  }

 

  private async getCurrentWeather(

    city: string,

    country: string,

    latitude: number,

    longitude: number

  ): Promise<WeatherData | null> {

    const url = new URL(this.forecastUrl);

 

    url.searchParams.set("latitude", latitude.toString());

    url.searchParams.set("longitude", longitude.toString());

    url.searchParams.set(

      "current",

      "temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code"

    );

    url.searchParams.set("timezone", "auto");

 

    try {

      const response = await fetch(url.toString());

 

      if (!response.ok) {

        console.warn("Open-Meteo forecast API nije vratio podatke.");

        return null;

      }

 

      const data: ForecastResponse = await response.json();

 

      if (!data.current) {

        return null;

      }

 

      const weatherCode = data.current.weather_code ?? 0;

 

      return {

        city,

        country,

        temperature: data.current.temperature_2m ?? 0,

        humidity: data.current.relative_humidity_2m ?? 0,

        windSpeed: data.current.wind_speed_10m ?? 0,

        weatherCode,

        description: this.getWeatherDescription(weatherCode),

      };

    } catch (error) {

      console.warn("Greška prilikom forecast API poziva:", error);

      return null;

    }

  }

 

  private getWeatherDescription(code: number): string {

    if (code === 0) {

      return "Vedro";

    }

 

    if ([1, 2, 3].includes(code)) {

      return "Pretežno sunčano";

    }

 

    if ([45, 48].includes(code)) {

      return "Magla";

    }

 

    if ([51, 53, 55, 56, 57].includes(code)) {

      return "Slaba kiša";

    }

 

    if ([61, 63, 65, 66, 67].includes(code)) {

      return "Kiša";

    }

 

    if ([71, 73, 75, 77].includes(code)) {

      return "Sneg";

    }

 

    if ([80, 81, 82].includes(code)) {

      return "Pljuskovi";

    }

 

    if ([95, 96, 99].includes(code)) {

      return "Grmljavina";

    }

 

    return "Vremenski podaci dostupni";

  }

}

 

export const weatherService = new WeatherService();