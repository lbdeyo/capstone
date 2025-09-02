export default function Footer() {
  return (
    <div className="footerbg">
      <footer className="container ">
        <img src="../../img/restaurant.jpg" alt="restaurant" />
        <nav className=" doormat-nav">
          <p className="column-header">Doormat Navigation</p>
          <ul>
            <li>
              <a href="/" role="button">
                Home
              </a>
            </li>

            <li>
              <a href="/about" role="button">
                About
              </a>
            </li>
            <li>
              <a href="/menu" role="button">
                Menu
              </a>
            </li>
            <li>
              <a href="/reservations" role="button">
                Reservations
              </a>
            </li>
            <li>
              <a href="/order" role="button">
                Order Online
              </a>
            </li>
            <li>
              <a href="/login" role="button">
                Log in
              </a>
            </li>
          </ul>
        </nav>
        <section className=" doormat-nav">
          <p className="column-header">Contact</p>
          <ul>
            <li>Address</li>

            <li>Phone number</li>
            <li>Email</li>
          </ul>
        </section>
        <section className=" doormat-nav">
          <p className="column-header">Social Media Links</p>
          <ul>
            <li>Facebook</li>
            <li>Instagram</li>
            <li>X</li>
          </ul>
        </section>
      </footer>
    </div>
  );
}
