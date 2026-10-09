import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: ""
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
      await register(form);
      navigate("/user/dashboard");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to create your account");
    } finally {
      setLoading(false);
    }

  };

  return (
    <div className="auth-layout">
      <div className="auth-note"><span className="logo-mark">PP</span><div className="eyebrow">WELCOME TO THE STUDIO</div><h1>Your saree has places to go.</h1><p>Save your details once and make every booking feel wonderfully easy.</p></div>

      <form
        className="auth-form"
        onSubmit={handleSubmit}
      >

        <div className="eyebrow">FIRST TIME HERE?</div><h2>Let’s get you ready.</h2><p className="form-intro">Create an account for faster bookings and appointment updates.</p>

        <input
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <input
          name="phone"
          placeholder="Phone Number"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        {error && <p className="form-error">{error}</p>}
        <button type="submit">
          {loading ? "Creating account..." : "Create account"}
        </button>
        <p className="form-footer">Already have an account? <Link to="/login">Sign in</Link></p>

      </form>

    </div>
  );
}

export default Register;