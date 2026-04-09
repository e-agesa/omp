import type { Metadata } from "next";
import { CartView } from "@/components/cart/CartView";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review your cart and proceed to checkout with M-Pesa.",
};

export default function CartPage() {
  return (
    <div className="w-full px-6 py-8">
      <h1 className="text-2xl font-bold text-omp-dark mb-6">Your Cart</h1>
      <CartView />
    </div>
  );
}
