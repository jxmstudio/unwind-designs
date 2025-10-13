"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Truck, Wrench, Shield, Star } from "lucide-react";
import { fadeUp, staggerContainer, staggerItem, floating } from "@/lib/motion";
import Link from "next/link";

export function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -50]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      {/* Background with parallax */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-darkBrown/95 via-brown-950/90 to-brown-800/85"
        style={{ y }}
      >
        {/* Background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage: `url("/brand/home.png")`
          }}
          role="img"
          aria-label="Professional van fitout with storage solutions and modern design"
        />
        
        {/* Enhanced overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brown-950/40 to-brown-950/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-brown-950/50 via-transparent to-brown-950/30" />
      </motion.div>

      {/* Content */}
      <motion.div 
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white mb-6 sm:mb-8 drop-shadow-2xl leading-tight"
          variants={fadeUp}
        >
          <span className="block">Crafting Quality, Personalized</span>
          <span className="block text-cream-100 mt-2 sm:mt-3">Van & 4x4 Fitouts</span>
          <span className="block text-cream-200 mt-2 sm:mt-3">For Your Unique Lifestyle</span>
        </motion.h1>
        
        <motion.p 
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-white mb-8 sm:mb-12 lg:mb-16 max-w-4xl mx-auto drop-shadow-lg font-medium px-4"
          variants={fadeUp}
        >
          Transform your vehicle into the ultimate adventure companion. From storage solutions 
          to power systems, we provide everything you need for life on the road.
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-8 sm:mb-12 lg:mb-16 w-full px-4"
          variants={staggerItem}
        >
          <motion.div
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="w-full sm:w-auto"
          >
            <Link href="/flat-packs" className="w-full sm:w-auto">
              <Button 
                variant="outline" 
                size="lg"
                className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-darkBrown px-8 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl font-semibold rounded-2xl bg-white/20 shadow-soft hover:shadow-medium transition-all duration-300 min-h-[56px]"
                aria-label="Browse our flat pack product collection"
              >
                Shop Flat Packs
                <ArrowRight className="ml-2 sm:ml-3" size={20} aria-hidden="true" />
              </Button>
            </Link>
          </motion.div>
          
          <motion.div
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="w-full sm:w-auto"
          >
            <Link href="/start-your-build" className="w-full sm:w-auto">
              <Button 
                variant="outline" 
                size="lg"
                className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-darkBrown px-8 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl font-semibold rounded-2xl bg-white/20 shadow-soft hover:shadow-medium transition-all duration-300 min-h-[56px]"
                aria-label="Begin custom fitout consultation process"
              >
                Start Your Build
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Enhanced trust indicators with better styling */}
        <motion.div 
          className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 text-white mb-6 sm:mb-8 px-4"
          variants={staggerItem}
        >
          <motion.div 
            className="flex items-center gap-2 sm:gap-3 bg-white/25 px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-white/30 shadow-soft"
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-success-400 rounded-full animate-pulse" />
            <span className="font-medium text-sm sm:text-base">Professional Installation</span>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-2 sm:gap-3 bg-white/25 px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-white/30 shadow-soft"
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-warning-400 rounded-full animate-pulse" />
            <span className="font-medium text-sm sm:text-base">Custom Design</span>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-2 sm:gap-3 bg-white/25 px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-white/30 shadow-soft"
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-info-400 rounded-full animate-pulse" />
            <span className="font-medium text-sm sm:text-base">Warranty Included</span>
          </motion.div>
        </motion.div>

        {/* Fixed Rating indicator */}
        <motion.div 
          className="flex items-center justify-center gap-3 text-white/90"
          variants={fadeUp}
        >
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ 
                  delay: 1 + i * 0.1, 
                  duration: 0.5,
                  type: "spring",
                  stiffness: 200
                }}
              >
                <Star 
                  className={`w-5 h-5 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-white/60'}`} 
                />
              </motion.div>
            ))}
          </div>
          <motion.span 
            className="text-body-small font-medium"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            4.9/5 from 200+ reviews
          </motion.span>
        </motion.div>
      </motion.div>

      {/* Enhanced decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-cream-400 to-transparent" />
      
      {/* Removed floating icons for cleaner design */}
    </section>
  );
}
