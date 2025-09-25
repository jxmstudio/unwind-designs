"use client";

import { useState } from "react";
import { m } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import ProductGallery from "@/components/product/ProductGallery";
import roam1 from "@/../public/brand/Roam1.jpg";
import roam2 from "@/../public/brand/Roam2.jpg";
import roam3 from "@/../public/brand/Roam3.jpg";
import roam4 from "@/../public/brand/Roam4.jpg";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Phone, Mail } from "lucide-react";
import Link from "next/link";
import { FlatPackProduct } from "@/data/products";
import { BaseKitConfig } from "@/lib/troopy/baseKits";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { KitHeroSection } from "./KitHeroSection";
import { FilterBar } from "./FilterBar";
import { ConfigCard } from "./ConfigCard";
import { ShippingCalculator } from "@/components/checkout/ShippingCalculator";

interface BaseKitPageProps {
  config: BaseKitConfig;
  configurations: FlatPackProduct[];
}

export function BaseKitPage({ config, configurations }: BaseKitPageProps) {
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

  // Get background image based on kit type
  const getBackgroundImage = () => {
    switch(config.id) {
      case 'wander':
        return {
          src: '/brand/wandertroop1.jpg',
          alt: 'Wander Kit in Toyota Troopcarrier'
        };
      case 'roam':
        return {
          src: '/brand/Roam1.jpg',
          alt: 'Roam Kit Setup'
        };
      case 'premium':
        return {
          src: '/brand/stock1.png', // Fallback until we have specific images
          alt: 'Premium Kit Setup'
        };
      default:
        return {
          src: '/brand/stock1.png',
          alt: 'Kit Setup'
        };
    }
  };

  const backgroundImage = getBackgroundImage();

  return (
    <div className="min-h-screen bg-cream-400">
      {/* Hero Section */}
      <KitHeroSection 
        config={config}
        backgroundImage={config.id === 'roam' ? undefined : backgroundImage.src}
        imageAlt={backgroundImage.alt}
      />

      {/* (moved gallery below the Configurations heading) */}

      {/* Roam Pickup Availability Banner */}
      {config.id === 'roam' && (
        <div className="bg-white/70 border-y border-brown-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
            <div className="text-sm md:text-base text-textSecondary">
              <span className="font-semibold text-textPrimary">Pickup available at Export Drive</span>
              <span className="mx-2">•</span>
              <span>Usually ready in 2-4 days</span>
            </div>
          </div>
        </div>
      )}

      {/* Filter Bar */}
      <FilterBar 
        configurations={configurations}
        config={config}
        onFilterChange={setFilteredConfigurations}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
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

            {/* Roam-specific gallery directly under intro text */}
            {config.id === 'roam' && (
              <div className="mt-6 mb-10">
                <ProductGallery images={[
                  { src: roam1, alt: 'Roam gallery 1' },
                  { src: roam2, alt: 'Roam gallery 2' },
                  { src: roam3, alt: 'Roam gallery 3' },
                  { src: roam4, alt: 'Roam gallery 4' }
                ]} />
              </div>
            )}

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
                  style={{
                    borderColor: config.id === 'wander' ? '#059669' : config.id === 'roam' ? '#2563eb' : '#7c3aed',
                    color: config.id === 'wander' ? '#059669' : config.id === 'roam' ? '#2563eb' : '#7c3aed'
                  }}
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
                            <div className="font-medium text-textPrimary text-body-small">
                              {bullet.title}
                            </div>
                            <div className="text-caption text-textSecondary mt-1">
                              {bullet.description}
                            </div>
                          </div>
                        </div>
                      ))}
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
                    <p className="text-body-small text-textSecondary mb-4">
                      {config.sidebar.helpSection.description}
                    </p>
                    <div className="space-y-3">
                      <Link href={config.sidebar.helpSection.ctaLink} className="block">
                        <Button 
                          className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl"
                          style={{
                            backgroundColor: config.id === 'wander' ? '#059669' : config.id === 'roam' ? '#2563eb' : '#7c3aed'
                          }}
                          size="lg"
                        >
                          {config.sidebar.helpSection.ctaText}
                        </Button>
                      </Link>
                      <Link href="/contact" className="block">
                        <Button 
                          variant="outline"
                          className="w-full border-2 border-green-600 text-green-600 hover:bg-white/50 rounded-xl"
                          style={{
                            borderColor: config.id === 'wander' ? '#059669' : config.id === 'roam' ? '#2563eb' : '#7c3aed',
                            color: config.id === 'wander' ? '#059669' : config.id === 'roam' ? '#2563eb' : '#7c3aed'
                          }}
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
                    <h3 className="text-body-small font-semibold text-textPrimary mb-4">
                      Need immediate help?
                    </h3>
                    <div className="space-y-3 text-body-small">
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

        {/* Roam Specific Sections */}
        {config.id === 'roam' && (
          <div className="mt-12 space-y-8">
            {/* Bulky Item Shipping Details */}
            <Card className="bg-white border-0 shadow-sm rounded-2xl">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">🚛 Bulky Item Shipping Details</h3>
                <ul className="list-disc pl-5 space-y-2 text-textSecondary">
                  <li><span className="font-medium text-textPrimary">Free Pickup</span> in Brooklyn Victoria</li>
                  <li>Shipping available Australia wide and calculated on a case by case basis</li>
                  <li>For the best shipping rates fill out the quote form or send us a message.</li>
                  <li>Shipping to a business address with access to a forklift is the cheapest option.</li>
                  <li>Residential and depot collect options also available. We ship to over 200 depots Australia wide to help provide you with the best shipping rates.</li>
                </ul>
              </CardContent>
            </Card>

            {/* Unwind Guarantee */}
            <Card className="bg-white border-0 shadow-sm rounded-2xl">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">Unwind Guarantee</h3>
                <ul className="list-disc pl-5 space-y-2 text-textSecondary">
                  <li>We guarantee products that are fit for purpose</li>
                  <li>Lifetime access to our customer support</li>
                  <li>Receive advice on installation and product tips anytime</li>
                  <li>Minimum 1 year warranty on all products (Refer product description for each item warranty)</li>
                  <li>Change of mind returns within 30 days (Unused and unopened products)* Terms and Conditions apply</li>
                </ul>
              </CardContent>
            </Card>

            {/* Need a Shipping Quote */}
            <Card className="bg-white border-0 shadow-sm rounded-2xl">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Need a Shipping Quote?</h3>
                <div className="grid grid-cols-1 gap-6">
                  <div className="text-textSecondary">
                    Provide your details below for the most accurate rates. Business addresses with forklift access are the most cost-effective. Residential and depot collection available.
                  </div>
                  <ShippingCalculator />
                </div>
              </CardContent>
            </Card>

            {/* Stock and Highlights */}
            <Card className="bg-white border-0 shadow-sm rounded-2xl">
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="text-textPrimary">
                    <p className="font-medium">In Stock ready for Worldwide shipping or local pickup from Brooklyn VIC.</p>
                    <p className="mt-2">Upright fridge variant available now.</p>
                  </div>

                  <div>
                    <p className="text-textPrimary font-semibold">A flat pack Troopy kit like no other.</p>
                    <p className="text-textSecondary mt-2">We proudly present our Roam Troopy Kit. A premium finish, DIY assembled flat pack with all the features you asked for!</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-textPrimary mb-2">What to Expect:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-textSecondary">
                      <li>Easy Assembly: Setup designed for all skill levels.</li>
                      <li>Quality Craftsmanship: Durable materials for long-lasting adventures.</li>
                      <li>Thoughtful design for maximum storage and convenience.</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-textPrimary mb-2">About this flat pack:</h4>
                    <p className="text-textSecondary">Our Roam range is our premium option flat pack for those wanting the ultimate in durability and aesthetics. Built from premium Birch plywood the Roam range is designed to out live your adventures.</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-textPrimary mb-2">Benefits of our Roam flat pack:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-textSecondary">
                      <li>Using Swiss designed cabinetry connectors, full installation is achieved in a weekend with no experience required.</li>
                      <li>Maximum functionality with accessible storage when inside AND outside your Troopy!</li>
                      <li>Unique day bed set up for comfort when stuck inside on a rainy day while maintaining access to storage.</li>
                      <li>Shower cabinet access from the drivers side window from a standard sliding window or gullwing.</li>
                      <li>Built from premium black hex face plywood. Durable, great looking and easy to clean. White and plain birch also available.</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-textPrimary mb-2">Key Dimensions</h4>
                    <ul className="list-disc pl-5 space-y-1 text-textSecondary">
                      <li>Fridge Space - approx 850x460 (Contact us for larger fridge options)</li>
                      <li>Bed Dimensions - approx 1900x950</li>
                      <li>Walkway - approx 360 wide (comfortable to walk through without snagging)</li>
                      <li>Weight Approx 130kg</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-textPrimary mb-2">Manufacturing Partner: No Goat for Jack</h4>
                    <p className="text-textSecondary">We have teamed up with a mechanical engineer/industrial designer with a top of the line manufacturing facility to bring the product to life. Using state of the art machinery we are able to produce a premium product at an affordable price point.</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-textPrimary mb-2">Installation</h4>
                    <p className="text-textSecondary">Installation available by request in Brooklyn VIC and Perth.</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-textPrimary mb-2">Shipping</h4>
                    <p className="text-textSecondary">Free pickup from Brooklyn VIC. Australia-wide shipping is available. For an accurate quote please contact us. We offer shipping to nearly 200 depot locations Australia wide or direct to your door. The shipping quote calculated at checkout may not be accurate depending on your location — by messaging us you are likely to receive a more competitive rate.</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-textPrimary mb-2">Have a question?</h4>
                    <p className="text-textSecondary">Call Karim on 0417 362 209</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
