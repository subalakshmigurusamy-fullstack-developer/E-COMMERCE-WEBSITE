import ServiceList from "../components/ServiceList";

function Services() {

  return (
    <div className="page-container">

      <div className="section-heading">

        <p>THE SERVICE MENU</p>

        <h1>
          Find your finishing touch
        </h1>

        <span>
          Choose a careful fold, a camera-ready pleat, or a complete drape for your next occasion.
        </span>

      </div>

      <ServiceList />

    </div>
  );
}

export default Services;