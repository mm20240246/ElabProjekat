import { useNavigate } from "react-router-dom";

import MatineeSlika from "../assets/MatineeSlika.jpg";
import NocniKlubSlika from "../assets/NocniKlubSlika.jpg";
import SplavoviSlika from "../assets/SplavoviSlika.jpg";
import KafanaSlika from "../assets/KafanaSlika.jpg";

type CategoryCard = {

  title: string;

  category: string;

  image: string;

};

 

const categories: CategoryCard[] = [

  {

    title: "MATINEE",

    category: "matinee",

    image: MatineeSlika,


  },

  {

    title: "NOĆNI KLUB",

    category: "nocni-klub",

    image: NocniKlubSlika,


  },

  {

    title: "SPLAV",

    category: "splav",

    image: SplavoviSlika,


  },

  {

    title: "KAFANA",

    category: "kafana",

    image: KafanaSlika,

  },

];

 

function HomePage() {

  const navigate = useNavigate();

 

  function openCategory(category: string) {

    navigate(`/events?category=${category}`);

  }

 

  return (

    <main className="home-page">

      <section className="home-hero">

        <div className="home-image-panel" />

 

        <div className="home-content">

          <p className="home-description">

            Najbrži način da rezervišete svoje mesto na najboljim gradskim

            dešavanjima, žurkama i provodima u Beogradu!

            <br />

            Kompletan noćni život i zabava u gradu udaljeni su od vas samo

            nekoliko klikova.

          </p>

 

          <div className="category-grid">

            {categories.map((category) => (

              <button

                key={category.category}

                type="button"

                className="category-card"

                onClick={() => openCategory(category.category)}

              >

                <img src={category.image} alt={category.title} />

                <span>{category.title}</span>

              </button>

            ))}

          </div>

        </div>

      </section>

    </main>

  );

}

 

export default HomePage;