import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");
    setLoading(true);
    try {
      const nextUser = await login(email, password);
      navigate(nextUser.role === "admin" ? "/admin/dashboard" : "/user/dashboard");
    } catch (requestError) {
      setError(requestError.response?.data?.message || requestError.message || "Unable to sign in");
    } finally {
      setLoading(false);
    }

  };

  if (user) return <Navigate to={user.role === "admin" ? "/admin/dashboard" : "/user/dashboard"} replace />;
  return <div className="auth-layout">
      <div className="auth-note"><span className="logo-mark">PP</span><div className="eyebrow">A LITTLE HELP WITH THE BIG MOMENTS</div><h1>Wear the moment. We’ll handle the pleats.</h1><p>Thoughtful saree styling for weddings, celebrations, and every day you feel like dressing up.</p></div>

      <form
        className="auth-form"
        onSubmit={handleSubmit}
      >

        <div className="eyebrow">WELCOME BACK</div><h2>Come on in.</h2><p className="form-intro">Sign in to see your appointments and saved details.</p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
        />

        {error && <p className="form-error">{error}</p>}
        <button type="submit" disabled={loading}>{loading ? "Signing in..." : "Sign in"}</button>
        <p className="form-footer">New here? <Link to="/register">Create an account</Link></p> 

        <br />

      </form>

    </div>;
}

export default Login;