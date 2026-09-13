import type { AgeLimit, EventCategory } from "../models/Event";

 

type FilterBarProps = {

  search: string;

  selectedCategory: EventCategory | null;

  selectedAge: AgeLimit | null;

  onSearchChange: (value: string) => void;

  onCategoryChange: (value: EventCategory | null) => void;

  onAgeChange: (value: AgeLimit | null) => void;

  onClearFilters: () => void;

};

 

const categories: { label: string; value: EventCategory }[] = [

  { label: "Matinee", value: "matinee" },

  { label: "Noćni klub", value: "nocni-klub" },

  { label: "Splav", value: "splav" },

  { label: "Kafana", value: "kafana" },

];

 

const ageLimits: AgeLimit[] = [18, 21, 23];

 

function FilterBar({

  search,

  selectedCategory,

  selectedAge,

  onSearchChange,

  onCategoryChange,

  onAgeChange,

  onClearFilters,

}: FilterBarProps) {

  return (

    <section className="filter-bar">

      <div className="filter-group filter-group--search">

        <label htmlFor="events-search">Pretraga</label>

 

        <input

          id="events-search"

          type="text"

          placeholder="Pretraži žurke po nazivu"

          value={search}

          onChange={(event) => onSearchChange(event.target.value)}

        />

      </div>

 

      <div className="filter-group">

        <span>Kategorija</span>

 

        <div className="filter-buttons">

          {categories.map((category) => (

            <button

              key={category.value}

              type="button"

              className={

                selectedCategory === category.value

                  ? "filter-button filter-button--active"

                  : "filter-button"

              }

              onClick={() =>

                onCategoryChange(

                  selectedCategory === category.value ? null : category.value

                )

              }

            >

              {category.label}

            </button>

          ))}

        </div>

      </div>

 

      <div className="filter-group">

        <span>Uzrast</span>

 

        <div className="filter-buttons">

          {ageLimits.map((age) => (

            <button

              key={age}

              type="button"

              className={

                selectedAge === age

                  ? "filter-button filter-button--active"

                  : "filter-button"

              }

              onClick={() => onAgeChange(selectedAge === age ? null : age)}

            >

              {age}+

            </button>

          ))}

        </div>

      </div>

 

      <button type="button" className="clear-filters-button" onClick={onClearFilters}>

        Ukloni filtere

      </button>

    </section>

  );

}

 

export default FilterBar;