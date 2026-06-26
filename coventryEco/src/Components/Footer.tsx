import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-green-900 text-green-100">
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-green-800 pb-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              
              <span className="text-xl font-extrabold text-white">
                Eco<span className="text-green-400">Connect</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-green-200">
              Helping Coventry discover and support local eco-friendly businesses, one review at a time.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5">Explore</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/businesses" className="text-green-200 hover:text-white transition">Eco Businesses</Link></li>
              <li><Link to="/reviews" className="text-green-200 hover:text-white transition">Community Reviews</Link></li>
              <li><Link to="/admin" className="text-green-200 hover:text-white transition">Add a Business</Link></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5">Community</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/reviews" className="text-green-200 hover:text-white transition">Leave a Review</Link></li>
              <li><a href="#" className="text-green-200 hover:text-white transition">Guidelines</a></li>
              <li><a href="#" className="text-green-200 hover:text-white transition">Top Rated</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-green-200 hover:text-white transition">About</a></li>
              <li><a href="#" className="text-green-200 hover:text-white transition">Contact</a></li>
              <li><a href="#" className="text-green-200 hover:text-white transition">Privacy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p className="text-green-300">© {new Date().getFullYear()} EcoConnect. All rights reserved.</p>
          <div className="flex gap-8 uppercase tracking-widest font-semibold">
            <a href="#" className="text-green-200 hover:text-white">Privacy</a>
            <a href="#" className="text-green-200 hover:text-white">Terms</a>
            <a href="#" className="text-green-200 hover:text-white">Github</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;