import { useEffect, useState } from "react";
import API from "../../services/api";

const statuses = ["Pending", "Confirmed", "Completed", "Cancelled"];

export default function ManageBookings() {
	const [bookings, setBookings] = useState([]);
	const [statusFilter, setStatusFilter] = useState("All");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		API.get("/admin/bookings")
			.then(({ data }) => setBookings(data))
			.catch((requestError) => setError(requestError.response?.data?.message || "Unable to load bookings"))
			.finally(() => setLoading(false));
	}, []);

	const updateStatus = async (id, status) => {
		try {
			const { data } = await API.patch(`/admin/bookings/${id}/status`, { status });
			setBookings((current) => current.map((booking) => booking._id === id ? data : booking));
		} catch (requestError) {
			setError(requestError.response?.data?.message || "Unable to update booking status");
		}
	};

	const visibleBookings = statusFilter === "All" ? bookings : bookings.filter((booking) => booking.status === statusFilter);

	return <div>
		<div className="admin-heading"><div><div className="eyebrow">SCHEDULE</div><h1>Customer bookings</h1><p>Review customer requests and update their appointment status.</p></div></div>
		<section className="admin-panel">
			<div className="panel-heading"><h2>All appointments</h2><select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}><option value="All">All statuses</option>{statuses.map((status) => <option key={status} value={status}>{status}</option>)}</select></div>
			{error && <p className="form-error">{error}</p>}
			{loading ? <div className="empty-box"><h3>Loading customer bookings...</h3></div> : visibleBookings.length === 0 ? <div className="empty-box"><h3>No customer bookings yet</h3><p>New booking requests will appear here.</p></div> : visibleBookings.map((booking) => <article className="booking-row" key={booking._id}>
				<div className="booking-time">{new Date(booking.preferredDate).toLocaleDateString()}</div>
				<div><strong>{booking.customerName || booking.user?.name || "Customer"}</strong><span>{booking.customerEmail || booking.user?.email} · {booking.customerPhone || booking.user?.phone}</span><span>{booking.serviceName || booking.service?.name} · {booking.preferredTime}</span>{booking.notes && <span>{booking.notes}</span>}</div>
				<select value={booking.status} onChange={(event) => updateStatus(booking._id, event.target.value)} aria-label={`Status for ${booking.customerName || "booking"}`}>{statuses.map((status) => <option key={status} value={status}>{status}</option>)}</select>
			</article>)}
		</section>
	</div>;
}
