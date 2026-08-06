import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, LayoutDashboard, User } from "lucide-react";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const isSuperuser = localStorage.getItem("is_superuser") === "true";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("is_superuser");
    setIsOpen(false);
    navigate("/login");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Listing", path: "/listing" },
    { name: "Gallery", path: "/gallery" },
    { name: "Agents", path: "/agents" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-primary text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="CNJ Home Buyers"
            className="h-12 w-auto object-contain bg-white/90 p-1 rounded-md"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `text-sm font-medium tracking-wide transition-colors py-1 border-b-2 ${
                  isActive
                    ? "text-secondary border-secondary font-semibold"
                    : "text-slate-200 border-transparent hover:text-white hover:border-slate-300"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Right Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {/* Admin Dashboard */}
          {token && isSuperuser && (
            <Link
              to="/admin/dashboard"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-white/10 hover:bg-white/20 text-white transition border border-white/20"
            >
              <LayoutDashboard size={16} />
              Dashboard
            </Link>
          )}

          {/* Login */}
          {!token && (
            <Link
              to="/login"
              className="flex items-center gap-1.5 bg-secondary hover:bg-secondary/90 text-white px-5 py-2.5 rounded-lg font-semibold text-sm shadow-sm transition"
            >
              <User size={16} />
              Login
            </Link>
          )}

          {/* Logout */}
          {token && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 bg-secondary hover:bg-secondary/90 text-white px-5 py-2.5 rounded-lg font-semibold text-sm shadow-sm transition cursor-pointer"
            >
              <LogOut size={16} />
              Logout
            </button>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md text-slate-200 hover:text-white hover:bg-white/10 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-primary/95 border-t border-white/10 px-4 pt-3 pb-6 space-y-3 shadow-xl">
          {navLinks.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block py-2 text-base font-medium transition ${
                  isActive ? "text-secondary font-semibold" : "text-slate-200 hover:text-white"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

          <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
            {token && isSuperuser && (
              <Link
                to="/admin/dashboard"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-white/10 text-white font-medium text-sm"
              >
                <LayoutDashboard size={16} />
                Dashboard
              </Link>
            )}

            {!token ? (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-secondary text-white font-semibold text-sm shadow-md"
              >
                <User size={16} />
                Login
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-secondary text-white font-semibold text-sm shadow-md cursor-pointer"
              >
                <LogOut size={16} />
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;