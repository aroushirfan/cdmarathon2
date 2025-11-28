import { useState } from "react";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login form submitted", formData);
  };

  return (
    <section className="max-w-md mx-auto mt-16 bg-white shadow-lg p-8 rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="w-full border p-2 rounded-md"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="w-full border p-2 rounded-md"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {/* 🔹 Forgot password link */}
          <p className="text-right mt-1">
            <button
              type="button"
              className="text-indigo-600 text-sm hover:underline"
              onClick={() => alert("Password reset feature coming soon!")}
            >
              Forgot your password?
            </button>
          </p>
        </div>

        {/* Submit button */}
        <button
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
        >
          Login
        </button>
      </form>
    </section>
  );
};

export default LoginPage;
