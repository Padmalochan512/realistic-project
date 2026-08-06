import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import logo from '../../assets/logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-slate-200 border-t-4 border-secondary pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          {/* Column 1: Brand Info & Logo */}
          <div className="space-y-4">
            <Link to="/" className="inline-block bg-white p-2 rounded-lg shadow-md">
              <img 
                src={logo} 
                alt="CNJ Home Buyers Logo" 
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-slate-300 text-sm leading-relaxed">
              Your trusted real estate partner. We simplify selling and buying homes with fast cash offers, fair evaluation, and seamless transactions.
            </p>
           
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4 border-b-2 border-secondary inline-block pb-1">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              {['Home', 'About', 'Listing', 'Gallery', 'Agents', 'Contact'].map((item) => (
                <li key={item}>
                  <Link 
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="hover:text-secondary transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowRight size={14} className="text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4 border-b-2 border-secondary inline-block pb-1">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-secondary shrink-0 mt-0.5" />
                <span className="text-slate-300">
                  123 Real Estate Blvd, Suite 400, Cityville, ST 12345
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-secondary shrink-0" />
                <a href="tel:+15550192834" className="text-slate-300 hover:text-white transition">
                  (555) 019-2834
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-secondary shrink-0" />
                <a href="mailto:info@cnjhomebuyers.com" className="text-slate-300 hover:text-white transition">
                  info@cnjhomebuyers.com
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Cash Offer Call-To-Action */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <h4 className="text-white font-bold text-base mb-2">Ready to Sell Your House?</h4>
              <p className="text-xs text-slate-300 mb-4">
                Get a competitive cash offer in as little as 24 hours without closing fees or repairs.
              </p>
            </div>
            <Link
              to="/contact"
              className="w-full block text-center bg-secondary hover:bg-secondary/90 text-white font-semibold text-sm py-2.5 rounded-xl shadow-md transition"
            >
              Get Cash Offer
            </Link>
          </div>

        </div>

        {/* Bottom Bar / Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 gap-4">
          <p>© {currentYear} CNJ Home Buyers. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;