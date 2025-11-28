import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const API_BASE = "http://localhost:4000/api"; // backend base URL

export function useLogin() {
  const [error, setError] = useState(null);
  const { login } = useAuth();

  const loginUser = async (email, password) => {
    try {
      setError(null);

      const res = await fetch(`${API_BASE}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Invalid credentials");
        return false;
      }

      // Save token
      localStorage.setItem("token", data.token);

      // Save user email into context
      login({ email: data.email });

      return true;
    } catch (err) {
      setError("Something went wrong.");
      return false;
    }
  };

  return { loginUser, error };
}
