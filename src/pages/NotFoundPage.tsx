import { Link } from "react-router-dom";

 

function NotFoundPage() {

  return (

    <main className="page-container">

      <section className="not-found-card">

        <h1>404</h1>

        <p>Stranica nije pronađena.</p>

        <Link to="/">Vrati se na početnu</Link>

      </section>

    </main>

  );

}

 

export default NotFoundPage;