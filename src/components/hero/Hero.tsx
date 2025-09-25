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
            backgroundImage: `url("/brand/stock1.png")`
          }}
          role="img"
          aria-label="Toyota Troopcarrier vehicle with professional fitout in outdoor setting"
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
          className="text-display-1 sm:text-5xl lg:text-6xl xl:text-7xl text-white mb-8 drop-shadow-2xl"
          variants={fadeUp}
        >
          <span className="block">Crafting Quality, Personalized</span>
          <span className="block text-cream-100 mt-3">Van & 4x4 Fitouts</span>
          <span className="block text-cream-200 mt-3">For Your Unique Lifestyle</span>
        </motion.h1>
        
        <motion.p 
          className="text-lg sm:text-xl lg:text-2xl text-white mb-16 max-w-4xl mx-auto drop-shadow-lg font-medium"
          variants={fadeUp}
        >
          Transform your vehicle into the ultimate adventure companion. From storage solutions 
          to power systems, we provide everything you need for life on the road.
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          variants={staggerItem}
        >
          <motion.div
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.2 }}
          >
            <Link href="/flat-packs">
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-darkBrown px-12 py-6 text-xl font-semibold rounded-2xl bg-white/20 shadow-soft hover:shadow-medium transition-all duration-300"
                aria-label="Browse our flat pack product collection"
              >
                Shop Flat Packs
                <ArrowRight className="ml-3" size={24} aria-hidden="true" />
              </Button>
            </Link>
          </motion.div>
          
          <motion.div
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.2 }}
          >
            <Link href="/start-your-build">
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-darkBrown px-12 py-6 text-xl font-semibold rounded-2xl bg-white/20 shadow-soft hover:shadow-medium transition-all duration-300"
                aria-label="Begin custom fitout consultation process"
              >
                Start Your Build
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Enhanced trust indicators with better styling */}
        <motion.div 
          className="flex flex-wrap justify-center items-center gap-6 text-white mb-8"
          variants={staggerItem}
        >
          <motion.div 
            className="flex items-center gap-3 bg-white/25 px-6 py-3 rounded-full border border-white/30 shadow-soft"
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-3 h-3 bg-success-400 rounded-full animate-pulse" />
            <span className="font-medium">Professional Installation</span>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-3 bg-white/25 px-6 py-3 rounded-full border border-white/30 shadow-soft"
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-3 h-3 bg-warning-400 rounded-full animate-pulse" />
            <span className="font-medium">Custom Design</span>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-3 bg-white/25 px-6 py-3 rounded-full border border-white/30 shadow-soft"
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-3 h-3 bg-info-400 rounded-full animate-pulse" />
            <span className="font-medium">Warranty Included</span>
          </motion.div>
        </motion.div>

        {/* Fixed Rating indicator */}
        <motion.div 
          className="flex items-center justify-center gap-3 text-white/90"
          variants={fadeUp}
        >
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star 
                key={i} 
                className={`w-5 h-5 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-white/60'}`} 
              />
            ))}
          </div>
          <span className="text-body-small font-medium">4.9/5 from 200+ reviews</span>
        </motion.div>
      </motion.div>

      {/* Enhanced decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-cream-400 to-transparent" />
      
      {/* Enhanced floating icons with better animations */}
      <motion.div
        className="absolute top-32 right-20 text-cream-400/30"
        variants={floating}
        animate="animate"
      >
        <Truck size={48} />
      </motion.div>
      
      <motion.div
        className="absolute bottom-48 left-20 text-cream-400/30"
        variants={floating}
        animate="animate"
        transition={{ delay: 1 }}
      >
        <Wrench size={40} />
      </motion.div>
      
      <motion.div
        className="absolute top-48 left-32 text-cream-400/30"
        variants={floating}
        animate="animate"
        transition={{ delay: 2 }}
      >
        <Shield size={36} />
      </motion.div>
    </section>
  );
}
