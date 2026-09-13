export type EventCategory = "matinee" | "nocni-klub" | "splav" | "kafana";

 

export type AgeLimit = 18 | 21 | 23;

 

export class EventModel {

  public id: string;

  public title: string;

  public category: EventCategory;

  public ageLimit: AgeLimit;

  public date: string;

  public location: string;

  public image: string;

  public description: string;

  public price: number;

  constructor(

    id: string,

    title: string,

    category: EventCategory,

    ageLimit: AgeLimit,

    date: string,

    location: string,

    image: string,

    description: string,

    price: number

  ) {

    this.id = id;

    this.title = title;

    this.category = category;

    this.ageLimit = ageLimit;

    this.date = date;

    this.location = location;

    this.image = image;

    this.description = description;

    this.price = price;

  }

 

  getFormattedDate(): string {

    return new Date(this.date).toLocaleDateString("sr-RS", {

      day: "2-digit",

      month: "2-digit",

      year: "numeric",

    });

  }

 

  getCategoryLabel(): string {

    switch (this.category) {

      case "matinee":

        return "Matinee";

      case "nocni-klub":

        return "Noćni klub";

      case "splav":

        return "Splav";

      case "kafana":

        return "Kafana";

      default:

        return "Žurka";

    }

  }

 

  matchesSearch(searchTerm: string): boolean {

    const normalizedSearch = searchTerm.toLowerCase().trim();

 

    if (normalizedSearch.length === 0) {

      return true;

    }

 

    return (

      this.title.toLowerCase().includes(normalizedSearch) ||

      this.location.toLowerCase().includes(normalizedSearch) ||

      this.getCategoryLabel().toLowerCase().includes(normalizedSearch)

    );

  }

}