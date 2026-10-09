import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import "./components/App.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Services from "./pages/Services";
import ServicesDetails from "./pages/ServicesDetails";
import Booking from "./pages/Booking";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyBookings from "./pages/MyBookings";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AuthProvider from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageUsers from "./pages/admin/ManageUsers";
import ManageServices from "./pages/admin/ManageServices";
import ManageBookings from "./pages/admin/ManageBookings";
import Reviews from "./pages/Reviews";
import ManageReviews from "./pages/admin/ManageReviews";
function App() {

  return (
    <BrowserRouter>
      <AuthProvider>

      <Navbar />

      <main>

        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/services"
            element={<Services />}
          />

          <Route
            path="/services/:id"
            element={<ServicesDetails />}
          />

          <Route
            path="/booking/:id"
            element={<Booking />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route element={<ProtectedRoute role="user" />}>
            <Route path="/user/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/bookings" element={<MyBookings />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/booking/:id" element={<Booking />} />
          </Route>

          <Route
            path="/about"
            element={<About />}
          />

          <Route
            path="/contact"
            element={<Contact />}
          />

          <Route path="/dashboard" element={<Navigate to="/user/dashboard" replace />} />

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route element={<ProtectedRoute role="admin" />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<ManageUsers />} />
              <Route path="/admin/services" element={<ManageServices />} />
              <Route path="/admin/bookings" element={<ManageBookings />} />
              <Route path="/admin/reviews" element={<ManageReviews />} />
            </Route>
          </Route>

        </Routes>

      </main>

      <Footer />
      </AuthProvider>

    </BrowserRouter>
  );
}

export default App;