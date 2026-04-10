import type { Metadata } from "next";
import { CartView } from "@/components/cart/CartView";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review your cart and proceed to checkout with M-Pesa.",
  keywords: [
    "shopping cart pharmacy",
    "pharmacy checkout Kenya",
    "M-Pesa payment cart",
    "Our Mall Pharmacy cart",
    "online medicine cart",
    "buy health products Kenya",
  ],
  openGraph: {
    title: "Cart | Our Mall Pharmacy",
    description: "Review your cart and proceed to checkout with M-Pesa.",
    url: "https://ourmallpharmacy.com/cart/",
  },
};

export default function CartPage() {
  return (
    <div className="w-full px-6 py-8">
      <h1 className="text-2xl font-bold text-omp-dark mb-6">Your Cart</h1>
      <CartView />
    </div>
  );
}
