import type { Metadata } from "next";
import { CheckoutContent } from "@/components/checkout/CheckoutContent";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your order — enter delivery details and pay securely with M-Pesa.",
  keywords: [
    "M-Pesa checkout",
    "secure payment pharmacy",
    "online pharmacy checkout Kenya",
    "pay with M-Pesa",
    "Our Mall Pharmacy checkout",
    "medicine payment Nairobi",
  ],
  openGraph: {
    title: "Checkout | Our Mall Pharmacy",
    description: "Complete your order — enter delivery details and pay securely with M-Pesa.",
    url: "https://ourmallpharmacy.com/checkout/",
  },
};

export default function CheckoutPage() {
  return <CheckoutContent />;
}
