import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const image = product.images[0];
  const inStock = product.stock_status === "instock";

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block bg-omp-white rounded-medical overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative aspect-square bg-omp-slate overflow-hidden">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt || product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-omp-gray">
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v13.5A1.5 1.5 0 003.75 21z" />
            </svg>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.on_sale && (
            <span className="bg-omp-red text-white text-[10px] font-bold px-2 py-0.5 rounded-pill">
              SALE
            </span>
          )}
          {inStock && (
            <span className="bg-omp-green text-white text-[10px] font-bold px-2 py-0.5 rounded-pill">
              In Stock
            </span>
          )}
          {!inStock && (
            <span className="bg-omp-gray text-white text-[10px] font-bold px-2 py-0.5 rounded-pill">
              Out of Stock
            </span>
          )}
        </div>

        {/* Genuine badge */}
        <div className="absolute bottom-2 right-2">
          <span className="bg-omp-white/90 backdrop-blur-sm text-omp-green text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
            </svg>
            Genuine
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        {product.categories[0] && (
          <span className="text-[10px] text-omp-gray uppercase tracking-wide">
            {product.categories[0].name}
          </span>
        )}
        <h3 className="text-sm font-medium text-omp-dark mt-0.5 line-clamp-2 leading-snug">
          {product.name}
        </h3>

        {/* Rating */}
        {product.rating_count > 0 && (
          <div className="flex items-center gap-1 mt-1.5">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`w-3 h-3 ${
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
            <span className="text-[10px] text-omp-gray">({product.rating_count})</span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-base font-bold text-omp-blue">
            KES {parseFloat(product.price).toLocaleString()}
          </span>
          {product.on_sale && product.regular_price && (
            <span className="text-xs text-omp-gray line-through">
              KES {parseFloat(product.regular_price).toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
