import type { Metadata } from "next";
import { TrackOrderContent } from "@/components/order/TrackOrderContent";

export const metadata: Metadata = {
  title: "Track Order",
  description: "Track your OMP order in real-time. Enter your order number or M-Pesa receipt to see delivery status.",
};

export default function TrackOrderPage() {
  return <TrackOrderContent />;
}
