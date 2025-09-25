"use client";

import { m } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ArrowDown, Star, Shield, Users } from "lucide-react";
import { formatPrice, scrollToElement, buildConfigureKitUrl } from "@/lib/troopy/utils";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import Link from "next/link";
import Image from "next/image";

export function WanderHeroEnhanced() {
  const { isDisabled } = useReducedMotionSafe();

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, /* ease: "easeOut" */ }
    }
  };

  const handleExploreConfigurations = () => {
    scrollToElement('configurations', 120);
  };

  return (
    <section className="relative min-h-[75vh] md:min-h-[85vh] lg:min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/brand/wandertroop1.jpg"
          alt="Wander Kit in Toyota Troopcarrier"
          fill
          className="object-cover object-center"
          style={{
            objectPosition: 'center 40%' // Show more of the vehicle setup
          }}
          priority
          sizes="100vw"
        />
        {/* Improved gradient overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[70vh] md:min-h-[75vh]">
          {/* Left Column - Hero Content */}
          <m.div
            initial={isDisabled ? {} : "hidden"}
            animate={isDisabled ? {} : "visible"}
            variants={isDisabled ? {} : staggerContainer}
            className="text-white lg:col-span-7 xl:col-span-6"
          >
            {/* Badge */}
            <m.div variants={isDisabled ? {} : staggerItem} className="mb-6">
              <Badge className="bg-green-100 text-green-800 border-green-200 px-4 py-2 text-body-small font-medium rounded-full">
                Budget-Friendly Choice
              </Badge>
            </m.div>

            {/* Main heading */}
            <m.h1 
              variants={isDisabled ? {} : staggerItem}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            >
              Wander Kit
              <span className="block text-green-400 text-3xl md:text-4xl lg:text-5xl mt-2">
                Budget-Friendly Adventure
              </span>
            </m.h1>

            {/* Lead text */}
            <m.p 
              variants={isDisabled ? {} : staggerItem}
              className="text-xl text-gray-200 max-w-xl mb-8 leading-relaxed"
            >
              Perfect for weekend adventures with reliable storage and basic amenities. 
              Multiple finish options available to match your style.
            </m.p>

            {/* Key Features */}
            <m.div 
              variants={isDisabled ? {} : staggerItem}
              className="grid grid-cols-3 gap-4 mb-8"
            >
              <div className="text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-2">
                  <Star className="w-6 h-6 text-green-400 mx-auto" />
                </div>
                <div className="text-body-small text-gray-300">4.8 Rating</div>
              </div>
              <div className="text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-2">
                  <Users className="w-6 h-6 text-green-400 mx-auto" />
                </div>
                <div className="text-body-small text-gray-300">200+ Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-2">
                  <Shield className="w-6 h-6 text-green-400 mx-auto" />
                </div>
                <div className="text-body-small text-gray-300">2-3 Year Warranty</div>
              </div>
            </m.div>

            {/* Price line */}
            <m.div 
              variants={isDisabled ? {} : staggerItem}
              className="mb-8"
            >
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                From {formatPrice(3750)}
              </div>
              <div className="text-green-300 font-medium">
                Complete kit • Multiple configurations available
              </div>
            </m.div>

            {/* CTA buttons */}
            <m.div 
              variants={isDisabled ? {} : staggerItem}
              className="flex flex-col sm:flex-row gap-4"
            >
              <m.div
                whileHover={isDisabled ? {} : { scale: 1.02 }}
                whileTap={isDisabled ? {} : { scale: 0.98 }}
              >
                <Button
                  onClick={handleExploreConfigurations}
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Explore Configurations
                  <ArrowDown className="ml-2 w-5 h-5" />
                </Button>
              </m.div>

              <m.div
                whileHover={isDisabled ? {} : { scale: 1.02 }}
                whileTap={isDisabled ? {} : { scale: 0.98 }}
              >
                <Link href={buildConfigureKitUrl('wander')}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 rounded-xl font-semibold transition-all duration-300"
                  >
                    Start Your Build
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </m.div>
            </m.div>
          </m.div>

          {/* Right Column - Why Choose Wander Box (Glassmorphism) */}
          <m.div
            variants={isDisabled ? {} : staggerContainer}
            className="lg:col-span-5 xl:col-span-6 flex justify-center lg:justify-end items-center"
          >
            <m.div
              variants={isDisabled ? {} : staggerItem}
              className="backdrop-blur-md bg-white/20 border border-white/30 rounded-3xl p-8 shadow-2xl max-w-md w-full mx-auto lg:mx-0 lg:mr-8"
              style={{
                backdropFilter: 'blur(16px)',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.15) 100%)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.2) inset'
              }}
            >
              <h3 className="text-2xl font-bold text-white mb-6 text-center lg:text-left">
                Why Choose Wander?
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-500/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-green-400/30">
                    <div className="text-2xl">🔧</div>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-white mb-2 text-lg">Easy Assembly</div>
                    <div className="text-white/80 text-body-small leading-relaxed">Tool-free connectors and clear instructions</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-500/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-green-400/30">
                    <div className="text-2xl">💰</div>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-white mb-2 text-lg">Great Value</div>
                    <div className="text-white/80 text-body-small leading-relaxed">Reliable materials without the premium price tag</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-500/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-green-400/30">
                    <div className="text-2xl">🛡️</div>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-white mb-2 text-lg">Warranty</div>
                    <div className="text-white/80 text-body-small leading-relaxed">Up to 2–3 years coverage on Wander kits</div>
                  </div>
                </div>
              </div>
            </m.div>
          </m.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <m.div
        initial={isDisabled ? {} : { opacity: 0, y: 20 }}
        animate={isDisabled ? {} : { opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70"
      >
        <m.div
          animate={isDisabled ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center cursor-pointer"
          onClick={handleExploreConfigurations}
        >
          <div className="text-body-small mb-2">Scroll to explore</div>
          <ArrowDown className="w-5 h-5" />
        </m.div>
      </m.div>
    </section>
  );
}
