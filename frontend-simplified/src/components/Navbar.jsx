import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // redirect to home after logout
  };

  return (
    <nav className="flex justify-between items-center p-4 shadow">
      <Link to="/" className="text-2xl font-bold flex items-center">
        <img
          src="/src/assets/images/logo.png"
          alt="React Logo"
          className="w-8 h-8 mr-2"
        />
        React Jobs
      </Link>

      <div className="flex gap-6">
        {!user && (
          <>
            <Link to="/login" className="hover:text-indigo-600">
              Login
            </Link>
            <Link className="bg-indigo-600 text-white px-3 py-1 rounded" to="/signup">
              Sign Up
            </Link>
          </>
        )}

        {user && (
          <>
            <Link to="/jobs" className="hover:text-indigo-600">
              Jobs
            </Link>
            <Link to="/add-job" className="hover:text-indigo-600">
              Add Job
            </Link>
            <button
              onClick={handleLogout}
              className="text-red-500 hover:text-red-700 font-semibold"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
