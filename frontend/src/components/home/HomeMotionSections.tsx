"use client";

import Image from "next/image";
import Link from "next/link";
import {
  MotionSection,
  StaggerGroup,
  StaggerItem,
  fadeLeft,
  fadeRight,
  scaleUp,
  motion,
} from "@/components/motion";

/* ── Promo Banners ── */
function PromoBanners() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <MotionSection variants={fadeLeft}>
        <Link href="/category/beauty" className="group relative overflow-hidden rounded-medical block">
          <Image
            src="/images/promo-skin-hydration.webp"
            alt="Intensive Skin Hydration — Save 30%"
            width={600}
            height={600}
            className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>
      </MotionSection>
      <MotionSection variants={fadeRight}>
        <Link href="/category/supplements" className="group relative overflow-hidden rounded-medical block">
          <Image
            src="/images/promo-sleep.webp"
            alt="Support Better Sleep Naturally — Save 10%"
            width={603}
            height={241}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>
      </MotionSection>
    </section>
  );
}

/* ── Delivery Banner ── */
function DeliveryBanner() {
  return (
    <MotionSection variants={scaleUp}>
      <section>
        <Link href="/shipping" className="block overflow-hidden rounded-medical group">
          <Image
            src="/images/delivery-banner.webp"
            alt="Free delivery for orders above KES 2,500"
            width={1230}
            height={150}
            className="w-full h-auto object-cover group-hover:brightness-110 transition-all duration-300"
          />
        </Link>
      </section>
    </MotionSection>
  );
}

/* ── Featured Products Skeleton ── */
function FeaturedProducts() {
  return (
    <MotionSection>
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-omp-dark">Popular Products</h2>
          <Link href="/shop" className="text-sm text-omp-blue font-medium hover:underline">
            View all
          </Link>
        </div>
        <StaggerGroup className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <StaggerItem key={i}>
              <div className="bg-omp-white rounded-medical shadow-card overflow-hidden animate-pulse">
                <div className="aspect-square bg-omp-gray-light" />
                <div className="p-3 space-y-2">
                  <div className="h-3 bg-omp-gray-light rounded w-1/3" />
                  <div className="h-4 bg-omp-gray-light rounded w-3/4" />
                  <div className="h-4 bg-omp-gray-light rounded w-1/2" />
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>
    </MotionSection>
  );
}

/* ── Stats Bar ── */
const STATS = [
  { number: "50K+", label: "Happy Customers" },
  { number: "10K+", label: "Products Available" },
  { number: "30 min", label: "Avg Delivery Time" },
  { number: "98%", label: "Order Accuracy" },
];

function StatsBar() {
  return (
    <MotionSection variants={scaleUp}>
      <section className="relative rounded-medical overflow-hidden">
        <Image
          src="/images/wave-pattern-bg.jpg"
          alt=""
          fill
          className="object-cover"
          aria-hidden="true"
        />
        <StaggerGroup className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6 p-8 lg:p-12">
          {STATS.map((stat) => (
            <StaggerItem key={stat.label}>
              <motion.div
                className="text-center"
                whileHover={{ scale: 1.08 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <p className="text-3xl lg:text-4xl font-bold text-omp-blue">{stat.number}</p>
                <p className="text-sm text-omp-gray mt-1">{stat.label}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>
    </MotionSection>
  );
}

/* ── Trust Bar ── */
const TRUST_ITEMS = [
  { icon: "truck", title: "Fast Delivery", desc: "Same-day across Nairobi" },
  { icon: "shield", title: "PPB Certified", desc: "Pharmacy board verified" },
  { icon: "phone", title: "Pharmacist Support", desc: "Talk to an expert anytime" },
  { icon: "refresh", title: "Easy Refills", desc: "Auto-reminder when you're low" },
];

function TrustBar() {
  return (
    <StaggerGroup className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {TRUST_ITEMS.map((item) => (
        <StaggerItem key={item.title}>
          <motion.div
            className="bg-omp-white rounded-medical p-5 shadow-card text-center"
            whileHover={{ y: -4, boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-omp-blue/10 text-omp-blue mb-3">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                {item.icon === "truck" && (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H18.75m-7.5-3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                )}
                {item.icon === "shield" && (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                )}
                {item.icon === "phone" && (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                )}
                {item.icon === "refresh" && (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
                )}
              </svg>
            </div>
            <h3 className="text-sm font-semibold text-omp-dark">{item.title}</h3>
            <p className="text-xs text-omp-gray mt-0.5">{item.desc}</p>
          </motion.div>
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}

export {
  PromoBanners,
  DeliveryBanner,
  FeaturedProducts,
  StatsBar,
  TrustBar,
};
