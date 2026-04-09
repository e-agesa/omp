"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/hooks/useCart";
import { MpesaCheckout } from "@/components/checkout/MpesaCheckout";

type CheckoutStep = "details" | "payment" | "confirmation";

const DELIVERY_ZONES = [
  { name: "Westlands / Parklands", eta: "30-45 min", cost: 0 },
  { name: "CBD / Upperhill", eta: "30-45 min", cost: 0 },
  { name: "Kilimani / Lavington", eta: "30-45 min", cost: 0 },
  { name: "Karen / Langata", eta: "45-60 min", cost: 150 },
  { name: "Kasarani / Roysambu", eta: "45-60 min", cost: 150 },
  { name: "Eastlands / Embakasi", eta: "60-90 min", cost: 200 },
];

export function CheckoutContent() {
  const { cart, itemCount, clearCart } = useCart();
  const [step, setStep] = useState<CheckoutStep>("details");
  const [receiptNumber, setReceiptNumber] = useState("");

  // Form state
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    apartment: "",
    zone: "",
    notes: "",
  });

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const isFormValid =
    form.firstName.trim() &&
    form.lastName.trim() &&
    form.phone.trim().length >= 9 &&
    form.address.trim() &&
    form.zone;

  const selectedZone = DELIVERY_ZONES.find((z) => z.name === form.zone);
  const zoneCost = selectedZone?.cost || 0;
  const cartTotal = parseFloat(cart.total);
  const finalTotal = cartTotal + zoneCost;

  const handlePaymentSuccess = (receipt: string) => {
    setReceiptNumber(receipt);
    setStep("confirmation");
    clearCart();
  };

  // Empty cart redirect
  if (itemCount === 0 && step !== "confirmation") {
    return (
      <div className="w-full px-6 py-16 text-center">
        <svg className="w-16 h-16 mx-auto text-omp-gray-light mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
        </svg>
        <h2 className="text-lg font-semibold text-omp-dark">Your cart is empty</h2>
        <p className="text-sm text-omp-gray mt-1">Add items before proceeding to checkout.</p>
        <Link
          href="/shop"
          className="inline-block mt-4 bg-omp-blue text-white font-semibold px-6 py-3 rounded-medical hover:bg-omp-blue-light transition-colors"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  // Confirmation step
  if (step === "confirmation") {
    return (
      <div className="w-full px-6 py-12 max-w-lg mx-auto text-center animate-fade-in-up">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-omp-green/10 mb-4">
          <svg className="w-10 h-10 text-omp-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-omp-dark mb-2">Order Confirmed!</h1>
        <p className="text-sm text-omp-gray mb-6">
          Thank you, {form.firstName}! Your order is being prepared by our pharmacist.
        </p>

        <div className="bg-omp-white rounded-medical shadow-card p-5 text-left mb-6">
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-omp-gray">M-Pesa Receipt</span>
              <span className="font-bold text-omp-dark">{receiptNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-omp-gray">Delivery to</span>
              <span className="font-medium text-omp-dark">{form.zone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-omp-gray">Estimated Delivery</span>
              <span className="font-medium text-omp-green">{selectedZone?.eta || "45-60 min"}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/track-order"
            className="bg-omp-blue text-white font-semibold px-6 py-3 rounded-medical hover:bg-omp-blue-light transition-colors"
          >
            Track Order
          </Link>
          <Link
            href="/shop"
            className="border border-omp-blue text-omp-blue font-semibold px-6 py-3 rounded-medical hover:bg-omp-blue/5 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-6 py-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-omp-dark mb-2">Checkout</h1>

      {/* Progress indicator */}
      <div className="flex items-center gap-2 mb-8 text-sm">
        <span className={`font-medium ${step === "details" ? "text-omp-blue" : "text-omp-green"}`}>
          1. Delivery Details
        </span>
        <span className="text-omp-gray-light">&rarr;</span>
        <span className={`font-medium ${step === "payment" ? "text-omp-blue" : "text-omp-gray"}`}>
          2. Payment
        </span>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main content */}
        <div className="flex-1">
          {step === "details" && (
            <div className="bg-omp-white rounded-medical shadow-card p-6 animate-fade-in-up">
              <h2 className="font-bold text-omp-dark mb-4">Delivery Information</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-omp-dark mb-1">First Name *</label>
                  <input
                    type="text"
                    value={form.firstName}
                    onChange={(e) => updateField("firstName", e.target.value)}
                    className="w-full rounded-medical border border-omp-gray-light px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-omp-blue"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-omp-dark mb-1">Last Name *</label>
                  <input
                    type="text"
                    value={form.lastName}
                    onChange={(e) => updateField("lastName", e.target.value)}
                    className="w-full rounded-medical border border-omp-gray-light px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-omp-blue"
                    placeholder="Kamau"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-omp-dark mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    className="w-full rounded-medical border border-omp-gray-light px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-omp-blue"
                    placeholder="0712 345 678"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-omp-dark mb-1">Email (optional)</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className="w-full rounded-medical border border-omp-gray-light px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-omp-blue"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-omp-dark mb-1">Delivery Address *</label>
                <input
                  type="text"
                  value={form.address}
                  onChange={(e) => updateField("address", e.target.value)}
                  className="w-full rounded-medical border border-omp-gray-light px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-omp-blue"
                  placeholder="Building name, street address"
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-omp-dark mb-1">Apartment / Floor (optional)</label>
                <input
                  type="text"
                  value={form.apartment}
                  onChange={(e) => updateField("apartment", e.target.value)}
                  className="w-full rounded-medical border border-omp-gray-light px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-omp-blue"
                  placeholder="Apt 4B, 2nd Floor"
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-omp-dark mb-1">Delivery Zone *</label>
                <select
                  value={form.zone}
                  onChange={(e) => updateField("zone", e.target.value)}
                  className="w-full rounded-medical border border-omp-gray-light px-4 py-3 text-sm bg-omp-white focus:outline-none focus:ring-2 focus:ring-omp-blue"
                >
                  <option value="">Select your delivery zone</option>
                  {DELIVERY_ZONES.map((z) => (
                    <option key={z.name} value={z.name}>
                      {z.name} — {z.eta} {z.cost > 0 ? `(+KES ${z.cost})` : "(FREE)"}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-omp-dark mb-1">Delivery Notes (optional)</label>
                <textarea
                  value={form.notes}
                  onChange={(e) => updateField("notes", e.target.value)}
                  rows={2}
                  className="w-full rounded-medical border border-omp-gray-light px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-omp-blue resize-none"
                  placeholder="Gate code, landmarks, special instructions..."
                />
              </div>

              <button
                onClick={() => setStep("payment")}
                disabled={!isFormValid}
                className="mt-6 w-full bg-omp-blue text-white font-bold py-4 rounded-medical hover:bg-omp-blue-light transition-colors disabled:opacity-40"
              >
                Continue to Payment
              </button>
            </div>
          )}

          {step === "payment" && (
            <div className="space-y-4 animate-fade-in-up">
              {/* Delivery summary */}
              <div className="bg-omp-white rounded-medical shadow-card p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-omp-dark">Delivering to</h3>
                  <button
                    onClick={() => setStep("details")}
                    className="text-xs text-omp-blue hover:underline"
                  >
                    Edit
                  </button>
                </div>
                <div className="text-sm text-omp-gray space-y-1">
                  <p className="font-medium text-omp-dark">{form.firstName} {form.lastName}</p>
                  <p>{form.address}{form.apartment ? `, ${form.apartment}` : ""}</p>
                  <p>{form.zone}</p>
                  <p>{form.phone}</p>
                </div>
              </div>

              {/* M-Pesa payment */}
              <MpesaCheckout
                amount={finalTotal}
                orderId={Date.now()}
                onSuccess={handlePaymentSuccess}
              />
            </div>
          )}
        </div>

        {/* Order summary sidebar */}
        <div className="lg:w-80 shrink-0">
            <div className="bg-omp-white rounded-medical shadow-card p-5 sticky top-4">
              <h3 className="font-bold text-omp-dark mb-3">
                Order Summary ({itemCount} {itemCount === 1 ? "item" : "items"})
              </h3>

              {/* Item list */}
              <div className="divide-y divide-omp-gray-light mb-4 max-h-60 overflow-y-auto">
                {cart.items.map((item) => (
                  <div key={item.product.id} className="flex gap-3 py-3">
                    <div className="w-12 h-12 rounded-medical bg-omp-slate overflow-hidden shrink-0">
                      {item.product.images[0] && (
                        <Image
                          src={item.product.images[0].src}
                          alt={item.product.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-omp-dark truncate">{item.product.name}</p>
                      <p className="text-xs text-omp-gray">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-xs font-medium text-omp-dark shrink-0">
                      KES {(parseFloat(item.product.price) * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-2 text-sm border-t border-omp-gray-light pt-3">
                <div className="flex justify-between">
                  <span className="text-omp-gray">Subtotal</span>
                  <span className="font-medium text-omp-dark">KES {parseFloat(cart.subtotal).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-omp-gray">Shipping</span>
                  <span className="font-medium text-omp-dark">
                    {parseFloat(cart.shipping) === 0 ? (
                      <span className="text-omp-green">FREE</span>
                    ) : (
                      `KES ${parseFloat(cart.shipping).toLocaleString()}`
                    )}
                  </span>
                </div>
                {zoneCost > 0 && (
                  <div className="flex justify-between">
                    <span className="text-omp-gray">Zone surcharge</span>
                    <span className="font-medium text-omp-dark">KES {zoneCost.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-omp-gray">VAT (16%)</span>
                  <span className="font-medium text-omp-dark">KES {parseFloat(cart.tax).toLocaleString()}</span>
                </div>
                <div className="border-t border-omp-gray-light pt-2 flex justify-between">
                  <span className="font-bold text-omp-dark">Total</span>
                  <span className="font-bold text-omp-blue text-lg">
                    KES {finalTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Back to cart */}
              <Link
                href="/cart"
                className="block mt-4 text-center text-xs text-omp-gray hover:text-omp-blue transition-colors"
              >
                &larr; Back to cart
              </Link>
            </div>
          </div>
      </div>
    </div>
  );
}
