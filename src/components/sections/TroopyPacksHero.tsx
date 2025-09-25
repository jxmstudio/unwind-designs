"use client";

import { LazyMotion, m, domAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Shield, Wrench } from "lucide-react";
import Link from "next/link";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { 
  fadeUp, 
  staggerContainer, 
  staggerItem, 
  buttonHover,
  floating 
} from "@/lib/motion";

export function TroopyPacksHero() {
  const { isDisabled } = useReducedMotionSafe();

  return (
    <LazyMotion features={domAnimation}>
      <section className="relative bg-gradient-to-br from-cream-300 to-cream-400 py-20 lg:py-32 overflow-hidden">
        {/* Background floating elements */}
        <m.div
          className="absolute top-20 left-10 w-20 h-20 bg-accent-100/20 rounded-full"
          variants={floating}
          animate={isDisabled ? {} : "animate"}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <m.div
          className="absolute top-40 right-20 w-16 h-16 bg-accent-200/20 rounded-full"
          variants={floating}
          animate={isDisabled ? {} : "animate"}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <m.div
          className="absolute bottom-20 left-1/4 w-12 h-12 bg-accent-300/20 rounded-full"
          variants={floating}
          animate={isDisabled ? {} : "animate"}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <m.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <m.div
              variants={fadeUp}
              className="mb-8"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-textPrimary mb-6">
                Flat Pack Solutions
              </h1>
              <p className="text-xl sm:text-2xl text-textPrimary/80 max-w-3xl mx-auto leading-relaxed">
                Professional-grade flat pack systems designed specifically for Toyota Troopcarriers. 
                Easy assembly, professional results, Australia-wide shipping included.
              </p>
            </m.div>

            <m.div
              variants={staggerItem}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
            <Link href="#flat-packs">
              <m.div
                variants={buttonHover}
                whileHover={isDisabled ? {} : "hover"}
                whileTap={isDisabled ? {} : "tap"}
              >
                <Button 
                  size="lg" 
                  className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  View All Kits
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </m.div>
            </Link>
              <Link href="/start-your-build">
                <m.div
                  variants={buttonHover}
                  whileHover={isDisabled ? {} : "hover"}
                  whileTap={isDisabled ? {} : "tap"}
                >
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-2 border-accent-500 text-accent-600 hover:bg-accent-500 hover:text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300"
                  >
                    Start Your Build
                  </Button>
                </m.div>
              </Link>
            </m.div>

            {/* Feature highlights */}
            <m.div
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            >
              <m.div
                variants={staggerItem}
                className="flex flex-col items-center text-center group"
                whileHover={isDisabled ? {} : { y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <m.div 
                  className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-accent-200 transition-colors duration-300"
                  whileHover={isDisabled ? {} : { scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Star className="w-8 h-8 text-accent-600" />
                </m.div>
                <h3 className="text-lg font-semibold text-textPrimary mb-2">Premium Quality</h3>
                <p className="text-textPrimary/70 text-body-small">
                  Marine-grade materials and German-engineered hardware
                </p>
              </m.div>
              
              <m.div
                variants={staggerItem}
                className="flex flex-col items-center text-center group"
                whileHover={isDisabled ? {} : { y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <m.div 
                  className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-accent-200 transition-colors duration-300"
                  whileHover={isDisabled ? {} : { scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Wrench className="w-8 h-8 text-accent-600" />
                </m.div>
                <h3 className="text-lg font-semibold text-textPrimary mb-2">Easy Assembly</h3>
                <p className="text-textPrimary/70 text-body-small">
                  Tool-free assembly with detailed instructions
                </p>
              </m.div>
              
              <m.div
                variants={staggerItem}
                className="flex flex-col items-center text-center group"
                whileHover={isDisabled ? {} : { y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <m.div 
                  className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-accent-200 transition-colors duration-300"
                  whileHover={isDisabled ? {} : { scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Shield className="w-8 h-8 text-accent-600" />
                </m.div>
                <h3 className="text-lg font-semibold text-textPrimary mb-2">Warranty</h3>
                <p className="text-textPrimary/70 text-body-small">
                  Up to 5 years warranty on premium kits
                </p>
              </m.div>
            </m.div>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
}
