import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api, { API_BASE_URL } from "../../lib/api";
import {
  Users,
  UserPlus,
  Search,
  Pencil,
  Trash2,
  Mail,
  Phone,
  MapPin,
  ArrowLeft,
  RefreshCw,
  X,
  Loader2,
  CheckCircle2,
  UserCheck,
} from "lucide-react";

const API = `${API_BASE_URL}/agents/`;

const initialState = {
  name: "",
  image: "",
  bio: "",
  phone: "",
  address: "",
  email: "",
};

const AdminAgent = () => {
  const [agents, setAgents] = useState([]);
  const [formData, setFormData] = useState(initialState);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: token ? `Token ${token}` : "",
    },
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    setFetching(true);
    try {
      const res = await api.get(API, config);
      const data = res.data.data || res.data || [];
      setAgents(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching agents:", err);
    } finally {
      setFetching(false);
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData(initialState);
    setShowModal(true);
  };

  const handleEdit = (agent) => {
    setEditingId(agent.id);
    setFormData({
      name: agent.name || "",
      image: agent.image || "",
      bio: agent.bio || "",
      phone: agent.phone || "",
      address: agent.address || "",
      email: agent.email || "",
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData(initialState);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingId) {
        await api.put(`${API}${editingId}/`, formData, config);
      } else {
        await api.post(API, formData, config);
      }

      fetchAgents();
      closeModal();
    } catch (err) {
      console.error("Agent save error:", err);
      alert("Failed to save agent details.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm("Are you sure you want to remove this real estate agent?")
    )
      return;

    try {
      await api.delete(`${API}${id}/`, config);
      fetchAgents();
    } catch (err) {
      console.error("Delete agent error:", err);
      alert("Failed to delete agent.");
    }
  };

  // Filter agents by search term
  const filteredAgents = agents.filter((agent) => {
    const term = searchTerm.toLowerCase();
    return (
      (agent.name || "").toLowerCase().includes(term) ||
      (agent.email || "").toLowerCase().includes(term) ||
      (agent.phone || "").includes(term) ||
      (agent.address || "").toLowerCase().includes(term)
    );
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Header & Navigation */}
      <div className="flex flex-col gap-3 pb-4 border-b border-slate-200">
        {/* Back Link */}
        <div>
          <Link
            to="/admin/dashboard"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-primary transition py-1 px-2.5 rounded-lg bg-slate-100 hover:bg-slate-200/80 border border-slate-200"
          >
            <ArrowLeft size={14} />
            <span>Back to Dashboard</span>
          </Link>
        </div>

        {/* Title Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight flex items-center gap-2">
              <Users className="text-secondary" size={28} />
              <span>Real Estate Agents Directory</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Manage CNJ Home Buyers sales representatives, agent bios, and
              contact details.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={fetchAgents}
              className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3.5 py-2.5 rounded-xl text-xs font-bold transition border border-slate-200 cursor-pointer"
            >
              <RefreshCw size={14} className={fetching ? "animate-spin" : ""} />
              <span>Refresh</span>
            </button>

            <button
              onClick={openAddModal}
              className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-xs cursor-pointer"
            >
              <UserPlus size={16} />
              <span>Add New Agent</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search agent name, email, phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-primary transition"
          />
        </div>

        <div className="text-xs font-bold text-slate-500 self-end sm:self-center">
          Total Agents:{" "}
          <span className="text-primary font-extrabold">{agents.length}</span>
        </div>
      </div>

      {/* Agents Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="px-5 py-4">Agent</th>
                <th className="px-5 py-4">Contact Info</th>
                <th className="px-5 py-4">Address / Base</th>
                <th className="px-5 py-4">Bio / Summary</th>
                <th className="px-5 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {fetching ? (
                [...Array(4)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={5} className="px-5 py-4">
                      <div className="h-6 bg-slate-200 rounded-md w-full" />
                    </td>
                  </tr>
                ))
              ) : filteredAgents.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-slate-400">
                    <Users size={32} className="mx-auto mb-2 opacity-50" />
                    <p className="font-semibold text-slate-600">
                      No agents found.
                    </p>
                    <p className="text-xs">
                      Try adjusting your search terms or add a new agent.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredAgents.map((agent) => (
                  <tr
                    key={agent.id}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    {/* Agent Profile */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            agent.image ||
                            `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              agent.name || "Agent",
                            )}&background=003B6D&color=fff`
                          }
                          alt={agent.name}
                          className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                          onError={(e) => {
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              agent.name || "Agent",
                            )}&background=003B6D&color=fff`;
                          }}
                        />
                        <div>
                          <p className="font-bold text-primary">
                            {agent.name || "N/A"}
                          </p>
                          <p className="text-[11px] text-slate-400 font-semibold">
                            Licensed Representative
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Contact Details */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="space-y-1 text-xs">
                        {agent.email && (
                          <a
                            href={`mailto:${agent.email}`}
                            className="flex items-center gap-1.5 text-slate-700 hover:text-secondary font-medium transition"
                          >
                            <Mail
                              size={13}
                              className="text-slate-400 shrink-0"
                            />
                            <span>{agent.email}</span>
                          </a>
                        )}
                        {agent.phone && (
                          <a
                            href={`tel:${agent.phone}`}
                            className="flex items-center gap-1.5 text-slate-500 hover:text-primary transition"
                          >
                            <Phone
                              size={13}
                              className="text-slate-400 shrink-0"
                            />
                            <span>{agent.phone}</span>
                          </a>
                        )}
                      </div>
                    </td>

                    {/* Location */}
                    <td className="px-5 py-4 text-slate-600 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-xs max-w-[180px] truncate">
                        <MapPin size={13} className="text-secondary shrink-0" />
                        <span className="truncate">
                          {agent.address || "N/A"}
                        </span>
                      </div>
                    </td>

                    {/* Bio */}
                    <td className="px-5 py-4 max-w-xs text-slate-600">
                      <p className="line-clamp-2 text-xs leading-relaxed">
                        {agent.bio || "No biography provided."}
                      </p>
                    </td>

                    {/* Action Buttons */}
                    <td className="px-5 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleEdit(agent)}
                          title="Edit Agent Profile"
                          className="p-2 bg-slate-100 hover:bg-primary hover:text-white text-slate-600 rounded-lg transition cursor-pointer"
                        >
                          <Pencil size={15} />
                        </button>

                        <button
                          onClick={() => handleDelete(agent.id)}
                          title="Remove Agent"
                          className="p-2 bg-red-50 hover:bg-secondary text-secondary hover:text-white rounded-lg transition cursor-pointer"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE / EDIT AGENT MODAL */}
      {showModal && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-primary text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserCheck size={20} className="text-secondary" />
                <h3 className="font-bold text-base">
                  {editingId ? "Update Agent Profile" : "Add New Agent"}
                </h3>
              </div>
              <button
                onClick={closeModal}
                className="text-slate-300 hover:text-white p-1 transition cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Form */}
            <form
              onSubmit={handleSubmit}
              className="p-6 space-y-4 text-xs sm:text-sm"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">
                    Full Name <span className="text-secondary">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-primary transition"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">
                    Email Address <span className="text-secondary">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="e.g. sarah@cnjhomebuyers.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-primary transition"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">
                    Phone Number <span className="text-secondary">*</span>
                  </label>
                  <input
                    type="text"
                    name="phone"
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-primary transition"
                  />
                </div>

                {/* Image URL */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">
                    Profile Photo URL
                  </label>
                  <input
                    type="url"
                    name="image"
                    placeholder="https://images.unsplash.com/photo..."
                    value={formData.image}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-primary transition"
                  />
                </div>

                {/* Live Avatar Preview */}
                {formData.image.trim() !== "" && (
                  <div className="sm:col-span-2 flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <img
                      src={formData.image}
                      alt="Avatar Preview"
                      className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                      onError={(e) => {
                        e.target.src =
                          "https://placehold.co/100x100?text=Invalid";
                      }}
                    />
                    <div>
                      <p className="text-[11px] font-bold text-slate-400 uppercase">
                        Live Image Preview
                      </p>
                      <p className="text-xs text-slate-600 font-medium truncate max-w-xs">
                        {formData.image}
                      </p>
                    </div>
                  </div>
                )}

                {/* Address */}
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1.5">
                    Office / Regional Address{" "}
                    <span className="text-secondary">*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    placeholder="e.g. Patia Square, Bhubaneswar"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-primary transition"
                  />
                </div>

                {/* Bio */}
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1.5">
                    Agent Biography & Specialization
                  </label>
                  <textarea
                    rows={4}
                    name="bio"
                    placeholder="Brief description of experience, property specialization, client feedback..."
                    value={formData.bio}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-primary transition resize-none leading-relaxed"
                  />
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 bg-secondary hover:bg-secondary/90 text-white font-bold rounded-xl text-xs transition flex items-center gap-2 shadow-xs cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Saving Agent...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={16} />
                      <span>{editingId ? "Update Agent" : "Add Agent"}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAgent;
