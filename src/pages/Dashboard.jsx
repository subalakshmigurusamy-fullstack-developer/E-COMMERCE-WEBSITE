import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import API from "../services/api";

export default function Dashboard() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  useEffect(() => { API.get("/bookings/my").then(({ data }) => setBookings(data)).catch(() => setBookings([])); }, []);
  const nextBooking = bookings[0];
  return <section className="dashboard page-container"><div className="eyebrow">CUSTOMER SPACE</div><h1>Welcome back, {user?.name}.</h1><p className="lead">Plan your look, follow your appointments, and keep your details ready.</p><div className="user-stats"><article><strong>{bookings.length}</strong><span>Total bookings</span></article><article><strong>{bookings.filter((booking) => booking.status === "Completed").length}</strong><span>Completed visits</span></article><article><strong>{bookings.filter((booking) => booking.status !== "Cancelled").length}</strong><span>Active plans</span></article></div><div className="dashboard-grid"><article className="dashboard-card dashboard-card--accent"><span className="card-kicker">Next appointment</span><h2>{nextBooking?.service?.name || "Your next look starts here"}</h2><p>{nextBooking ? `${new Date(nextBooking.pickupDate).toLocaleDateString()} · ${nextBooking.status}` : "Choose a service and reserve a time that works for you."}</p><Link className="button button--light" to="/services">{nextBooking ? "View my bookings" : "Browse services"}</Link></article><article className="dashboard-card"><span className="card-kicker">Your space</span><Link to="/bookings">My bookings <span>↗</span></Link><Link to="/profile">Profile settings <span>↗</span></Link></article></div></section>;
}
