"use client";

import { useState, useCallback } from "react";
import type { Cart, CartItem, Product } from "@/types";

const CART_KEY = "omp_cart";

function loadCart(): Cart {
  if (typeof window === "undefined") {
    return { items: [], total: "0", subtotal: "0", shipping: "0", tax: "0" };
  }
  try {
    const stored = localStorage.getItem(CART_KEY);
    return stored ? JSON.parse(stored) : { items: [], total: "0", subtotal: "0", shipping: "0", tax: "0" };
  } catch {
    return { items: [], total: "0", subtotal: "0", shipping: "0", tax: "0" };
  }
}

function calcTotals(items: CartItem[]): Cart {
  const subtotal = items.reduce(
    (sum, item) => sum + parseFloat(item.product.price) * item.quantity,
    0
  );
  const shipping = subtotal > 2000 ? 0 : 200; // Free delivery over KES 2,000
  const tax = subtotal * 0.16; // 16% VAT
  const total = subtotal + shipping + tax;

  return {
    items,
    subtotal: subtotal.toFixed(2),
    shipping: shipping.toFixed(2),
    tax: tax.toFixed(2),
    total: total.toFixed(2),
  };
}

function persist(cart: Cart) {
  if (typeof window !== "undefined") {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }
}

export function useCart() {
  const [cart, setCart] = useState<Cart>(loadCart);

  const addItem = useCallback((product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.items.find((i) => i.product.id === product.id);
      let items: CartItem[];

      if (existing) {
        items = prev.items.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      } else {
        items = [...prev.items, { id: Date.now(), product, quantity }];
      }

      const updated = calcTotals(items);
      persist(updated);
      return updated;
    });
  }, []);

  const removeItem = useCallback((productId: number) => {
    setCart((prev) => {
      const items = prev.items.filter((i) => i.product.id !== productId);
      const updated = calcTotals(items);
      persist(updated);
      return updated;
    });
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    setCart((prev) => {
      const items = quantity <= 0
        ? prev.items.filter((i) => i.product.id !== productId)
        : prev.items.map((i) =>
            i.product.id === productId ? { ...i, quantity } : i
          );
      const updated = calcTotals(items);
      persist(updated);
      return updated;
    });
  }, []);

  const clearCart = useCallback(() => {
    const empty = calcTotals([]);
    persist(empty);
    setCart(empty);
  }, []);

  const itemCount = cart.items.reduce((sum, i) => sum + i.quantity, 0);

  return { cart, addItem, removeItem, updateQuantity, clearCart, itemCount };
}
