import { TargetAndTransition, Transition, Variants } from 'motion/react';

/**
 * PROTEINPATH Motion & Micro-interaction Tokens
 * 
 * Design Philosophy:
 * - Quiet Luxury & Biomimetic Precision
 * - Calibrated, tactile feedback (no exaggerated bouncy cartoon springs)
 * - GPU-accelerated transforms (scale, opacity, translate3d)
 */

export const MOTION_TOKENS = {
  // Cubic Bezier Easings
  ease: {
    // Smooth deceleration for natural arrival
    luxuryDecel: [0.16, 1, 0.3, 1] as const,
    // Swift acceleration for crisp departures
    luxuryAccel: [0.4, 0, 0.2, 1] as const,
    // Symmetrical smooth curve
    luxuryStandard: [0.25, 0.1, 0.25, 1] as const,
  },

  // Millisecond Durations
  duration: {
    micro: 0.12,   // 120ms: tap states, toggle snaps
    swift: 0.2,    // 200ms: hover fades, badge increments
    standard: 0.3, // 300ms: sheet reveals, card flips
    deliberate: 0.45, // 450ms: parabolic cart fly, full modal expand
  },

  // Spring Configurations
  spring: {
    // Tactile button tap feedback (crisp, zero mushiness)
    tactile: {
      type: 'spring' as const,
      stiffness: 500,
      damping: 30,
      mass: 0.8,
    },
    // Gentle drawer / sheet slide
    drawer: {
      type: 'spring' as const,
      stiffness: 350,
      damping: 34,
      mass: 1,
    },
    // Recoil bounce for cart icon badge
    cartRecoil: {
      type: 'spring' as const,
      stiffness: 420,
      damping: 18,
    },
  },
};

// Screen Transitions: Smooth fade + subtle vertical shift
export const screenTransitionVariants: Variants = {
  initial: {
    opacity: 0,
    y: 8,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.24,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.18,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

// Button Tap Feedback
export const buttonTapVariants: Variants = {
  initial: { scale: 1 },
  hover: { scale: 1.01 },
  tap: { scale: 0.965, transition: MOTION_TOKENS.spring.tactile },
};

export const buttonTapMotion = {
  whileHover: { scale: 1.01 },
  whileTap: { scale: 0.965 },
  transition: MOTION_TOKENS.spring.tactile,
};
