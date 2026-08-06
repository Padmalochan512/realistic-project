import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Pencil,
  Plus,
  Trash2,
  Image as ImageIcon,
  ArrowLeft,
  RefreshCw,
  Eye,
  X,
  Loader2,
  CheckCircle2
} from "lucide-react";

const AdminGallery = () => {
  const API = import.meta.env.VITE_BASE_URL;

  const [images, setImages] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [imageUrl, setImageUrl] = useState("");
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    setFetching(true);
    try {
      const res = await axios.get(`${API}/gallery/`);
      const data = res.data.data || res.data || [];
      setImages(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching gallery:", err);
    } finally {
      setFetching(false);
    }
  };

  const resetForm = () => {
    setImageUrl("");
    setEditing(null);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!imageUrl.trim()) return;

    setLoading(true);

    try {
      if (editing) {
        await axios.put(`${API}/gallery/${editing}/update/`, {
          image_url: imageUrl,
        });
      } else {
        await axios.post(`${API}/gallery/create/`, {
          image_url: imageUrl,
        });
      }

      resetForm();
      fetchGallery();
    } catch (err) {
      console.error("Gallery save error:", err);
      alert("Something went wrong while saving the image.");
    } finally {
      setLoading(false);
    }
  };

  const editImage = (image) => {
    setEditing(image.id);
    setImageUrl(image.image_url);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const deleteImage = async (id) => {
    if (!window.confirm("Are you sure you want to delete this photo from the gallery?")) return;

    try {
      await axios.delete(`${API}/gallery/${id}/delete/`);
      fetchGallery();
    } catch (err) {
      console.error("Delete gallery image error:", err);
      alert("Failed to delete image.");
    }
  };

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
              <ImageIcon className="text-secondary" size={28} />
              <span>Photo Gallery Showcase</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Upload and organize visual media for CNJ Home Buyers website visitors.
            </p>
          </div>

          <button
            onClick={fetchGallery}
            className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold transition self-start sm:self-auto cursor-pointer border border-slate-200"
          >
            <RefreshCw size={14} className={fetching ? "animate-spin" : ""} />
            <span>Refresh Gallery</span>
          </button>
        </div>
      </div>

      {/* Form Card (Add/Edit Image) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6">
        <h2 className="text-base font-bold text-primary mb-4 flex items-center gap-2">
          {editing ? (
            <>
              <Pencil size={18} className="text-secondary" />
              <span>Edit Gallery Image</span>
            </>
          ) : (
            <>
              <Plus size={18} className="text-secondary" />
              <span>Add New Image to Gallery</span>
            </>
          )}
        </h2>

        <form onSubmit={submit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="url"
                placeholder="Paste Image URL (e.g., https://images.unsplash.com/photo...)"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-primary transition"
                required
              />
            </div>

            <div className="flex gap-2 shrink-0">
              <button
                type="submit"
                disabled={loading}
                className="bg-secondary hover:bg-secondary/90 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-xs cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : editing ? (
                  <>
                    <CheckCircle2 size={16} />
                    <span>Update Image</span>
                  </>
                ) : (
                  <>
                    <Plus size={16} />
                    <span>Add to Gallery</span>
                  </>
                )}
              </button>

              {editing && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2.5 rounded-xl text-xs transition cursor-pointer border border-slate-200"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>

          {/* Live Preview Box */}
          {imageUrl.trim() !== "" && (
            <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <p className="text-[11px] font-bold text-slate-400 uppercase">Live Image Preview</p>
              <div className="h-48 sm:h-64 rounded-lg overflow-hidden bg-white border border-slate-200 relative max-w-md">
                <img
                  src={imageUrl}
                  alt="Live Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://placehold.co/600x400?text=Invalid+Image+URL";
                  }}
                />
              </div>
            </div>
          )}
        </form>
      </div>

      {/* Gallery Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
            All Gallery Images ({images.length})
          </h3>
        </div>

        {fetching ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-slate-200 animate-pulse h-56 rounded-2xl" />
            ))}
          </div>
        ) : images.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-400">
            <ImageIcon size={36} className="mx-auto mb-2 opacity-50" />
            <p className="font-semibold text-slate-600">No images in gallery.</p>
            <p className="text-xs">Add an image URL above to display it on the website gallery.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map((image) => (
              <div
                key={image.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden group hover:shadow-md transition duration-200 flex flex-col"
              >
                {/* Image Container with Hover Actions */}
                <div className="relative h-52 bg-slate-100 overflow-hidden">
                  <img
                    src={image.image_url}
                    alt="Gallery item"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    onError={(e) => {
                      e.target.src = "https://placehold.co/600x400?text=Image+Not+Found";
                    }}
                  />

                  {/* Hover Quick Action Overlay */}
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={() => setPreviewImage(image.image_url)}
                      title="View Fullsize"
                      className="p-2.5 bg-white text-slate-800 rounded-full hover:bg-primary hover:text-white transition cursor-pointer shadow-md"
                    >
                      <Eye size={16} />
                    </button>

                    <button
                      onClick={() => editImage(image)}
                      title="Edit Image"
                      className="p-2.5 bg-white text-slate-800 rounded-full hover:bg-primary hover:text-white transition cursor-pointer shadow-md"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      onClick={() => deleteImage(image.id)}
                      title="Delete Image"
                      className="p-2.5 bg-white text-slate-800 rounded-full hover:bg-secondary hover:text-white transition cursor-pointer shadow-md"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Card Footer Info */}
                <div className="p-3 bg-white border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="truncate max-w-[180px] text-[11px] font-medium font-mono text-slate-400">
                    {image.image_url}
                  </span>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => editImage(image)}
                      className="p-1.5 hover:text-primary text-slate-600 transition cursor-pointer"
                      title="Edit"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => deleteImage(image.id)}
                      className="p-1.5 hover:text-secondary text-slate-600 transition cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      {/* LIGHTBOX MODAL */}
      {previewImage && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full max-h-[90vh] bg-black rounded-2xl overflow-hidden flex items-center justify-center shadow-2xl border border-slate-800">
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-4 right-4 bg-black/60 hover:bg-black text-white p-2 rounded-full transition cursor-pointer z-10"
            >
              <X size={20} />
            </button>
            <img
              src={previewImage}
              alt="Full View"
              className="max-h-[85vh] max-w-full object-contain"
            />
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminGallery;