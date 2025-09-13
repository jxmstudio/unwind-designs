"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

interface FadeInProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  className?: string;
}

/**
 * FadeIn animation wrapper that respects reduced motion preferences
 * Provides a subtle fade + slide up animation on mount
 */
export function FadeIn({ 
  children, 
  delay = 0, 
  duration = 0.6, 
  y = 20, 
  className = "",
  ...props 
}: FadeInProps) {
  const { isDisabled, safeAnimation } = useReducedMotionSafe();

  // If animations are disabled, render children without motion
  if (isDisabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
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
