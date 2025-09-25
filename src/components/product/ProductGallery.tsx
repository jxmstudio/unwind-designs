"use client";

import { useState, useCallback } from "react";
import Image, { StaticImageData } from "next/image";

type ImgSrc = StaticImageData | string;

interface ProductGalleryProps {
  images: { src: ImgSrc; alt: string; blurDataURL?: string }[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [index, setIndex] = useState(0);
  const onThumb = useCallback((i: number) => setIndex(i), []);

  const current = images[index];
  const defaultBlur =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMzInIGhlaWdodD0nMTgnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHJlY3QgeD0nMCcgeT0nMCcgd2lkdGg9JzMyJyBoZWlnaHQ9JzE4JyBmaWxsPScjZWVlN2RiJy8+PC9zdmc+";

  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="relative w-full overflow-hidden rounded-2xl bg-white shadow-lg">
        <div className="relative w-full" style={{ aspectRatio: '16 / 9' }}>
          <Image
            src={current.src}
            alt={current.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover"
            placeholder="blur"
            blurDataURL={current.blurDataURL || defaultBlur}
            priority
          />
        </div>
      </div>

      {/* Thumbnails */}
      <div className="mt-4 grid grid-cols-4 gap-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => onThumb(i)}
            className={`relative rounded-xl overflow-hidden border ${i === index ? 'ring-2 ring-accent-500 border-transparent' : 'border-gray-200'}`}
            style={{ aspectRatio: '1 / 1' }}
          >
            <Image 
              src={img.src} 
              alt={img.alt} 
              fill 
              className="object-cover" 
              sizes="25vw" 
              placeholder="blur" 
              blurDataURL={img.blurDataURL || defaultBlur}
            />
          </button>
        ))}
      </div>
    </div>
  );
}


