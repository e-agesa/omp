"use client";

import { ReactNode } from "react";
import {
  motion,
  AnimatePresence,
  type Variants,
  type Transition,
} from "framer-motion";

/* ── Shared easing & timing ── */
const smooth: Transition = { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] };
const spring: Transition = { type: "spring", stiffness: 100, damping: 20 };

/* ── Preset variant libraries ── */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: smooth },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -40 },
  visible: { opacity: 1, y: 0, transition: smooth },
  exit: { opacity: 0, y: 20, transition: { duration: 0.3 } },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: smooth },
  exit: { opacity: 0, x: -20, transition: { duration: 0.3 } },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: smooth },
  exit: { opacity: 0, x: 20, transition: { duration: 0.3 } },
};

export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: spring },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.25 } },
};

export const fadeOnly: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
};

/* ── Stagger container ── */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

/* ── Stagger item (child of stagger container) ── */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: smooth },
  exit: { opacity: 0, y: -12, transition: { duration: 0.2 } },
};

/* ─────────────────────────────────────────────
   Reusable Components
   ───────────────────────────────────────────── */

interface MotionSectionProps {
  children: ReactNode;
  variants?: Variants;
  className?: string;
  delay?: number;
  /** viewport trigger amount (0-1) */
  amount?: number;
}

/**
 * Section-level entrance/exit animation triggered on scroll into view.
 * Wraps content in a `motion.div` with whileInView.
 */
export function MotionSection({
  children,
  variants = fadeUp,
  className = "",
  delay = 0,
  amount = 0.15,
}: MotionSectionProps) {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={{ once: true, amount }}
      transition={delay ? { delay } : undefined}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Stagger container — children using `staggerItem` variants
 * animate in one-by-one on scroll.
 */
export function StaggerGroup({
  children,
  className = "",
  amount = 0.1,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
}) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={{ once: true, amount }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Individual item within a StaggerGroup.
 */
export function StaggerItem({
  children,
  className = "",
  variants = staggerItem,
}: {
  children: ReactNode;
  className?: string;
  variants?: Variants;
}) {
  return (
    <motion.div variants={variants} className={className}>
      {children}
    </motion.div>
  );
}

/**
 * Page-level entrance/exit wrapper.
 * Wrap page content with this for route transitions.
 */
export function PageTransition({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Wrap children with AnimatePresence for exit animations.
 */
export function PresenceWrapper({
  children,
  mode = "wait",
}: {
  children: ReactNode;
  mode?: "wait" | "sync" | "popLayout";
}) {
  return <AnimatePresence mode={mode}>{children}</AnimatePresence>;
}

/* Re-export motion for one-off use */
export { motion, AnimatePresence };
