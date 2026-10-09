import services from "../data/services";
import ServiceCard from "./ServiceCard";

function ServiceList() {

  return (
    <div className="service-grid">

      {services.map((service) => (

        <ServiceCard
          key={service.id}
          service={service}
        />

      ))}

    </div>
  );
}

export default ServiceList;