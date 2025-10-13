"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/motion";
import Image from "next/image";
import { Instagram, Mail } from "lucide-react";
import Link from "next/link";

// Gallery will be populated with actual customer builds
// Images should be added to /public/brand/gallery/ directory
const galleryBuilds = [
  {
    id: 1,
    title: "Troopy Complete Fitout - Black Hex Finish",
    description: "Complete flat pack installation with premium Black Hex finish. Features include full storage system, water tank integration, and custom electrical setup.",
    vehicle: "Toyota Troopcarrier 78 Series",
    images: [], // Add actual images from /public/brand/gallery/
    tags: ["Roam Kit", "Black Hex", "Water System", "Electrical"]
  },
  {
    id: 2,
    title: "Wander Kit - Weekend Explorer",
    description: "Budget-friendly Wander Kit perfect for weekend trips. Clean birch finish with essential storage and organization.",
    vehicle: "Toyota Troopcarrier 78 Series", 
    images: [],
    tags: ["Wander Kit", "Plain Birch", "Weekend Trips"]
  },
  {
    id: 3,
    title: "Premium Multi-Tone Build",
    description: "Our premium offering with multi-tone timber finish. Includes smart lighting, German soft-close hardware, and professional installation.",
    vehicle: "Toyota Troopcarrier 78 Series",
    images: [],
    tags: ["Premium Kit", "Multi-Tone", "Smart Lighting"]
  }
];

export default function OurFitoutsPage() {
  return (
    <div className="min-h-screen bg-cream-400">
      <Navigation />
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-textPrimary mb-4">
              Our Fitouts
            </h1>
            <p className="text-lg text-textSecondary max-w-2xl mx-auto mb-8">
              Explore our gallery of custom Toyota Troopcarrier fitouts. Each build is uniquely tailored to the owner&apos;s adventure needs.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="https://www.instagram.com/unwind.designs?utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
              >
                <Instagram className="w-5 h-5" />
                View More on Instagram
              </Link>
            </div>
          </motion.div>
          
          {/* Gallery Info Banner */}
          <motion.div
            className="bg-blue-50 border border-blue-200 rounded-2xl p-8 mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Mail className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-blue-900 mb-3">
              Show Us Your Build!
            </h3>
            <p className="text-blue-700 mb-4 max-w-2xl mx-auto">
              We&apos;d love to feature your Unwind Designs fitout in our gallery. 
              Share your photos and adventure stories with us!
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-300"
            >
              <Mail className="w-4 h-4" />
              Submit Your Build
            </Link>
          </motion.div>

          {/* Gallery Grid - Placeholder until actual images are added */}
          {galleryBuilds.length === 0 || galleryBuilds.every(build => build.images.length === 0) ? (
            <motion.div
              className="bg-white rounded-2xl p-12 text-center border border-borderNeutral"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-2xl font-bold text-textPrimary mb-4">
                Gallery Coming Soon
              </h3>
              <p className="text-lg text-textSecondary mb-6 max-w-2xl mx-auto">
                We&apos;re currently building our gallery of customer fitouts. In the meantime, 
                check out our Instagram for the latest builds and inspiration.
              </p>
              <div className="flex justify-center gap-4">
                <Link
                  href="https://www.instagram.com/unwind.designs?utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                >
                  <Instagram className="w-5 h-5" />
                  Follow Us on Instagram
                </Link>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 bg-accent-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-accent-600 transition-colors duration-300"
                >
                  Browse Products
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {galleryBuilds.map((build) => (
                <motion.div
                  key={build.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-soft border border-borderNeutral hover:shadow-medium transition-all duration-300"
                  variants={staggerItem}
                >
                  <div className="relative w-full h-64 bg-cream-300">
                    {build.images.length > 0 ? (
                      <Image
                        src={build.images[0]}
                        alt={build.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-textSecondary">
                        <span className="text-4xl">📸</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-textPrimary mb-2">
                      {build.title}
                    </h3>
                    <p className="text-body-small text-textSecondary mb-3">
                      {build.vehicle}
                    </p>
                    <p className="text-textSecondary mb-4">
                      {build.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {build.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-cream-300 text-textPrimary text-caption rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Call to Action */}
          <motion.div
            className="mt-16 text-center bg-gradient-to-r from-brown-500 to-brown-600 rounded-2xl p-12 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Ready to Start Your Build?
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Let&apos;s create a custom fitout tailored to your adventure needs.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/start-your-build"
                className="bg-white text-brown-600 px-8 py-4 rounded-xl font-semibold hover:bg-cream-300 transition-colors duration-300"
              >
                Start Your Build
              </Link>
              <Link
                href="/contact"
                className="bg-brown-700 text-white px-8 py-4 rounded-xl font-semibold hover:bg-brown-800 transition-colors duration-300 border-2 border-white/20"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
