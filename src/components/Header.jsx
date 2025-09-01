export default function Header() {
  return (
    <nav className="nav">
      <img src="/img/Logo.svg" className="logo" alt="logo" />
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
  );
}
