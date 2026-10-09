import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AuthProvider from "../context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../pages/Home";
import Services from "../pages/Services";
import ServicesDetails from "../pages/ServicesDetails";
import Booking from "../pages/Booking";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MyBookings from "../pages/MyBookings";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import AdminLogin from "../pages/admin/AdminLogin";
import AdminLayout from "../pages/admin/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import ManageUsers from "../pages/admin/ManageUsers";
import ManageServices from "../pages/admin/ManageServices";
import ManageBookings from "../pages/admin/ManageBookings";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

function AppRoutes() {
  const location = useLocation();
  const isAdminArea = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminArea && <Navbar />}
      <main>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:id" element={<ServicesDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            <Route element={<ProtectedRoute role="user" />}>
              <Route path="/user/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/bookings" element={<MyBookings />} />
              <Route path="/booking/:id" element={<Booking />} />
            </Route>

            <Route path="/dashboard" element={<Navigate to="/user/dashboard" replace />} />

            <Route path="/admin/login" element={<AdminLogin />} />
            <Route element={<ProtectedRoute role="admin" />}>
              <Route element={<AdminLayout />}>
                <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/users" element={<ManageUsers />} />
                <Route path="/admin/services" element={<ManageServices />} />
                <Route path="/admin/bookings" element={<ManageBookings />} />
              </Route>
            </Route>
        </Routes>
      </main>
      {!isAdminArea && <Footer />}
    </>
  );
}

export default App;
