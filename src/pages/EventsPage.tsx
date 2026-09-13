import { useEffect, useMemo, useState } from "react";

import { useSearchParams } from "react-router-dom";

import EventCard from "../components/EventCard";

import FilterBar from "../components/FilterBar";

import Pagination from "../components/Pagination";

import type { AgeLimit, EventCategory } from "../models/Event";

import type { EventModel } from "../models/Event";

import { eventService } from "../services/EventService";

 

const EVENTS_PER_PAGE = 4;

 

function isValidCategory(value: string | null): value is EventCategory {

  return (

    value === "matinee" ||

    value === "nocni-klub" ||

    value === "splav" ||

    value === "kafana"

  );

}

 

function isValidAge(value: string | null): value is "18" | "21" | "23" {

  return value === "18" || value === "21" || value === "23";

}

 

function EventsPage() {

  const [searchParams, setSearchParams] = useSearchParams();

 

  const searchFromUrl = searchParams.get("search") ?? "";

  const categoryFromUrl = searchParams.get("category");

  const ageFromUrl = searchParams.get("age");

 

  const selectedCategory: EventCategory | null = isValidCategory(categoryFromUrl)

    ? categoryFromUrl

    : null;

 

  const selectedAge: AgeLimit | null = isValidAge(ageFromUrl)

    ? (Number(ageFromUrl) as AgeLimit)

    : null;

 

  const [search, setSearch] = useState(searchFromUrl);

  const [events, setEvents] = useState<EventModel[]>([]);

  const [currentPage, setCurrentPage] = useState(1);

  const [isLoading, setIsLoading] = useState(true);

  const [errorMessage, setErrorMessage] = useState("");

 

  useEffect(() => {

    setSearch(searchFromUrl);

    setCurrentPage(1);

  }, [searchFromUrl, categoryFromUrl, ageFromUrl]);

 

  useEffect(() => {

    let isMounted = true;

 

    async function loadEvents() {

      try {

        setIsLoading(true);

        setErrorMessage("");

 

        const filteredEvents = await eventService.filterEvents({

          search,

          category: selectedCategory,

          ageLimit: selectedAge,

        });

 

        if (isMounted) {

          setEvents(filteredEvents);

        }

      } catch {

        if (isMounted) {

          setErrorMessage("Došlo je do greške prilikom učitavanja događaja.");

        }

      } finally {

        if (isMounted) {

          setIsLoading(false);

        }

      }

    }

 

    loadEvents();

 

    return () => {

      isMounted = false;

    };

  }, [search, selectedCategory, selectedAge]);

 

  const totalPages = Math.ceil(events.length / EVENTS_PER_PAGE);

 

  const paginatedEvents = useMemo(() => {

    const startIndex = (currentPage - 1) * EVENTS_PER_PAGE;

    const endIndex = startIndex + EVENTS_PER_PAGE;

 

    return events.slice(startIndex, endIndex);

  }, [events, currentPage]);

 

  function updateUrlParams(

    newSearch: string,

    newCategory: EventCategory | null,

    newAge: AgeLimit | null

  ) {

    const params = new URLSearchParams();

 

    if (newSearch.trim().length > 0) {

      params.set("search", newSearch.trim());

    }

 

    if (newCategory) {

      params.set("category", newCategory);

    }

 

    if (newAge) {

      params.set("age", newAge.toString());

    }

 

    setSearchParams(params);

  }

 

  function handleSearchChange(value: string) {

    setSearch(value);

    setCurrentPage(1);

    updateUrlParams(value, selectedCategory, selectedAge);

  }

 

  function handleCategoryChange(value: EventCategory | null) {

    setCurrentPage(1);

    updateUrlParams(search, value, selectedAge);

  }

 

  function handleAgeChange(value: AgeLimit | null) {

    setCurrentPage(1);

    updateUrlParams(search, selectedCategory, value);

  }

 

  function handleClearFilters() {

    setSearch("");

    setCurrentPage(1);

    setSearchParams({});

  }

 

  return (

    <main className="events-page">

      <section className="events-header">

        <h1>Sve žurke</h1>

 

        <p>

          Pretražite događaje, filtrirajte ih po kategoriji ili uzrastu i

          rezervišite svoje mesto.

        </p>

      </section>

 

      <FilterBar

        search={search}

        selectedCategory={selectedCategory}

        selectedAge={selectedAge}

        onSearchChange={handleSearchChange}

        onCategoryChange={handleCategoryChange}

        onAgeChange={handleAgeChange}

        onClearFilters={handleClearFilters}

      />

 

      <section className="active-filters">

        {selectedCategory && (

          <span>

            Kategorija: {selectedCategory}{" "}

            <button type="button" onClick={() => handleCategoryChange(null)}>

              x

            </button>

          </span>

        )}

 

        {selectedAge && (

          <span>

            {selectedAge}+{" "}

            <button type="button" onClick={() => handleAgeChange(null)}>

              x

            </button>

          </span>

        )}

      </section>

 

      {isLoading && (

        <section className="no-events-card">

          <h2>Učitavanje događaja...</h2>

          <p>Molimo sačekajte dok se podaci učitavaju.</p>

        </section>

      )}

 

      {!isLoading && errorMessage && (

        <section className="no-events-card">

          <h2>Greška</h2>

          <p>{errorMessage}</p>

        </section>

      )}

 

      {!isLoading && !errorMessage && paginatedEvents.length > 0 && (

        <section className="events-grid">

          {paginatedEvents.map((event) => (

            <EventCard key={event.id} event={event} />

          ))}

        </section>

      )}

 

      {!isLoading && !errorMessage && paginatedEvents.length === 0 && (

        <section className="no-events-card">

          <h2>Nema pronađenih žurki</h2>

          <p>Pokušajte sa drugim filterima ili uklonite filtere.</p>

        </section>

      )}

 

      {!isLoading && !errorMessage && (

        <Pagination

          currentPage={currentPage}

          totalPages={totalPages}

          onPageChange={setCurrentPage}

        />

      )}

    </main>

  );

}

 

export default EventsPage;