import { Link, useLocation, useNavigate } from "react-router-dom";

import { useState } from "react";

import { useAuth } from "../context/AuthContext";

 

function Navbar() {

  const location = useLocation();

  const navigate = useNavigate();

  const { currentUser, isAuthenticated, logout } = useAuth();

  const [searchTerm, setSearchTerm] = useState("");

 

  const isAuthPage =

    location.pathname === "/login" || location.pathname === "/register";

 

  if (isAuthPage) {

    return null;

  }

 

  function handleSearchSubmit(event: React.FormEvent<HTMLFormElement>) {

    event.preventDefault();

 

    const trimmedSearch = searchTerm.trim();

 

    if (trimmedSearch.length === 0) {

      navigate("/events");

      return;

    }

 

    navigate(`/events?search=${encodeURIComponent(trimmedSearch)}`);

  }

 

  function handleLogout() {

    logout();

    navigate("/login");

  }

 

  return (

    <header className="navbar">

      <div className="navbar-left">

        <Link to="/" className="navbar-logo">

          BG

        </Link>

 

        <nav className="navbar-links">

          <Link to="/" className="navbar-link">

            Početna

          </Link>

 

          <Link to="/events" className="navbar-link">

            Sve žurke

          </Link>

        </nav>

      </div>

 

      <div className="navbar-right">

        <form className="navbar-search" onSubmit={handleSearchSubmit}>

          <input

            type="text"

            placeholder="Pretraga"

            value={searchTerm}

            onChange={(event) => setSearchTerm(event.target.value)}

          />

        </form>

 

        <button

          className="navbar-icon-button"

          type="button"

          onClick={() => navigate("/reservations")}

          title="Moje rezervacije"

        >

          📋

        </button>

 

        {isAuthenticated ? (

          <div className="profile-menu-wrapper">

            <button className="profile-button" type="button">

              Profil

            </button>

 

            <div className="profile-dropdown">

              <p className="profile-email">{currentUser?.email}</p>

 

              <button

                type="button"

                className="profile-dropdown-item"

                onClick={() => navigate("/reservations")}

              >

                Istorija rezervacija

              </button>

 

              <button

                type="button"

                className="profile-dropdown-item"

                onClick={handleLogout}

              >

                Odjava

              </button>

            </div>

          </div>

        ) : (

          <button

            className="profile-button"

            type="button"

            onClick={() => navigate("/login")}

          >

            Prijava

          </button>

        )}

      </div>

    </header>

  );

}

 

export default Navbar;