"use client";

import { motion } from "framer-motion";
import { Droplets, Shield, Zap, Wrench } from "lucide-react";
import { staggerContainer, staggerItem, sectionReveal } from "@/lib/motion";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

const services = [
  {
    icon: Droplets,
    title: "Water Tanks",
    description: "Custom water storage solutions",
    color: "from-blue-500/20 to-blue-600/20",
    hoverColor: "from-blue-500/30 to-blue-600/30",
    iconColor: "text-blue-600"
  },
  {
    icon: Shield,
    title: "Insulation Kits",
    description: "Thermal and sound insulation",
    color: "from-green-500/20 to-green-600/20",
    hoverColor: "from-green-500/30 to-green-600/30",
    iconColor: "text-green-600"
  },
  {
    icon: Zap,
    title: "Electrical",
    description: "12V power systems & wiring",
    color: "from-yellow-500/20 to-yellow-600/20",
    hoverColor: "from-yellow-500/30 to-yellow-600/30",
    iconColor: "text-yellow-600"
  },
  {
    icon: Wrench,
    title: "Roof Conversions",
    description: "Pop-top and roof modifications",
    color: "from-purple-500/20 to-purple-600/20",
    hoverColor: "from-purple-500/30 to-purple-600/30",
    iconColor: "text-purple-600"
  }
];

export function ServicesChips() {
  const { isDisabled, safeAnimation } = useReducedMotionSafe();
  
  return (
    <motion.section 
      className="py-24 bg-gradient-to-b from-surface-100 to-surface-200"
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-20"
          variants={staggerItem}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-textPrimary mb-6">
            Workshop Services
          </h2>
          <p className="text-xl text-textSecondary max-w-3xl mx-auto leading-relaxed">
            Professional installation and modification services for your vehicle fitout needs.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={staggerItem}
              whileHover={{ 
                y: isDisabled ? 0 : -8,
                scale: isDisabled ? 1 : 1.05
              }}
              whileTap={{ scale: isDisabled ? 1 : 0.98 }}
              transition={{ duration: safeAnimation.duration || 0.3, /* ease: "easeOut" */ }}
              className="group cursor-pointer"
            >
              <div className="bg-surface-50 rounded-xl p-6 border border-borderNeutral/60 shadow-soft hover:shadow-medium transition-all duration-300 h-full">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${service.color} group-hover:${service.hoverColor} flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-soft`}>
                  <service.icon className={`w-8 h-8 ${service.iconColor}`} />
                </div>
                
                <h3 className="text-body font-semibold text-textPrimary text-center mb-2 group-hover:text-accent-600 transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-caption text-textSecondary text-center leading-relaxed">
                  {service.description}
                </p>
                
                {/* Hover indicator */}
                <div className="mt-4 text-center">
                  <div className="w-8 h-0.5 bg-accent-300 mx-auto transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
