"use client";

import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { ProductImage } from "@/components/ui/ProductImage";
import type { Product } from "@/types";

interface SimpleProduct {
  id: number;
  name: string;
  slug: string;
  price: number;
  category: string;
  category_name: string;
  in_stock: boolean;
  image?: string;
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
      {/* Product image area */}
      <div className={`relative aspect-square ${product.image ? "bg-white" : colorClass} flex items-center justify-center overflow-hidden`}>
        <ProductImage
          src={product.image || ""}
          alt={product.name}
          className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
          fallbackClass={`w-full h-full ${colorClass}`}
        />

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

        {/* WhatsApp Order Button */}
        <div className="mt-2">
          <a
            href={`https://wa.me/254700000000?text=${encodeURIComponent(`Hi, I'd like to order: ${product.name}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 w-full py-2 rounded-medical bg-whatsapp text-white text-xs font-semibold hover:brightness-110 transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.75.75 0 00.917.918l4.462-1.494A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.327 0-4.542-.683-6.442-1.906l-.458-.303-2.75.92.922-2.748-.314-.468A9.96 9.96 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
            </svg>
            Inquire Now
          </a>
        </div>
      </div>
    </div>
  );
}
