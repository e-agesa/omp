"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  cta: string;
  href: string;
  image: string;
  overlay: string;
  accent: string;
}

const SLIDES: Slide[] = [
  {
    id: 1,
    title: "The Beauty Lab",
    subtitle: "Premium dermo-cosmetics — Avène, Vichy, La Roche-Posay, CeraVe & more.",
    cta: "Shop Beauty",
    href: "/category/beauty",
    image: "/images/hero-beauty-banner.webp",
    overlay: "from-black/70 via-black/40 to-transparent",
    accent: "bg-omp-white text-pink-600",
  },
  {
    id: 2,
    title: "Your Health,\nDelivered",
    subtitle: "Genuine medicines reviewed by licensed pharmacists. Fast delivery across Nairobi.",
    cta: "Upload Prescription",
    href: "/prescription",
    image: "/images/pharmacist.jpg",
    overlay: "from-omp-blue-dark/90 via-omp-blue/60 to-transparent",
    accent: "bg-omp-white text-omp-blue",
  },
  {
    id: 3,
    title: "Support Better\nSleep Naturally",
    subtitle: "Melatonin, magnesium & natural sleep aids — from KES 2,025.",
    cta: "Shop Supplements",
    href: "/category/supplements",
    image: "/images/promo-sleep.webp",
    overlay: "from-black/60 via-black/30 to-transparent",
    accent: "bg-omp-green text-white",
  },
  {
    id: 4,
    title: "Free Delivery\nOver KES 2,000",
    subtitle: "Fast delivery across Nairobi estates. Order now, get it today.",
    cta: "Start Shopping",
    href: "/shop",
    image: "/images/pills-orange.jpg",
    overlay: "from-omp-dark/80 via-omp-dark/50 to-transparent",
    accent: "bg-omp-red text-white",
  },
  {
    id: 5,
    title: "Glow Up\nThis Season",
    subtitle: "Curated skincare routines for every skin type. Dermatologist-approved brands.",
    cta: "Explore Skincare",
    href: "/category/beauty",
    image: "/images/promo-skin-hydration.webp",
    overlay: "from-purple-900/70 via-purple-800/40 to-transparent",
    accent: "bg-purple-500 text-white",
  },
  {
    id: 6,
    title: "Wellness\nStarts Here",
    subtitle: "Vitamins, immunity boosters & daily essentials. Trusted brands at pharmacy prices.",
    cta: "Shop Wellness",
    href: "/category/supplements",
    image: "/images/delivery-banner.webp",
    overlay: "from-emerald-900/80 via-emerald-800/40 to-transparent",
    accent: "bg-omp-green text-white",
  },
];

/* Slide transition variants */
const imageVariants = {
  enter: { opacity: 0, scale: 1.08 },
  center: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
  exit: { opacity: 0, scale: 0.97, transition: { duration: 0.4 } },
};

const contentVariants = {
  enter: { opacity: 0, y: 40, filter: "blur(4px)" },
  center: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] } },
  exit: { opacity: 0, y: -30, filter: "blur(4px)", transition: { duration: 0.3 } },
};

const titleVariants = {
  enter: { opacity: 0, x: -30 },
  center: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, x: 30, transition: { duration: 0.25 } },
};

const subtitleVariants = {
  enter: { opacity: 0, y: 20 },
  center: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.45, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const ctaVariants = {
  enter: { opacity: 0, scale: 0.8 },
  center: { opacity: 1, scale: 1, transition: { duration: 0.4, delay: 0.55, type: "spring", stiffness: 200 } },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
};

export function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback((index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  }, [current]);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = SLIDES[current];

  return (
    <section className="relative overflow-hidden min-h-[70vh] lg:min-h-[80vh] flex items-center bg-omp-dark">
      {/* Background Image with AnimatePresence */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={slide.id}
          variants={imageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-r ${slide.overlay} z-[1]`} />

      {/* Content with staggered entrance */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          variants={contentVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="relative z-10 px-8 sm:px-16 lg:px-24 py-16 sm:py-20 lg:py-28 max-w-4xl"
        >
          <motion.h1
            variants={titleVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-4 text-white whitespace-pre-line drop-shadow-lg"
          >
            {slide.title}
          </motion.h1>
          <motion.p
            variants={subtitleVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="text-lg sm:text-xl lg:text-2xl text-white/85 mb-8 max-w-2xl drop-shadow-md"
          >
            {slide.subtitle}
          </motion.p>
          <motion.div
            variants={ctaVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <Link
              href={slide.href}
              className={`inline-block ${slide.accent} font-semibold px-10 py-4 rounded-pill text-base hover:shadow-lg hover:scale-105 transition-all`}
            >
              {slide.cta}
            </Link>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Slide indicators with animation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="relative h-2.5 rounded-pill overflow-hidden"
            aria-label={`Go to slide ${i + 1}`}
          >
            <div className={`h-full rounded-pill transition-all duration-300 ${
              i === current ? "w-10 bg-white" : "w-2.5 bg-white/40"
            }`} />
            {i === current && (
              <motion.div
                className="absolute inset-0 bg-white/30 rounded-pill origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 6, ease: "linear" }}
                key={`progress-${current}`}
              />
            )}
          </button>
        ))}
      </div>

      {/* Navigation arrows */}
      <motion.button
        onClick={prev}
        className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-sm transition-colors z-10"
        aria-label="Previous slide"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </motion.button>
      <motion.button
        onClick={next}
        className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-sm transition-colors z-10"
        aria-label="Next slide"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </motion.button>
    </section>
  );
}
