"use client";

import { useState } from "react";
import { m } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Phone, Mail } from "lucide-react";
import Link from "next/link";
import { FlatPackProduct } from "@/data/products";
import { BaseKitConfig } from "@/lib/troopy/baseKits";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { KitHeroSection } from "./KitHeroSection";
import { WanderGallery } from "./WanderGallery";
import { FilterBar } from "./FilterBar";
import { ConfigCard } from "./ConfigCard";

interface WanderKitPageEnhancedProps {
  config: BaseKitConfig;
  configurations: FlatPackProduct[];
}

export function WanderKitPageEnhanced({ config, configurations }: WanderKitPageEnhancedProps) {
  const { isDisabled } = useReducedMotionSafe();
  const [filteredConfigurations, setFilteredConfigurations] = useState<FlatPackProduct[]>(configurations);

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
      transition: { duration: 0.4 }
    }
  };

  return (
    <div className="min-h-screen bg-cream-400">
      {/* Enhanced Hero Section */}
      <KitHeroSection 
        config={config}
        backgroundImage="/brand/wandertroop1.jpg"
        imageAlt="Wander Kit in Toyota Troopcarrier"
      />

      {/* Photo Gallery Section */}
      <WanderGallery />

      {/* Filter Bar */}
      <FilterBar 
        configurations={configurations}
        config={config}
        onFilterChange={setFilteredConfigurations}
      />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Configuration Grid */}
          <div className="flex-1">
            {/* Back Navigation */}
            <div className="mb-6">
              <Link href="/flat-packs">
                <Button variant="ghost" className="text-textSecondary hover:text-textPrimary">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to All Flat Packs
                </Button>
              </Link>
            </div>

            {/* Grid Section Header */}
            <div id="configurations" className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-textPrimary mb-3">
                {config.name} Configurations
              </h2>
              <p className="text-textSecondary">
                Choose from our curated {config.name.toLowerCase()} configurations, each designed for different adventure styles and needs.
              </p>
            </div>

            {/* Configuration Cards Grid */}
            <m.div
              initial={isDisabled ? {} : "hidden"}
              animate={isDisabled ? {} : "visible"}
              variants={isDisabled ? {} : staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredConfigurations.map((configItem, index) => (
                <ConfigCard
                  key={configItem.id}
                  config={configItem}
                  kitConfig={config}
                  index={index}
                />
              ))}
            </m.div>

            {/* No Results */}
            {filteredConfigurations.length === 0 && (
              <m.div
                initial={isDisabled ? {} : { opacity: 0, y: 20 }}
                animate={isDisabled ? {} : { opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <div className="text-lg font-medium text-textPrimary mb-2">
                  No configurations found
                </div>
                <div className="text-textSecondary mb-6">
                  Try adjusting your filters to see more options
                </div>
                <Button
                  onClick={() => setFilteredConfigurations(configurations)}
                  variant="outline"
                  className="border-2 border-green-600 text-green-600 hover:bg-green-100"
                >
                  Clear All Filters
                </Button>
              </m.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-80 xl:w-96">
            <div className="sticky top-32 space-y-6">
              {/* Why Choose Section */}
              <m.div variants={isDisabled ? {} : staggerItem}>
                <Card className="bg-white border-0 shadow-sm rounded-2xl">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-textPrimary mb-4">
                      {config.sidebar.whyChoose.title}
                    </h3>
                    <div className="space-y-4">
                      {config.sidebar.whyChoose.bullets.map((bullet, index) => (
                        <div key={index} className="flex gap-3">
                          <div className="text-xl flex-shrink-0 mt-0.5">
                            {bullet.icon}
                          </div>
                          <div>
                            <div className="font-medium text-textPrimary text-sm">
                              {bullet.title}
                            </div>
                            <div className="text-xs text-textSecondary mt-1">
                              {bullet.description}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </m.div>

              {/* Featured Build Testimonial */}
              <m.div variants={isDisabled ? {} : staggerItem}>
                <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-0 shadow-sm rounded-2xl overflow-hidden">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-3">⭐</div>
                    <blockquote className="text-sm text-textPrimary mb-4 italic">
                      &quot;The Wander Kit was perfect for our budget and weekend trips. Easy to install and everything we needed for comfortable camping.&quot;
                    </blockquote>
                    <div className="text-xs text-textSecondary">
                      — Sarah & Mike, Wander Kit owners
                    </div>
                  </CardContent>
                </Card>
              </m.div>

              {/* Help Section */}
              <m.div variants={isDisabled ? {} : staggerItem}>
                <Card className={`bg-gradient-to-br ${config.accent.gradient} border-0 shadow-sm rounded-2xl overflow-hidden`}>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-textPrimary mb-2">
                      {config.sidebar.helpSection.title}
                    </h3>
                    <p className="text-sm text-textSecondary mb-4">
                      {config.sidebar.helpSection.description}
                    </p>
                    <div className="space-y-3">
                      <Link href={config.sidebar.helpSection.ctaLink} className="block">
                        <Button 
                          className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl"
                          size="lg"
                        >
                          {config.sidebar.helpSection.ctaText}
                        </Button>
                      </Link>
                      <Link href="/contact" className="block">
                        <Button 
                          variant="outline"
                          className="w-full border-2 border-green-600 text-green-600 hover:bg-white/50 rounded-xl"
                          size="lg"
                        >
                          Contact Us
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </m.div>

              {/* Quick Contact */}
              <m.div variants={isDisabled ? {} : staggerItem}>
                <Card className="bg-white border-0 shadow-sm rounded-2xl">
                  <CardContent className="p-6">
                    <h3 className="text-sm font-semibold text-textPrimary mb-4">
                      Need immediate help?
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-brown-500" />
                        <span className="text-textSecondary">0417 362 209</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-brown-500" />
                        <span className="text-textSecondary">Info@unwinddesigns.com.au</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </m.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
