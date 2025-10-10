"use client";

import Image from "next/image";
import { useState } from "react";

interface BrandLogoProps {
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export function BrandLogo({ 
  className = "", 
  width = 120, 
  height = 40, 
  priority = false 
}: BrandLogoProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className={`inline-block ${className}`}>
      <Image
        src={imageError ? "/brand/logo.png" : "/brand/unwind_designs_logo.jpg"}
        alt="Unwind Designs"
        width={width}
        height={height}
        className="rounded-lg shadow-soft"
        style={{ height: 'auto' }}
        priority={priority}
        onError={() => setImageError(true)}
        aria-label="Unwind Designs"
      />
    </div>
  );
}
