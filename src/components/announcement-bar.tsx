"use client";

import { X, Facebook, Instagram } from "lucide-react";
import { useState } from "react";

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-darkBrown to-brown-800 text-white px-4 py-4 text-center relative shadow-medium">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Contact Info */}
        <div className="flex items-center gap-3 text-body-small sm:text-body">
          <span className="text-cream-200 font-medium">For accurate lead times on orders:</span>
          <a 
            href="mailto:Info@unwinddesigns.com.au" 
            className="text-cream-100 hover:text-white font-semibold transition-colors duration-200 underline-offset-2 hover:underline"
          >
            Info@unwinddesigns.com.au
          </a>
        </div>
        
        {/* Social Media */}
        <div className="flex items-center gap-4">
          <a
            href="#"
            className="text-cream-300 hover:text-white transition-colors duration-200 p-2 rounded-full hover:bg-white/10"
            aria-label="Facebook"
          >
            <Facebook size={18} />
          </a>
          <a
            href="#"
            className="text-cream-300 hover:text-white transition-colors duration-200 p-2 rounded-full hover:bg-white/10"
            aria-label="Instagram"
          >
            <Instagram size={18} />
          </a>
        </div>
      </div>
      
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-cream-300 hover:text-white transition-colors duration-200 p-2 rounded-full hover:bg-white/10"
        aria-label="Close announcement"
      >
        <X size={18} />
      </button>
    </div>
  );
}
