"use client";

import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/brand/stock1.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/35 md:bg-black/40 lg:bg-black/45" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-cream-400 mb-6 leading-tight">
          Crafting Quality, Personalized
          <span className="block text-lightBrown">Van & 4x4 Fitouts</span>
          <span className="block text-brown-300">For Your Unique Lifestyle</span>
        </h1>
        
        <p className="text-lg sm:text-xl text-cream-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          Transform your vehicle into the ultimate adventure companion. From storage solutions 
          to power systems, we provide everything you need for life on the road.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="bg-brown-500 hover:bg-darkBrown text-cream-400 px-8 py-4 text-lg font-semibold rounded-xl shadow-large hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          >
            Shop Now
            <ArrowRight className="ml-2" size={20} />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="border-2 border-lightBrown text-lightBrown hover:bg-lightBrown hover:text-darkBrown px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300"
          >
            Start Your Build
          </Button>
        </div>

        {/* Trust indicators */}
        <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-cream-300 text-body-small">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-brown-400 rounded-full"></div>
            <span>Professional Installation</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-brown-400 rounded-full"></div>
            <span>Custom Design</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-brown-400 rounded-full"></div>
            <span>Warranty Included</span>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-cream-400 to-transparent"></div>
    </section>
  );
}
