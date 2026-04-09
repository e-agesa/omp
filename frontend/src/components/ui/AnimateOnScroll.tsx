"use client";

import { type ReactNode } from "react";
import { motion, type Variants } from "framer-motion";

const ANIMATION_MAP: Record<string, Variants> = {
  "fade-in-up": {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  "fade-in-left": {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  },
  "fade-in-right": {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  },
  "scale-in": {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  },
};

interface AnimateOnScrollProps {
  children: ReactNode;
  animation?: "fade-in-up" | "fade-in-left" | "fade-in-right" | "scale-in";
  delay?: number;
  className?: string;
}

export function AnimateOnScroll({
  children,
  animation = "fade-in-up",
  delay = 0,
  className = "",
}: AnimateOnScrollProps) {
  const variants = ANIMATION_MAP[animation];

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={{ once: true, amount: 0.1, margin: "0px 0px -50px 0px" }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
        delay: delay / 1000,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
