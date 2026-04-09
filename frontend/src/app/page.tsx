import { HeroSlider } from "@/components/home/HeroSlider";
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
