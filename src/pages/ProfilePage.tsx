import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import Button from "../components/Button";

import { useAuth } from "../context/AuthContext";

import type { Reservation } from "../models/Reservation";

import { reservationService } from "../services/ReservationService";

 

function ProfilePage() {

  const { currentUser } = useAuth();

  const navigate = useNavigate();

  const [reservations, setReservations] = useState<Reservation[]>([]);

 

  useEffect(() => {

    if (!currentUser) {

      return;

    }

 

    const userReservations = reservationService.getReservationsForUser(

      currentUser.email

    );

 

    setReservations(userReservations);

  }, [currentUser]);

 

  return (

    <main className="profile-page">

      <section className="profile-hero-card">

        <div className="profile-avatar">

          {currentUser?.name?.charAt(0).toUpperCase() ||

            currentUser?.email?.charAt(0).toUpperCase() ||

            "K"}

        </div>

 

        <div className="profile-main-info">

          <p className="profile-label">Profil korisnika</p>

 

          <h1>{currentUser?.getDisplayName()}</h1>

 

          <p className="profile-email-text">{currentUser?.email}</p>

        </div>

      </section>

 

      <section className="profile-dashboard">

        <article className="profile-stat-card">

          <span>Broj rezervacija</span>

          <strong>{reservations.length}</strong>

        </article>

 

        <article className="profile-stat-card">

          <span>Status naloga</span>

          <strong>Aktivan</strong>

        </article>

 

        <article className="profile-stat-card">

          <span>Tip korisnika</span>

          <strong>Registrovan</strong>

        </article>

      </section>

 

      <section className="profile-actions-card">

        <h2>Brze akcije</h2>

 

        <div className="profile-actions">

          <Button type="button" onClick={() => navigate("/events")}>

            Pogledaj sve žurke

          </Button>

 

          <Button

            type="button"

            variant="secondary"

            onClick={() => navigate("/reservations")}

          >

            Moje rezervacije

          </Button>

        </div>

      </section>

    </main>

  );

}

 

export default ProfilePage;