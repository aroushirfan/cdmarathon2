import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditJobPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [salary, setSalary] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  // Load Existing Job
  useEffect(() => {
    const fetchJob = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("❌ You must be logged in to edit a job");
        return navigate("/login");
      }

      try {
        const res = await fetch(`/api/jobs/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error();

        const data = await res.json();

        // Fill form
        setTitle(data.title);
        setType(data.type);
        setLocation(data.location);
        setDescription(data.description);
        setSalary(data.salary);
        setCompanyName(data.company.name);
        setCompanyDescription(data.company.description);
        setContactEmail(data.company.contactEmail);
        setContactPhone(data.company.contactPhone);

      } catch (err) {
        toast.error("❌ Failed to load job details");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id, navigate]);

  // Submit Updated Data
  const submitForm = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) return toast.error("Unauthorized");

    const updatedJob = {
      title,
      type,
      location,
      description,
      salary,
      company: {
        name: companyName,
        description: companyDescription,
        contactEmail,
        contactPhone,
      },
    };

    try {
      const res = await fetch(`/api/jobs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedJob),
      });

      if (!res.ok) throw new Error();

      toast.success("✅ Job Updated Successfully!");
      navigate(`/jobs/${id}`);

    } catch {
      toast.error("❌ Failed to update job.");
    }
  };

  if (loading) return <p className="text-center mt-20">Loading job data...</p>;

  return (
    <section className="bg-indigo-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white p-6 rounded-lg shadow-md">

          <form onSubmit={submitForm}>
            <h2 className="text-3xl text-center font-semibold mb-6">
              Update Job
            </h2>

            {/* Job Type */}
            <label className="block font-bold mb-1">Job Type</label>
            <select className="border w-full p-2 mb-4"
              value={type} onChange={(e) => setType(e.target.value)}>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Remote">Remote</option>
              <option value="Internship">Internship</option>
            </select>

            <label className="block font-bold mb-1">Job Title</label>
            <input className="border w-full p-2 mb-4" value={title} onChange={(e) => setTitle(e.target.value)} />

            <label className="block font-bold mb-1">Description</label>
            <textarea className="border w-full p-2 mb-4" rows="4"
              value={description} onChange={(e) => setDescription(e.target.value)} ></textarea>

            <label className="block font-bold mb-1">Salary</label>
            <input className="border w-full p-2 mb-4"
              value={salary} onChange={(e) => setSalary(e.target.value)} />

            <label className="block font-bold mb-1">Location</label>
            <input className="border w-full p-2 mb-4"
              value={location} onChange={(e) => setLocation(e.target.value)} />

            <h3 className="text-xl font-bold mt-4 mb-2">Company Info</h3>

            <input className="border w-full p-2 mb-4" placeholder="Company Name"
              value={companyName} onChange={(e) => setCompanyName(e.target.value)} />

            <textarea className="border w-full p-2 mb-4" placeholder="Company Description"
              rows="3" value={companyDescription} onChange={(e) => setCompanyDescription(e.target.value)} ></textarea>

            <input className="border w-full p-2 mb-4" placeholder="Email"
              value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} />

            <input className="border w-full p-2 mb-4" placeholder="Phone"
              value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} />

            <button className="bg-indigo-500 text-white w-full py-2 rounded-full">
              Update Job
            </button>
          </form>

        </div>
      </div>
    </section>
  );
};

export default EditJobPage;
