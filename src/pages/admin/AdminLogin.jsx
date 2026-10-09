import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AdminLogin() {
  const { user, login } = useAuth(); const navigate = useNavigate(); const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [error, setError] = useState(""); const [loading, setLoading] = useState(false);
  if (user) return <Navigate to={user.role === "admin" ? "/admin/dashboard" : "/user/dashboard"} replace />;
  const handleSubmit = async (event) => {
    event.preventDefault(); setError(""); setLoading(true);
    try { const nextUser = await login(email, password); navigate(nextUser.role === "admin" ? "/admin/dashboard" : "/user/dashboard"); }
    catch (requestError) { setError(requestError.response?.data?.message || requestError.message || "Unable to sign in"); }
    finally { setLoading(false); }
  };
  return <main className="admin-login"><div className="admin-login__box"><span className="logo-mark">PP</span><div className="eyebrow">STUDIO CONSOLE</div><h1>Good morning, Prakalya.</h1><p>Sign in to manage your bookings, services, and studio.</p><form onSubmit={handleSubmit}><label>Studio email<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label><label>Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required /></label>{error && <p className="form-error">{error}</p>}<button className="button button--full" disabled={loading}>{loading ? "Signing in..." : "Enter console"}</button></form></div></main>;
}
