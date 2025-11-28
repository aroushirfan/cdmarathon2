import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone_number: "",
    gender: "",
    street: "",
    city: "",
    zipCode: "",
  });

  const API_URL = "http://localhost:4000/api/users"; // corrected backend URL

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formattedData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone_number: formData.phone_number,
      gender: formData.gender,
      address: {
        street: formData.street,
        city: formData.city,
        zipCode: formData.zipCode,
      },
    };

    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Signup failed");
        setLoading(false);
        return;
      }

      alert("🎉 Account created successfully! Please log in.");

      // ❗ DO NOT auto-login
      localStorage.removeItem("token");

      // redirect to login page
      navigate("/login");

    } catch (error) {
      console.error("Signup error:", error);
      alert("❌ Could not connect to server.");
    }

    setLoading(false);
  };

  return (
    <section className="max-w-lg mx-auto mt-16 bg-white shadow-lg p-8 rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Sign Up</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full border p-2 rounded-md"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-2 rounded-md"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-2 rounded-md"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="phone_number"
          placeholder="Phone Number"
          className="w-full border p-2 rounded-md"
          value={formData.phone_number}
          onChange={handleChange}
          required
        />

        <select
          name="gender"
          className="w-full border p-2 rounded-md"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="text"
          name="street"
          placeholder="Street"
          className="w-full border p-2 rounded-md"
          value={formData.street}
          onChange={handleChange}
          required
        />

        <div className="flex gap-4">
          <input
            type="text"
            name="city"
            placeholder="City"
            className="w-full border p-2 rounded-md"
            value={formData.city}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="zipCode"
            placeholder="Zip Code"
            className="w-full border p-2 rounded-md"
            value={formData.zipCode}
            onChange={handleChange}
            required
          />
        </div>

        <button
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>
      </form>
    </section>
  );
};

export default SignupPage;
