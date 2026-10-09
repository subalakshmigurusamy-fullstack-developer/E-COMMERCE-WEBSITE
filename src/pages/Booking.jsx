import { useParams } from "react-router-dom";
import services from "../data/services";
import BookingForm from "../components/BookingForm";

function Booking() {

  const { id } = useParams();

  const service = services.find(
    (item) => item.id === Number(id)
  );

  return (
    <div className="booking-page">

      <div className="booking-intro"><div className="eyebrow">RESERVE YOUR SLOT</div><h1>Prepare for {service?.name}</h1><p>Share a few details and we will confirm the best time for your saree.</p></div>

      <BookingForm service={service} />

    </div>
  );
}

export default Booking;