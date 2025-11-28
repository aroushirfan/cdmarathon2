import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddJobPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    type: "",
    location: "",
    description: "",
    salary: "",
    companyName: "",
    companyDescription: "",
    contactEmail: "",
    contactPhone: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addJob = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("⚠️ You must be logged in to add a job!");
      navigate("/login");
      return;
    }

    const jobData = {
      title: formData.title,
      type: formData.type,
      location: formData.location,
      description: formData.description,
      salary: formData.salary,
      company: {
        name: formData.companyName,
        description: formData.companyDescription,
        contactEmail: formData.contactEmail,
        contactPhone: formData.contactPhone,
      },
    };

    try {
      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // <-- FIXED 🔥
        },
        body: JSON.stringify(jobData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      toast.success("✅ Job Added Successfully!");
      navigate("/jobs");
    } catch (error) {
      console.error(error);
      toast.error("❌ Failed to add job");
    }
  };

  return (
    <section className="max-w-2xl mx-auto mt-10 bg-white p-8 shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Add Job</h1>

      <form onSubmit={addJob} className="space-y-4">
        <input type="text" name="title" placeholder="Job Title" className="w-full border p-2 rounded" onChange={handleChange} required />

        <input type="text" name="type" placeholder="Job Type (Full-time / Part-time)" className="w-full border p-2 rounded" onChange={handleChange} required />

        <input type="text" name="location" placeholder="Location" className="w-full border p-2 rounded" onChange={handleChange} required />

        <textarea name="description" placeholder="Job Description" className="w-full border p-2 rounded h-24" onChange={handleChange} required />

        <input type="text" name="salary" placeholder="Salary (e.g. 4000 EUR/month)" className="w-full border p-2 rounded" onChange={handleChange} required />

        <hr />

        <h2 className="text-xl font-bold">Company Info</h2>

        <input type="text" name="companyName" placeholder="Company Name" className="w-full border p-2 rounded" onChange={handleChange} required />

        <textarea name="companyDescription" placeholder="Company Description" className="w-full border p-2 rounded h-20" onChange={handleChange} required />

        <input type="email" name="contactEmail" placeholder="Contact Email" className="w-full border p-2 rounded" onChange={handleChange} required />

        <input type="text" name="contactPhone" placeholder="Contact Phone" className="w-full border p-2 rounded" onChange={handleChange} required />

        <button className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700">
          Add Job
        </button>
      </form>
    </section>
  );
};

export default AddJobPage;
