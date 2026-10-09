import { useParams, Link } from "react-router-dom";
import services from "../data/services";

function ServiceDetails() {

  const { id } = useParams();

  const service = services.find(
    (item) => item.id === Number(id)
  );

  if (!service) {
    return <h2>Service Not Found</h2>;
  }

  return (
    <div className="details-page">

      <div className="details-image">

        <img
          src={service.image}
          alt={service.name}
        />

      </div>

      <div className="details-content">

        <p className="eyebrow">YOUR SELECTED SERVICE</p>

        <h1>
          {service.name}
        </h1>

        <p className="details-description">{service.description}</p>

        <h2>
          ₹{service.price}
        </h2>

        <div className="details-meta"><span>Estimated time<strong>{service.duration}</strong></span><span>Starting at<strong>₹{service.price}</strong></span></div>

        <Link
          to={`/booking/${service.id}`}
          className="primary-btn"
        >
          Reserve this service <span>↗</span>
        </Link>

      </div>

    </div>
  );
}

export default ServiceDetails;
