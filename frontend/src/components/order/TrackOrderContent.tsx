"use client";

import { useState } from "react";
import Link from "next/link";
import type { OrderStatus } from "@/types";

const ORDER_STEPS: { key: OrderStatus; label: string; description: string }[] = [
  { key: "pending", label: "Order Placed", description: "Your order has been received and is being confirmed." },
  { key: "processing", label: "Processing", description: "Your order is being prepared by our pharmacist." },
  { key: "on-hold", label: "Out for Delivery", description: "Your order is on the way to your doorstep." },
  { key: "completed", label: "Delivered", description: "Your order has been delivered successfully." },
];

// Demo order for preview
const DEMO_ORDER = {
  id: "OMP-20260402-1847",
  status: "processing" as OrderStatus,
  date: "2 Apr 2026, 10:23 AM",
  total: "3,450",
  items: [
    { name: "Panadol Extra 500mg", qty: 2, price: "250" },
    { name: "CeraVe Moisturizing Cream 340g", qty: 1, price: "3,200" },
  ],
  delivery: {
    zone: "Westlands",
    eta: "30-45 min",
    rider: "James M.",
    phone: "+254 712 345 678",
  },
};

export function TrackOrderContent() {
  const [orderRef, setOrderRef] = useState("");
  const [tracked, setTracked] = useState(false);
  const [error, setError] = useState("");

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderRef.trim().length < 3) {
      setError("Please enter a valid order number or M-Pesa receipt.");
      return;
    }
    setError("");
    setTracked(true);
  };

  const currentIndex = ORDER_STEPS.findIndex((s) => s.key === DEMO_ORDER.status);

  return (
    <div className="w-full px-6 py-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-omp-dark mb-2">Track Your Order</h1>
      <p className="text-sm text-omp-gray mb-6">
        Enter your order number or M-Pesa receipt number to check delivery status.
      </p>

      {/* Search form */}
      <form onSubmit={handleTrack} className="flex gap-3 mb-8">
        <input
          type="text"
          value={orderRef}
          onChange={(e) => setOrderRef(e.target.value)}
          placeholder="e.g. OMP-20260402-1847 or SHK3F7G2T1"
          className="flex-1 rounded-medical border border-omp-gray-light px-4 py-3 text-sm placeholder:text-omp-gray focus:outline-none focus:ring-2 focus:ring-omp-blue"
        />
        <button
          type="submit"
          className="bg-omp-blue text-white font-semibold px-6 py-3 rounded-medical hover:bg-omp-blue-light transition-colors shrink-0"
        >
          Track
        </button>
      </form>

      {error && (
        <p className="text-sm text-omp-red mb-4">{error}</p>
      )}

      {/* Tracked order result */}
      {tracked && (
        <div className="space-y-6 animate-fade-in-up">
          {/* Order header */}
          <div className="bg-omp-white rounded-medical shadow-card p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="text-xs text-omp-gray">Order Number</p>
                <p className="font-bold text-omp-dark">{DEMO_ORDER.id}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-omp-gray">Placed on</p>
                <p className="text-sm font-medium text-omp-dark">{DEMO_ORDER.date}</p>
              </div>
            </div>
          </div>

          {/* Status tracker */}
          <div className="bg-omp-white rounded-medical shadow-card p-5">
            <h3 className="font-bold text-omp-dark mb-5">Delivery Status</h3>
            <div className="space-y-0">
              {ORDER_STEPS.map((step, i) => {
                const isCompleted = i <= currentIndex;
                const isCurrent = i === currentIndex;

                return (
                  <div key={step.key} className="flex gap-4">
                    {/* Step indicator */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-colors shrink-0 ${
                          isCompleted
                            ? "bg-omp-green text-white"
                            : "bg-omp-gray-light text-omp-gray"
                        } ${isCurrent ? "ring-4 ring-omp-green/20" : ""}`}
                      >
                        {isCompleted ? (
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        ) : (
                          i + 1
                        )}
                      </div>
                      {i < ORDER_STEPS.length - 1 && (
                        <div
                          className={`w-0.5 h-10 ${
                            i < currentIndex ? "bg-omp-green" : "bg-omp-gray-light"
                          }`}
                        />
                      )}
                    </div>

                    {/* Label */}
                    <div className="pb-6">
                      <p
                        className={`text-sm ${
                          isCurrent
                            ? "font-bold text-omp-green"
                            : isCompleted
                            ? "font-semibold text-omp-dark"
                            : "text-omp-gray"
                        }`}
                      >
                        {step.label}
                      </p>
                      <p className={`text-xs mt-0.5 ${isCompleted ? "text-omp-gray" : "text-omp-gray/60"}`}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order items */}
          <div className="bg-omp-white rounded-medical shadow-card p-5">
            <h3 className="font-bold text-omp-dark mb-3">Order Items</h3>
            <div className="divide-y divide-omp-gray-light">
              {DEMO_ORDER.items.map((item, i) => (
                <div key={i} className="flex justify-between py-2.5 text-sm">
                  <span className="text-omp-dark">
                    {item.name} <span className="text-omp-gray">x{item.qty}</span>
                  </span>
                  <span className="font-medium text-omp-dark">KES {item.price}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-omp-gray-light pt-3 mt-1 flex justify-between">
              <span className="font-bold text-omp-dark">Total</span>
              <span className="font-bold text-omp-blue">KES {DEMO_ORDER.total}</span>
            </div>
          </div>

          {/* Delivery info */}
          <div className="bg-gradient-to-br from-omp-blue to-omp-blue-light rounded-medical p-5 text-white">
            <h3 className="font-bold mb-3">Delivery Details</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-white/70 text-xs">Zone</p>
                <p className="font-medium">{DEMO_ORDER.delivery.zone}</p>
              </div>
              <div>
                <p className="text-white/70 text-xs">Estimated Time</p>
                <p className="font-medium">{DEMO_ORDER.delivery.eta}</p>
              </div>
              <div>
                <p className="text-white/70 text-xs">Rider</p>
                <p className="font-medium">{DEMO_ORDER.delivery.rider}</p>
              </div>
              <div>
                <p className="text-white/70 text-xs">Rider Phone</p>
                <p className="font-medium">{DEMO_ORDER.delivery.phone}</p>
              </div>
            </div>
          </div>

          {/* Help */}
          <div className="text-center text-sm text-omp-gray">
            <p>
              Need help?{" "}
              <Link href="/contact" className="text-omp-blue hover:underline">
                Contact Support
              </Link>{" "}
              or call us at{" "}
              <a href="tel:+254722390003" className="text-omp-blue hover:underline">
                +254 722 390 003
              </a>
            </p>
          </div>
        </div>
      )}

      {/* Not tracked yet — help info */}
      {!tracked && (
        <div className="bg-omp-white rounded-medical shadow-card p-6">
          <h3 className="font-bold text-omp-dark mb-3">Where to find your order number</h3>
          <ul className="space-y-3 text-sm text-omp-gray">
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-omp-blue/10 text-omp-blue flex items-center justify-center text-xs font-bold shrink-0">1</span>
              Check the confirmation SMS sent to your phone after placing the order.
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-omp-blue/10 text-omp-blue flex items-center justify-center text-xs font-bold shrink-0">2</span>
              Use your M-Pesa receipt number (e.g. SHK3F7G2T1) from the payment confirmation.
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-omp-blue/10 text-omp-blue flex items-center justify-center text-xs font-bold shrink-0">3</span>
              Check your{" "}
              <Link href="/account" className="text-omp-blue hover:underline">
                Health Dashboard
              </Link>{" "}
              for recent orders.
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
