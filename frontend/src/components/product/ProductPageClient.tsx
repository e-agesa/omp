"use client";

import { useState, useEffect } from "react";
import { ProductDetail } from "./ProductDetail";
import type { Product } from "@/types";

const WOO_URL = process.env.NEXT_PUBLIC_WOOCOMMERCE_URL || "http://localhost/wp-json/wc/v3";
const WOO_CK = process.env.NEXT_PUBLIC_WOO_CK || "";
const WOO_CS = process.env.NEXT_PUBLIC_WOO_CS || "";

export function ProductPageClient({ slug: initialSlug }: { slug: string }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Read actual slug from URL path (handles .htaccess rewrite on static hosting)
    const pathParts = window.location.pathname.split("/").filter(Boolean);
    const productIndex = pathParts.indexOf("product");
    const actualSlug = productIndex >= 0 && pathParts[productIndex + 1]
      ? pathParts[productIndex + 1]
      : initialSlug;

    if (actualSlug === "placeholder") {
      setError(true);
      setLoading(false);
      return;
    }

    async function fetchProduct() {
      try {
        const url = `${WOO_URL}/products?slug=${actualSlug}&consumer_key=${WOO_CK}&consumer_secret=${WOO_CS}`;
        const res = await fetch(url);
        const products = await res.json();
        if (products.length > 0) {
          setProduct(products[0]);
          // Update page title
          document.title = `${products[0].name} | Our Mall Pharmacy`;
        } else {
          setError(true);
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [initialSlug]);

  if (loading) {
    return (
      <div className="w-full px-6 py-16">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
          <div className="flex-1 aspect-square bg-omp-gray-light rounded-medical animate-pulse" />
          <div className="flex-1 space-y-4">
            <div className="h-4 bg-omp-gray-light rounded w-1/4 animate-pulse" />
            <div className="h-8 bg-omp-gray-light rounded w-3/4 animate-pulse" />
            <div className="h-6 bg-omp-gray-light rounded w-1/3 animate-pulse" />
            <div className="h-20 bg-omp-gray-light rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="w-full px-6 py-16 text-center">
        <h1 className="text-2xl font-bold text-omp-dark">Product Not Found</h1>
        <p className="text-sm text-omp-gray mt-2">
          The product you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
      </div>
    );
  }

  return <ProductDetail product={product} />;
}
