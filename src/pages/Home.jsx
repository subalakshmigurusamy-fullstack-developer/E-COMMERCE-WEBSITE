import Hero from "../components/Hero";
import ServiceList from "../components/ServiceList";

function Home() {

  return (
    <>
      <Hero />

      <section className="services-section">

        <div className="section-heading">

          <p>OUR SERVICES</p>

          <h2>
            Saree Care & Styling Services
          </h2>

          <span>
            Choose the perfect service for your saree.
          </span>

        </div>

        <ServiceList />

      </section>

      <section className="customer-journey">
        <div className="section-heading">
          <p>HOW IT WORKS</p>
          <h2>From your wardrobe to your occasion.</h2>
          <span>A simple, personal experience for a saree that feels just right.</span>
        </div>
        <div className="journey-grid">
          <article><span>01</span><h3>Tell us the occasion</h3><p>Pick the styling service that suits your wedding, celebration, or everyday look.</p></article>
          <article><span>02</span><h3>We make the pleats</h3><p>Our team prepares every saree carefully, with your comfort and drape in mind.</p></article>
          <article><span>03</span><h3>Step out beautifully</h3><p>Arrive ready, relaxed, and confident. Your perfect pleats are waiting.</p></article>
        </div>
      </section>
    </>
  );
}

export default Home;