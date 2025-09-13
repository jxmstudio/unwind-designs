// Server-side feature flags for API routes
// This file is separate from the client-side feature flags to avoid "use client" issues

type FeatureFlag = 
  | 'FEATURE_BIG_POST_SHIPPING'
  | 'FEATURE_MOTION_BOOKING'
  | 'FEATURE_VIDEO_PLAYER'
  | 'FEATURE_UPSELLS'
  | 'FEATURE_FLAT_PACK_CONFIGURATOR'
  | 'FEATURE_ENHANCED_GALLERY'
  | 'FEATURE_TEXT_CLARITY'
  | 'FEATURE_REDUCED_BLUR'
  | 'FEATURE_SMOOTH_ANIMATIONS'
  | 'FEATURE_HIGH_CONTRAST';

const defaultFlags: Record<FeatureFlag, boolean> = {
  FEATURE_BIG_POST_SHIPPING: false,
  FEATURE_MOTION_BOOKING: false,
  FEATURE_VIDEO_PLAYER: true,
  FEATURE_UPSELLS: true,
  FEATURE_FLAT_PACK_CONFIGURATOR: false,
  FEATURE_ENHANCED_GALLERY: true,
  FEATURE_TEXT_CLARITY: true,
  FEATURE_REDUCED_BLUR: true,
  FEATURE_SMOOTH_ANIMATIONS: true,
  FEATURE_HIGH_CONTRAST: false,
};

// Server-side feature flag check
export function getFeatureFlag(flag: FeatureFlag): boolean {
  // Check environment variable
  const envValue = process.env[`NEXT_PUBLIC_${flag}`];
  return envValue === 'true' || (envValue === undefined && defaultFlags[flag]);
}

// Export feature flags object for server-side use
export const featureFlags = {
  isEnabled: getFeatureFlag,
};
