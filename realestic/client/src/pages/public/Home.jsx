import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Building2,
  ArrowRight,
  ShieldCheck,
  Zap,
  DollarSign,
  Clock,
  CheckCircle2,
  Home as HomeIcon,
  Phone,
  Award,
  Sparkles,
} from "lucide-react";

const Home = () => {
  const API = import.meta.env.VITE_BASE_URL;

  const [featuredListings, setFeaturedListings] = useState([]);
  const [loadingListings, setLoadingListings] = useState(true);

  useEffect(() => {
    fetchFeaturedListings();
  }, []);

  const fetchFeaturedListings = async () => {
    try {
      const res = await axios.get(`${API}/listings/`);
      const data = res.data.data || res.data || [];
      const arrayData = Array.isArray(data) ? data : [];
      setFeaturedListings(arrayData.slice(0, 3));
    } catch (err) {
      console.error("Error fetching homepage listings:", err);
    } finally {
      setLoadingListings(false);
    }
  };

  const defaultPropertyImage =
    "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80";

  const heroImageUrl =
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80";

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* 1. EXPANDED HERO SECTION */}
      <section className="relative bg-primary text-white overflow-hidden pt-12 pb-20 lg:pt-16 lg:pb-28 px-4 sm:px-6 lg:px-8">
        {/* Ambient Glowing Backgrounds */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-secondary/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-12 relative z-10">
          {/* Top Announcement Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white/5 border border-white/10 rounded-2xl p-3 sm:px-6 backdrop-blur-md">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-200">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
              <span>Active Buyers In Your Local Area</span>
              <span className="hidden sm:inline text-slate-400">•</span>
              <span className="hidden sm:inline text-slate-300">
                Evaluating Properties 24/7
              </span>
            </div>

            <a
              href="tel:+18005550199"
              className="text-xs font-bold text-secondary hover:text-white transition flex items-center gap-1.5 ml-auto sm:ml-0"
            >
              <Phone size={14} />
              <span>Direct Hotline: (800) 555-0199</span>
            </a>
          </div>

          {/* Main Grid: Left Messaging & Right Visual Cards */}
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column Content */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              {/* Header Tag */}
              <div className="inline-flex items-center gap-2 bg-secondary/15 border border-secondary/30 text-secondary text-xs font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full">
                <Zap size={14} />
                <span>#1 Rated Direct Cash Home Buyer</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-[1.12]">
                Sell Your Home <span className="text-secondary">As-Is</span> For
                Cash. <br className="hidden sm:block" />
                No Agents. No Repairs. No Fees.
              </h1>

              {/* Extended Description */}
              <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Whether you are downsizing, relocating, dealing with an
                inherited house, or avoiding costly repairs, CNJ Home Buyers
                gives you a fair, guaranteed cash proposal in 24 hours with zero
                agent commissions.
              </p>

              {/* 4 Core Benefit Badges Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left pt-2">
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-xs">
                  <p className="text-sm font-bold text-white flex items-center gap-1.5">
                    <CheckCircle2
                      size={16}
                      className="text-secondary shrink-0"
                    />
                    <span>0% Commission</span>
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Keep 100% of offer
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-xs">
                  <p className="text-sm font-bold text-white flex items-center gap-1.5">
                    <CheckCircle2
                      size={16}
                      className="text-secondary shrink-0"
                    />
                    <span>Sell As-Is</span>
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Zero repair work
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-xs">
                  <p className="text-sm font-bold text-white flex items-center gap-1.5">
                    <CheckCircle2
                      size={16}
                      className="text-secondary shrink-0"
                    />
                    <span>Fast Cash</span>
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Close in 7 days
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-xs">
                  <p className="text-sm font-bold text-white flex items-center gap-1.5">
                    <CheckCircle2
                      size={16}
                      className="text-secondary shrink-0"
                    />
                    <span>No Showings</span>
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    No open houses
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  to="/contact"
                  className="w-full sm:w-auto bg-secondary hover:bg-secondary/90 text-white font-bold px-8 py-4 rounded-xl text-sm transition-all duration-200 shadow-xl shadow-secondary/20 hover:shadow-secondary/30 flex items-center justify-center gap-2.5 cursor-pointer group"
                >
                  <span>Request Instant Cash Offer</span>
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>

                <Link
                  to="/listings"
                  className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white font-bold px-8 py-4 rounded-xl text-sm transition-all duration-200 flex items-center justify-center gap-2.5 border border-white/20 hover:border-white/40 backdrop-blur-xs"
                >
                  <Building2 size={18} className="text-secondary" />
                  <span>Explore Property Listings</span>
                </Link>
              </div>
            </div>

            {/* Right Column Visual Showcase */}
            <div className="lg:col-span-5 relative mt-6 lg:mt-0">
              <div className="relative mx-auto max-w-md lg:max-w-none space-y-4">
                {/* Main Showcase Image Frame */}
                <div className="relative rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-slate-900 group">
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                    alt="CNJ Home Buyers Premium Residential Property"
                    className="w-full h-[380px] sm:h-[440px] object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/30 to-transparent" />

                  {/* Bottom Card Content */}
                  <div className="absolute bottom-0 inset-x-0 p-6 space-y-2 text-left">
                    <span className="bg-secondary text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                      Direct Purchase Process
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-white">
                      Simple, Transparent & Stress-Free
                    </h3>
                    <p className="text-xs text-slate-300">
                      We handle title work, closing costs, and flexible move-out
                      timelines.
                    </p>
                  </div>
                </div>

                {/* Quick 3-Step Preview Card in Hero */}
                <div className="bg-white/10 border border-white/15 rounded-2xl p-4 backdrop-blur-md grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="space-y-1">
                    <span className="font-black text-secondary text-base">
                      01
                    </span>
                    <p className="font-bold text-white">Submit Address</p>
                  </div>
                  <div className="space-y-1 border-x border-white/10 px-1">
                    <span className="font-black text-secondary text-base">
                      02
                    </span>
                    <p className="font-bold text-white">Get Proposal</p>
                  </div>
                  <div className="space-y-1">
                    <span className="font-black text-secondary text-base">
                      03
                    </span>
                    <p className="font-bold text-white">Get Paid Cash</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 2. VALUE PROPOSITION / WHY CHOOSE US */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-secondary font-bold text-xs uppercase tracking-widest bg-secondary/10 border border-secondary/20 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
            <ShieldCheck size={14} />
            <span>The CNJ Advantage</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
            Why Homeowners Choose Us
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Comparing traditional listing methods versus selling directly to CNJ
            Home Buyers.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xs space-y-4 hover:shadow-lg transition">
            <div className="p-3 bg-secondary/10 text-secondary rounded-xl w-fit">
              <DollarSign size={24} />
            </div>
            <h3 className="text-xl font-bold text-primary">
              No Fees Or Commissions
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Forget paying 6% in real estate agent commissions or closing
              costs. The cash offer we give is the exact amount you walk away
              with.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xs space-y-4 hover:shadow-lg transition">
            <div className="p-3 bg-secondary/10 text-secondary rounded-xl w-fit">
              <HomeIcon size={24} />
            </div>
            <h3 className="text-xl font-bold text-primary">
              Sell Completely As-Is
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              No cleaning, no staging, and no repairs required. We buy
              residential properties regardless of condition or needed
              renovations.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xs space-y-4 hover:shadow-lg transition">
            <div className="p-3 bg-secondary/10 text-secondary rounded-xl w-fit">
              <Clock size={24} />
            </div>
            <h3 className="text-xl font-bold text-primary">
              Close On Your Schedule
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Pick the closing date that works best for your move. Close in as
              few as 7 business days or take your time—you're in control.
            </p>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PROPERTIES SHOWCASE */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-200">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-secondary font-bold text-xs uppercase tracking-widest bg-secondary/10 border border-secondary/20 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
                <Building2 size={14} />
                <span>Our Marketplace</span>
              </span>
              <h2 className="text-3xl font-extrabold text-primary tracking-tight">
                Featured Properties
              </h2>
            </div>

            <Link
              to="/listings"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-secondary hover:underline cursor-pointer shrink-0"
            >
              <span>Explore All Listings</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Properties Grid */}
          {loadingListings ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="bg-slate-200 rounded-2xl h-80 animate-pulse"
                ></div>
              ))}
            </div>
          ) : featuredListings.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <p className="text-sm font-bold text-primary">
                No Active Featured Listings
              </p>
              <p className="text-xs text-slate-500">
                Check back soon for new property listings.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {featuredListings.map((property) => (
                <Link
                  key={property.id}
                  to={`/listings/${property.id}`}
                  className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-56 bg-slate-200 overflow-hidden">
                      <img
                        src={
                          property.image_url ||
                          property.image ||
                          defaultPropertyImage
                        }
                        alt={property.title || "Property"}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src = defaultPropertyImage;
                        }}
                      />
                      {property.price && (
                        <span className="absolute top-3 right-3 bg-primary/95 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm backdrop-blur-xs">
                          ${Number(property.price).toLocaleString()}
                        </span>
                      )}
                    </div>

                    <div className="p-6 space-y-2">
                      <h3 className="text-lg font-bold text-primary group-hover:text-secondary transition-colors line-clamp-1">
                        {property.title || "Modern Residential Property"}
                      </h3>
                      <p className="text-slate-500 text-xs line-clamp-2">
                        {property.address ||
                          property.location ||
                          "Prime Metropolitan Location"}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0 border-t border-slate-200/60 mt-4 flex items-center justify-between text-xs text-slate-600 font-semibold">
                    <span>View Property Details</span>
                    <ArrowRight
                      size={14}
                      className="group-hover:translate-x-1 transition-transform text-secondary"
                    />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. SIMPLE 3-STEP PROCESS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
            How The Cash Purchase Works
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Selling your property has never been easier or more transparent.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          <div className="bg-white rounded-2xl p-8 border border-slate-200 relative space-y-4">
            <span className="text-4xl font-extrabold text-secondary/30">
              01
            </span>
            <h3 className="text-lg font-bold text-primary">
              Submit Property Info
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm">
              Tell us about your home's location, condition, and your timeline
              by phone or contact page.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-slate-200 relative space-y-4">
            <span className="text-4xl font-extrabold text-secondary/30">
              02
            </span>
            <h3 className="text-lg font-bold text-primary">
              Receive Cash Offer
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm">
              We review local market data and provide you with a fair, written
              no-obligation offer.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-slate-200 relative space-y-4">
            <span className="text-4xl font-extrabold text-secondary/30">
              03
            </span>
            <h3 className="text-lg font-bold text-primary">
              Get Paid At Closing
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm">
              Complete escrow with a reputable local title company and receive
              cash in hand.
            </p>
          </div>
        </div>
      </section>

      {/* 5. BOTTOM CTA BANNER */}
      <section className="bg-primary text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready To See What Your Home Is Worth?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            Speak directly with our property evaluation specialists today with
            no pressure or obligation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/contact"
              className="w-full sm:w-auto bg-secondary hover:bg-secondary/90 text-white font-bold px-8 py-3.5 rounded-xl text-xs sm:text-sm transition shadow-lg inline-flex items-center justify-center gap-2"
            >
              <span>Get Your Cash Offer</span>
              <ArrowRight size={16} />
            </Link>

            <a
              href="tel:+18005550199"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-3.5 rounded-xl text-xs sm:text-sm transition inline-flex items-center justify-center gap-2 border border-white/20"
            >
              <Phone size={16} />
              <span>Call +1 (800) 555-0199</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
