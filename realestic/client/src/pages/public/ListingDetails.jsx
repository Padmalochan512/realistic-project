import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import {
  BedDouble,
  Bath,
  Square,
  MapPin,
  ArrowLeft,
  Check,
  Phone,
  Mail,
  ShieldCheck,
  Calendar,
  Send,
  Home
} from "lucide-react";

const ListingDetails = () => {
  const { id } = useParams();
  const API = import.meta.env.VITE_BASE_URL;

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [inquirySent, setInquirySent] = useState(false);

  useEffect(() => {
    fetchListing();
  }, [id]);

  const fetchListing = async () => {
    try {
      const res = await axios.get(`${API}/listings/${id}/`);
      const data = res.data.data || res.data;

      setListing(data);

      if (data?.images && data.images.length > 0) {
        setSelectedImage(data.images[0]);
      }
    } catch (err) {
      console.error("Error fetching property details:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    setInquirySent(true);
    setTimeout(() => setInquirySent(false), 5000);
  };

  // Helper to normalize amenities whether stored as array or string
  const getAmenitiesList = () => {
    if (Array.isArray(listing?.amenities)) return listing.amenities;
    if (typeof listing?.amenities === "string") {
      return listing.amenities.split(",").map((a) => a.trim());
    }
    return [];
  };

  // SKELETON LOADER
  if (loading) {
    return (
      <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8 animate-pulse">
          <div className="h-6 bg-slate-200 rounded w-32"></div>
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7 space-y-4">
              <div className="h-[450px] bg-slate-200 rounded-2xl"></div>
              <div className="grid grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-24 bg-slate-200 rounded-xl"></div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5 space-y-6">
              <div className="h-8 bg-slate-200 rounded w-1/3"></div>
              <div className="h-10 bg-slate-200 rounded w-3/4"></div>
              <div className="h-6 bg-slate-200 rounded w-1/2"></div>
              <div className="h-12 bg-slate-200 rounded-xl"></div>
              <div className="h-40 bg-slate-200 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // NOT FOUND STATE
  if (!listing) {
    return (
      <div className="bg-slate-50 min-h-screen flex items-center justify-center px-4">
        <div className="bg-white p-10 rounded-2xl border border-slate-200 text-center max-w-md shadow-sm">
          <Home size={48} className="mx-auto text-slate-300 mb-4" />
          <h2 className="text-2xl font-extrabold text-primary">Property Not Found</h2>
          <p className="text-slate-500 text-sm mt-2 mb-6">
            The property listing you are looking for might have been removed or is temporarily unavailable.
          </p>
          <Link
            to="/listing"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-3 rounded-xl text-sm transition"
          >
            <ArrowLeft size={16} />
            <span>Back to All Listings</span>
          </Link>
        </div>
      </div>
    );
  }

  const defaultPlaceholder = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1000&q=80";
  const mainImageSrc = selectedImage || (listing.images && listing.images[0]) || defaultPlaceholder;
  const amenities = getAmenitiesList();

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Navigation Breadcrumb */}
        <div>
          <Link
            to="/listing"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-primary font-semibold text-sm transition"
          >
            <ArrowLeft size={18} className="text-secondary" />
            <span>Back to Listings</span>
          </Link>
        </div>

        {/* Main Details Grid */}
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT COLUMN: Gallery & Core Info */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Gallery Section */}
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm h-[380px] sm:h-[480px]">
                <img
                  src={mainImageSrc}
                  alt={listing.name || "Property Image"}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-4 left-4 bg-primary text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md">
                  {listing.category || "Property"}
                </span>
                {listing.is_featured && (
                  <span className="absolute top-4 right-4 bg-secondary text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md">
                    Featured
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {listing.images && listing.images.length > 1 && (
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                  {listing.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(img)}
                      className={`relative rounded-xl overflow-hidden h-20 bg-slate-200 border-2 transition cursor-pointer ${
                        mainImageSrc === img
                          ? "border-secondary ring-2 ring-secondary/20 scale-95"
                          : "border-transparent opacity-75 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Specifications Cards */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
              <h3 className="text-lg font-bold text-primary border-b border-slate-100 pb-3">
                Property Overview
              </h3>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <BedDouble className="mx-auto mb-1.5 text-secondary" size={22} />
                  <span className="block text-lg font-extrabold text-primary">{listing.bedrooms ?? 0}</span>
                  <span className="text-xs text-slate-500 font-medium">Bedrooms</span>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <Bath className="mx-auto mb-1.5 text-secondary" size={22} />
                  <span className="block text-lg font-extrabold text-primary">{listing.bathrooms ?? 0}</span>
                  <span className="text-xs text-slate-500 font-medium">Bathrooms</span>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <Square className="mx-auto mb-1.5 text-secondary" size={22} />
                  <span className="block text-lg font-extrabold text-primary">
                    {listing.area ? listing.area : "N/A"}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">Sq Ft</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-xl font-bold text-primary">About This Property</h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {listing.description || "No description provided for this property listing."}
              </p>
            </div>

            {/* Amenities Grid */}
            {amenities.length > 0 && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-xl font-bold text-primary">Key Amenities</h3>
                <div className="grid sm:grid-cols-2 gap-3.5 pt-2">
                  {amenities.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs sm:text-sm font-semibold text-slate-700"
                    >
                      <div className="p-1 bg-green-100 text-green-700 rounded-full shrink-0">
                        <Check size={14} />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Price Header & Inquiry Form Sticky Box */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
            
            {/* Header Box */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-secondary bg-secondary/10 px-3 py-1 rounded-full border border-secondary/20">
                  For Sale
                </span>
                <h1 className="text-2xl sm:text-3xl font-black text-primary mt-3 leading-tight">
                  {listing.name}
                </h1>
                <div className="flex items-center gap-1.5 text-slate-500 text-sm mt-2">
                  <MapPin size={16} className="text-secondary shrink-0" />
                  <span>{listing.location || "Location on Request"}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Asking Price</span>
                <div className="text-3xl sm:text-4xl font-black text-primary mt-1">
                  ₹{Number(listing.price || 0).toLocaleString("en-IN")}
                </div>
              </div>
            </div>

            {/* Inquiry Form */}
            <div className="bg-primary text-white p-6 sm:p-8 rounded-2xl shadow-xl border-b-4 border-secondary space-y-5">
              <div>
                <h3 className="text-xl font-bold">Interested in this Property?</h3>
                <p className="text-xs text-slate-300 mt-1">
                  Send an inquiry or request an instant cash offer consultation with our team.
                </p>
              </div>

              {inquirySent ? (
                <div className="bg-emerald-500/20 border border-emerald-400 text-emerald-100 p-4 rounded-xl text-center text-xs sm:text-sm font-medium">
                  ✓ Inquiry submitted successfully! Our representative will contact you shortly.
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs text-slate-300 mb-1 font-medium">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-secondary transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-300 mb-1 font-medium">Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="(555) 000-0000"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-secondary transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-300 mb-1 font-medium">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-secondary transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-300 mb-1 font-medium">Message</label>
                    <textarea
                      rows="3"
                      defaultValue={`Hi, I am interested in "${listing.name}". Please contact me with more information.`}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-secondary transition"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold py-3 rounded-xl text-sm transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send size={16} />
                    <span>Send Inquiry</span>
                  </button>
                </form>
              )}

              <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5 text-xs text-slate-300">
                <a
                  href="tel:5550192834"
                  className="flex items-center gap-2 hover:text-white transition"
                >
                  <Phone size={14} className="text-secondary" />
                  <span>Call Us Direct: (555) 019-2834</span>
                </a>
                <div className="flex items-center gap-2">
                  <ShieldCheck size={14} className="text-secondary" />
                  <span>Guaranteed response within 24 hours</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default ListingDetails;