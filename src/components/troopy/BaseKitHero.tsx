"use client";

import { m } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ArrowDown } from "lucide-react";
import { BaseKitConfig } from "@/lib/troopy/baseKits";
import { formatPrice, scrollToElement, buildConfigureKitUrl } from "@/lib/troopy/utils";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import Link from "next/link";

interface BaseKitHeroProps {
  config: BaseKitConfig;
}

export function BaseKitHero({ config }: BaseKitHeroProps) {
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
      transition: { duration: 0.6, /* ease: "easeOut" as const */ }
    }
  };

  const handleExploreConfigurations = () => {
    scrollToElement('configurations', 120);
  };

  return (
    <section className={`relative py-16 md:py-20 bg-gradient-to-br ${config.accent.gradient} overflow-hidden`}>
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 0%, transparent 50%), 
                           radial-gradient(circle at 80% 80%, rgba(255,255,255,0.05) 0%, transparent 50%)`
        }} />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <m.div
          initial={isDisabled ? {} : "hidden"}
          animate={isDisabled ? {} : "visible"}
          variants={isDisabled ? {} : staggerContainer}
        >
          {/* Badge */}
          <m.div variants={isDisabled ? {} : staggerItem} className="mb-4">
            <Badge 
              className={`${config.badge.className} px-4 py-1.5 text-sm font-medium border rounded-full`}
            >
              {config.badge.text}
            </Badge>
          </m.div>

          {/* Main heading */}
          <m.h1 
            variants={isDisabled ? {} : staggerItem}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-textPrimary mb-4"
          >
            {config.name}
          </m.h1>

          {/* Subheading */}
          <m.h2 
            variants={isDisabled ? {} : staggerItem}
            className="text-xl md:text-2xl font-semibold text-brown-600 mb-6"
            style={{ color: config.id === 'wander' ? '#059669' : config.id === 'roam' ? '#2563eb' : '#7c3aed' }}
          >
            {config.tagline}
          </m.h2>

          {/* Lead text */}
          <m.p 
            variants={isDisabled ? {} : staggerItem}
            className="text-lg text-textSecondary max-w-2xl mx-auto mb-6"
          >
            {config.description}
          </m.p>

          {/* Price line */}
          <m.div 
            variants={isDisabled ? {} : staggerItem}
            className="mb-8"
          >
            <div className="text-3xl md:text-4xl font-bold text-textPrimary">
              From {formatPrice(config.fromPrice)}
            </div>
            <div className="text-sm text-textSecondary mt-1">
              Complete kit • Multiple configurations available
            </div>
          </m.div>

          {/* CTA buttons */}
          <m.div 
            variants={isDisabled ? {} : staggerItem}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <m.div
              whileHover={isDisabled ? {} : { scale: 1.02 }}
              whileTap={isDisabled ? {} : { scale: 0.98 }}
            >
              <Button
                onClick={handleExploreConfigurations}
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                style={{ 
                  backgroundColor: config.id === 'wander' ? '#059669' : config.id === 'roam' ? '#2563eb' : '#7c3aed',
                }}
              >
                Explore Configurations
                <ArrowDown className="ml-2 w-5 h-5" />
              </Button>
            </m.div>

            <m.div
              whileHover={isDisabled ? {} : { scale: 1.02 }}
              whileTap={isDisabled ? {} : { scale: 0.98 }}
            >
              <Link href={buildConfigureKitUrl(config.id)}>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-green-600 text-green-600 hover:bg-green-100 px-8 py-3 rounded-xl font-semibold transition-all duration-300"
                  style={{ 
                    borderColor: config.id === 'wander' ? '#059669' : config.id === 'roam' ? '#2563eb' : '#7c3aed',
                    color: config.id === 'wander' ? '#059669' : config.id === 'roam' ? '#2563eb' : '#7c3aed'
                  }}
                >
                  Start Your Build
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </m.div>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
