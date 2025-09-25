"use client";

import { LazyMotion, m, domAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ArrowRight, Filter, Info } from "lucide-react";
import Link from "next/link";
import { FlatPackProduct } from "@/data/products";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { 
  fadeUp, 
  staggerContainer, 
  staggerItem, 
  buttonHover,
  textReveal,
  imageReveal
} from "@/lib/motion";
import { useState } from "react";

interface KitConfigurationsGridProps {
  configurations: FlatPackProduct[];
  kitInfo: {
    name: string;
    tagline: string;
    description: string;
    startingPrice: number;
    badge: string;
    badgeColor: string;
  };
}

export function KitConfigurationsGrid({ 
  configurations, 
  kitInfo 
}: KitConfigurationsGridProps) {
  const { isDisabled } = useReducedMotionSafe();
  const [selectedFridgeType, setSelectedFridgeType] = useState<string>('all');
  const [selectedFinish, setSelectedFinish] = useState<string>('all');

  // Get unique fridge types and finishes for filtering
  const fridgeTypes = Array.from(new Set(configurations.map(config => config.fridgeType)));
  const finishes = Array.from(new Set(configurations.map(config => config.finish)));

  // Filter configurations based on selected filters
  const filteredConfigurations = configurations.filter(config => {
    const fridgeMatch = selectedFridgeType === 'all' || config.fridgeType === selectedFridgeType;
    const finishMatch = selectedFinish === 'all' || config.finish === selectedFinish;
    return fridgeMatch && finishMatch;
  });

  return (
    <LazyMotion features={domAnimation}>
      <section className="py-20 bg-cream-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <m.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center mb-4">
              <Badge className={`${kitInfo.badgeColor} border-0 font-semibold text-lg px-4 py-2`}>
                {kitInfo.badge}
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-textPrimary mb-4">
              {kitInfo.name}
            </h1>
            <p className="text-xl text-accent-600 font-medium mb-4">
              {kitInfo.tagline}
            </p>
            <p className="text-lg text-textPrimary/80 max-w-3xl mx-auto mb-6">
              {kitInfo.description}
            </p>
            <div className="text-2xl font-bold text-textPrimary">
              From ${kitInfo.startingPrice.toLocaleString()}
            </div>
          </m.div>

          {/* Filters */}
          <m.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="mb-12"
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg max-w-4xl mx-auto">
              <div className="flex items-center gap-4 mb-4">
                <Filter className="w-5 h-5 text-accent-600" />
                <h3 className="text-lg font-semibold text-textPrimary">Filter Configurations</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Fridge Type Filter */}
                <div>
                  <label className="block text-body-small font-medium text-textPrimary mb-2">
                    Fridge Type
                  </label>
                  <select
                    value={selectedFridgeType}
                    onChange={(e) => setSelectedFridgeType(e.target.value)}
                    className="w-full p-3 border border-borderNeutral rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                  >
                    <option value="all">All Fridge Types</option>
                    {fridgeTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Finish Filter */}
                <div>
                  <label className="block text-body-small font-medium text-textPrimary mb-2">
                    Finish
                  </label>
                  <select
                    value={selectedFinish}
                    onChange={(e) => setSelectedFinish(e.target.value)}
                    className="w-full p-3 border border-borderNeutral rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                  >
                    <option value="all">All Finishes</option>
                    {finishes.map(finish => (
                      <option key={finish} value={finish}>{finish}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4 text-body-small text-textPrimary/60">
                Showing {filteredConfigurations.length} of {configurations.length} configurations
              </div>
            </div>
          </m.div>

          {/* Configurations Grid */}
          <m.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredConfigurations.map((config) => (
              <m.div
                key={config.id}
                variants={staggerItem}
                whileHover={isDisabled ? {} : { y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full bg-cream-300 rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 border-0 overflow-hidden group">
                  <div className="relative overflow-hidden">
                    <m.div 
                      className="h-48 bg-gradient-to-br from-brown-200 to-brown-300 flex items-center justify-center"
                      variants={imageReveal}
                      whileHover={isDisabled ? {} : { scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="text-center text-textPrimary/70">
                        <div className="text-4xl mb-2">🚐</div>
                        <p className="text-body-small font-medium">{config.kitType} Kit</p>
                      </div>
                    </m.div>
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      <Badge variant="secondary" size="sm">
                        {config.fridgeType}
                      </Badge>
                      <Badge variant="secondary" size="sm">
                        {config.finish}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <m.div
                      variants={textReveal}
                      className="mb-4"
                    >
                      <h3 className="text-xl font-semibold text-textPrimary mb-2 group-hover:text-brown-500 transition-colors">
                        {config.name}
                      </h3>
                      <p className="text-textPrimary/70 text-body-small mb-3">
                        {config.shortDescription}
                      </p>
                    </m.div>

                    {/* Features */}
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-2 text-body-small text-textPrimary/70">
                        <Info className="w-4 h-4" />
                        <span>{config.fridgeType}</span>
                      </div>
                      <div className="flex items-center gap-2 text-body-small text-textPrimary/70">
                        <Star className="w-4 h-4" />
                        <span>{config.finish}</span>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={`${
                              i < Math.floor(config.rating)
                                ? "text-yellow-400 fill-current"
                                : "text-surface-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-body-small text-textPrimary/70">
                        ({config.reviewCount})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="mb-6">
                      <div className="text-2xl font-bold text-brown-500">
                        ${config.price.toFixed(2)}
                      </div>
                      <p className="text-body-small text-textPrimary/70">
                        {config.warranty} warranty included
                      </p>
                    </div>

                    <m.div
                      variants={textReveal}
                      className="space-y-3"
                    >
                      <Link href={`/product/${config.slug}`} className="block">
                        <m.div
                          variants={buttonHover}
                          whileHover={isDisabled ? {} : "hover"}
                          whileTap={isDisabled ? {} : "tap"}
                        >
                          <Button className="w-full !bg-brown-500 hover:!bg-darkBrown !text-white !font-semibold !border-0">
                            View Details
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </Button>
                        </m.div>
                      </Link>
                    </m.div>

                  </CardContent>
                </Card>
              </m.div>
            ))}
          </m.div>

          {/* Back to Kits */}
          <m.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mt-16"
          >
            <Link href="/flat-packs">
              <m.div
                variants={buttonHover}
                whileHover={isDisabled ? {} : "hover"}
                whileTap={isDisabled ? {} : "tap"}
              >
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-accent-500 text-accent-600 hover:bg-accent-500 hover:text-white px-8 py-3 font-semibold rounded-xl"
                >
                  ← Back to All Kits
                </Button>
              </m.div>
            </Link>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
}
