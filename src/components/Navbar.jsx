import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <Link className="logo" to="/">
        <img
          className="logo-image"
          src="/images/WhatsApp%20Image%202026-09-10%20at%208.55.20%20AM.jpeg"
          alt="Pins & Pleats by Prakalya"
        />
        <span>
          <strong>Pins & Pleats</strong>
          <small>by Prakalya</small>
        </span>
      </Link>

      <div className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/services">Services</NavLink>
        <NavLink to="/about">Our story</NavLink>
        <NavLink to="/contact">Contact</NavLink>

        {user ? (
          <>
            <NavLink to="/user/dashboard">My Dashboard</NavLink>
            <NavLink to="/reviews">Reviews</NavLink>
            <button className="text-button" onClick={logout}>
              Sign out
            </button>
          </>
        ) : (
          <NavLink to="/login">Sign in</NavLink>
        )}
      </div>
    </nav>
  );
}

export default Navbar;