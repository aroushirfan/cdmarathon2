This document reflects on the development of the full-stack job portal (frontend + backend). The reflection highlights what went well, what struggled, how debugging progressed, and improvements made during development.


What Went Well :-

Frontend

Successfully implemented job CRUD operations using React and React Router.

Layout and components were structured in a readable and reusable way (Navbar, HomePage, JobCard, EditJobPage, etc.).

Added clear user feedback using react-toastify, improving UX.

State management using useState and useEffect worked well for rendering correct UI states.

The Delete and Add Job features work securely after adding authentication.

Backend

Built secure API endpoints using Express and JWT authentication.

MongoDB schema validation with Mongoose helped prevent invalid data.

Login, Register, Add Job, Update Job, and Delete Job all worked after proper token validation.


Challenges & Fixes:-

Initially, some API requests failed with:

401 Unauthorized


This happened because the frontend attempted to fetch protected data without sending the Bearer token.

🔧 Fix Applied
const token = localStorage.getItem("token");

const res = await fetch(`/api/jobs/${id}`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

✔ Lesson Learned

Protected routes must always include authorization headers.

It's helpful to abstract fetch calls into reusable helper functions.


Challenge 2 — Edit Job Page Displayed Only a Button

The Edit page loaded, but form fields were empty due to a failing GET request (missing token). The component rendered before state was updated, resulting in:

Error: Job not found

Before (problematic):
const res = await fetch(`/api/jobs/${id}`);

After (fixed):
const res = await fetch(`/api/jobs/${id}`, {
  headers: { Authorization: `Bearer ${token}` }
});

✔ Lesson Learned

Always verify network requests (Chrome DevTools helped to identify 401 errors).

Always compare expected vs received data.


Challenge 3 — Delete Job Attempt Returned 400 Bad Request

Deleting a job initially failed because the URL attempted:

/jobs/undefined


This happened because the incorrect field (job.id) was used instead of (job._id).

Fix Applied
<Link to={`/edit-job/${job._id}`}>

✔ Lesson Learned

When working with MongoDB, _id must be used unless explicitly converted.

Console debugging and error logs were essential for fixing this.

Backend Challenges & Improvements

The backend development involved setting up REST APIs, authentication, MongoDB schema validation, and error handling. During development, several issues surfaced, which required debugging and design improvements.


Challenge 1 — Missing Authentication on Protected Routes

Initially, the backend API allowed anyone to update and delete jobs without being authenticated. This created security issues and caused the frontend to malfunction when a token was expected.

❌ Before (No validation)
router.put("/:id", updateJob);
router.delete("/:id", deleteJob);


Anyone could send a request using Postman and delete a job.

🔧 Fix Applied (Protected Routes)
router.put("/:id", protect, updateJob);
router.delete("/:id", protect, deleteJob);


protect middleware verified the JWT:

const token = req.headers.authorization?.split(" ")[1];
if (!token) return res.status(401).json({ message: "No token provided" });

✔️ Lesson Learned

Backend must ALWAYS enforce access control.

Middleware helps keep routes clean and consistent.

🔹 Challenge 2 — Route Order Caused “Invalid ID” Errors

Express matches routes in order, so placing dynamic routes before static ones caused unintended behavior like:

GET /api/jobs/salary
→ Interpreted as GET /api/jobs/:id  → "Invalid ObjectId"

❌ Before (Wrong Order)
router.get("/:id", getJobById);
router.get("/salary", filterJobsBySalary);

🔧 Fix
router.get("/salary", filterJobsBySalary);
router.get("/:id", getJobById);

✔ Lesson Learned

In Express, specific routes must appear before dynamic (/:param) routes.


Next Steps / Future Improvements:-

Implement role-based access control (only job creator can edit/delete).

Move fetch logic to a single API service file.

Add form validation and loading spinners.

Improve UI consistency using reusable button and input components.

Add pagination, search filters, and sorting to job listings.

Overall Reflection:-

The project was a strong learning experience combining frontend and backend logic. Debugging authentication and routing helped deepen understanding of:

REST API communication

JWT access control

React state lifecycle

Express routing order

MongoDB ID handling

Using an LLM helped clarify errors, generate fixes faster, and structure cleaner code during refactoring.

Final Status:
The application now supports secure full CRUD functionality, stable routing, JWT authentication, and responsive UI behavior.