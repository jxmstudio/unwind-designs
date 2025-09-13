"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ShimmerSkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  animated?: boolean;
}

export function ShimmerSkeleton({
  className,
  width,
  height,
  rounded = "md",
  animated = true,
}: ShimmerSkeletonProps) {
  const roundedClasses = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-full",
  };

  const shimmerVariants = {
    shimmer: {
      x: ["-100%", "100%"],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "linear" as const,
      },
    },
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-surface-200",
        roundedClasses[rounded],
        className
      )}
      style={{
        width: width,
        height: height,
      }}
    >
      {animated && (
        <motion.div
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-surface-50/50 to-transparent"
          variants={shimmerVariants}
          animate="shimmer"
        />
      )}
    </div>
  );
}

// Predefined skeleton components for common use cases
export function TextSkeleton({ 
  lines = 1, 
  className,
  animated = true 
}: { 
  lines?: number; 
  className?: string;
  animated?: boolean;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <ShimmerSkeleton
          key={i}
          height="1rem"
          width={i === lines - 1 ? "75%" : "100%"}
          rounded="sm"
          animated={animated}
        />
      ))}
    </div>
  );
}

export function CardSkeleton({ 
  className,
  animated = true 
}: { 
  className?: string;
  animated?: boolean;
}) {
  return (
    <div className={cn("space-y-4 p-6", className)}>
      <ShimmerSkeleton height="1.5rem" width="60%" rounded="sm" animated={animated} />
      <ShimmerSkeleton height="1rem" width="100%" rounded="sm" animated={animated} />
      <ShimmerSkeleton height="1rem" width="80%" rounded="sm" animated={animated} />
      <div className="flex gap-2 pt-2">
        <ShimmerSkeleton height="2rem" width="4rem" rounded="lg" animated={animated} />
        <ShimmerSkeleton height="2rem" width="6rem" rounded="lg" animated={animated} />
      </div>
    </div>
  );
}

export function AvatarSkeleton({ 
  size = "md",
  className,
  animated = true 
}: { 
  size?: "sm" | "md" | "lg";
  className?: string;
  animated?: boolean;
}) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  return (
    <ShimmerSkeleton
      className={cn(sizeClasses[size], className)}
      rounded="full"
      animated={animated}
    />
  );
}

export function ImageSkeleton({ 
  aspectRatio = "16/9",
  className,
  animated = true 
}: { 
  aspectRatio?: string;
  className?: string;
  animated?: boolean;
}) {
  return (
    <div
      className={cn("relative", className)}
      style={{ aspectRatio }}
    >
      <ShimmerSkeleton
        className="absolute inset-0"
        rounded="lg"
        animated={animated}
      />
    </div>
  );
}
