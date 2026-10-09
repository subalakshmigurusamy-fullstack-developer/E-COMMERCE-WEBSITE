import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../services/api";

function BookingForm({ service }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    phone: user?.phone || "",
    date: "",
    time: "",
    notes: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");
    setLoading(true);
    try {
      await API.post("/bookings", {
        serviceName: service.name,
        preferredDate: form.date,
        preferredTime: form.time,
        phone: form.phone,
        notes: form.notes
      });
      navigate("/bookings");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to submit your booking");
    } finally {
      setLoading(false);
    }

  };

  return (
    <form
      className="booking-form"
      onSubmit={handleSubmit}
    >

      <input
        type="tel"
        name="phone"
        placeholder="Phone Number"
        onChange={handleChange}
        required
      />

      <input
        type="date"
        name="date"
        onChange={handleChange}
        required
      />

      <input
        type="time"
        name="time"
        onChange={handleChange}
        required
      />

      <textarea
        name="notes"
        placeholder="Notes or special requests"
        onChange={handleChange}
      />

      {error && <p className="form-error">{error}</p>}
      <button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Confirm Booking"}
      </button>

    </form>
  );
}

export default BookingForm;