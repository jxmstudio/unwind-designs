"use client";

import { useState, useMemo } from "react";
import Image, { ImageProps } from "next/image";

interface SmartImageProps extends Omit<ImageProps, "src" | "alt" | "fill"> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  wrapperClassName?: string;
  width: number;
  height: number;
  cacheBustKey?: string;
}

export default function SmartImage({
  src,
  alt,
  fallbackSrc,
  wrapperClassName,
  className,
  width,
  height,
  cacheBustKey,
  ...rest
}: SmartImageProps) {
  const [failed, setFailed] = useState(false);

  // Normalize and lock the path to avoid accidental relative path issues
  const normalizedSrc = useMemo(() => {
    const base = src.startsWith("/") ? src : `/${src}`;
    const path = cacheBustKey ? `${base}?v=${encodeURIComponent(cacheBustKey)}` : base;
    console.log("[SmartImage] render", { src: path });
    return path;
  }, [src, cacheBustKey]);

  const onError = () => {
    console.warn("[SmartImage] onError", normalizedSrc);
    setFailed(true);
  };

  if (failed && fallbackSrc) {
    return (
      <div className={wrapperClassName}>
        {/* raw img fallback */}
        <img
          src={fallbackSrc}
          alt={`${alt} (fallback)`}
          width={width}
          height={height}
          className={className}
          onError={() => console.error("[SmartImage] fallback <img> failed", fallbackSrc)}
        />
      </div>
    );
  }

  return (
    <div className={wrapperClassName}>
      <Image
        src={normalizedSrc}
        alt={alt}
        width={width}
        height={height}
        className={className}
        onError={onError}
        {...rest}
      />
    </div>
  );
}


