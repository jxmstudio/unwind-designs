"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

interface StaggerProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  staggerDelay?: number;
  delay?: number;
  duration?: number;
  y?: number;
  className?: string;
}

/**
 * Stagger animation wrapper that provides staggered animations for children
 * Useful for lists, grids, and multiple elements that should animate in sequence
 */
export function Stagger({ 
  children, 
  staggerDelay = 0.1, 
  delay = 0, 
  duration = 0.5, 
  y = 20,
  className = "",
  ...props 
}: StaggerProps) {
  const { isDisabled, safeAnimation } = useReducedMotionSafe();

  // If animations are disabled, render children without motion
  if (isDisabled) {
    return <div className={className}>{children}</div>;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: safeAnimation.stagger || staggerDelay,
        delayChildren: delay
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: safeAnimation.duration || duration,
        /* ease: "easeOut" as const */
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className={className}
      {...props}
    >
      {Array.isArray(children) ? (
        children.map((child, index) => (
          <motion.div key={index} variants={itemVariants}>
            {child}
          </motion.div>
        ))
      ) : (
        <motion.div variants={itemVariants}>
          {children}
        </motion.div>
      )}
    </motion.div>
  );
}
