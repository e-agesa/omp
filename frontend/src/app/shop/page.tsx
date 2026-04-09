import type { Metadata } from "next";
import { Suspense } from "react";
import { ShopContent } from "@/components/shop/ShopContent";

export const metadata: Metadata = {
  title: "Shop",
  description: "Browse medicines, supplements, beauty products and more at OMP Kenya.",
};

function ProductSkeleton() {
  return (
    <div className="bg-omp-white rounded-medical shadow-card overflow-hidden animate-pulse">
      <div className="aspect-square bg-omp-gray-light" />
      <div className="p-3 space-y-2">
        <div className="h-3 bg-omp-gray-light rounded w-1/3" />
        <div className="h-4 bg-omp-gray-light rounded w-3/4" />
        <div className="h-4 bg-omp-gray-light rounded w-1/2" />
      </div>
    </div>
  );
}

function ShopSkeleton() {
  return (
    <div className="w-full px-6 py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="h-8 bg-omp-gray-light rounded w-48 animate-pulse" />
        <div className="h-10 bg-omp-gray-light rounded w-40 animate-pulse" />
      </div>
      <div className="flex gap-6">
        <aside className="hidden lg:block w-64 shrink-0 space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-omp-white rounded-medical shadow-card p-4 animate-pulse space-y-3">
              <div className="h-4 bg-omp-gray-light rounded w-2/3" />
              <div className="h-3 bg-omp-gray-light rounded w-full" />
              <div className="h-3 bg-omp-gray-light rounded w-full" />
              <div className="h-3 bg-omp-gray-light rounded w-3/4" />
            </div>
          ))}
        </aside>
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<ShopSkeleton />}>
      <ShopContent />
    </Suspense>
  );
}
