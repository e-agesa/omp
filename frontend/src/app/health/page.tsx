import type { Metadata } from "next";
import { HealthArticlesContent } from "@/components/health/HealthArticlesContent";

export const metadata: Metadata = {
  title: "Health Articles",
  description: "Expert health tips, wellness guides, and pharmacy advice from OMP Kenya's licensed pharmacists.",
};

export default function HealthPage() {
  return <HealthArticlesContent />;
}
