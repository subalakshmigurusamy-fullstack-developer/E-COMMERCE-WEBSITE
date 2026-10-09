import { useEffect, useState } from "react";
import API from "../services/api";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [form, setForm] = useState({ bookingId: "", rating: 5, comment: "" });
  const [message, setMessage] = useState("");

  const loadReviews = () => API.get("/reviews/my").then(({ data }) => setReviews(data));
  useEffect(() => {
    Promise.all([API.get("/reviews/my"), API.get("/bookings/my")])
      .then(([reviewsResponse, bookingsResponse]) => {
        setReviews(reviewsResponse.data);
        setBookings(bookingsResponse.data);
      })
      .catch(() => setMessage("We could not load your reviews right now."));
  }, []);

  const reviewedBookingIds = new Set(reviews.map((review) => review.booking?._id));
  const completedBookings = bookings.filter((booking) => booking.status === "Completed" && !reviewedBookingIds.has(booking._id));

  const submitReview = async (event) => {
    event.preventDefault();
    setMessage("");
    try {
      await API.post("/reviews", form);
      setForm({ bookingId: "", rating: 5, comment: "" });
      await loadReviews();
      setMessage("Thank you for sharing your experience.");
    } catch (error) {
      setMessage(error.response?.data?.message || "Unable to submit your review.");
    }
  };

  return <div className="page-container narrow">
    <div className="eyebrow">CUSTOMER SPACE</div>
    <h1>Your reviews</h1>
    <p className="lead">Tell us how your completed service felt, and revisit what you have shared.</p>
    <section className="dashboard-card review-form-card">
      <span className="card-kicker">Share your experience</span>
      {completedBookings.length ? <form className="form-section" onSubmit={submitReview}>
        <label htmlFor="review-booking">Completed service</label>
        <select id="review-booking" value={form.bookingId} onChange={(event) => setForm({ ...form, bookingId: event.target.value })} required>
          <option value="">Choose a service</option>
          {completedBookings.map((booking) => <option value={booking._id} key={booking._id}>{booking.service?.name || "Completed service"} · {new Date(booking.pickupDate).toLocaleDateString()}</option>)}
        </select>
        <label>Rating</label>
        <div className="review-stars" role="radiogroup" aria-label="Rating from one to five stars">
          {[1, 2, 3, 4, 5].map((rating) => <button type="button" className={rating <= form.rating ? "star star--active" : "star"} aria-label={`${rating} stars`} aria-pressed={rating === form.rating} onClick={() => setForm({ ...form, rating })} key={rating}>★</button>)}
        </div>
        <label htmlFor="review-comment">Review</label>
        <textarea id="review-comment" value={form.comment} onChange={(event) => setForm({ ...form, comment: event.target.value })} placeholder="What stood out about your service?" rows="5" required minLength="3" maxLength="1000" />
        <button className="button" type="submit">Submit review</button>
      </form> : <p className="muted">Reviews become available after a booking is marked completed.</p>}
      {message && <p className="review-message">{message}</p>}
    </section>
    <section className="review-list">
      <div className="panel-heading"><h2>Your submitted reviews</h2><span className="muted">{reviews.length}</span></div>
      {reviews.length ? reviews.map((review) => <article className="customer-booking review-item" key={review._id}><div><span className="card-kicker">{new Date(review.createdAt).toLocaleDateString()}</span><h2>{review.service?.name || "Service"}</h2><p>{review.comment}</p></div><strong className="review-rating">{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</strong></article>) : <div className="empty-box"><h3>No reviews yet</h3><p>Your submitted reviews will appear here.</p></div>}
    </section>
  </div>;
}