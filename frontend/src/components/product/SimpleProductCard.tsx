"use client";

import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import type { Product } from "@/types";

interface SimpleProduct {
  id: number;
  name: string;
  slug: string;
  price: number;
  category: string;
  category_name: string;
  in_stock: boolean;
}

// Category → color map for the placeholder icon background
const CAT_COLORS: Record<string, string> = {
  medicines: "bg-blue-100 text-blue-600",
  "pain-relief": "bg-red-100 text-red-600",
  supplements: "bg-green-100 text-green-600",
  beauty: "bg-pink-100 text-pink-600",
  "mother-baby": "bg-rose-100 text-rose-500",
  "chronic-care": "bg-indigo-100 text-indigo-600",
  "first-aid": "bg-amber-100 text-amber-600",
  "cold-flu": "bg-sky-100 text-sky-600",
  "sexual-health": "bg-purple-100 text-purple-600",
  "digestive-health": "bg-emerald-100 text-emerald-600",
  "eye-ear-care": "bg-cyan-100 text-cyan-600",
  "oral-care": "bg-teal-100 text-teal-600",
  "medical-devices": "bg-slate-100 text-slate-600",
  orthopaedic: "bg-orange-100 text-orange-600",
  incontinence: "bg-violet-100 text-violet-600",
  general: "bg-gray-100 text-gray-600",
};

export function SimpleProductCard({ product }: { product: SimpleProduct }) {
  const colorClass = CAT_COLORS[product.category] || CAT_COLORS.general;
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const cartProduct: Product = {
      id: product.id,
      name: product.name,
      slug: product.slug,
      description: "",
      short_description: "",
      price: String(product.price),
      regular_price: String(product.price),
      sale_price: "",
      on_sale: false,
      stock_status: product.in_stock ? "instock" : "outofstock",
      stock_quantity: 0,
      images: [],
      categories: [{ id: 0, name: product.category_name, slug: product.category, parent: 0 }],
      tags: [],
      attributes: [],
      average_rating: "0",
      rating_count: 0,
      sku: "",
      weight: "",
      dimensions: { length: "", width: "", height: "" },
    };
    addItem(cartProduct);
  };

  return (
    <div className="group bg-omp-white rounded-medical overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
      {/* Product icon area */}
      <div className={`relative aspect-square ${colorClass} flex items-center justify-center p-4`}>
        <svg className="w-16 h-16 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
        </svg>

        {/* Stock badge */}
        <div className="absolute top-2 left-2">
          {product.in_stock ? (
            <span className="bg-omp-green text-white text-[10px] font-bold px-2 py-0.5 rounded-pill">
              In Stock
            </span>
          ) : (
            <span className="bg-omp-gray text-white text-[10px] font-bold px-2 py-0.5 rounded-pill">
              Out of Stock
            </span>
          )}
        </div>

        {/* Genuine badge */}
        <div className="absolute bottom-2 right-2">
          <span className="bg-white/90 text-omp-green text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
            </svg>
            Genuine
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <span className="text-[10px] text-omp-gray uppercase tracking-wide">
          {product.category_name}
        </span>
        <Link href={`/product/${product.slug}/`}>
          <h3 className="text-sm font-medium text-omp-dark mt-0.5 line-clamp-2 leading-snug hover:text-omp-blue transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Price & Add to Cart */}
        <div className="flex items-center justify-between mt-2">
          <span className="text-base font-bold text-omp-blue">
            KES {product.price.toLocaleString()}
          </span>
          {product.in_stock && (
            <button
              onClick={handleAddToCart}
              className="p-1.5 rounded-medical bg-omp-blue/10 text-omp-blue hover:bg-omp-blue hover:text-white transition-colors"
              aria-label="Add to cart"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
