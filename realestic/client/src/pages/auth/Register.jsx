import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/register/`,
        formData
      );

      setMessage(response.data.message || "Registration successful");

      setFormData({
        username: "",
        email: "",
        password: "",
      });

      navigate("/login");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.response?.data?.detail ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#F8F1E7] flex items-center justify-center px-4 py-10 relative overflow-hidden">
      {/* Background */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#E97824]/10 rounded-full" />
      <div className="absolute -bottom-40 -right-32 w-[500px] h-[500px] bg-[#20845E]/10 rounded-full" />

      {/* Register Card */}
      <div className="relative z-10 w-full max-w-sm bg-white border border-[#E6D5C5] rounded-2xl shadow-lg p-6">
        {/* Logo */}
        <div className="flex justify-center mb-3">
          LOGO
        </div>

        {/* Heading */}
        <div className="text-center mb-6">
          <p className="text-[#20845E] text-xs font-semibold uppercase tracking-widest mb-1">
            Coffee House
          </p>

          <h1 className="text-2xl font-bold text-[#3B120D]">
            Create Account
          </h1>

          <p className="text-[#765C50] text-sm mt-1">
            Join us and enjoy your favorite coffee.
          </p>
        </div>

        {/* Success */}
        {message && (
          <div className="mb-4 px-4 py-3 bg-green-50 border border-green-200 text-green-700 rounded-xl text-sm">
            {message}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-sm font-semibold text-[#3B120D] mb-1.5">
              Username
            </label>

            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter username"
              required
              className="w-full px-4 py-3 bg-[#FFFCF8] border border-[#E6D5C5] rounded-xl outline-none focus:border-[#E97824] focus:ring-2 focus:ring-[#E97824]/20"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-[#3B120D] mb-1.5">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
              className="w-full px-4 py-3 bg-[#FFFCF8] border border-[#E6D5C5] rounded-xl outline-none focus:border-[#E97824] focus:ring-2 focus:ring-[#E97824]/20"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-[#3B120D] mb-1.5">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
              className="w-full px-4 py-3 bg-[#FFFCF8] border border-[#E6D5C5] rounded-xl outline-none focus:border-[#E97824] focus:ring-2 focus:ring-[#E97824]/20"
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#E97824] hover:bg-[#D66718] disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-all duration-300 cursor-pointer"
          >
            {loading ? (
              <span className="flex justify-center items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
                Registering...
              </span>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Login */}
        <div className="text-center mt-5 pt-5 border-t border-[#F0E4D8]">
          <p className="text-sm text-[#765C50]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#20845E] hover:text-[#176B4C] font-semibold transition"
            >
              Login
            </Link>
          </p>
        </div>

        {/* Home */}
        <div className="text-center mt-3">
          <Link
            to="/"
            className="text-sm text-[#765C50] hover:text-[#E97824] transition"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;