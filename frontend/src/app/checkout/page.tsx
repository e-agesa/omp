import type { Metadata } from "next";
import { CheckoutContent } from "@/components/checkout/CheckoutContent";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your order — enter delivery details and pay securely with M-Pesa.",
};

export default function CheckoutPage() {
  return <CheckoutContent />;
}
