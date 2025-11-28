import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const API_URL = "http://localhost:4000/api/users";

export function useSignup() {
  const [error, setError] = useState(null);
  const { login } = useAuth();

  const signupUser = async (formData) => {
    try {
      setError(null);

      const res = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed");
        return false;
      }

      // Store token
      localStorage.setItem("token", data.token);

      // Update global auth state
      login({ email: data.email });

      return true;
    } catch (err) {
      setError("Something went wrong.");
      return false;
    }
  };

  return { signupUser, error };
}
