"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, Wrench, Star } from "lucide-react";
import { staggerContainer, staggerItem, sectionReveal } from "@/lib/motion";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

const valueProps = [
  {
    icon: Truck,
    title: "Australia-wide Shipping",
    description: "Fast, reliable delivery to every corner of Australia with tracking and insurance included.",
    color: "from-success-500/20 to-success-600/20",
    iconColor: "text-success-600",
    bgColor: "bg-success-50"
  },
  {
    icon: Wrench,
    title: "One-stop Workshop Installs",
    description: "Complete installation service from our certified technicians with warranty coverage.",
    color: "from-accent-500/20 to-accent-600/20",
    iconColor: "text-accent-600",
    bgColor: "bg-accent-50"
  },
  {
    icon: Star,
    title: "Premium Materials",
    description: "Only the highest quality materials and components for lasting durability and performance.",
    color: "from-warning-500/20 to-warning-600/20",
    iconColor: "text-warning-600",
    bgColor: "bg-warning-50"
  }
];

export function ValueProps() {
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
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-textPrimary mb-6">
            Why Choose Unwind Designs?
          </h2>
          <p className="text-xl text-textSecondary max-w-3xl mx-auto leading-relaxed">
            We&apos;re committed to delivering exceptional quality and service at every step of your journey.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {valueProps.map((prop) => (
            <motion.div
              key={prop.title}
              variants={staggerItem}
              whileHover={{ y: isDisabled ? 0 : -8 }}
              transition={{ duration: safeAnimation.duration || 0.3, /* ease: "easeOut" */ }}
              className="group"
            >
              <Card className={`h-full border-0 shadow-soft hover:shadow-medium transition-all duration-300 group-hover:shadow-lg overflow-hidden ${prop.bgColor}`}>
                <CardHeader className="text-center pb-6 pt-8">
                  <motion.div 
                    className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${prop.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-soft`}
                    whileHover={{ scale: isDisabled ? 1 : 1.1 }}
                    whileTap={{ scale: isDisabled ? 1 : 0.95 }}
                  >
                    <prop.icon className={`w-10 h-10 ${prop.iconColor}`} />
                  </motion.div>
                  <CardTitle className="text-2xl font-semibold text-textPrimary">
                    {prop.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center px-6 pb-8">
                  <p className="text-textSecondary leading-relaxed text-lg">
                    {prop.description}
                  </p>
                </CardContent>
                
                {/* Decorative bottom border */}
                <div className={`h-1 bg-gradient-to-r ${prop.color} opacity-60`} />
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};
