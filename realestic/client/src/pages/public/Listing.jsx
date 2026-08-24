import React, { useEffect, useState } from "react";
import api, { API_BASE_URL } from "../../lib/api";
import { Link } from "react-router-dom";
import {
  BedDouble,
  Bath,
  MapPin,
  Square,
  ArrowRight,
  Search,
  SlidersHorizontal,
  Home
} from "lucide-react";

const Listing = () => {
  const API = API_BASE_URL;

  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    fetchListings();
  }, []);

  useEffect(() => {
    filterData();
  }, [searchQuery, selectedCategory, listings]);

  const fetchListings = async () => {
    try {
      const res = await api.get(`${API}/listings/`);
      const data = res.data.data || res.data || [];
      setListings(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching listings:", err);
    } finally {
      setLoading(false);
    }
  };

  const filterData = () => {
    let updated = [...listings];

    if (selectedCategory !== "all") {
      updated = updated.filter(
        (item) => item.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      updated = updated.filter(
        (item) =>
          item.name?.toLowerCase().includes(query) ||
          item.location?.toLowerCase().includes(query)
      );
    }

    setFilteredListings(updated);
  };

  // SKELETON LOADING STATE
  if (loading) {
    return (
      <div className="bg-slate-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <div className="h-8 bg-slate-200 rounded-md w-3/4 mx-auto animate-pulse"></div>
            <div className="h-4 bg-slate-200 rounded-md w-1/2 mx-auto animate-pulse"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-sm border border-slate-200 animate-pulse overflow-hidden"
              >
                <div className="h-60 bg-slate-200"></div>
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-slate-200 rounded w-3/4"></div>
                  <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                  <div className="h-8 bg-slate-200 rounded w-1/3 mt-4"></div>
                  <div className="grid grid-cols-3 gap-2 pt-2">
                    <div className="h-4 bg-slate-200 rounded"></div>
                    <div className="h-4 bg-slate-200 rounded"></div>
                    <div className="h-4 bg-slate-200 rounded"></div>
                  </div>
                  <div className="h-11 bg-slate-200 rounded-xl mt-4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Search & Filter Control Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by property name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary transition"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {["all", "house", "apartment", "land", "commercial"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-primary text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Listings Grid */}
        {filteredListings.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 text-center py-16 px-4 shadow-xs">
            <Home size={48} className="mx-auto text-slate-300 mb-3" />
            <h3 className="text-lg font-bold text-primary">No Properties Found</h3>
            <p className="text-slate-500 text-xs sm:text-sm mt-1 max-w-sm mx-auto">
              We couldn't find any properties matching your current filters. Try adjusting your search keywords or categories.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="mt-4 px-4 py-2 bg-secondary text-white text-xs font-semibold rounded-lg hover:bg-secondary/90 transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredListings.map((listing) => (
              <div
                key={listing.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Property Image & Badges */}
                <div className="relative h-60 w-full bg-slate-100 overflow-hidden">
                  <img
                    src={
                      listing.images && listing.images.length > 0
                        ? listing.images[0]
                        : "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80"
                    }
                    alt={listing.name || "Property Image"}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

                  {/* Category Badge */}
                  <span className="absolute top-4 left-4 bg-primary/90 backdrop-blur-xs text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                    {listing.category || "Property"}
                  </span>

                  {/* Featured Badge */}
                  {listing.is_featured && (
                    <span className="absolute top-4 right-4 bg-secondary text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-md">
                      Featured
                    </span>
                  )}
                </div>

                {/* Property Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-primary group-hover:text-secondary transition-colors line-clamp-1">
                      {listing.name}
                    </h2>

                    <div className="flex items-center gap-1.5 text-slate-500 text-xs sm:text-sm mt-2">
                      <MapPin size={15} className="text-secondary shrink-0" />
                      <span className="line-clamp-1">{listing.location || "Location on Request"}</span>
                    </div>

                    <div className="text-2xl font-extrabold text-primary mt-4">
                      ₹{Number(listing.price || 0).toLocaleString("en-IN")}
                    </div>

                    {/* Specs Grid */}
                    <div className="grid grid-cols-3 gap-2 mt-5 py-3 border-y border-slate-100 text-xs text-slate-600 font-medium">
                      <div className="flex items-center gap-1.5">
                        <BedDouble size={16} className="text-primary" />
                        <span>{listing.bedrooms ?? 0} Beds</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <Bath size={16} className="text-primary" />
                        <span>{listing.bathrooms ?? 0} Baths</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <Square size={16} className="text-primary" />
                        <span>{listing.area ? `${listing.area} sq ft` : "N/A"}</span>
                      </div>
                    </div>
                  </div>

                  {/* CTA Link */}
                  <Link
                    to={`/listing/${listing.id}`}
                    className="mt-6 w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-xl flex justify-center items-center gap-2 text-sm transition shadow-sm"
                  >
                    <span>View Details</span>
                    <ArrowRight size={16} />
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

export default Listing;
