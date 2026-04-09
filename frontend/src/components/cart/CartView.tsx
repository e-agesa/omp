"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/hooks/useCart";
import { MpesaCheckout } from "@/components/checkout/MpesaCheckout";
import { useState } from "react";

export function CartView() {
  const { cart, removeItem, updateQuantity, itemCount } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);

  if (itemCount === 0) {
    return (
      <div className="text-center py-16">
        <svg className="w-16 h-16 mx-auto text-omp-gray-light mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
        </svg>
        <h2 className="text-lg font-semibold text-omp-dark">Your cart is empty</h2>
        <p className="text-sm text-omp-gray mt-1">Add items from the shop to get started.</p>
        <Link
          href="/shop"
          className="inline-block mt-4 bg-omp-blue text-white font-semibold px-6 py-3 rounded-medical hover:bg-omp-blue-light transition-colors"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Cart items */}
      <div className="flex-1 space-y-3">
        {cart.items.map((item) => (
          <div
            key={item.product.id}
            className="bg-omp-white rounded-medical shadow-card p-4 flex gap-4"
          >
            <div className="w-20 h-20 rounded-medical bg-omp-slate overflow-hidden shrink-0">
              {item.product.images[0] && (
                <Image
                  src={item.product.images[0].src}
                  alt={item.product.name}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-omp-dark truncate">
                {item.product.name}
              </h3>
              <p className="text-sm font-bold text-omp-blue mt-1">
                KES {parseFloat(item.product.price).toLocaleString()}
              </p>

              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  className="w-7 h-7 rounded-full border border-omp-gray-light flex items-center justify-center text-omp-dark hover:bg-omp-slate transition-colors"
                >
                  -
                </button>
                <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  className="w-7 h-7 rounded-full border border-omp-gray-light flex items-center justify-center text-omp-dark hover:bg-omp-slate transition-colors"
                >
                  +
                </button>
                <button
                  onClick={() => removeItem(item.product.id)}
                  className="ml-auto text-xs text-omp-red hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Order summary */}
      <div className="lg:w-80 space-y-4">
        <div className="bg-omp-white rounded-medical shadow-card p-5">
          <h3 className="font-bold text-omp-dark mb-3">Order Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-omp-gray">Subtotal ({itemCount} items)</span>
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
            <div className="flex justify-between">
              <span className="text-omp-gray">VAT (16%)</span>
              <span className="font-medium text-omp-dark">KES {parseFloat(cart.tax).toLocaleString()}</span>
            </div>
            <div className="border-t border-omp-gray-light pt-2 flex justify-between">
              <span className="font-bold text-omp-dark">Total</span>
              <span className="font-bold text-omp-blue text-lg">
                KES {parseFloat(cart.total).toLocaleString()}
              </span>
            </div>
          </div>

          {!showCheckout && (
            <button
              onClick={() => setShowCheckout(true)}
              className="mt-4 w-full bg-mpesa text-white font-bold py-4 rounded-medical hover:bg-mpesa-dark transition-colors"
            >
              Pay with M-Pesa
            </button>
          )}
        </div>

        {showCheckout && (
          <MpesaCheckout
            amount={parseFloat(cart.total)}
            orderId={0}
            onSuccess={(receipt) => {
              console.log("Payment success:", receipt);
            }}
          />
        )}

        {parseFloat(cart.subtotal) < 2000 && (
          <p className="text-xs text-omp-gray text-center">
            Add KES {(2000 - parseFloat(cart.subtotal)).toLocaleString()} more for free delivery!
          </p>
        )}
      </div>
    </div>
  );
}
