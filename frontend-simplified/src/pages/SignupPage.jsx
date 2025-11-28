import { useState } from "react";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone_number: "",
    gender: "",
    date_of_birth: "",
    membership_status: "",
    street: "",
    city: "",
    zipCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TEMP: just console.log for now (mock server phase)
    console.log("Signup form submitted", formData);
  };

  return (
    <section className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* name, email, password etc – use labels + inputs */}
      </form>
    </section>
  );
};

export default SignupPage;
