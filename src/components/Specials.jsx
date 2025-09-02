import Card from "./Card";
export default function Specials() {
  return (
    <section className="specials">
      <div className="container">
        <section className="specialsHeader container">
          <h2>This week's specials!</h2>
          <a href="/reservations" className="button">
            Reserve a Table
          </a>
        </section>
        <section className="cards">
          <Card
            title="Greek Salad"
            body="The famous greek salad of crispy lettuce, peppers, olives and our
              Chicago style feta cheese, garnished with crunchy garlic and
              rosemary croutons."
            image="./img/greek-salad.jpg"
          />
          <Card
            title="Bruchetta"
            body="Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil."
            image="./img/bruchetta.svg"
          />
          <Card
            title="Lemon Dessert"
            body="This comes straight from grandma’s recipe book, every last ingredient has been sourced and is as authentic as can be imagined."
            image="./img/lemon-dessert.jpg"
          />
        </section>
      </div>
    </section>
  );
}
