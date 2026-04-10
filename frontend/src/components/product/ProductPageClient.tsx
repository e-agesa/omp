"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import type { Product } from "@/types";
import productsData from "@/data/products.json";

interface LocalProduct {
  id: number;
  name: string;
  slug: string;
  price: number;
  regular_price: number;
  category: string;
  category_name: string;
  in_stock: boolean;
  stock_quantity: number;
  sku: string;
  image?: string;
}

export function ProductPageClient({ slug: initialSlug }: { slug: string }) {
  const [product, setProduct] = useState<LocalProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    // Read actual slug from URL path (handles .htaccess rewrite on static hosting)
    const pathParts = window.location.pathname.split("/").filter(Boolean);
    const productIndex = pathParts.indexOf("product");
    const actualSlug = productIndex >= 0 && pathParts[productIndex + 1]
      ? pathParts[productIndex + 1]
      : initialSlug;

    // Find product in local data
    const allProducts = productsData as LocalProduct[];
    const found = allProducts.find((p) => p.slug === actualSlug);

    if (found) {
      setProduct(found);
      document.title = `${found.name} | Our Mall Pharmacy`;
    }

    setLoading(false);
  }, [initialSlug]);

  const handleAddToCart = () => {
    if (!product) return;
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
      stock_quantity: product.stock_quantity,
      images: product.image ? [{ id: 0, src: product.image, name: product.name, alt: product.name }] : [],
      categories: [{ id: 0, name: product.category_name, slug: product.category, parent: 0 }],
      tags: [],
      attributes: [],
      average_rating: "0",
      rating_count: 0,
      sku: product.sku,
      weight: "",
      dimensions: { length: "", width: "", height: "" },
    };
    addItem(cartProduct, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) {
    return (
      <div className="w-full px-6 py-16">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-8">
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

  if (!product) {
    return (
      <div className="w-full px-6 py-16 text-center">
        <h1 className="text-2xl font-bold text-omp-dark">Product Not Found</h1>
        <p className="text-sm text-omp-gray mt-2">
          The product you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <Link href="/shop/" className="inline-block mt-4 text-sm text-omp-blue font-medium hover:underline">
          Browse all products
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full px-6 py-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-omp-gray mb-6 flex items-center gap-1 max-w-5xl mx-auto">
        <Link href="/" className="hover:text-omp-blue transition-colors">Home</Link>
        <span>/</span>
        <Link href="/shop/" className="hover:text-omp-blue transition-colors">Shop</Link>
        <span>/</span>
        <Link href={`/category/${product.category}/`} className="hover:text-omp-blue transition-colors">
          {product.category_name}
        </Link>
        <span>/</span>
        <span className="text-omp-dark font-medium truncate max-w-[200px]">{product.name}</span>
      </nav>

      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Product Image */}
        <div className="flex-1">
          <div className="aspect-square bg-white rounded-medical shadow-card overflow-hidden flex items-center justify-center">
            {product.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain p-6"
              />
            ) : (
              <div className="text-center p-8">
                <svg className="w-24 h-24 mx-auto text-omp-gray-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                </svg>
                <p className="text-sm text-omp-gray mt-2">Product image</p>
              </div>
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1">
          {/* Category */}
          <Link
            href={`/category/${product.category}/`}
            className="text-xs text-omp-blue font-medium uppercase tracking-wider hover:underline"
          >
            {product.category_name}
          </Link>

          {/* Name */}
          <h1 className="text-2xl lg:text-3xl font-bold text-omp-dark mt-2">
            {product.name}
          </h1>

          {/* SKU */}
          {product.sku && (
            <p className="text-xs text-omp-gray mt-1">SKU: {product.sku}</p>
          )}

          {/* Price */}
          <div className="mt-4">
            <span className="text-3xl font-bold text-omp-blue">
              KES {product.price.toLocaleString()}
            </span>
            <p className="text-xs text-omp-gray mt-1">Inclusive of VAT</p>
          </div>

          {/* Stock */}
          <div className="mt-4">
            {product.in_stock ? (
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-omp-green" />
                <span className="text-sm text-omp-green font-medium">In Stock</span>
                {product.stock_quantity > 0 && (
                  <span className="text-xs text-omp-gray">({product.stock_quantity} available)</span>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-omp-red" />
                <span className="text-sm text-omp-red font-medium">Out of Stock</span>
              </div>
            )}
          </div>

          {/* Genuine badge */}
          <div className="mt-4 inline-flex items-center gap-1.5 bg-omp-green/10 text-omp-green px-3 py-1.5 rounded-medical text-sm font-medium">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
            </svg>
            100% Genuine Product
          </div>

          {/* Add to Cart */}
          {product.in_stock && (
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3">
                <label className="text-sm text-omp-gray">Qty:</label>
                <div className="flex items-center border border-omp-gray-light rounded-medical overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-2 text-omp-gray hover:bg-omp-slate transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-sm font-medium text-omp-dark min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-2 text-omp-gray hover:bg-omp-slate transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className={`w-full py-3.5 rounded-medical font-semibold text-white transition-all ${
                  added
                    ? "bg-omp-green"
                    : "bg-omp-blue hover:bg-omp-blue-light"
                }`}
              >
                {added ? "Added to Cart!" : `Add to Cart — KES ${(product.price * quantity).toLocaleString()}`}
              </button>
            </div>
          )}

          {/* Delivery info */}
          <div className="mt-6 space-y-2 border-t border-omp-gray-light pt-4">
            <div className="flex items-center gap-2 text-sm text-omp-gray">
              <svg className="w-4 h-4 text-omp-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H18.75m-7.5-3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              Same-day delivery in Nairobi
            </div>
            <div className="flex items-center gap-2 text-sm text-omp-gray">
              <svg className="w-4 h-4 text-omp-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              PPB Certified — Pharmacy Board Verified
            </div>
            <div className="flex items-center gap-2 text-sm text-omp-gray">
              <svg className="w-4 h-4 text-omp-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
              </svg>
              Free delivery for orders over KES 2,000
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
