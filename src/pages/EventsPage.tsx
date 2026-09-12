import { useSearchParams } from "react-router-dom";

 

function EventsPage() {

  const [searchParams] = useSearchParams();

 

  const search = searchParams.get("search");

  const category = searchParams.get("category");

  const age = searchParams.get("age");

 

  return (

    <main className="page-container">

      <section className="page-header">

        <h1>Sve žurke</h1>

 

        {search && <p>Pretraga: {search}</p>}

        {category && <p>Kategorija: {category}</p>}

        {age && <p>Filter: {age}+</p>}

      </section>

 

      <section className="placeholder-section">

        <p>

          Ovde ćemo u sledećoj fazi prikazati događaje iz API-ja, filtere,

          paginaciju i dugme za rezervaciju.

        </p>

      </section>

    </main>

  );

}

 

export default EventsPage;