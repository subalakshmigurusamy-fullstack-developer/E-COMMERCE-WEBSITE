import { createContext, useContext, useState } from "react";
import API from "../services/api";

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("pleat_user")) || null; } catch { return null; }
  });

  const login = async (email, password) => {
    const normalizedEmail = String(email || "").trim().toLowerCase();
    const normalizedPassword = String(password || "");

    if (!normalizedEmail || !normalizedPassword) {
      throw new Error("Email and password are required");
    }

    let response;
    try {
      response = await API.post("/auth/login", {
        email: normalizedEmail,
        password: normalizedPassword
      });
    } catch (error) {
      if (!error.response) {
        throw new Error("Unable to connect to the server. Start the backend on port 5000 and try again.");
      }
      if (error.response.status === 401) {
        throw new Error(error.response.data?.message || "Invalid email or password");
      }
      throw error;
    }

    const { user: nextUser, token } = response.data;
    if (!nextUser || !token) {
      throw new Error("The server returned an invalid login response");
    }

    localStorage.setItem("pleat_user", JSON.stringify(nextUser));
    localStorage.setItem("pleat_token", token);
    setUser(nextUser);
    return nextUser;
  };

  const register = async (details) => {
    const response = await API.post("/auth/register", details);
    localStorage.setItem("pleat_user", JSON.stringify(response.data.user));
    localStorage.setItem("pleat_token", response.data.token);
    setUser(response.data.user);
    return response.data.user;
  };

  const logout = () => {
    localStorage.removeItem("pleat_user");
    localStorage.removeItem("pleat_token");
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>;
}