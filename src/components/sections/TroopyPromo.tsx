"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Settings, Star, Truck, Calculator, Package, Wrench, Shield } from "lucide-react";
import { sectionReveal, staggerContainer, staggerItem } from "@/lib/motion";
import { useFeatureFlag } from "@/lib/feature-flags";
import Link from "next/link";

export function TroopyPromo() {
  const configuratorEnabled = useFeatureFlag('FEATURE_FLAT_PACK_CONFIGURATOR');
  
  return (
    <motion.section 
      className="py-20 bg-cream-400"
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Left Content */}
          <motion.div 
            className="space-y-8"
            variants={staggerItem}
          >
            <div>
              <motion.h2 
                className="text-4xl lg:text-5xl font-bold text-textPrimary mb-6 leading-tight"
                variants={staggerItem}
              >
                Fit Out Your
                <span className="block text-brown-500">Troopy</span>
                <span className="block text-textSecondary text-2xl lg:text-3xl font-normal">
                  Custom Configurator
                </span>
              </motion.h2>
              
              <motion.p 
                className="text-xl text-textSecondary leading-relaxed mb-8"
                variants={staggerItem}
              >
                Design your perfect Troopy fitout with our interactive configurator. 
                Choose from hundreds of components, see real-time pricing, and create 
                a solution that fits your adventure lifestyle.
              </motion.p>
            </div>

            {/* Enhanced Features Grid */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              variants={staggerItem}
            >
              <div className="flex items-center gap-3 p-3 bg-cream-300 rounded-lg">
                <Calculator className="w-5 h-5 text-brown-500" />
                <span className="text-textSecondary">Instant pricing calculator</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-cream-300 rounded-lg">
                <Package className="w-5 h-5 text-brown-500" />
                <span className="text-textSecondary">15 flat pack configurations</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-cream-300 rounded-lg">
                <Wrench className="w-5 h-5 text-brown-500" />
                <span className="text-textSecondary">Professional installation</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-cream-300 rounded-lg">
                <Shield className="w-5 h-5 text-brown-500" />
                <span className="text-textSecondary">Up to 5-year warranty</span>
              </div>
            </motion.div>

            {/* Kit Options - Horizontal Layout */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              variants={staggerItem}
            >
              {/* Wander Kit */}
              <Link href="/flat-packs" className="block">
                <div className="bg-cream-300 rounded-xl p-6 hover:bg-cream-200 transition-all duration-200 border border-transparent hover:border-brown-300 h-full">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-brown-200 rounded-full mb-4">
                      <Package className="w-6 h-6 text-brown-600" />
                    </div>
                    <h3 className="text-base font-semibold text-textPrimary mb-2">Wander Kit</h3>
                    <p className="text-xs text-textSecondary mb-3">Budget-friendly option</p>
                    <div className="text-lg font-bold text-brown-500 mb-2">From $3,750</div>
                    <div className="text-xs text-textSecondary">Perfect for weekend adventures</div>
                  </div>
                </div>
              </Link>

              {/* Roam Kit */}
              <Link href="/flat-packs" className="block">
                <div className="bg-cream-300 rounded-xl p-6 hover:bg-cream-200 transition-all duration-200 border-2 border-brown-400 h-full relative">
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    <div className="bg-brown-500 text-white text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" />
                      Most Popular
                    </div>
                  </div>
                  <div className="text-center pt-2">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-brown-400 rounded-full mb-4">
                      <Package className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-base font-semibold text-textPrimary mb-2">Roam Kit</h3>
                    <p className="text-xs text-textSecondary mb-3">Enhanced features for extended adventures</p>
                    <div className="text-lg font-bold text-brown-500 mb-2">From $6,700</div>
                    <div className="text-xs text-textSecondary">Most popular choice</div>
                  </div>
                </div>
              </Link>

              {/* Premium Kit */}
              <Link href="/flat-packs" className="block">
                <div className="bg-cream-300 rounded-xl p-6 hover:bg-cream-200 transition-all duration-200 border border-transparent hover:border-brown-300 h-full">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-500 rounded-full mb-4">
                      <Package className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-base font-semibold text-textPrimary mb-2">Premium Kit</h3>
                    <p className="text-xs text-textSecondary mb-3">Ultimate luxury and functionality</p>
                    <div className="text-lg font-bold text-brown-500 mb-2">From $9,850</div>
                    <div className="text-xs text-textSecondary">Professional installation included</div>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* CTA */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              variants={staggerItem}
            >
              <motion.div
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                {configuratorEnabled ? (
                  <Button className="bg-brown-500 hover:bg-darkBrown text-cream-400 px-8 py-4 text-lg font-semibold rounded-xl shadow-large hover:shadow-2xl transition-all duration-300">
                    <Settings className="mr-3" size={20} />
                    Start Configurator
                    <ArrowRight className="ml-3" size={20} />
                  </Button>
                ) : (
                  <Link href="/flat-packs">
                    <Button 
                      variant="outline" 
                      className="border-2 border-borderNeutral text-textPrimary hover:bg-brown-100 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300"
                    >
                      <Package className="mr-3" size={20} />
                      Browse Flat Packs
                      <ArrowRight className="ml-3" size={20} />
                    </Button>
                  </Link>
                )}
              </motion.div>
              
              <motion.div
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Link href="/our-fitouts">
                  <Button 
                    variant="outline" 
                    className="border-2 border-borderNeutral text-textPrimary hover:bg-brown-100 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300"
                  >
                    View Examples
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Trust indicators */}
            <motion.div 
              className="flex items-center gap-6 pt-4"
              variants={staggerItem}
            >
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="text-sm text-textSecondary">4.9/5 rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-brown-400" />
                <span className="text-sm text-textSecondary">Free consultation</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div 
            className="relative"
            variants={staggerItem}
          >
            <div className="relative">
              {/* Main image container */}
              <div className="w-full h-96 lg:h-[500px] bg-gradient-to-br from-brown-200 to-brown-300 rounded-2xl shadow-large overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center text-textSecondary">
                                         <div className="mb-4">
                       <img 
                         src="/brand/unwind_designs_logo.jpg" 
                         alt="Unwind Designs Logo" 
                         className="w-32 h-auto mx-auto"
                       />
                     </div>
                    <p className="text-lg font-medium">Troopy Configurator</p>
                    <p className="text-sm text-textSecondary">Interactive 3D Preview</p>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-24 h-24 bg-cream-300 rounded-full border-2 border-borderNeutral shadow-medium flex items-center justify-center"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Settings className="w-8 h-8 text-brown-500" />
              </motion.div>
              
              <motion.div
                className="absolute -bottom-4 -left-4 w-20 h-20 bg-brown-500 rounded-full shadow-medium flex items-center justify-center"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Star className="w-6 h-6 text-cream-400 fill-current" />
              </motion.div>
              
              {/* Decorative grid */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23c9b9a6%22 fill-opacity=%220.1%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
