# Veb aplikacija za prikaz i rezervaciju događaja

 

Ovo je klijentska veb aplikacija za prikaz, pretragu, filtriranje i rezervaciju događaja. Aplikacija je razvijena u okviru seminarskog rada iz predmeta vezanog za razvoj klijentskih veb aplikacija.

 

Aplikacija omogućava korisniku da se registruje, prijavi, pregleda dostupne događaje, filtrira ih po kategoriji i uzrastu, otvori detaljnu stranicu događaja, napravi rezervaciju i pregleda ili obriše svoje rezervacije.

 

## Tema projekta

 

**Veb aplikacija za prikaz i rezervaciju događaja**

 

Aplikacija prikazuje događaje i žurke, sa posebnim fokusom na kategorije:

 

- Matinee

- Noćni klub

- Splav

- Kafana

 

Korisnik može da rezerviše proizvoljan broj mesta za izabrani datum.

 

## Tehnologije

 

U projektu su korišćene sledeće tehnologije:

 

- React

- TypeScript

- Vite

- React Router DOM

- CSS

- LocalStorage

- Ticketmaster Discovery API

- Open-Meteo API

- Git

- GitHub

 

## Glavne funkcionalnosti

 

Aplikacija sadrži sledeće funkcionalnosti:

 

- registracija korisnika

- prijava korisnika

- odjava korisnika

- čuvanje korisnika u localStorage

- prikaz početne stranice

- prikaz svih događaja

- povlačenje događaja sa Ticketmaster API-ja

- fallback lokalni događaji

- uniformno formatiranje API i lokalnih podataka kroz EventModel

- pretraga događaja po nazivu, lokaciji i kategoriji

- filtriranje događaja po kategoriji

- filtriranje događaja po uzrastu: 18+, 21+, 23+

- paginacija događaja

- prikaz detaljne stranice događaja

- prikaz vremenskih uslova pomoću Open-Meteo API-ja

- rezervacija događaja

- čuvanje rezervacija u localStorage

- prikaz rezervacija trenutnog korisnika

- brisanje rezervacije

- prikaz profila korisnika

- responsive dizajn

 

## Javne API integracije

 

### Ticketmaster Discovery API

 

Aplikacija koristi Ticketmaster Discovery API za povlačenje javno dostupnih događaja.

 

Pošto Ticketmaster ne garantuje dostupnost događaja za svaki grad, implementiran je fallback mehanizam. Aplikacija prvo pokušava da povuče događaje za Beograd, zatim za Srbiju, a zatim koristi šire upite za muzičke događaje.

 

Podaci iz API-ja se mapiraju u jedinstven model `EventModel`, tako da se lokalni i API događaji prikazuju na isti način.

 

### Open-Meteo API

 

Aplikacija koristi Open-Meteo API za prikaz trenutnih vremenskih uslova na detaljnoj stranici događaja.

 

Prikazuju se:

 

- grad

- temperatura

- vlažnost

- brzina vetra

- opis vremenskih uslova

 

## Stranice aplikacije

 

Aplikacija sadrži sledeće stranice:

 

- `/login` — prijava korisnika

- `/register` — registracija korisnika

- `/` — početna stranica

- `/events` — prikaz svih događaja

- `/events/:id` — detaljna stranica događaja

- `/reservations` — prikaz rezervacija korisnika

- `/profile` — profil korisnika

 

## Struktura projekta

 


src/

├── components/

│   ├── Button.tsx

│   ├── EventCard.tsx

│   ├── FilterBar.tsx

│   ├── FormInput.tsx

│   ├── Navbar.tsx

│   └── Pagination.tsx

│

├── context/

│   └── AuthContext.tsx

│

├── data/

│   └── events.ts

│

├── interfaces/

│   ├── IAuthService.ts

│   └── IReservationService.ts

│

├── models/

│   ├── Event.ts

│   ├── Reservation.ts

│   ├── User.ts

│   └── Weather.ts

│

├── pages/

│   ├── EventDetailsPage.tsx

│   ├── EventsPage.tsx

│   ├── HomePage.tsx

│   ├── LoginPage.tsx

│   ├── NotFoundPage.tsx

│   ├── ProfilePage.tsx

│   ├── RegisterPage.tsx

│   └── ReservationsPage.tsx

│

├── services/

│   ├── AuthService.ts

│   ├── EventService.ts

│   ├── ReservationService.ts

│   ├── TicketmasterApiService.ts

│   └── WeatherService.ts

│

├── styles/

│   └── global.css

│

├── App.tsx

├── main.tsx

└── vite-env.d.ts


 

## Pokretanje projekta lokalno

 

Prvo je potrebno klonirati repozitorijum:

 


git clone https://github.com/mm20240246/ElabProjekat.git


 

Ući u folder projekta:

 


cd event-reservation-app


 

Instalirati potrebne pakete:

 


npm install


 

Napraviti `.env` fajl u root folderu projekta i dodati Ticketmaster API key:

 


VITE_TICKETMASTER_API_KEY=your_ticketmaster_api_key_here


 

Pokrenuti aplikaciju:

 


npm run dev


 

Aplikacija će biti dostupna na adresi:

 


http://localhost:5173




## Build projekta

 

Za produkcioni build koristiti komandu:

 


npm run build


 

Za lokalni pregled produkcione verzije:

 


npm run preview


 

## Test korisničkog toka

 

1. Korisnik otvara aplikaciju.

2. Korisnik se registruje.

3. Korisnik se prijavljuje.

4. Korisnik otvara početnu stranicu.

5. Korisnik bira kategoriju ili otvara sve žurke.

6. Korisnik koristi pretragu, filtere i paginaciju.

7. Korisnik otvara detaljnu stranicu događaja.

8. Korisnik vidi podatke o događaju i vremenske uslove.

9. Korisnik popunjava formu za rezervaciju.

10. Korisnik vidi svoje rezervacije.

11. Korisnik može da obriše rezervaciju.

12. Korisnik može da se odjavi.

 

## Autori

 

- Milica Popović
- Mateja Maljković

 

## Linkovi

 

GitHub repozitorijum:

 


https://github.com/mm20240246/ElabProjekat

 

Deploy aplikacije:

 


https://elab-projekat.vercel.app/