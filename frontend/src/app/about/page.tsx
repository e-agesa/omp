import type { Metadata } from "next";
import { AboutContent } from "@/components/about/AboutContent";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Online Mega Pharmacy — Kenya's trusted digital pharmacy delivering quality medicines, expert care, and wellness to your doorstep.",
};

export default function AboutPage() {
  return <AboutContent />;
}
