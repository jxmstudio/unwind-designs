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
  width = 100,
  height = 35,
  priority = false
}: BrandLogoProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className={`inline-flex items-center rounded-lg border border-brown-300 bg-white px-3 py-1.5 shadow-sm ${className}`}>
      <Image
        src={imageError ? "/brand/unwind_designs_logo.jpg" : "/brand/penis.jpg"}
        alt="Unwind Designs"
        width={width}
        height={height}
        className="object-contain"
        style={{ height: 'auto' }}
        priority={priority}
        quality={100}
        onError={() => setImageError(true)}
        aria-label="Unwind Designs"
      />
    </div>
  );
}
