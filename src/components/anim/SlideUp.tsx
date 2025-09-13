"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

interface SlideUpProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  threshold?: number;
  className?: string;
}

/**
 * SlideUp animation wrapper that animates on scroll
 * Provides a subtle slide up animation when element comes into view
 */
export function SlideUp({ 
  children, 
  delay = 0, 
  duration = 0.6, 
  y = 40, 
  threshold = 0.1,
  className = "",
  ...props 
}: SlideUpProps) {
  const { isDisabled, safeAnimation } = useReducedMotionSafe();

  // If animations are disabled, render children without motion
  if (isDisabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: threshold }}
      transition={{
        duration: safeAnimation.duration || duration,
        delay,
        /* ease: "easeOut" */
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
