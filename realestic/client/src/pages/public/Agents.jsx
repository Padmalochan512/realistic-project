import React, { useEffect, useState } from "react";
import api, { API_BASE_URL } from "../../lib/api";
import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  Award,
  ArrowRight,
  UserCheck,
  Shield,
} from "lucide-react";

const Agents = () => {
  const API = API_BASE_URL;

  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const res = await api.get(`${API}/agents/`);
      const data = res.data.data || res.data || [];
      setAgents(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching agents:", err);
    } finally {
      setLoading(false);
    }
  };

  const defaultAvatar =
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80";

  // SKELETON LOADER
  if (loading) {
    return (
      <div className="bg-slate-50 min-h-screen py-16 px-6">
        <div className="max-w-7xl mx-auto space-y-10 animate-pulse">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="h-6 bg-slate-200 rounded-full w-32 mx-auto"></div>
            <div className="h-10 bg-slate-200 rounded-xl w-3/4 mx-auto"></div>
            <div className="h-4 bg-slate-200 rounded w-1/2 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl h-[420px] border border-slate-200"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Hero */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
            Meet Our Real Estate Experts
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            Our experienced team of local real estate professionals is ready to
            help you buy, sell, or evaluate property with confidence.
          </p>
        </div>

        {/* Agents Grid */}
        {agents.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center max-w-md mx-auto space-y-3 shadow-xs">
            <div className="p-4 bg-slate-100 rounded-full w-16 h-16 mx-auto flex items-center justify-center text-slate-400">
              <UserCheck size={32} />
            </div>
            <h3 className="text-lg font-bold text-primary">No Agents Listed</h3>
            <p className="text-slate-500 text-xs sm:text-sm">
              Our team directory is currently being updated. Please check back
              shortly or reach out through our contact page.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {agents.map((agent) => (
              <div
                key={agent.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  {/* Photo Container */}
                  <div className="relative h-72 bg-slate-100 overflow-hidden">
                    <img
                      src={agent.image || defaultAvatar}
                      alt={agent.name || "Real Estate Agent"}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = defaultAvatar;
                      }}
                    />
                    {agent.title && (
                      <span className="absolute bottom-3 left-3 bg-primary/90 backdrop-blur-xs text-white text-xs font-semibold px-3 py-1 rounded-lg shadow-sm">
                        {agent.title}
                      </span>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-3">
                    <h2 className="text-xl font-bold text-primary group-hover:text-secondary transition-colors">
                      {agent.name}
                    </h2>

                    <p className="text-slate-600 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                      {agent.bio ||
                        "Dedicated real estate professional committed to helping clients achieve their property goals with ease and trust."}
                    </p>
                  </div>
                </div>

                {/* Footer Links */}
                <div className="p-6 pt-0 border-t border-slate-100 mt-4 space-y-4">
                  {/* Quick Contacts */}
                  <div className="flex items-center gap-3 pt-4 text-slate-500 text-xs">
                    {agent.phone && (
                      <a
                        href={`tel:${agent.phone}`}
                        className="flex items-center gap-1.5 hover:text-primary transition"
                        title="Call Agent"
                      >
                        <Phone size={14} className="text-secondary" />
                        <span className="truncate">{agent.phone}</span>
                      </a>
                    )}
                    {agent.email && (
                      <a
                        href={`mailto:${agent.email}`}
                        className="flex items-center gap-1.5 hover:text-primary transition"
                        title="Email Agent"
                      >
                        <Mail size={14} className="text-secondary" />
                        <span className="truncate">{agent.email}</span>
                      </a>
                    )}
                  </div>

                  <Link
                    to={`/agents/${agent.id}`}
                    className="w-full inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-primary hover:text-white text-primary font-bold py-2.5 px-4 rounded-xl text-xs transition duration-200 group/btn"
                  >
                    <span>View Profile</span>
                    <ArrowRight
                      size={14}
                      className="group-hover/btn:translate-x-1 transition-transform"
                    />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Agents;
