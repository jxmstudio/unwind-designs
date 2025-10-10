"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/motion";
import { ChevronRight } from "lucide-react";

export default function SitemapPage() {
  const sitemapSections = [
    {
      title: "Main Pages",
      links: [
        { href: "/", label: "Home" },
        { href: "/about", label: "About Us" },
        { href: "/contact", label: "Contact" },
        { href: "/faq", label: "FAQ" },
      ]
    },
    {
      title: "Shop",
      links: [
        { href: "/shop", label: "All Products" },
        { href: "/flat-packs", label: "Flat Packs" },
        { href: "/products/wander-troopy-flat-pack", label: "Wander Kit" },
        { href: "/products/premium-troopy-kits", label: "Premium Kit" },
      ]
    },
    {
      title: "Services",
      links: [
        { href: "/start-your-build", label: "Start Your Build" },
        { href: "/our-fitouts", label: "Gallery" },
        { href: "/workshop-services", label: "Workshop Services" },
        { href: "/installation", label: "Installation" },
        { href: "/maintenance", label: "Maintenance" },
      ]
    },
    {
      title: "Support",
      links: [
        { href: "/support", label: "Technical Support" },
        { href: "/warranty", label: "Warranty" },
        { href: "/size-guide", label: "Size Guide" },
      ]
    },
    {
      title: "Policies",
      links: [
        { href: "/policies/privacy", label: "Privacy Policy" },
        { href: "/policies/terms", label: "Terms of Service" },
        { href: "/policies/shipping", label: "Shipping Policy" },
        { href: "/policies/returns", label: "Return Policy" },
      ]
    },
    {
      title: "Account",
      links: [
        { href: "/cart", label: "Shopping Cart" },
        { href: "/account", label: "My Account" },
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-cream-400">
      <Navigation />
      <main className="pt-20">
        <motion.section
          className="py-16 px-4"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <div className="max-w-7xl mx-auto">
            <motion.div variants={fadeUp} className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl font-bold text-textPrimary mb-4">
                Sitemap
              </h1>
              <p className="text-lg text-textPrimary/80 max-w-2xl mx-auto">
                Navigate through all available pages on Unwind Designs
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {sitemapSections.map((section) => (
                <motion.div
                  key={section.title}
                  variants={staggerItem}
                  className="bg-cream-300 rounded-2xl p-6 shadow-soft hover:shadow-medium transition-shadow duration-300"
                >
                  <h2 className="text-xl font-bold text-textPrimary mb-4 border-b border-borderNeutral pb-3">
                    {section.title}
                  </h2>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <motion.li
                        key={link.href}
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Link
                          href={link.href}
                          className="flex items-center text-textPrimary/80 hover:text-brown-500 transition-colors duration-200 group"
                        >
                          <ChevronRight className="w-4 h-4 mr-2 text-brown-400 group-hover:text-brown-500" />
                          {link.label}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-12 text-center bg-cream-300 rounded-2xl p-8 shadow-soft"
            >
              <h3 className="text-xl font-semibold text-textPrimary mb-3">
                Can't Find What You're Looking For?
              </h3>
              <p className="text-textPrimary/80 mb-6">
                Our team is here to help you find exactly what you need.
              </p>
              <Link
                href="/contact"
                className="inline-block bg-brown-500 hover:bg-darkBrown text-white font-semibold px-8 py-3 rounded-xl transition-colors duration-200"
              >
                Contact Us
              </Link>
            </motion.div>
          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
}
