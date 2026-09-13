import EventDetailsPage from "./pages/EventDetailsPage";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";

import LoginPage from "./pages/LoginPage";

import RegisterPage from "./pages/RegisterPage";

import HomePage from "./pages/HomePage";

import EventsPage from "./pages/EventsPage";

import ReservationsPage from "./pages/ReservationsPage";

import ProfilePage from "./pages/ProfilePage";

import NotFoundPage from "./pages/NotFoundPage";

import { useAuth } from "./context/AuthContext";

import type { ReactNode } from "react";

function ProtectedRoute({ children }: { children: ReactNode }) {

  const { isAuthenticated } = useAuth();

 

  if (!isAuthenticated) {

    return <Navigate to="/login" replace />;

  }

 

  return <>{children}</>;

}

 

function App() {

  return (

    <BrowserRouter>

      <Navbar />

 

      <Routes>

        <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />} />

 

        <Route

          path="/"

          element={

            <ProtectedRoute>

              <HomePage />

            </ProtectedRoute>

          }

        />

 

        <Route

          path="/events"

          element={

            <ProtectedRoute>

              <EventsPage />

            </ProtectedRoute>

          }

        />

        <Route

          path="/events/:id"

          element={

            <ProtectedRoute>

              <EventDetailsPage />

            </ProtectedRoute>

          }

        />

        <Route

          path="/reservations"

          element={

            <ProtectedRoute>

              <ReservationsPage />

            </ProtectedRoute>

          }

        />

 

        <Route

          path="/profile"

          element={

            <ProtectedRoute>

              <ProfilePage />

            </ProtectedRoute>

          }

        />

 

        <Route path="*" element={<NotFoundPage />} />

      </Routes>

    </BrowserRouter>

  );

}

 

export default App;