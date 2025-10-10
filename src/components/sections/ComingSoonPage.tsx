"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, Phone } from "lucide-react";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/motion";

interface ComingSoonPageProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export function ComingSoonPage({ title, description, icon }: ComingSoonPageProps) {
  return (
    <motion.section
      className="min-h-[70vh] flex items-center justify-center py-20 px-4"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          variants={fadeUp}
          className="mb-8"
        >
          {icon && (
            <motion.div
              className="inline-block mb-6"
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {icon}
            </motion.div>
          )}
          
          <h1 className="text-4xl sm:text-5xl font-bold text-textPrimary mb-4">
            {title}
          </h1>
          
          <div className="inline-block px-6 py-2 bg-yellow-100 text-yellow-800 rounded-full font-semibold mb-6">
            Coming Soon
          </div>
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="text-xl text-textPrimary/80 mb-8 leading-relaxed"
        >
          {description}
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="bg-cream-400 rounded-2xl p-8 shadow-soft mb-8"
        >
          <h3 className="text-xl font-semibold text-textPrimary mb-4">
            Need Help Right Now?
          </h3>
          <p className="text-textPrimary/80 mb-6">
            Our team is here to assist you with any questions or concerns.
          </p>
          
          <motion.div 
            variants={staggerContainer}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div variants={staggerItem}>
              <Link href="/contact">
                <Button 
                  size="lg"
                  className="bg-brown-500 hover:bg-darkBrown text-white px-6 py-3 font-semibold rounded-xl"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Us
                </Button>
              </Link>
            </motion.div>
            
            <motion.div variants={staggerItem}>
              <a href="tel:0417362209">
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-2 border-brown-500 text-brown-500 hover:bg-brown-500 hover:text-white px-6 py-3 font-semibold rounded-xl"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  0417 362 209
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div variants={fadeUp}>
          <Link href="/">
            <Button 
              variant="ghost"
              className="text-brown-500 hover:text-darkBrown hover:bg-brown-100"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}


