import React, { useState } from "react";
import api, { API_BASE_URL } from "../../lib/api";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Loader2,
  ShieldCheck,
  Building2,
  Zap
} from "lucide-react";

const Contact = () => {
  const API = API_BASE_URL;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const res = await api.post(`${API}/contacts/create/`, formData);

      setSuccess(
        res.data.message || "Your inquiry has been submitted successfully! We will get in touch with you shortly."
      );

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong while sending your message. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header Hero */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          
          <h1 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
            Contact CNJ Home Buyers
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            Have questions about selling your home for cash or exploring current property listings? We're here to help!
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Contact Info & Value Badges */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Contact Cards */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
              <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-4">
                Reach Out Directly
              </h2>

              <div className="space-y-6 text-sm">
                
                {/* Phone */}
                <div className="flex items-start gap-4 group">
                  <div className="p-3 bg-secondary/10 text-secondary rounded-xl group-hover:bg-secondary group-hover:text-white transition-colors duration-200 shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Call or Text Us
                    </span>
                    <a
                      href="tel:+18005550199"
                      className="text-base font-bold text-primary hover:text-secondary transition"
                    >
                      +1 (800) 555-0199
                    </a>
                    <p className="text-xs text-slate-500 mt-0.5">Mon - Sat: 8:00 AM - 7:00 PM EST</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 group">
                  <div className="p-3 bg-secondary/10 text-secondary rounded-xl group-hover:bg-secondary group-hover:text-white transition-colors duration-200 shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Email Inquiries
                    </span>
                    <a
                      href="mailto:contact@cnjhomebuyers.com"
                      className="text-base font-bold text-primary hover:text-secondary transition"
                    >
                      contact@cnjhomebuyers.com
                    </a>
                    <p className="text-xs text-slate-500 mt-0.5">Fast response within 24 hours</p>
                  </div>
                </div>

                {/* Office Location */}
                <div className="flex items-start gap-4 group">
                  <div className="p-3 bg-secondary/10 text-secondary rounded-xl group-hover:bg-secondary group-hover:text-white transition-colors duration-200 shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Head Office
                    </span>
                    <p className="text-sm font-bold text-primary">
                      100 Main Street, Suite 400
                    </p>
                    <p className="text-xs text-slate-500">Corporate Center, NY 10001</p>
                  </div>
                </div>

                {/* Response Guarantee */}
                <div className="flex items-start gap-4 group">
                  <div className="p-3 bg-secondary/10 text-secondary rounded-xl group-hover:bg-secondary group-hover:text-white transition-colors duration-200 shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Fast Turnaround
                    </span>
                    <p className="text-sm font-bold text-primary">
                      24-Hour Cash Offers
                    </p>
                    <p className="text-xs text-slate-500">Get a fair cash offer on your property</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Why Choose Us Callout Box */}
            <div className="bg-primary text-white rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
              <h3 className="text-base font-bold flex items-center gap-2">
                <ShieldCheck className="text-secondary" size={20} />
                <span>Why Sell To CNJ Home Buyers?</span>
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-200">
                <li className="flex items-center gap-2">
                  <Zap size={14} className="text-secondary shrink-0" />
                  <span>No agent commissions or closing fees</span>
                </li>
                <li className="flex items-center gap-2">
                  <Zap size={14} className="text-secondary shrink-0" />
                  <span>We buy homes as-is (no repairs required)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Zap size={14} className="text-secondary shrink-0" />
                  <span>Flexible closing on your schedule</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Right Column: Contact Lead Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-primary">Send Us a Message</h2>
              <p className="text-slate-500 text-xs sm:text-sm mt-1">
                Fill out the form below and our team will get back to you promptly.
              </p>
            </div>

            {/* Alert Messages */}
            {success && (
              <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 flex items-start gap-3 text-emerald-800 text-xs sm:text-sm">
                <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold">Inquiry Sent!</p>
                  <p>{success}</p>
                </div>
              </div>
            )}

            {error && (
              <div className="rounded-xl bg-red-50 border border-red-200 p-4 flex items-start gap-3 text-red-800 text-xs sm:text-sm">
                <AlertCircle size={18} className="text-red-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold">Submission Failed</p>
                  <p>{error}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Full Name & Email */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Full Name <span className="text-secondary">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. John Doe"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-primary transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Email Address <span className="text-secondary">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-primary transition"
                  />
                </div>
              </div>

              {/* Phone & Subject */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Phone Number <span className="text-secondary">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-primary transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Subject <span className="text-secondary">*</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Selling Property / Buyer Inquiry"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-primary transition"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Message / Property Details <span className="text-secondary">*</span>
                </label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your inquiry or property address..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-primary transition resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold py-3.5 px-6 rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-sm cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Submitting Inquiry...</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Submit Query</span>
                  </>
                )}
              </button>

            </form>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Contact;
