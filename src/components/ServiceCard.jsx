import { Link } from "react-router-dom";

function ServiceCard({ service }) {

  return (
    <div className="service-card">

      <img
        src={service.image}
        alt={service.name}
      />

      <div className="service-content">
        {service.tag && <span className="service-tag">{service.tag}</span>}

        <h3>
          {service.name}
        </h3>

        <p>
          {service.description}
        </p>

        <div className="service-info">

          <span>
            ₹{service.price}
          </span>

          <span>
            {service.duration}
          </span>

        </div>

        <Link
          to={`/services/${service.id}`}
          className="service-btn"
        >
          Book now <span>↗</span>
        </Link>

      </div>

    </div>
  );
}

export default ServiceCard;