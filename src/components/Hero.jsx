export default function Hero() {
  return (
    <section className="hero">
      <section className="heroLeft">
        <h1>Little Lemon</h1>
        <h3>Chicago</h3>
        <p>
          We are a family owned Mediterranean restaurant, focused on traditional
          recipes served with a modern twist.
        </p>

        <a href="/booking" className="button">
          Reserve a Table
        </a>
      </section>
      <div>
        {" "}
        <img src="/img/hero-image.png" alt="restaurant food" />
      </div>
    </section>
  );
}
