import { Variants } from "framer-motion";

// Enhanced base animation variants with better performance
// Reduced y-transform to prevent layout shift
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

export const slideUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

// Enhanced stagger animations with better timing
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
      duration: 0.3
    }
  }
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

// Enhanced button animations with better feedback
export const buttonTap: Variants = {
  tap: { 
    scale: 0.96,
    transition: { duration: 0.1 }
  }
};

export const buttonHover: Variants = {
  hover: { 
    y: -2,
    transition: { 
      duration: 0.2, 
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

// Enhanced card animations with subtle effects
export const cardHover: Variants = {
  hover: { 
    y: -6,
    transition: { 
      duration: 0.3, 
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

// Enhanced modal animations with better spring physics
export const modalBackdrop: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  }
};

export const modalContent: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 24 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      duration: 0.4
    }
  }
};

// Enhanced parallax variants with better performance
export const parallax: Variants = {
  hidden: { y: 0 },
  visible: { 
    y: -24,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

// Enhanced section reveal with better timing
export const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

// Enhanced list animations
export const listContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1
    }
  }
};

export const listItem: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

// Enhanced image animations
export const imageReveal: Variants = {
  hidden: { opacity: 0, scale: 1.1 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

// Enhanced text animations
export const textReveal: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

// Enhanced loading animations
export const loadingPulse: Variants = {
  animate: {
    opacity: [1, 0.5, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Enhanced floating animations
export const floating: Variants = {
  animate: {
    y: [0, -8, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Enhanced transition presets
export const defaultTransition = {
  duration: 0.3,
  ease: [0.25, 0.46, 0.45, 0.94]
};

export const quickTransition = {
  duration: 0.2,
  ease: [0.25, 0.46, 0.45, 0.94]
};

export const slowTransition = {
  duration: 0.6,
  ease: [0.25, 0.46, 0.45, 0.94]
};

export const springTransition = {
  type: "spring",
  stiffness: 300,
  damping: 30
};

export const bounceTransition = {
  type: "spring",
  stiffness: 400,
  damping: 10
};
