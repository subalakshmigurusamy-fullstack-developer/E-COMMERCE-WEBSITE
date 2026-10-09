import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">

      <div className="hero-content">

        <p className="hero-small">SAREE STYLING, WITH HEART</p>

        <h1>
          The art of
          <br />
          the perfect pleat.
        </h1>

        <p>
          From first fold to final drape, we make getting ready feel like part of the celebration.
        </p>

        <Link
          to="/services"
          className="primary-btn"
        >
          Find your service <span>↗</span>
        </Link>

      </div>

      <div className="hero-image">

        <img
          src="/images/WhatsApp Image 2026-09-11 at 12.29.34 PM.jpeg"
          alt="Saree"
        />

      </div>

    </section>
  );
}

export default Hero;