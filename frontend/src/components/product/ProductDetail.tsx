"use client";

import { useState } from "react";
import Image from "next/image";
import type { Product } from "@/types";
import { useCart } from "@/hooks/useCart";

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const inStock = product.stock_status === "instock";
  const image = product.images[selectedImage];

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="w-full px-6 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Image gallery */}
        <div className="lg:w-1/2">
          <div className="relative aspect-square bg-omp-white rounded-medical overflow-hidden shadow-card">
            {image ? (
              <Image
                src={image.src}
                alt={image.alt || product.name}
                fill
                className="object-contain p-4"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="flex items-center justify-center h-full text-omp-gray">
                No image available
              </div>
            )}

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1">
              {product.on_sale && (
                <span className="bg-omp-red text-white text-xs font-bold px-2.5 py-1 rounded-pill">
                  SALE
                </span>
              )}
              {inStock && (
                <span className="bg-omp-green text-white text-xs font-bold px-2.5 py-1 rounded-pill">
                  In Stock
                </span>
              )}
            </div>
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2 mt-3 overflow-x-auto">
              {product.images.map((img, i) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImage(i)}
                  className={`w-16 h-16 rounded-medical overflow-hidden border-2 transition-colors shrink-0 ${
                    i === selectedImage ? "border-omp-blue" : "border-transparent"
                  }`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt || ""}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product info */}
        <div className="lg:w-1/2">
          {product.categories[0] && (
            <span className="text-xs text-omp-gray uppercase tracking-wide">
              {product.categories[0].name}
            </span>
          )}

          <h1 className="text-2xl font-bold text-omp-dark mt-1">{product.name}</h1>

          {/* Rating */}
          {product.rating_count > 0 && (
            <div className="flex items-center gap-2 mt-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-4 h-4 ${
                      star <= Math.round(parseFloat(product.average_rating))
                        ? "text-amber-400"
                        : "text-omp-gray-light"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-omp-gray">
                {product.average_rating} ({product.rating_count} reviews)
              </span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-3 mt-4">
            <span className="text-3xl font-bold text-omp-blue">
              KES {parseFloat(product.price).toLocaleString()}
            </span>
            {product.on_sale && product.regular_price && (
              <span className="text-lg text-omp-gray line-through">
                KES {parseFloat(product.regular_price).toLocaleString()}
              </span>
            )}
          </div>

          {/* SKU */}
          {product.sku && (
            <p className="text-xs text-omp-gray mt-2">SKU: {product.sku}</p>
          )}

          {/* Description */}
          <div
            className="mt-4 text-sm text-omp-gray leading-relaxed prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: product.short_description }}
          />

          {/* Quantity + Add to Cart */}
          {inStock ? (
            <div className="mt-6 flex items-center gap-3">
              <div className="flex items-center border border-omp-gray-light rounded-medical overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-omp-slate transition-colors"
                >
                  -
                </button>
                <span className="w-12 text-center text-sm font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-omp-slate transition-colors"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className={`flex-1 font-bold py-3 rounded-medical transition-all ${
                  added
                    ? "bg-omp-green text-white"
                    : "bg-omp-blue text-white hover:bg-omp-blue-light"
                }`}
              >
                {added ? "Added to Cart!" : "Add to Cart"}
              </button>
            </div>
          ) : (
            <div className="mt-6 bg-omp-gray-light text-omp-gray font-medium py-3 rounded-medical text-center">
              Out of Stock
            </div>
          )}

          {/* Genuine Product badge */}
          <div className="mt-4 flex items-center gap-2 bg-omp-green/5 border border-omp-green/20 rounded-medical p-3">
            <svg className="w-5 h-5 text-omp-green shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
            </svg>
            <div>
              <p className="text-xs font-semibold text-omp-green">Genuine Product Guaranteed</p>
              <p className="text-[10px] text-omp-gray">Verified by Pharmacy & Poisons Board of Kenya</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
