import type { Metadata } from "next";
import { AboutContent } from "@/components/about/AboutContent";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Our Mall Pharmacy — Kenya's trusted digital pharmacy delivering quality medicines, expert care, and wellness to your doorstep.",
  keywords: [
    "Our Mall Pharmacy",
    "about us pharmacy Kenya",
    "Kenya healthcare",
    "online pharmacy Nairobi",
    "pharmacy team Kenya",
    "trusted digital pharmacy",
  ],
  openGraph: {
    title: "About Us | Our Mall Pharmacy",
    description:
      "Learn about Our Mall Pharmacy — Kenya's trusted digital pharmacy delivering quality medicines, expert care, and wellness to your doorstep.",
    url: "https://ourmallpharmacy.com/about/",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
