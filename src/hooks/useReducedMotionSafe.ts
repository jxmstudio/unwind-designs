import { useEffect, useState } from 'react';

/**
 * Hook that safely handles reduced motion preferences and animation feature flags
 * @returns Object with animation state and safe animation values
 */
export function useReducedMotionSafe() {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);
  const [isAnimationsEnabled, setIsAnimationsEnabled] = useState(true);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setShouldReduceMotion(mediaQuery.matches);

    // Check animation feature flag
    const animationsEnabled = process.env.NEXT_PUBLIC_ENABLE_ANIMATIONS !== 'false';
    setIsAnimationsEnabled(animationsEnabled);

    // Listen for changes in reduced motion preference
    const handleChange = (e: MediaQueryListEvent) => {
      setShouldReduceMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Safe animation values that respect reduced motion
  const safeAnimation = {
    duration: shouldReduceMotion ? 0 : 0.3,
    scale: shouldReduceMotion ? 1 : 1.02,
    y: shouldReduceMotion ? 0 : -2,
    opacity: shouldReduceMotion ? 1 : 0,
    stagger: shouldReduceMotion ? 0 : 0.1,
  };

  // Check if animations should be disabled
  const isDisabled = shouldReduceMotion || !isAnimationsEnabled;

  return {
    shouldReduceMotion,
    isAnimationsEnabled,
    isDisabled,
    safeAnimation,
  };
}
