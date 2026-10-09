import { useEffect, useState } from "react";
import API from "../services/api";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/bookings/my").then(({ data }) => setBookings(data)).catch(() => setBookings([])).finally(() => setLoading(false));
  }, []);

  return (
    <div className="page-container">

      <div className="eyebrow">CUSTOMER SPACE</div>
      <h1>My bookings</h1>
      <p className="lead">Your appointments, service details, and booking status in one place.</p>

      {loading ? <div className="empty-box"><h3>Loading your bookings...</h3></div> : bookings.length === 0 ? (

        <div className="empty-box">

          <h3>
            No bookings yet
          </h3>

          <p>
            Your bookings will appear here.
          </p>

        </div>

      ) : (

        bookings.map((booking) => (
          <article className="customer-booking" key={booking._id}>
            <div>
              <span className="card-kicker">{new Date(booking.preferredDate).toLocaleDateString()} at {booking.preferredTime}</span>
              <h2>{booking.serviceName || booking.service?.name || "Saree service"}</h2>
              <p>{booking.customerName} · {booking.customerEmail} · {booking.customerPhone}</p>
              {booking.notes && <p>{booking.notes}</p>}
            </div>
            <b className={`status status--${booking.status.toLowerCase()}`}>{booking.status}</b>
          </article>
        ))

      )}

    </div>
  );
}

export default MyBookings;