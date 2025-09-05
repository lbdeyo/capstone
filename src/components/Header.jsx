import { Link } from "react-router-dom";
export default function Header() {
  return (
    <nav className="nav" aria-label="Primary">
      <img src="/img/Logo.svg" className="logo" alt="logo" />
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/about" role="button">
            About
          </Link>
        </li>
        <li>
          <Link to="/menu" role="button">
            Menu
          </Link>
        </li>
        <li>
          <Link to="/booking" role="button">
            Reservations
          </Link>
        </li>
        <li>
          <Link to="/order" role="button">
            Order Online
          </Link>
        </li>
        <li>
          <Link to="/login" role="button">
            Log in
          </Link>
        </li>
      </ul>
    </nav>
  );
}
