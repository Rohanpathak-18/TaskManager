import { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { motion } from "framer-motion";

import {
  FaTasks,
  FaChartBar,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] =
    useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const isActive = (path) =>
    location.pathname === path;

  return (
    <motion.nav
      initial={{
        y: -50,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      className="bg-slate-900/95 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}

          <Link
            to="/dashboard"
            className="text-2xl font-bold"
          >
            <span className="text-indigo-500">
              Task
            </span>
            <span className="text-white">
              Manager
            </span>
          </Link>

          {/* Desktop Menu */}

          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/dashboard"
              className={`flex items-center gap-2 transition ${
                isActive(
                  "/dashboard"
                )
                  ? "text-indigo-400"
                  : "text-white hover:text-indigo-400"
              }`}
            >
              <FaChartBar />
              Dashboard
            </Link>

            <Link
              to="/tasks"
              className={`flex items-center gap-2 transition ${
                isActive("/tasks")
                  ? "text-indigo-400"
                  : "text-white hover:text-indigo-400"
              }`}
            >
              <FaTasks />
              Tasks
            </Link>

            <button
              onClick={logout}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>

          {/* Mobile Button */}

          <button
            className="md:hidden text-2xl"
            onClick={() =>
              setMenuOpen(
                !menuOpen
              )
            }
          >
            {menuOpen ? (
              <FaTimes />
            ) : (
              <FaBars />
            )}
          </button>
        </div>

        {/* Mobile Menu */}

        {menuOpen && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            className="md:hidden mt-4 flex flex-col gap-4 pb-4"
          >
            <Link
              to="/dashboard"
              onClick={() =>
                setMenuOpen(
                  false
                )
              }
              className={`flex items-center gap-2 ${
                isActive(
                  "/dashboard"
                )
                  ? "text-indigo-400"
                  : "text-white"
              }`}
            >
              <FaChartBar />
              Dashboard
            </Link>

            <Link
              to="/tasks"
              onClick={() =>
                setMenuOpen(
                  false
                )
              }
              className={`flex items-center gap-2 ${
                isActive("/tasks")
                  ? "text-indigo-400"
                  : "text-white"
              }`}
            >
              <FaTasks />
              Tasks
            </Link>

            <button
              onClick={logout}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg w-fit"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}

export default Navbar;