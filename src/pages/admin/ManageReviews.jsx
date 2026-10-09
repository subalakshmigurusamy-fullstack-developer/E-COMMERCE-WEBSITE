import { useEffect, useState } from "react";
import API from "../../services/api";

export default function ManageReviews() {
  const [reviews, setReviews] = useState([]);
  const [message, setMessage] = useState("");
  const loadReviews = () => API.get("/admin/reviews").then(({ data }) => setReviews(data)).catch(() => setMessage("Unable to load reviews."));
  useEffect(() => { loadReviews(); }, []);
  const removeReview = async (id) => {
    if (!window.confirm("Delete this review?")) return;
    try { await API.delete(`/admin/reviews/${id}`); setReviews((current) => current.filter((review) => review._id !== id)); } catch (error) { setMessage(error.response?.data?.message || "Unable to delete review."); }
  };
  return <div><div className="admin-heading"><div><div className="eyebrow">CUSTOMER VOICE</div><h1>Manage reviews</h1><p>Review customer feedback and remove inappropriate submissions.</p></div></div><section className="admin-panel"><div className="panel-heading"><h2>All reviews</h2><span className="muted">{reviews.length} total</span></div>{message && <p className="review-message">{message}</p>}{reviews.length ? reviews.map((review) => <article className="admin-review" key={review._id}><div><span className="card-kicker">{new Date(review.createdAt).toLocaleDateString()} · {review.service?.name || "Service"}</span><h3>{review.user?.name || "Customer"}</h3><p>{review.comment}</p></div><div className="admin-review__actions"><strong className="review-rating">{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</strong><button className="text-button" onClick={() => removeReview(review._id)}>Delete</button></div></article>) : <p className="muted">No reviews have been submitted yet.</p>}</section></div>;
}