import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Plus,
  Pencil,
  Trash2,
  Star,
  Building2,
  Search,
  RefreshCw,
  ArrowLeft,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Filter,
  CheckCircle2,
  XCircle
} from "lucide-react";
import ListingFormModal from "../../components/admin/ListingFormModal";

const AdminListing = () => {
  const API = import.meta.env.VITE_BASE_URL;

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);

  const fetchListings = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/listings/`);
      const data = res.data.data || res.data || [];
      setListings(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching listings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setShowModal(true);
  };

  const openEdit = (listing) => {
    setEditing(listing);
    setShowModal(true);
  };

  const deleteListing = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property listing?")) return;

    try {
      await axios.delete(`${API}/listings/${id}/delete/`);
      fetchListings();
    } catch (err) {
      console.error("Delete listing error:", err);
      alert("Failed to delete property listing.");
    }
  };

  // Extract unique categories for filter options
  const categories = ["all", ...new Set(listings.map((item) => item.category).filter(Boolean))];

  // Filter listings based on search term & selected category
  const filteredListings = listings.filter((item) => {
    const matchesSearch =
      (item.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.location || "").toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      
      {/* Top Navigation & Header */}
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

        {/* Title & Action Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight flex items-center gap-2">
              <Building2 className="text-secondary" size={28} />
              <span>Property Listings</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Create, update, and manage public inventory for CNJ Home Buyers.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={fetchListings}
              className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3.5 py-2.5 rounded-xl text-xs font-bold transition border border-slate-200 cursor-pointer"
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
              <span>Refresh</span>
            </button>

            <button
              onClick={openCreate}
              className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-sm cursor-pointer"
            >
              <Plus size={16} />
              <span>Add Listing</span>
            </button>
          </div>
        </div>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Search Bar */}
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by title or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-primary transition"
          />
        </div>

        {/* Category Selector */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter size={14} className="text-slate-400 shrink-0" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 capitalize focus:outline-none focus:border-primary transition cursor-pointer w-full sm:w-auto"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                Category: {cat}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Main Properties Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="px-5 py-4">Property</th>
                <th className="px-5 py-4">Category</th>
                <th className="px-5 py-4">Location</th>
                <th className="px-5 py-4">Price</th>
                <th className="px-5 py-4">Specs</th>
                <th className="px-5 py-4 text-center">Featured</th>
                <th className="px-5 py-4 text-center">Status</th>
                <th className="px-5 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {loading ? (
                [...Array(4)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={8} className="px-5 py-4">
                      <div className="h-5 bg-slate-200 rounded-md w-full" />
                    </td>
                  </tr>
                ))
              ) : filteredListings.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-slate-400">
                    <Building2 size={32} className="mx-auto mb-2 opacity-50" />
                    <p className="font-semibold text-slate-600">No properties found.</p>
                    <p className="text-xs">Try adjusting your search criteria or add a new listing.</p>
                  </td>
                </tr>
              ) : (
                filteredListings.map((listing) => (
                  <tr key={listing.id} className="hover:bg-slate-50/80 transition-colors">
                    
                    {/* Image & Title */}
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            listing.images?.length
                              ? listing.images[0]
                              : "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=120&q=80"
                          }
                          alt={listing.name}
                          className="w-16 h-12 rounded-lg object-cover border border-slate-200 shrink-0"
                        />
                        <span className="font-bold text-primary max-w-xs truncate">
                          {listing.name}
                        </span>
                      </div>
                    </td>

                    {/* Category Badge */}
                    <td className="px-5 py-4">
                      <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold capitalize">
                        {listing.category || "General"}
                      </span>
                    </td>

                    {/* Location */}
                    <td className="px-5 py-4 text-slate-600 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-xs">
                        <MapPin size={13} className="text-secondary shrink-0" />
                        <span className="truncate max-w-[150px]">{listing.location || "N/A"}</span>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="px-5 py-4 font-bold text-primary whitespace-nowrap">
                      ₹{Number(listing.price || 0).toLocaleString("en-IN")}
                    </td>

                    {/* Specs (Bed, Bath, Area) */}
                    <td className="px-5 py-4 text-slate-600 whitespace-nowrap">
                      <div className="flex items-center gap-3 text-xs">
                        <span className="flex items-center gap-1" title="Bedrooms">
                          <Bed size={13} className="text-slate-400" />
                          {listing.bedrooms || 0}
                        </span>
                        <span className="flex items-center gap-1" title="Bathrooms">
                          <Bath size={13} className="text-slate-400" />
                          {listing.bathrooms || 0}
                        </span>
                        <span className="flex items-center gap-1" title="Area Sq Ft">
                          <Maximize2 size={13} className="text-slate-400" />
                          {listing.area ? `${listing.area} sqft` : "N/A"}
                        </span>
                      </div>
                    </td>

                    {/* Featured Status Star */}
                    <td className="px-5 py-4 text-center">
                      {listing.is_featured ? (
                        <Star size={18} className="mx-auto fill-amber-400 text-amber-400" />
                      ) : (
                        <span className="text-slate-300">-</span>
                      )}
                    </td>

                    {/* Active/Inactive Status */}
                    <td className="px-5 py-4 text-center whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                          listing.is_active
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                            : "bg-red-100 text-red-800 border border-red-300"
                        }`}
                      >
                        {listing.is_active ? (
                          <CheckCircle2 size={12} />
                        ) : (
                          <XCircle size={12} />
                        )}
                        <span>{listing.is_active ? "Active" : "Inactive"}</span>
                      </span>
                    </td>

                    {/* Action Buttons */}
                    <td className="px-5 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => openEdit(listing)}
                          title="Edit Property"
                          className="p-2 bg-slate-100 hover:bg-primary hover:text-white text-slate-600 rounded-lg transition cursor-pointer"
                        >
                          <Pencil size={15} />
                        </button>

                        <button
                          onClick={() => deleteListing(listing.id)}
                          title="Delete Property"
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

      {/* Modal Container for Create/Edit */}
      <ListingFormModal
        open={showModal}
        onClose={() => {
          setShowModal(false);
          setEditing(null);
        }}
        editing={editing}
        fetchListings={fetchListings}
        API={API}
      />

    </div>
  );
};

export default AdminListing;