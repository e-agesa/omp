import type { Metadata } from "next";
import { TrackOrderContent } from "@/components/order/TrackOrderContent";

export const metadata: Metadata = {
  title: "Track Order",
  description: "Track your Our Mall Pharmacy order in real-time. Enter your order number or M-Pesa receipt to see delivery status.",
  keywords: [
    "track order pharmacy",
    "delivery status Nairobi",
    "order tracking Kenya",
    "Our Mall Pharmacy order",
    "M-Pesa receipt tracking",
    "medicine delivery status",
  ],
  openGraph: {
    title: "Track Order | Our Mall Pharmacy",
    description: "Track your Our Mall Pharmacy order in real-time. Enter your order number or M-Pesa receipt to see delivery status.",
    url: "https://ourmallpharmacy.com/track-order/",
  },
};

export default function TrackOrderPage() {
  return <TrackOrderContent />;
}
