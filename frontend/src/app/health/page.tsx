import type { Metadata } from "next";
import { HealthArticlesContent } from "@/components/health/HealthArticlesContent";

export const metadata: Metadata = {
  title: "Health Articles",
  description: "Expert health tips, wellness guides, and pharmacy advice from Our Mall Pharmacy Kenya's licensed pharmacists.",
  keywords: [
    "health articles Kenya",
    "wellness tips pharmacy",
    "pharmacist advice Nairobi",
    "health guides Kenya",
    "Our Mall Pharmacy blog",
    "medication tips Kenya",
  ],
  openGraph: {
    title: "Health Articles | Our Mall Pharmacy",
    description: "Expert health tips, wellness guides, and pharmacy advice from Our Mall Pharmacy Kenya's licensed pharmacists.",
    url: "https://ourmallpharmacy.com/health/",
  },
};

export default function HealthPage() {
  return <HealthArticlesContent />;
}
