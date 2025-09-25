"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, CheckCircle, AlertCircle } from "lucide-react";
import { staggerItem, sectionReveal } from "@/lib/motion";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

export function NewsletterCard() {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isDisabled, safeAnimation } = useReducedMotionSafe();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      setIsValid(false);
      return;
    }

    setIsLoading(true);
    setIsValid(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSubmitted(true);
    setIsLoading(false);
    setEmail("");

    // Reset success state after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (!isValid && e.target.value) {
      setIsValid(true);
    }
  };

  return (
    <motion.section 
      className="py-20 bg-cream-300"
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="bg-gradient-to-br from-brown-500 to-darkBrown rounded-2xl p-8 md:p-12 text-center text-cream-400 shadow-large"
          variants={staggerItem}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-20 h-20 mx-auto mb-6 bg-cream-400/20 rounded-full flex items-center justify-center"
          >
            <Mail className="w-10 h-10 text-cream-400" />
          </motion.div>

          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Stay in the Loop
          </motion.h2>
          
          <motion.p 
            className="text-xl md:text-2xl mb-8 text-cream-300 leading-relaxed"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Get exclusive access to new products, installation tips, and adventure stories from the road.
          </motion.p>

          <motion.form 
            onSubmit={handleSubmit}
            className="max-w-md mx-auto space-y-4"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="relative">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={handleEmailChange}
                className={`w-full px-4 py-4 text-lg bg-cream-400/10 border-2 border-cream-400/30 text-cream-400 placeholder-cream-300/70 rounded-xl focus:border-cream-400 focus:ring-2 focus:ring-cream-400/20 transition-all duration-300 ${
                  !isValid ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : ''
                }`}
                disabled={isLoading}
              />
              
              {!isValid && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -bottom-8 left-0 flex items-center gap-2 text-red-300 text-body-small"
                >
                  <AlertCircle className="w-4 h-4" />
                  Please enter a valid email address
                </motion.div>
              )}
            </div>

            <motion.div
              whileHover={{ y: isDisabled ? 0 : -2 }}
              whileTap={{ scale: isDisabled ? 1 : 0.98 }}
              transition={{ duration: safeAnimation.duration || 0.2 }}
            >
              <Button
                type="submit"
                disabled={isLoading || !email.trim()}
                className="w-full bg-cream-400 hover:bg-cream-300 text-darkBrown px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 shadow-soft hover:shadow-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-darkBrown border-t-transparent rounded-full animate-spin" />
                    Subscribing...
                  </div>
                ) : (
                  "Subscribe Now"
                )}
              </Button>
            </motion.div>
          </motion.form>

          <motion.p 
            className="text-body-small text-cream-300/80 mt-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            No spam, unsubscribe at any time. We respect your privacy.
          </motion.p>
        </motion.div>

        {/* Success Toast */}
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="bg-green-500 text-white px-6 py-4 rounded-xl shadow-large flex items-center gap-3">
              <CheckCircle className="w-6 h-6" />
              <span className="font-medium">Successfully subscribed! Welcome to the adventure.</span>
            </div>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
