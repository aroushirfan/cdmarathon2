import { useState } from "react";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone_number: "",
    gender: "",
    date_of_birth: "",
    membership_status: "basic",
    street: "",
    city: "",
    zipCode: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup form submitted:", formData);
  };

  return (
    <section className="max-w-lg mx-auto mt-16 bg-white shadow-lg p-8 rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Sign Up</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Name */}
        <div>
          <label className="block font-medium mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="John Doe"
            className="w-full border p-2 rounded-md"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            placeholder="example@email.com"
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
            placeholder="********"
            className="w-full border p-2 rounded-md"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block font-medium mb-1">Phone Number</label>
          <input
            type="text"
            name="phone_number"
            placeholder="+123 456 789"
            className="w-full border p-2 rounded-md"
            value={formData.phone_number}
            onChange={handleChange}
            required
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block font-medium mb-1">Gender</label>
          <select
            name="gender"
            className="w-full border p-2 rounded-md"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* DOB */}
        <div>
          <label className="block font-medium mb-1">Date of Birth</label>
          <input
            type="date"
            name="date_of_birth"
            className="w-full border p-2 rounded-md"
            value={formData.date_of_birth}
            onChange={handleChange}
            required
          />
        </div>
        

        {/* Address */}
        <div>
          <label className="block font-medium mb-1">Street</label>
          <input
            type="text"
            name="street"
            placeholder="123 Main Street"
            className="w-full border p-2 rounded-md"
            value={formData.street}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-medium mb-1">City</label>
            <input
              type="text"
              name="city"
              placeholder="New York"
              className="w-full border p-2 rounded-md"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex-1">
            <label className="block font-medium mb-1">Zip Code</label>
            <input
              type="text"
              name="zipCode"
              placeholder="10001"
              className="w-full border p-2 rounded-md"
              value={formData.zipCode}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition">
          Create Account
        </button>
      </form>
    </section>
  );
};

export default SignupPage;
