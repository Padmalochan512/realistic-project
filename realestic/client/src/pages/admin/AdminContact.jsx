import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api, { API_BASE_URL } from "../../lib/api";
import {
  MessageSquare,
  Search,
  Trash2,
  Eye,
  Mail,
  Phone,
  Calendar,
  X,
  Filter,
  RefreshCw,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";

const AdminContact = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedContact, setSelectedContact] = useState(null);

  const API = API_BASE_URL;

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await api.get(`${API}/contacts/`);
      const data = res.data.data || res.data || [];
      setContacts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this contact query?",
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`${API}/contacts/${id}/delete/`);
      setContacts((prev) => prev.filter((item) => item.id !== id));
      if (selectedContact?.id === id) setSelectedContact(null);
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete contact query.");
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await api.put(`${API}/contacts/${id}/update/`, { status });
      setContacts((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status } : item)),
      );
      if (selectedContact?.id === id) {
        setSelectedContact((prev) => ({ ...prev, status }));
      }
    } catch (error) {
      console.error("Status update error:", error);
      alert("Failed to update status.");
    }
  };

  // Filter contacts by Search Query and Selected Status
  const filteredContacts = contacts.filter((item) => {
    const matchesSearch =
      (item.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.phone || "").includes(searchTerm) ||
      (item.subject || "").toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "new":
        return "bg-amber-100 text-amber-800 border-amber-300";
      case "contacted":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "closed":
        return "bg-emerald-100 text-emerald-800 border-emerald-300";
      default:
        return "bg-slate-100 text-slate-700 border-slate-300";
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Navigation & Page Header */}
      <div className="flex flex-col gap-3 pb-4 border-b border-slate-200">
        {/* Back to Dashboard Link */}
        <div>
          <Link
            to="/admin/dashboard"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-primary transition py-1 px-2.5 rounded-lg bg-slate-100 hover:bg-slate-200/80 border border-slate-200"
          >
            <ArrowLeft size={14} />
            <span>Back to Dashboard</span>
          </Link>
        </div>

        {/* Title and Refresh Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight flex items-center gap-2">
              <MessageSquare className="text-secondary" size={28} />
              <span>Contact Queries & Leads</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Review client messages, update inquiry status, and manage incoming
              home buyer requests.
            </p>
          </div>

          <button
            onClick={fetchContacts}
            className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold transition self-start sm:self-auto cursor-pointer border border-slate-200"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            <span>Refresh Leads</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search by name, email, phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-primary transition"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <Filter size={14} className="text-slate-400 shrink-0 mr-1" />
          {["all", "new", "contacted", "closed"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition cursor-pointer shrink-0 ${
                statusFilter === status
                  ? "bg-primary text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {status} {status === "all" ? `(${contacts.length})` : ""}
            </button>
          ))}
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="px-5 py-4">Client Name</th>
                <th className="px-5 py-4">Contact Info</th>
                <th className="px-5 py-4">Subject</th>
                <th className="px-5 py-4">Message Preview</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Date</th>
                <th className="px-5 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {loading ? (
                [...Array(4)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={7} className="px-5 py-4">
                      <div className="h-4 bg-slate-200 rounded-md w-full" />
                    </td>
                  </tr>
                ))
              ) : filteredContacts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-slate-400">
                    <MessageSquare
                      size={32}
                      className="mx-auto mb-2 opacity-50"
                    />
                    <p className="font-semibold text-slate-600">
                      No contact queries found.
                    </p>
                    <p className="text-xs">
                      Try adjusting your search terms or filters.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredContacts.map((contact) => (
                  <tr
                    key={contact.id}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    {/* Name */}
                    <td className="px-5 py-4 font-bold text-primary whitespace-nowrap">
                      {contact.name || "N/A"}
                    </td>

                    {/* Email & Phone */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="space-y-0.5">
                        <a
                          href={`mailto:${contact.email}`}
                          className="flex items-center gap-1.5 text-slate-700 hover:text-secondary font-medium transition"
                        >
                          <Mail size={13} className="text-slate-400 shrink-0" />
                          <span>{contact.email || "N/A"}</span>
                        </a>
                        {contact.phone && (
                          <a
                            href={`tel:${contact.phone}`}
                            className="flex items-center gap-1.5 text-slate-500 hover:text-primary transition text-xs"
                          >
                            <Phone
                              size={13}
                              className="text-slate-400 shrink-0"
                            />
                            <span>{contact.phone}</span>
                          </a>
                        )}
                      </div>
                    </td>

                    {/* Subject */}
                    <td className="px-5 py-4 font-medium text-slate-800 max-w-[150px] truncate">
                      {contact.subject || "No Subject"}
                    </td>

                    {/* Message Preview */}
                    <td className="px-5 py-4 max-w-xs text-slate-600">
                      <p className="line-clamp-2 text-xs leading-relaxed">
                        {contact.message || "No content provided."}
                      </p>
                    </td>

                    {/* Status Select Badge */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <select
                        value={contact.status || "new"}
                        onChange={(e) =>
                          handleStatusChange(contact.id, e.target.value)
                        }
                        className={`text-xs font-extrabold px-3 py-1 rounded-full border cursor-pointer focus:outline-none transition ${getStatusBadge(
                          contact.status || "new",
                        )}`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>

                    {/* Date */}
                    <td className="px-5 py-4 whitespace-nowrap text-xs text-slate-500">
                      {contact.created_at
                        ? new Date(contact.created_at).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            },
                          )
                        : "N/A"}
                    </td>

                    {/* Action Buttons */}
                    <td className="px-5 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => setSelectedContact(contact)}
                          title="View Details"
                          className="p-2 bg-slate-100 hover:bg-primary hover:text-white text-slate-600 rounded-lg transition cursor-pointer"
                        >
                          <Eye size={15} />
                        </button>

                        <button
                          onClick={() => handleDelete(contact.id)}
                          title="Delete Lead"
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

      {/* FULL MESSAGE DETAILS MODAL */}
      {selectedContact && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-primary text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare size={18} className="text-secondary" />
                <h3 className="font-bold text-base">Inquiry Details</h3>
              </div>
              <button
                onClick={() => setSelectedContact(null)}
                className="text-slate-300 hover:text-white p-1 transition cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 text-xs sm:text-sm">
              {/* Client Info Grid */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase">
                    Name
                  </p>
                  <p className="font-bold text-primary">
                    {selectedContact.name || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase">
                    Date Received
                  </p>
                  <p className="font-semibold text-slate-700">
                    {selectedContact.created_at
                      ? new Date(selectedContact.created_at).toLocaleString()
                      : "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase">
                    Email
                  </p>
                  <a
                    href={`mailto:${selectedContact.email}`}
                    className="font-semibold text-secondary hover:underline"
                  >
                    {selectedContact.email || "N/A"}
                  </a>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase">
                    Phone
                  </p>
                  <a
                    href={`tel:${selectedContact.phone}`}
                    className="font-semibold text-primary hover:underline"
                  >
                    {selectedContact.phone || "N/A"}
                  </a>
                </div>
              </div>

              {/* Subject */}
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase mb-1">
                  Subject
                </p>
                <p className="font-bold text-slate-800 text-base">
                  {selectedContact.subject || "No Subject"}
                </p>
              </div>

              {/* Full Message */}
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase mb-1">
                  Full Message
                </p>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-slate-700 leading-relaxed whitespace-pre-wrap max-h-48 overflow-y-auto">
                  {selectedContact.message || "No message provided."}
                </div>
              </div>

              {/* Status Selector in Modal */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-500">
                  Update Lead Status:
                </span>
                <select
                  value={selectedContact.status || "new"}
                  onChange={(e) =>
                    handleStatusChange(selectedContact.id, e.target.value)
                  }
                  className={`text-xs font-extrabold px-3 py-1.5 rounded-lg border cursor-pointer ${getStatusBadge(
                    selectedContact.status || "new",
                  )}`}
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => handleDelete(selectedContact.id)}
                className="text-secondary hover:text-red-700 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 size={14} />
                <span>Delete Lead</span>
              </button>

              <button
                onClick={() => setSelectedContact(null)}
                className="bg-primary hover:bg-primary/90 text-white font-bold px-5 py-2 rounded-xl text-xs transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminContact;
