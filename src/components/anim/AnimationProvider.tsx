"use client";

import { createContext, useContext, ReactNode } from 'react';
import { useReducedMotionSafe } from '@/hooks/useReducedMotionSafe';

interface AnimationContextType {
  isDisabled: boolean;
  safeAnimation: {
    duration: number;
    scale: number;
    y: number;
    opacity: number;
    stagger: number;
  };
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

interface AnimationProviderProps {
  children: ReactNode;
}

/**
 * Animation context provider that provides global animation settings
 * and reduced motion support to all child components
 */
export function AnimationProvider({ children }: AnimationProviderProps) {
  const { isDisabled, safeAnimation } = useReducedMotionSafe();

  const value: AnimationContextType = {
    isDisabled,
    safeAnimation,
  };

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
}

/**
 * Hook to use the animation context
 * @returns Animation context values
 */
export function useAnimation() {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
}
