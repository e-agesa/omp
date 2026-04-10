import type { Metadata } from "next";
import { HeroSlider } from "@/components/home/HeroSlider";

export const metadata: Metadata = {
  title: "Our Mall Pharmacy | Buy Medicines, Supplements & Beauty Online in Kenya",
  description: "Shop 1,700+ genuine medicines, vitamins, skincare & wellness products online. PPB-certified pharmacy with M-Pesa checkout and same-day delivery across Nairobi.",
  keywords: [
    "Our Mall Pharmacy", "online pharmacy Nairobi", "buy medicine online Kenya",
    "M-Pesa pharmacy", "same day medicine delivery", "prescription upload Kenya",
    "vitamins supplements Nairobi", "skincare products Kenya", "PPB certified pharmacy",
  ],
  openGraph: {
    title: "Our Mall Pharmacy — Kenya's #1 Online Pharmacy",
    description: "Shop 1,700+ genuine medicines, supplements & beauty products. M-Pesa checkout. Same-day delivery Nairobi.",
    url: "https://ourmallpharmacy.com",
    images: [{ url: "/images/logo-blue.jpeg", width: 800, height: 800 }],
  },
};
import { QuickActions } from "@/components/home/QuickActions";
import { HealthHubs } from "@/components/home/HealthHubs";
import {
  PromoBanners,
  DeliveryBanner,
  FeaturedProducts,
  StatsBar,
  TrustBar,
} from "@/components/home/HomeMotionSections";

export default function HomePage() {
  return (
    <div className="w-full">
      {/* Hero Section — Full screen slider with real images */}
      <HeroSlider />

      {/* Content sections with motion */}
      <div className="px-6 py-8 space-y-10">
        {/* Quick Action Grid */}
        <QuickActions />

        {/* Promo Banners Row — Skin Hydration + Sleep */}
        <PromoBanners />

        {/* Delivery Banner */}
        <DeliveryBanner />

        {/* Health Hubs — SEO Pillar/Cluster Model */}
        <HealthHubs />

        {/* Featured Products Skeleton */}
        <FeaturedProducts />

        {/* Stats Bar */}
        <StatsBar />

        {/* Trust Bar */}
        <TrustBar />
      </div>
    </div>
  );
}
