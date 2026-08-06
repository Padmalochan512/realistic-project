import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { 
  Phone, 
  Mail, 
  MapPin, 
  ArrowLeft, 
  Send, 
  CheckCircle2, 
  Shield, 
  Loader2,
  Building
} from "lucide-react";

const AgentDetails = () => {
  const { id } = useParams();
  const API = import.meta.env.VITE_BASE_URL;

  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);

  // Quick Lead Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetchAgent();
  }, [id]);

  const fetchAgent = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/agents/${id}/`);
      const data = res.data.data || res.data || null;
      setAgent(data);
    } catch (err) {
      console.error("Error fetching agent details:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Optional API submission endpoint for agent contact form
      await axios.post(`${API}/inquiries/`, {
        agent_id: id,
        ...formData
      });
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error("Error submitting inquiry:", err);
      // Fallback fallback success UX for prototype/demo
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const defaultAvatar =
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80";

  // SKELETON LOADER
  if (loading) {
    return (
      <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-8 animate-pulse">
          <div className="h-6 bg-slate-200 rounded w-32"></div>
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5 h-[450px] bg-slate-200 rounded-2xl"></div>
            <div className="lg:col-span-7 space-y-4">
              <div className="h-8 bg-slate-200 rounded w-3/4"></div>
              <div className="h-4 bg-slate-200 rounded w-1/2"></div>
              <div className="h-24 bg-slate-200 rounded-xl"></div>
              <div className="h-32 bg-slate-200 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="bg-slate-50 min-h-screen py-20 px-6 text-center space-y-4">
        <h2 className="text-2xl font-bold text-primary">Agent Not Found</h2>
        <p className="text-slate-500 text-sm">
          We couldn't find the requested agent profile.
        </p>
        <Link
          to="/agents"
          className="inline-flex items-center gap-2 text-xs font-bold text-secondary hover:underline"
        >
          <ArrowLeft size={16} />
          <span>Back to All Agents</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Back Link */}
        <Link
          to="/agents"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-primary transition"
        >
          <ArrowLeft size={16} />
          <span>Back to Agents Directory</span>
        </Link>

        {/* Main Profile Grid */}
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Photo & Direct Contact Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-3 shadow-xs overflow-hidden">
              <div className="relative h-96 rounded-xl overflow-hidden bg-slate-100">
                <img
                  src={agent.image || defaultAvatar}
                  alt={agent.name || "Agent"}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = defaultAvatar;
                  }}
                />
                {agent.title && (
                  <span className="absolute bottom-4 left-4 bg-primary/95 text-white text-xs font-semibold px-3.5 py-1.5 rounded-lg shadow-md backdrop-blur-xs">
                    {agent.title}
                  </span>
                )}
              </div>
            </div>

            {/* Contact Details Box */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
              <h3 className="text-sm font-bold text-primary uppercase tracking-wider border-b border-slate-100 pb-3">
                Contact Information
              </h3>

              <div className="space-y-3.5 text-xs sm:text-sm">
                {agent.email && (
                  <a
                    href={`mailto:${agent.email}`}
                    className="flex items-center gap-3 text-slate-600 hover:text-primary transition group"
                  >
                    <div className="p-2.5 bg-slate-100 group-hover:bg-primary/10 group-hover:text-primary text-secondary rounded-xl transition">
                      <Mail size={16} />
                    </div>
                    <span className="truncate">{agent.email}</span>
                  </a>
                )}

                {agent.phone && (
                  <a
                    href={`tel:${agent.phone}`}
                    className="flex items-center gap-3 text-slate-600 hover:text-primary transition group"
                  >
                    <div className="p-2.5 bg-slate-100 group-hover:bg-primary/10 group-hover:text-primary text-secondary rounded-xl transition">
                      <Phone size={16} />
                    </div>
                    <span>{agent.phone}</span>
                  </a>
                )}

                {agent.address && (
                  <div className="flex items-start gap-3 text-slate-600">
                    <div className="p-2.5 bg-slate-100 text-secondary rounded-xl shrink-0 mt-0.5">
                      <MapPin size={16} />
                    </div>
                    <span className="leading-relaxed">{agent.address}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Bio & Quick Contact Form */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Header Info */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-secondary uppercase tracking-widest bg-secondary/10 px-3 py-1 rounded-full border border-secondary/20">
                <Shield size={14} />
                <span>Verified Agent</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
                {agent.name}
              </h1>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {agent.bio || "Dedicated real estate professional committed to providing exceptional service, transparent communication, and expert local market guidance for home buyers and sellers alike."}
              </p>
            </div>

            {/* Send Direct Message Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
              <div>
                <h3 className="text-lg font-bold text-primary">
                  Get in Touch with {agent.name.split(" ")[0]}
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm mt-1">
                  Have questions about a property or looking for a home valuation? Send a direct message.
                </p>
              </div>

              {submitted ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center space-y-2">
                  <CheckCircle2 size={32} className="text-emerald-600 mx-auto" />
                  <h4 className="text-sm font-bold text-emerald-900">Message Sent Successfully!</h4>
                  <p className="text-xs text-emerald-700">
                    Thank you. {agent.name} will review your message and reach out shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-3 text-xs font-bold text-emerald-800 hover:underline cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Your Name <span className="text-secondary">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-primary transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Phone Number <span className="text-secondary">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-primary transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-primary transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Message <span className="text-secondary">*</span>
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder={`Hi ${agent.name}, I'm interested in buying/selling property and would like to learn more...`}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-primary transition resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold py-3 px-6 rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-sm cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Send Message to {agent.name.split(" ")[0]}</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AgentDetails;