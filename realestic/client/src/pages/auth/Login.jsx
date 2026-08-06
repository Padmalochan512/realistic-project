import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { 
  Building2, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  ArrowLeft,
  Loader2 
} from "lucide-react";
import logo from "../../assets/logo.png";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
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
    setError("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/login/`,
        formData
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem(
          "is_superuser",
          response.data.is_superuser ? response.data.is_superuser.toString() : "false"
        );

        if (response.data.is_superuser) {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      } else {
        setError(response.data.message || "Invalid credentials provided.");
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.response?.data?.detail ||
          "Authentication failed. Please check your username and password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      
      {/* Background Decorative Gradient Blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-32 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md bg-white border border-slate-200 rounded-3xl shadow-xl p-8 sm:p-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Brand Header & Icon */}
        <div className="flex flex-col items-center mb-8 text-center">
         <Link to="/" >
            <img src={logo} alt="CNJ Home Buyers Logo" className="w-40  mb-4" />
         </Link>


          <h1 className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight -mt-10">
            Portal Authentication
          </h1>

          <p className="text-slate-500 text-xs sm:text-sm mt-1.5">
            Sign in to access property listings and admin control.
          </p>
        </div>

        {/* Alert Banner for Errors */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
            <AlertCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
            <span className="leading-snug font-medium">{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Username Field */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Username
            </label>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User size={18} />
              </div>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your administrative username"
                required
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs sm:text-sm placeholder:text-slate-400 outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Password
              </label>
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock size={18} />
              </div>

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your account password"
                required
                className="w-full pl-10 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs sm:text-sm placeholder:text-slate-400 outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition cursor-pointer"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit Action Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-secondary hover:bg-secondary/90 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition-all duration-200 cursor-pointer disabled:cursor-not-allowed shadow-sm hover:shadow-md flex items-center justify-center gap-2 text-xs sm:text-sm mt-2"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <span>Sign In to Admin</span>
            )}
          </button>
        </form>

        {/* Footer Navigation */}
        <div className="text-center mt-8 pt-6 border-t border-slate-100 space-y-3">
        

          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-slate-700 transition"
            >
              <ArrowLeft size={14} />
              <span>Back to Public Website</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;