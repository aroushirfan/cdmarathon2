import { useState } from "react";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        setLoading(false);
        return;
      }

      alert("Logged in successfully!");
      localStorage.setItem("token", data.token);

      window.location.href = "/jobs"; // redirect to jobs page
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <section className="max-w-md mx-auto mt-16 bg-white shadow-lg p-8 rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        
        <input type="email" name="email" placeholder="Email"
          className="w-full border p-2 rounded-md"
          value={formData.email} onChange={handleChange} required />

        <input type="password" name="password" placeholder="Password"
          className="w-full border p-2 rounded-md"
          value={formData.password} onChange={handleChange} required />

        <button disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition">
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </section>
  );
};

export default LoginPage;
