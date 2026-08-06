import React from "react";
import { Link } from "react-router-dom";
import {
  MessageSquare,
  Building2,
  Image as ImageIcon,
  Users,
  ArrowUpRight,
  ShieldCheck,
  Plus,
} from "lucide-react";
import logo from "../../assets/logo.png";

const AdminDashboard = () => {
  // Navigation Configuration Card Data
  const adminModules = [
    {
      title: "Inquiries & Leads",
      description:
        "Manage client submissions, cash offer requests, and contact inquiries.",
      path: "/admin/contact",
      icon: MessageSquare,
      badge: "Inquiries",
      color: "bg-blue-500/10 text-blue-600 border-blue-200",
    },
    {
      title: "Property Listings",
      description: "Create, edit, and publish active real estate properties.",
      path: "/admin/listing",
      icon: Building2,
      badge: "Listings",
      color: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
    },
    {
      title: "Media Gallery",
      description:
        "Upload and organize high-resolution property showcase photos.",
      path: "/admin/gallery",
      icon: ImageIcon,
      badge: "Gallery",
      color: "bg-purple-500/10 text-purple-600 border-purple-200",
    },
    {
      title: "Agents Directory",
      description:
        "Manage real estate agents, contact information, and profiles.",
      path: "/admin/agent",
      icon: Users,
      badge: "Agents",
      color: "bg-amber-500/10 text-amber-600 border-amber-200",
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Dashboard Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div className="flex items-center gap-4">
          <div>
            <Link to="/">
              <img src={logo} alt="Logo" className="h-28" />
            </Link>
          </div>

          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-secondary uppercase tracking-widest mb-1">
              <ShieldCheck size={16} />
              <span>Management Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight">
              Admin Dashboard
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Manage your listings, inquiries, image gallery, and agent
              directory.
            </p>
          </div>
        </div>
        {/* Quick Action Button */}
        <Link
          to="/admin/listing"
          className="inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/90 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition shadow-sm self-start sm:self-auto cursor-pointer"
        >
          <Plus size={18} />
          <span>Add New Listing</span>
        </Link>
      </div>

      {/* Navigation Modules Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {adminModules.map((module, index) => {
          const Icon = module.icon;
          return (
            <Link
              key={index}
              to={module.path}
              className="group bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-xl hover:border-primary/20 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Module Header & Icon */}
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-xl border ${module.color}`}>
                    <Icon size={24} />
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 group-hover:bg-primary group-hover:text-white transition-colors">
                    {module.badge}
                  </span>
                </div>

                {/* Module Title & Details */}
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-primary group-hover:text-secondary transition-colors flex items-center justify-between">
                    <span>{module.title}</span>
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {module.description}
                  </p>
                </div>
              </div>

              {/* Action Link Footer */}
              <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-primary group-hover:text-secondary transition-colors">
                <span>Manage Module</span>
                <ArrowUpRight
                  size={16}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default AdminDashboard;
