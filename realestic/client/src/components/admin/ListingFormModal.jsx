import React, { useEffect, useState } from "react";
import api from "../../lib/api";
import {
  X,
  Plus,
  Trash2,
  Building2,
  Image as ImageIcon,
  Check,
  Loader2,
  Star,
  Eye,
} from "lucide-react";

const categories = ["house", "apartment", "land"];

const amenitiesList = [
  "Parking",
  "Internet",
  "Television",
  "Security",
  "Fire Alarm",
  "Furniture",
  "Storage",
  "Swimming Pool",
  "Garden / Yard",
  "Air Conditioning",
];

const initialState = {
  category: "house",
  name: "",
  description: "",
  price: "",
  location: "",
  images: [""],
  amenities: [],
  bedrooms: 0,
  bathrooms: 0,
  area: "",
  is_featured: false,
  is_active: true,
};

const ListingFormModal = ({ open, onClose, editing, fetchListings, API }) => {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editing) {
      setForm({
        ...editing,
        images: editing.images?.length > 0 ? editing.images : [""],
        amenities: Array.isArray(editing.amenities)
          ? editing.amenities
          : typeof editing.amenities === "string"
            ? editing.amenities.split(",").map((a) => a.trim())
            : [],
      });
    } else {
      setForm(initialState);
    }
  }, [editing, open]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const changeImage = (index, value) => {
    const imgs = [...form.images];
    imgs[index] = value;

    setForm({
      ...form,
      images: imgs,
    });
  };

  const addImage = () => {
    setForm({
      ...form,
      images: [...form.images, ""],
    });
  };

  const removeImage = (index) => {
    setForm({
      ...form,
      images: form.images.filter((_, i) => i !== index),
    });
  };

  const toggleAmenity = (amenity) => {
    if (form.amenities.includes(amenity)) {
      setForm({
        ...form,
        amenities: form.amenities.filter((a) => a !== amenity),
      });
    } else {
      setForm({
        ...form,
        amenities: [...form.amenities, amenity],
      });
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...form,
        price: Number(form.price) || 0,
        bedrooms: Number(form.bedrooms) || 0,
        bathrooms: Number(form.bathrooms) || 0,
        images: form.images.filter((img) => img.trim() !== ""),
      };

      if (editing) {
        await api.put(`${API}/listings/${editing.id}/update/`, payload);
      } else {
        await api.post(`${API}/listings/create/`, payload);
      }

      fetchListings();
      onClose();
    } catch (err) {
      console.error("Listing save error:", err);
      alert("Something went wrong while saving the listing.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex justify-center items-center z-50 p-4 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="bg-primary text-white p-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <Building2 className="text-secondary" size={22} />
            <h2 className="text-lg font-bold">
              {editing ? "Edit Property Listing" : "Add New Property Listing"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white transition p-1 cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm">
          <form id="listing-form" onSubmit={submit} className="space-y-6">
            {/* 1. Basic Details */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2">
                Basic Information
              </h3>

              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">
                    Category <span className="text-secondary">*</span>
                  </label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-medium capitalize focus:outline-none focus:border-primary transition"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1.5">
                    Property Name / Title{" "}
                    <span className="text-secondary">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    name="name"
                    placeholder="e.g. Modern Luxury Villa in Suburbs"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-primary transition"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Description
                </label>
                <textarea
                  rows={4}
                  name="description"
                  required
                  placeholder="Provide detailed information about the property, condition, location highlights, etc."
                  value={form.description}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-primary transition resize-none leading-relaxed"
                />
              </div>
            </div>

            {/* 2. Pricing & Location */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2">
                Pricing & Location
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">
                    Asking Price (₹) <span className="text-secondary">*</span>
                  </label>
                  <input
                    name="price"
                    type="number"
                    required
                    placeholder="e.g. 7500000"
                    value={form.price}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-primary transition"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">
                    Location Address <span className="text-secondary">*</span>
                  </label>
                  <input
                    name="location"
                    required
                    placeholder="e.g. Patia, Bhubaneswar"
                    value={form.location}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-primary transition"
                  />
                </div>
              </div>
            </div>

            {/* 3. Image URLs & Live Previews */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Property Images (URLs)
                </h3>
                <button
                  type="button"
                  onClick={addImage}
                  className="inline-flex items-center gap-1 text-xs font-bold text-secondary hover:underline cursor-pointer"
                >
                  <Plus size={14} />
                  <span>Add More Image</span>
                </button>
              </div>

              <div className="space-y-3">
                {form.images.map((img, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex gap-2 items-center">
                      <input
                        value={img}
                        onChange={(e) => changeImage(index, e.target.value)}
                        placeholder="https://images.unsplash.com/your-property-photo.jpg"
                        className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-primary transition text-xs"
                      />

                      {form.images.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="p-2.5 text-slate-400 hover:text-secondary bg-slate-100 hover:bg-red-50 rounded-xl transition cursor-pointer"
                          title="Remove URL"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>

                    {/* Image Preview Thumbnail */}
                    {img.trim() !== "" && (
                      <div className="h-20 w-32 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden relative group">
                        <img
                          src={img}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src =
                              "https://placehold.co/300x200?text=Invalid+Image+URL";
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Property Specifications */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2">
                Property Specifications
              </h3>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">
                    Bedrooms
                  </label>
                  <input
                    type="number"
                    name="bedrooms"
                    min="0"
                    placeholder="0"
                    value={form.bedrooms}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-primary transition"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">
                    Bathrooms
                  </label>
                  <input
                    type="number"
                    name="bathrooms"
                    min="0"
                    placeholder="0"
                    value={form.bathrooms}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-primary transition"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">
                    Area (Sq Ft)
                  </label>
                  <input
                    type="text"
                    name="area"
                    placeholder="e.g. 1850"
                    value={form.area}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-primary transition"
                  />
                </div>
              </div>
            </div>

            {/* 5. Amenities Checklist */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2">
                Amenities & Features
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {amenitiesList.map((amenity) => {
                  const isChecked = form.amenities.includes(amenity);
                  return (
                    <button
                      key={amenity}
                      type="button"
                      onClick={() => toggleAmenity(amenity)}
                      className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-semibold transition cursor-pointer text-left ${
                        isChecked
                          ? "bg-primary/10 border-primary text-primary"
                          : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center border shrink-0 ${
                          isChecked
                            ? "bg-primary border-primary text-white"
                            : "border-slate-300"
                        }`}
                      >
                        {isChecked && <Check size={12} />}
                      </div>
                      <span className="truncate">{amenity}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 6. Status Flags */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2">
                Visibility Controls
              </h3>

              <div className="flex flex-wrap gap-6 pt-1">
                <label className="flex items-center gap-2.5 cursor-pointer text-slate-700 font-bold select-none">
                  <input
                    type="checkbox"
                    name="is_featured"
                    checked={form.is_featured}
                    onChange={handleChange}
                    className="w-4 h-4 text-primary rounded border-slate-300 focus:ring-primary cursor-pointer"
                  />
                  <span className="flex items-center gap-1.5">
                    <Star
                      size={15}
                      className={
                        form.is_featured
                          ? "fill-amber-400 text-amber-400"
                          : "text-slate-400"
                      }
                    />
                    <span>Featured Property</span>
                  </span>
                </label>

                <label className="flex items-center gap-2.5 cursor-pointer text-slate-700 font-bold select-none">
                  <input
                    type="checkbox"
                    name="is_active"
                    checked={form.is_active}
                    onChange={handleChange}
                    className="w-4 h-4 text-primary rounded border-slate-300 focus:ring-primary cursor-pointer"
                  />
                  <span>Publish / Active on Website</span>
                </label>
              </div>
            </div>
          </form>
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 sm:px-6 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-200 rounded-xl transition cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="submit"
            form="listing-form"
            disabled={loading}
            className="px-6 py-2.5 bg-secondary hover:bg-secondary/90 text-white font-bold rounded-xl text-xs transition flex items-center gap-2 shadow-sm cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Saving Property...</span>
              </>
            ) : (
              <>
                <Check size={16} />
                <span>{editing ? "Update Listing" : "Create Listing"}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingFormModal;
