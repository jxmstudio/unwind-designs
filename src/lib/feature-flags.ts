// Feature Flags for Animation and Text Clarity Improvements
// Add new feature flags without breaking existing ones

"use client";

import { useEffect, useState } from "react";

type FeatureFlag = 
  | 'FEATURE_BIG_POST_SHIPPING'
  | 'FEATURE_MOTION_BOOKING'
  | 'FEATURE_VIDEO_PLAYER'
  | 'FEATURE_UPSELLS'
  | 'FEATURE_FLAT_PACK_CONFIGURATOR'
  | 'FEATURE_ENHANCED_GALLERY'
  // New animation and text clarity flags
  | 'FEATURE_TEXT_CLARITY'
  | 'FEATURE_REDUCED_BLUR'
  | 'FEATURE_SMOOTH_ANIMATIONS'
  | 'FEATURE_HIGH_CONTRAST';

const defaultFlags: Record<FeatureFlag, boolean> = {
  // Existing flags (keep current defaults)
  FEATURE_BIG_POST_SHIPPING: false,
  FEATURE_MOTION_BOOKING: false,
  FEATURE_VIDEO_PLAYER: true,
  FEATURE_UPSELLS: true,
  FEATURE_FLAT_PACK_CONFIGURATOR: false,
  FEATURE_ENHANCED_GALLERY: true,
  // New flags for text/animation improvements
  FEATURE_TEXT_CLARITY: true,      // Enable improved text contrast
  FEATURE_REDUCED_BLUR: true,      // Reduce excessive backdrop blur
  FEATURE_SMOOTH_ANIMATIONS: true, // Optimized animation performance
  FEATURE_HIGH_CONTRAST: false,    // High contrast mode (accessibility)
};

export function useFeatureFlag(flag: FeatureFlag): boolean {
  const [isEnabled, setIsEnabled] = useState(defaultFlags[flag]);

  useEffect(() => {
    // Check environment variable
    const envValue = process.env[`NEXT_PUBLIC_${flag}`];
    if (envValue !== undefined) {
      setIsEnabled(envValue === 'true');
      return;
    }

    // Fallback to default
    setIsEnabled(defaultFlags[flag]);
  }, [flag]);

  return isEnabled;
}

// Helper for multiple flags
export function useFeatureFlags(flags: FeatureFlag[]): Record<FeatureFlag, boolean> {
  const flagValues: Record<FeatureFlag, boolean> = {} as Record<FeatureFlag, boolean>;
  
  for (const flag of flags) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    flagValues[flag] = useFeatureFlag(flag);
  }
  
  return flagValues;
}

// Server-side feature flag check
export function getFeatureFlag(flag: FeatureFlag): boolean {
  if (typeof window === 'undefined') {
    // Server-side: check environment variable
    const envValue = process.env[`NEXT_PUBLIC_${flag}`];
    return envValue === 'true' || (envValue === undefined && defaultFlags[flag]);
  }
  
  // Client-side: use hook instead
  throw new Error('Use useFeatureFlag hook on client-side');
}

// Animation preferences helper
export function useAnimationPreferences() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const smoothAnimations = useFeatureFlag('FEATURE_SMOOTH_ANIMATIONS');
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
      
      const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, []);
  
  return {
    prefersReducedMotion,
    enableAnimations: smoothAnimations && !prefersReducedMotion,
    reduceDuration: prefersReducedMotion,
  };
}