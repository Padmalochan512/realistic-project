import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Image as ImageIcon,
  Sparkles
} from "lucide-react";

const Gallery = () => {
  const API = import.meta.env.VITE_BASE_URL;

  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Lightbox State
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    fetchGallery();
  }, []);

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredImages(images);
    } else {
      setFilteredImages(
        images.filter(
          (img) => img.category?.toLowerCase() === selectedCategory.toLowerCase()
        )
      );
    }
  }, [selectedCategory, images]);

  const fetchGallery = async () => {
    setFetching(true);
    try {
      const res = await axios.get(`${API}/gallery/`);
      const data = res.data.data || res.data || [];
      const list = Array.isArray(data) ? data : [];
      setImages(list);
      setFilteredImages(list);
    } catch (err) {
      console.error("Error fetching gallery images:", err);
    } finally {
      setFetching(false);
    }
  };

  // Lightbox Handlers
  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const prevImage = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === 0 ? filteredImages.length - 1 : prev - 1));
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === filteredImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header Hero Section */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          
          <h1 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
            Our Portfolio Gallery
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            Take a visual tour through our recently acquired, renovated, and featured residential properties.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
          {["all", "exterior", "interior", "living room", "kitchen"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? "bg-primary text-white shadow-sm"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {fetching ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-slate-200 rounded-2xl h-64 animate-pulse"></div>
            ))}
          </div>
        ) : filteredImages.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center max-w-md mx-auto space-y-3 shadow-xs">
            <div className="p-4 bg-slate-100 rounded-full w-16 h-16 mx-auto flex items-center justify-center text-slate-400">
              <ImageIcon size={32} />
            </div>
            <h3 className="text-lg font-bold text-primary">No Showcase Photos Found</h3>
            <p className="text-slate-500 text-xs sm:text-sm">
              We couldn't find any photos in this category right now.
            </p>
            {selectedCategory !== "all" && (
              <button
                onClick={() => setSelectedCategory("all")}
                className="mt-2 text-xs font-bold text-secondary hover:underline cursor-pointer"
              >
                Reset to View All
              </button>
            )}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredImages.map((image, idx) => (
              <div
                key={image.id || idx}
                onClick={() => openLightbox(idx)}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between"
              >
                <div className="relative h-64 bg-slate-100 overflow-hidden">
                  <img
                    src={image.image_url}
                    alt={image.title || "Property Photo"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src =
                        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80";
                    }}
                  />

                  {/* Dark Hover Overlay */}
                  <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="p-3 bg-white/90 rounded-full text-primary shadow-lg backdrop-blur-xs">
                      <Maximize2 size={18} />
                    </div>
                  </div>
                </div>

                {/* Optional Title Caption */}
                {image.title && (
                  <div className="p-4 bg-white border-t border-slate-100">
                    <h4 className="text-xs font-semibold text-primary truncate">
                      {image.title}
                    </h4>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

      </div>

      {/* LIGHTBOX MODAL */}
      {lightboxIndex !== null && filteredImages[lightboxIndex] && (
        <div
          onClick={closeLightbox}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 select-none animate-in fade-in duration-200"
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition cursor-pointer z-10"
          >
            <X size={24} />
          </button>

          {/* Prev Button */}
          {filteredImages.length > 1 && (
            <button
              onClick={prevImage}
              className="absolute left-4 sm:left-8 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition cursor-pointer z-10"
            >
              <ChevronLeft size={28} />
            </button>
          )}

          {/* Main Lightbox Image */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-5xl max-h-[85vh] space-y-3 text-center"
          >
            <img
              src={filteredImages[lightboxIndex].image_url}
              alt={filteredImages[lightboxIndex].title || "Expanded Showcase Photo"}
              className="max-w-full max-h-[75vh] object-contain mx-auto rounded-xl shadow-2xl"
            />
            {filteredImages[lightboxIndex].title && (
              <p className="text-white/90 text-sm font-medium">
                {filteredImages[lightboxIndex].title}
              </p>
            )}
            <span className="inline-block text-xs text-slate-400">
              {lightboxIndex + 1} of {filteredImages.length}
            </span>
          </div>

          {/* Next Button */}
          {filteredImages.length > 1 && (
            <button
              onClick={nextImage}
              className="absolute right-4 sm:right-8 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition cursor-pointer z-10"
            >
              <ChevronRight size={28} />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Gallery;