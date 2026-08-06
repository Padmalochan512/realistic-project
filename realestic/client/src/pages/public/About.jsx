import React from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle2,
  ShieldCheck,
  Clock,
  DollarSign,
  Home as HomeIcon,
  Award,
  Users,
  ArrowRight,
  PhoneCall,
} from "lucide-react";

const About = () => {
  // Core value highlights
  const pillars = [
    {
      icon: <DollarSign className="w-8 h-8 text-secondary" />,
      title: "Fair Cash Offers",
      description:
        "We evaluate your property using current market data to provide honest, competitive cash proposals.",
    },
    {
      icon: <Clock className="w-8 h-8 text-secondary" />,
      title: "Fast & Flexible Closings",
      description:
        "Need to close in 7 days or 30 days? We work around your timeline with zero delay.",
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-secondary" />,
      title: "Zero Repair Costs",
      description:
        "Sell your house completely as-is. You don't need to clean, paint, or make any expensive fixes.",
    },
    {
      icon: <CheckCircle2 className="w-8 h-8 text-secondary" />,
      title: "No Fees or Commissions",
      description:
        "Unlike traditional real estate agents, we charge 0% commission and cover standard closing costs.",
    },
  ];

  // How It Works Steps
  const steps = [
    {
      number: "01",
      title: "Contact Us",
      desc: "Fill out our simple form or give us a call with details about your property.",
    },
    {
      number: "02",
      title: "Property Assessment",
      desc: "We review your home details and schedule a quick, hassle-free evaluation.",
    },
    {
      number: "03",
      title: "Receive Your Offer",
      desc: "Get a fair, no-obligation cash offer tailored specifically to your needs.",
    },
    {
      number: "04",
      title: "Close & Get Paid",
      desc: "Choose your preferred closing date and receive cash upon settlement.",
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800">
      {/* 1. HERO BANNER */}
      {/* HERO SECTION - OPTION 1 */}
      <section className="relative bg-primary text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background decorative accent glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-secondary/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Column: Text */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Selling Your Home <br className="hidden sm:inline" />
              <span className="text-secondary">Made Simple & Fast</span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              We buy houses in any condition, offering competitive cash
              proposals with zero commissions, hidden fees, or closing delays.
            </p>

            {/* Quick Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                to="/contact"
                className="w-full sm:w-auto bg-secondary hover:bg-secondary/90 text-white font-bold px-7 py-3.5 rounded-xl text-sm shadow-lg transition text-center"
              >
                Get Cash Offer
              </Link>
              <a
                href="tel:5550192834"
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-7 py-3.5 rounded-xl text-sm transition flex items-center justify-center gap-2"
              >
                <PhoneCall size={16} className="text-secondary" />
                <span>(555) 019-2834</span>
              </a>
            </div>

            {/* Quick Stats Bar */}
            <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-4 text-center lg:text-left max-w-md mx-auto lg:mx-0">
              <div>
                <h3 className="text-2xl font-black text-white">0%</h3>
                <p className="text-xs text-slate-400">Commissions</p>
              </div>
              <div>
                <h3 className="text-2xl font-black text-white">7 Days</h3>
                <p className="text-xs text-slate-400">Fast Closings</p>
              </div>
              <div>
                <h3 className="text-2xl font-black text-white">$0</h3>
                <p className="text-xs text-slate-400">Repair Costs</p>
              </div>
            </div>
          </div>

          {/* Right Column: Imagery Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10">
              <img
                src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80"
                alt="Beautiful Modern Home"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
            </div>

            {/* Floating Badge overlay */}
            <div className="absolute -bottom-5 -left-5 bg-white text-primary p-4 rounded-2xl shadow-xl border border-slate-100 hidden sm:flex items-center gap-3">
              <div className="p-3 bg-secondary/10 rounded-xl">
                <ShieldCheck className="w-8 h-8 text-secondary" />
              </div>
              <div>
                <h4 className="font-bold text-sm">100% Free Consultation</h4>
                <p className="text-xs text-slate-500">No obligation to sell</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. COMPANY OVERVIEW & MISSION */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Grid */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-slate-200">
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80"
                alt="Modern Residential Home"
                className="w-full h-96 object-cover"
              />
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-2 sm:right-6 bg-primary text-white p-6 rounded-2xl shadow-xl max-w-xs border-b-4 border-secondary hidden sm:block">
              <div className="flex items-center gap-3">
                <Award className="w-10 h-10 text-secondary shrink-0" />
                <div>
                  <h4 className="font-extrabold text-lg">Trusted Partner</h4>
                  <p className="text-xs text-slate-300">
                    Helping sellers move forward with confidence.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-6">
            <span className="text-secondary font-bold text-xs uppercase tracking-wider bg-secondary/10 px-3 py-1 rounded-full border border-secondary/20">
              Who We Are
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary leading-tight">
              A Direct, Transparent Approach to Selling Your Home
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              At <strong className="text-primary">CNJ Home Buyers</strong>, we
              understand that traditional home selling can be
              overwhelming—riddled with endless showings, agent commissions,
              unpredictable buyer financing, and costly repairs.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Our mission is to eliminate those obstacles. We provide
              straightforward cash solutions tailored to your timeline, whether
              you're downsizing, relocating, dealing with an inherited property,
              or simply looking for a hassle-free cash sale.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="bg-secondary hover:bg-secondary/90 text-white font-bold px-6 py-3.5 rounded-xl text-sm shadow-md transition inline-flex items-center gap-2"
              >
                <span>Get a Cash Offer</span>
                <ArrowRight size={16} />
              </Link>
              <a
                href="tel:5550192834"
                className="border border-primary text-primary hover:bg-primary hover:text-white font-bold px-6 py-3.5 rounded-xl text-sm transition inline-flex items-center gap-2"
              >
                <PhoneCall size={16} />
                <span>(555) 019-2834</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE PILLARS / WHY CHOOSE US */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-secondary font-bold text-xs uppercase tracking-widest bg-secondary/10 px-3.5 py-1.5 rounded-full">
              Why Work With Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary mt-3">
              Built Around Your Convenience
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              We prioritize transparency and ease at every step of your home
              transaction.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {pillars.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="p-3 bg-white rounded-xl shadow-xs border border-slate-100 inline-block mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS (OUR PROCESS) */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-secondary font-bold text-xs uppercase tracking-widest bg-secondary/10 px-3.5 py-1.5 rounded-full">
            Our Simple Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary mt-3">
            Sell Your Home in 4 Easy Steps
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative"
            >
              <span className="text-3xl font-extrabold text-primary/20 block mb-2">
                {step.number}
              </span>
              <h4 className="text-lg font-bold text-primary mb-1">
                {step.title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CALL TO ACTION BANNER */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-primary rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border-b-4 border-secondary">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold">
              Ready to See What Your Home Is Worth?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
              Get an accurate, zero-commitment cash offer for your property
              today.
            </p>
          </div>

          <Link
            to="/contact"
            className="bg-secondary hover:bg-secondary/90 text-white font-bold px-8 py-4 rounded-xl text-sm transition shrink-0 shadow-md"
          >
            Request Cash Offer
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
