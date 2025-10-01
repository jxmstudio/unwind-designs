"use client";

import { LazyMotion, m, domAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getTroopyPackKitTypes, getTroopyPackBySlug } from "@/data/products";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { 
  fadeUp, 
  staggerContainer, 
  staggerItem, 
  buttonHover,
  textReveal,
  imageReveal
} from "@/lib/motion";

export function TroopyPacksGrid() {
  const kitTypes = getTroopyPackKitTypes();
  const { isDisabled } = useReducedMotionSafe();
  
  const kitData = {
    "wander-kit": {
      name: "Wander Kit",
      tagline: "Budget-Friendly Adventure",
      description: "Perfect for weekend adventures with reliable storage and basic amenities. Multiple finish options available.",
      startingPrice: 3750,
      features: [
        "Multiple fridge configuration options",
        "Three finish choices available", 
        "Marine-grade plywood construction",
        "Tool-free assembly system",
        "Slide-out storage drawers",
        "Built-in power management"
      ],
      badge: "Available Now",
      badgeColor: "bg-green-100 text-green-800",
      image: "/products/wander-general-1.jpg"
    },
    "roam-kit": {
      name: "Roam Kit", 
      tagline: "Coming Soon",
      description: "Enhanced hardware, LED lighting, and premium finishes. Perfect balance of features and value for extended adventures. Coming Soon!",
      startingPrice: 6700,
      features: [
        "Enhanced soft-close drawer systems",
        "Integrated LED lighting included",
        "Premium finishes available",
        "Advanced cable management", 
        "Heavy-duty mounting hardware",
        "Quick-connect electrical system"
      ],
      badge: "Coming Soon",
      badgeColor: "bg-yellow-100 text-yellow-800",
      image: "/products/roam-general-1.jpg"
    },
    "premium-kit": {
      name: "Premium Kit",
      tagline: "Ultimate Luxury",
      description: "The ultimate in flat pack luxury featuring premium multi-tone finishes, smart lighting controls, and German-engineered hardware.",
      startingPrice: 9850,
      features: [
        "Premium multi-tone timber finish",
        "German-engineered soft-close systems",
        "Smart lighting with app control",
        "Premium stainless steel hardware",
        "Professional installation included",
        "Advanced power management system"
      ],
      badge: "Premium",
      badgeColor: "bg-purple-100 text-purple-800",
      image: "/products/premium-general-1.jpg"
    }
  };

  return (
    <LazyMotion features={domAnimation}>
        <section id="flat-packs" className="py-20 bg-cream-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <m.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-textPrimary mb-4">
              Choose Your Perfect Kit
            </h2>
            <p className="text-lg text-textPrimary/80 max-w-2xl mx-auto">
              Three complete solutions designed for different adventure levels and budgets. 
              All kits include everything you need to transform your Troopcarrier.
            </p>
          </m.div>

          <m.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {kitTypes.map((kitSlug, index) => {
              const kit = kitData[kitSlug as keyof typeof kitData];
              const products = getTroopyPackBySlug(kitSlug);
              
              return (
                <m.div
                  key={kitSlug}
                  variants={staggerItem}
                  whileHover={isDisabled ? {} : { y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                <Card className="h-full bg-cream-400 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 border border-borderNeutral overflow-hidden group">
                  <div className="relative overflow-hidden">
                    <m.div 
                      className="h-64 bg-gradient-to-br from-brown-200 to-brown-300 flex items-center justify-center"
                      variants={imageReveal}
                      whileHover={isDisabled ? {} : { scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="text-center text-textPrimary/70">
                        <div className="text-6xl mb-2">🚐</div>
                        <p className="text-body-small font-medium">{kit.name}</p>
                      </div>
                    </m.div>
                    <m.div 
                      className="absolute top-4 right-4"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.3, duration: 0.3 }}
                    >
                      <Badge className={`${kit.badgeColor} border-0 font-semibold`}>
                        {kit.badge}
                      </Badge>
                    </m.div>
                  </div>
                    
                    <CardContent className="p-8">
                      <m.div
                        variants={textReveal}
                        className="mb-6"
                      >
                        <h3 className="text-2xl font-bold text-textPrimary mb-2">
                          {kit.name}
                        </h3>
                        <p className="text-accent-600 font-medium mb-3">
                          {kit.tagline}
                        </p>
                        <p className="text-textPrimary/70 text-body-small leading-relaxed">
                          {kit.description}
                        </p>
                      </m.div>

                      <m.div
                        variants={textReveal}
                        className="mb-6"
                      >
                        <div className="flex items-baseline mb-4">
                          <span className="text-3xl font-bold text-textPrimary">
                            From ${kit.startingPrice.toLocaleString()}
                          </span>
                          <span className="text-textPrimary/60 ml-2">starting</span>
                        </div>
                        
                        <div className="flex items-center mb-4">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <m.div
                                key={i}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 + 0.5 + i * 0.1, duration: 0.2 }}
                              >
                                <Star className="w-4 h-4 fill-current" />
                              </m.div>
                            ))}
                          </div>
                          <span className="text-body-small text-textPrimary/60 ml-2">
                            {products.length > 0 ? products[0].rating : 4.7} rating
                          </span>
                        </div>
                      </m.div>

                      <m.div
                        variants={textReveal}
                        className="mb-8"
                      >
                        <h4 className="text-body-small font-semibold text-textPrimary mb-3">
                          Key Features:
                        </h4>
                        <m.ul 
                          variants={staggerContainer}
                          className="space-y-2"
                        >
                          {kit.features.slice(0, 4).map((feature, i) => (
                            <m.li 
                              key={i} 
                              variants={staggerItem}
                              className="flex items-start text-body-small text-textPrimary/80"
                            >
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                              {feature}
                            </m.li>
                          ))}
                        </m.ul>
                      </m.div>

                      <m.div
                        variants={textReveal}
                        className="space-y-3"
                      >
                      <Link href={`/flat-packs/${kitSlug.replace('-kit', '')}`} className="block">
                        <m.div
                          variants={buttonHover}
                          whileHover={isDisabled ? {} : "hover"}
                          whileTap={isDisabled ? {} : "tap"}
                        >
                          <Button className="w-full !bg-brown-500 hover:!bg-darkBrown !text-white !font-semibold !border-0">
                            View Configurations
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </Button>
                        </m.div>
                      </Link>
                      </m.div>

                      <m.div
                        variants={textReveal}
                        className="mt-6 pt-6 border-t border-borderNeutral"
                      >
                        <p className="text-caption text-textPrimary/60 text-center">
                          {products.length} configuration{products.length !== 1 ? 's' : ''} available
                        </p>
                      </m.div>
                    </CardContent>
                  </Card>
                </m.div>
              );
            })}
          </m.div>

          {/* Bottom CTA */}
          <m.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mt-16"
          >
            <m.div 
              className="bg-cream-400 rounded-2xl p-8 shadow-lg max-w-4xl mx-auto"
              whileHover={isDisabled ? {} : { y: -4 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-bold text-textPrimary mb-4">
                Need Help Choosing?
              </h3>
              <p className="text-textPrimary/80 mb-6">
                Our fitout specialists can help you select the perfect flat pack configuration 
                for your troopy and adventure style.
              </p>
              <m.div 
                variants={staggerContainer}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <m.div variants={staggerItem}>
                  <Link href="/flat-packs/wander">
                    <m.div
                      variants={buttonHover}
                      whileHover={isDisabled ? {} : "hover"}
                      whileTap={isDisabled ? {} : "tap"}
                    >
                      <Button 
                        size="lg" 
                        className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 font-semibold rounded-xl"
                      >
                        View Wander Kit
                      </Button>
                    </m.div>
                  </Link>
                </m.div>
                <m.div variants={staggerItem}>
                  <Link href="/flat-packs/roam">
                    <m.div
                      variants={buttonHover}
                      whileHover={isDisabled ? {} : "hover"}
                      whileTap={isDisabled ? {} : "tap"}
                    >
                      <Button 
                        size="lg" 
                        className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 font-semibold rounded-xl"
                      >
                        View Roam Kit
                      </Button>
                    </m.div>
                  </Link>
                </m.div>
                <m.div variants={staggerItem}>
                  <Link href="/flat-packs/premium">
                    <m.div
                      variants={buttonHover}
                      whileHover={isDisabled ? {} : "hover"}
                      whileTap={isDisabled ? {} : "tap"}
                    >
                      <Button 
                        size="lg" 
                        className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 font-semibold rounded-xl"
                      >
                        View Premium Kit
                      </Button>
                    </m.div>
                  </Link>
                </m.div>
              </m.div>
            </m.div>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
}
