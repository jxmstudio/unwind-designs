"use client";

import { m } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ArrowRight, Snowflake, Palette, Shield } from "lucide-react";
import Link from "next/link";
import { FlatPackProduct } from "@/data/products";
import { BaseKitConfig } from "@/lib/troopy/baseKits";
import { formatPrice, buildConfigureKitUrl } from "@/lib/troopy/utils";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

interface ConfigCardProps {
  config: FlatPackProduct;
  kitConfig: BaseKitConfig;
  index: number;
}

export function ConfigCard({ config, kitConfig, index }: ConfigCardProps) {
  const { isDisabled } = useReducedMotionSafe();

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4, 
        delay: index * 0.1,
        /* ease: "easeOut" as const */ 
      }
    }
  };

  const formatFinishName = (finish: string) => {
    const finishMap: Record<string, string> = {
      'black-hex': 'Black Hex',
      'white': 'White',
      'birch': 'Birch',
      'plain-hardwood': 'Plain Hardwood',
      'eucalyptus-black-hex': 'Eucalyptus Black Hex',
      'birch-black-hex': 'Birch Black Hex',
      'plain-birch': 'Plain Birch',
      'premium': 'Premium Multi-tone'
    };
    return finishMap[finish] || finish;
  };

  const formatFridgeType = (fridgeType: string) => {
    const fridgeMap: Record<string, string> = {
      'chest': 'Chest Fridge',
      'upright': 'Upright Fridge',
      'none': 'No Fridge'
    };
    return fridgeMap[fridgeType] || fridgeType;
  };

  const configureKitUrl = buildConfigureKitUrl(
    kitConfig.id,
    config.fridgeType as any,
    config.finish
  );

  return (
    <m.div
      variants={isDisabled ? {} : cardVariants}
      initial={isDisabled ? {} : "hidden"}
      whileInView={isDisabled ? {} : "visible"}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={isDisabled ? {} : { y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="h-full bg-white border-0 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl overflow-hidden group">
        {/* Card Header with Gradient */}
        <div className={`h-24 bg-gradient-to-r ${kitConfig.accent.gradient} relative overflow-hidden`}>
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
          <div className="relative p-4 h-full flex items-start justify-between">
            <div className="flex flex-wrap gap-2">
              {config.fridgeType && (
                <Badge className={`${kitConfig.badge.className} text-xs`}>
                  <Snowflake className="w-3 h-3 mr-1" />
                  {formatFridgeType(config.fridgeType)}
                </Badge>
              )}
              <Badge className="bg-brown-100 text-brown-800 border-brown-200 text-xs">
                <Palette className="w-3 h-3 mr-1" />
                {formatFinishName(config.finish)}
              </Badge>
            </div>
          </div>
        </div>

        <CardContent className="p-6">
          {/* Title and Description */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-textPrimary mb-2 line-clamp-2 group-hover:text-brown-600 transition-colors">
              {config.name}
            </h3>
            <p className="text-sm text-textSecondary line-clamp-2 leading-relaxed">
              {config.description}
            </p>
          </div>

          {/* Key Specs */}
          <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
            <div className="flex items-center gap-2 text-textSecondary">
              <Snowflake className="w-4 h-4 text-blue-500" />
              <span>{formatFridgeType(config.fridgeType)}</span>
            </div>
            <div className="flex items-center gap-2 text-textSecondary">
              <Palette className="w-4 h-4 text-purple-500" />
              <span>{formatFinishName(config.finish)}</span>
            </div>
          </div>

          {/* Rating and Reviews */}
          {config.rating && (
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(config.rating!)
                        ? 'text-yellow-500 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-textSecondary">
                {config.rating} ({config.reviewCount || 0} reviews)
              </span>
            </div>
          )}

          {/* Price and Warranty */}
          <div className="mb-6">
            <div className="text-2xl font-bold text-textPrimary mb-1">
              {formatPrice(config.price)}
            </div>
            <div className="flex items-center gap-1 text-xs text-textSecondary">
              <Shield className="w-3 h-3" />
              <span>2 years warranty included</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3">
            <Link href={`/product/${config.slug}`} className="block">
              <Button 
                className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium group"
                style={{
                  backgroundColor: kitConfig.id === 'wander' ? '#059669' : kitConfig.id === 'roam' ? '#2563eb' : '#7c3aed'
                }}
                size="lg"
              >
                View Details
                <m.div
                  className="ml-2"
                  animate={isDisabled ? {} : { x: 0 }}
                  whileHover={isDisabled ? {} : { x: 2 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight className="w-4 h-4" />
                </m.div>
              </Button>
            </Link>

            <Link href={configureKitUrl} className="block">
              <Button 
                variant="outline"
                className="w-full border-2 border-green-600 text-green-600 hover:bg-green-100 rounded-xl font-medium"
                style={{
                  borderColor: kitConfig.id === 'wander' ? '#059669' : kitConfig.id === 'roam' ? '#2563eb' : '#7c3aed',
                  color: kitConfig.id === 'wander' ? '#059669' : kitConfig.id === 'roam' ? '#2563eb' : '#7c3aed'
                }}
                size="lg"
              >
                Configure Kit
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </m.div>
  );
}
