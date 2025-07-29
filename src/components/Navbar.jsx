import { useContext, useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logout successful!");
      navigate("/");
    } catch (error) {
      toast.error("Logout failed!");
    }
  };

  useEffect(() => {
    const closeDropdown = () => setDropdownOpen(false);
    window.addEventListener("click", closeDropdown);
    return () => window.removeEventListener("click", closeDropdown);
  }, []);

  return (
    <nav className="bg-green-700 text-white px-6 py-3 flex justify-between items-center sticky top-0 z-50">
      {/* Logo + Website Name */}
      <Link to="/" className="flex items-center space-x-2">
        <img
          src="https://i.ibb.co/T4yk5Qz/logo.png"
          alt="Tourist Guide Logo"
          className="h-8 w-8"
        />
        <span className="font-bold text-xl">Tourist Guide</span>
      </Link>

      {/* Links */}
      <ul className="hidden md:flex space-x-6 font-medium">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "underline" : "hover:underline"
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/community"
            className={({ isActive }) =>
              isActive ? "underline" : "hover:underline"
            }
          >
            Community
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "underline" : "hover:underline"
            }
          >
            About Us
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/trips"
            className={({ isActive }) =>
              isActive ? "underline" : "hover:underline"
            }
          >
            Trips
          </NavLink>
        </li>
      </ul>

      {/* Login/Register or User Profile */}
      <div className="relative">
        {!user ? (
          <div className="space-x-4">
            <Link
              to="/login"
              className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded"
            >
              Register
            </Link>
          </div>
        ) : (
          <div
            className="flex items-center cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setDropdownOpen(!dropdownOpen);
            }}
          >
            <img
              src={user.photoURL || "https://i.ibb.co/7QpKsCX/user.png"}
              alt="Profile"
              className="h-10 w-10 rounded-full border-2 border-white"
            />
            {/* Dropdown */}
            {dropdownOpen && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute right-0 mt-12 bg-white text-gray-700 rounded shadow-lg w-56 py-2 z-50"
              >
                <div className="px-4 py-2 border-b text-sm font-semibold">
                  {user.displayName || "No Name"}
                  <br />
                  <span className="text-xs text-gray-500">{user.email}</span>
                </div>
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 hover:bg-green-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/offer-announcements"
                  className="block px-4 py-2 hover:bg-green-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  Offer Announcements
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-green-100 text-red-600 font-semibold"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
