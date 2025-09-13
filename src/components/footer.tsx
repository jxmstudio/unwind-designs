"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Phone, MapPin, Facebook, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-darkBrown text-cream-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <BrandLogo width={140} height={48} />
            </div>
            <p className="text-cream-300 mb-6 leading-relaxed">
              Crafting quality, personalized van & 4x4 fitouts for your unique lifestyle. 
              Transform your vehicle into the ultimate adventure companion.
            </p>
            <div className="space-y-2 text-sm text-cream-300">
              <p>ABN: 12 345 678 901</p>
              <p>Est. 2020</p>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h3 className="text-lg font-semibold text-cream-400 mb-6">Shop</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/shop" className="text-cream-300 hover:text-cream-400 transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/shop?category=storage" className="text-cream-300 hover:text-cream-400 transition-colors">
                  Storage Solutions
                </Link>
              </li>
              <li>
                <Link href="/shop?category=electrical" className="text-cream-300 hover:text-cream-400 transition-colors">
                  Electrical Systems
                </Link>
              </li>
              <li>
                <Link href="/shop?category=kitchen" className="text-cream-300 hover:text-cream-400 transition-colors">
                  Kitchen & Appliances
                </Link>
              </li>
              <li>
                <Link href="/shop?category=water" className="text-cream-300 hover:text-cream-400 transition-colors">
                  Water Systems
                </Link>
              </li>
              <li>
                <Link href="/shop?category=lighting" className="text-cream-300 hover:text-cream-400 transition-colors">
                  Lighting
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Fitouts Column */}
          <div>
            <h3 className="text-lg font-semibold text-cream-400 mb-6">Our Fitouts</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/our-fitouts" className="text-cream-300 hover:text-cream-400 transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/start-your-build" className="text-cream-300 hover:text-cream-400 transition-colors">
                  Configurator
                </Link>
              </li>
              <li>
                <Link href="/workshop-services" className="text-cream-300 hover:text-cream-400 transition-colors">
                  Workshop Services
                </Link>
              </li>
              <li>
                <Link href="/installation" className="text-cream-300 hover:text-cream-400 transition-colors">
                  Installation
                </Link>
              </li>
              <li>
                <Link href="/warranty" className="text-cream-300 hover:text-cream-400 transition-colors">
                  Warranty
                </Link>
              </li>
              <li>
                <Link href="/maintenance" className="text-cream-300 hover:text-cream-400 transition-colors">
                  Maintenance
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h3 className="text-lg font-semibold text-cream-400 mb-6">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/contact" className="text-cream-300 hover:text-cream-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-cream-300 hover:text-cream-400 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/policies/shipping" className="text-cream-300 hover:text-cream-400 transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/policies/returns" className="text-cream-300 hover:text-cream-400 transition-colors">
                  Returns Policy
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="text-cream-300 hover:text-cream-400 transition-colors">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-cream-300 hover:text-cream-400 transition-colors">
                  Technical Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 pt-8 border-t border-brown-600">
          <div className="max-w-2xl">
            <h3 className="text-xl font-semibold text-cream-400 mb-4">
              Stay Updated
            </h3>
            <p className="text-cream-300 mb-6">
              Get the latest product updates, installation tips, and adventure stories delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-brown-600 border-brown-500 text-cream-400 placeholder-cream-300 focus:border-cream-400 focus:ring-cream-400/20"
              />
              <Button className="bg-brown-500 hover:bg-brown-400 text-darkBrown px-6">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Contact Info & Social */}
        <div className="mt-12 pt-8 border-t border-brown-600">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Contact Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-brown-400" />
                <span className="text-cream-300">
                  Export Drive, Brooklyn, VIC, Australia, Victoria
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brown-400" />
                <span className="text-cream-300">
                  0417 362 209
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brown-400" />
                <span className="text-cream-300">
                  Info@unwinddesigns.com.au
                </span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex justify-center lg:justify-end">
              <div className="flex space-x-4">
                {[
                  { icon: Facebook, href: "https://www.facebook.com/profile.php?id=100087206017018", label: "Facebook" },
                  { icon: Instagram, href: "https://www.instagram.com/unwind.designs?utm_source=qr", label: "Instagram" }
                ].map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-brown-600 hover:bg-brown-500 rounded-full flex items-center justify-center text-cream-400 hover:text-cream-300 transition-all duration-300 group"
                    whileHover={{ y: -3, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-brown-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-cream-300">
              © 2025 Unwind Designs. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm text-cream-300">
              <Link href="/policies/privacy" className="hover:text-cream-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/policies/terms" className="hover:text-cream-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="hover:text-cream-400 transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
