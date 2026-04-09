"use client";

import { useState, useEffect } from "react";
import { ProductCard } from "@/components/product/ProductCard";
import { FacetedSidebar } from "@/components/product/FacetedSidebar";
import type { Product, ProductCategory } from "@/types";

// Demo products for when WooCommerce isn't connected yet
const DEMO_PRODUCTS: Product[] = [
  {
    id: 1, name: "Panadol Extra 500mg", slug: "panadol-extra", description: "", short_description: "<p>Fast relief from headaches, toothaches, and fever.</p>",
    price: "250", regular_price: "350", sale_price: "250", on_sale: true, stock_status: "instock", stock_quantity: 50,
    images: [{ id: 1, src: "/placeholder.jpg", name: "Panadol", alt: "Panadol Extra" }],
    categories: [{ id: 1, name: "Pain Relief", slug: "pain-relief", parent: 0 }],
    tags: [{ id: 1, name: "Headache", slug: "headache" }], attributes: [],
    average_rating: "4.5", rating_count: 128, sku: "PAN-500", weight: "0.1",
    dimensions: { length: "5", width: "3", height: "2" },
  },
  {
    id: 2, name: "Vitamin C 1000mg - Effervescent", slug: "vitamin-c-1000", description: "", short_description: "<p>Boost your immunity with daily Vitamin C.</p>",
    price: "750", regular_price: "750", sale_price: "", on_sale: false, stock_status: "instock", stock_quantity: 200,
    images: [{ id: 2, src: "/placeholder.jpg", name: "Vitamin C", alt: "Vitamin C" }],
    categories: [{ id: 2, name: "Supplements", slug: "supplements", parent: 0 }],
    tags: [{ id: 2, name: "Immunity", slug: "immunity" }], attributes: [],
    average_rating: "4.8", rating_count: 256, sku: "VIT-C1000", weight: "0.15",
    dimensions: { length: "6", width: "3", height: "3" },
  },
  {
    id: 3, name: "CeraVe Moisturizing Cream 340g", slug: "cerave-moisturizing", description: "", short_description: "<p>Develops & restores the skin barrier with ceramides.</p>",
    price: "3200", regular_price: "3200", sale_price: "", on_sale: false, stock_status: "instock", stock_quantity: 35,
    images: [{ id: 3, src: "/placeholder.jpg", name: "CeraVe", alt: "CeraVe Cream" }],
    categories: [{ id: 3, name: "Beauty & Skincare", slug: "beauty", parent: 0 }],
    tags: [{ id: 3, name: "Skin Care", slug: "skin-care" }], attributes: [],
    average_rating: "4.9", rating_count: 89, sku: "CRV-340", weight: "0.4",
    dimensions: { length: "8", width: "8", height: "10" },
  },
  {
    id: 4, name: "Amoxicillin 500mg Capsules", slug: "amoxicillin-500", description: "", short_description: "<p>Broad-spectrum antibiotic. Prescription required.</p>",
    price: "450", regular_price: "450", sale_price: "", on_sale: false, stock_status: "instock", stock_quantity: 100,
    images: [{ id: 4, src: "/placeholder.jpg", name: "Amoxicillin", alt: "Amoxicillin" }],
    categories: [{ id: 4, name: "Prescription", slug: "prescription", parent: 0 }],
    tags: [{ id: 4, name: "Antibiotic", slug: "antibiotic" }], attributes: [],
    average_rating: "4.2", rating_count: 45, sku: "AMX-500", weight: "0.05",
    dimensions: { length: "4", width: "2", height: "2" },
  },
  {
    id: 5, name: "Huggies Diapers - Size 3 (58 Pack)", slug: "huggies-size-3", description: "", short_description: "<p>Soft & absorbent diapers for active babies.</p>",
    price: "1800", regular_price: "2100", sale_price: "1800", on_sale: true, stock_status: "instock", stock_quantity: 75,
    images: [{ id: 5, src: "/placeholder.jpg", name: "Huggies", alt: "Huggies Diapers" }],
    categories: [{ id: 5, name: "Mother & Baby", slug: "mother-baby", parent: 0 }],
    tags: [{ id: 5, name: "Baby Care", slug: "baby-care" }], attributes: [],
    average_rating: "4.6", rating_count: 312, sku: "HUG-S3-58", weight: "2.0",
    dimensions: { length: "30", width: "20", height: "15" },
  },
  {
    id: 6, name: "Glucometer Test Strips (50s)", slug: "glucometer-strips", description: "", short_description: "<p>Accurate blood sugar monitoring strips.</p>",
    price: "2500", regular_price: "2500", sale_price: "", on_sale: false, stock_status: "instock", stock_quantity: 60,
    images: [{ id: 6, src: "/placeholder.jpg", name: "Test Strips", alt: "Glucometer Strips" }],
    categories: [{ id: 6, name: "Chronic Care", slug: "chronic-care", parent: 0 }],
    tags: [{ id: 6, name: "Diabetes", slug: "diabetes" }], attributes: [],
    average_rating: "4.4", rating_count: 67, sku: "GLU-TS50", weight: "0.1",
    dimensions: { length: "8", width: "5", height: "3" },
  },
  {
    id: 7, name: "La Roche-Posay Effaclar Duo+", slug: "lrp-effaclar", description: "", short_description: "<p>Anti-blemish corrective gel for oily skin.</p>",
    price: "4500", regular_price: "5200", sale_price: "4500", on_sale: true, stock_status: "instock", stock_quantity: 20,
    images: [{ id: 7, src: "/placeholder.jpg", name: "Effaclar", alt: "La Roche-Posay" }],
    categories: [{ id: 3, name: "Beauty & Skincare", slug: "beauty", parent: 0 }],
    tags: [{ id: 7, name: "Acne", slug: "acne" }], attributes: [],
    average_rating: "4.7", rating_count: 143, sku: "LRP-ED", weight: "0.08",
    dimensions: { length: "6", width: "3", height: "3" },
  },
  {
    id: 8, name: "Omega-3 Fish Oil 1000mg", slug: "omega-3-fish-oil", description: "", short_description: "<p>Heart & brain health supplement. 90 soft gels.</p>",
    price: "1650", regular_price: "1650", sale_price: "", on_sale: false, stock_status: "instock", stock_quantity: 150,
    images: [{ id: 8, src: "/placeholder.jpg", name: "Omega-3", alt: "Omega-3 Fish Oil" }],
    categories: [{ id: 2, name: "Supplements", slug: "supplements", parent: 0 }],
    tags: [{ id: 8, name: "Heart Health", slug: "heart-health" }], attributes: [],
    average_rating: "4.3", rating_count: 98, sku: "OMG-1000", weight: "0.2",
    dimensions: { length: "7", width: "4", height: "10" },
  },
];

const DEMO_CATEGORIES: ProductCategory[] = [
  { id: 1, name: "Pain Relief", slug: "pain-relief", parent: 0, count: 24 },
  { id: 2, name: "Supplements", slug: "supplements", parent: 0, count: 56 },
  { id: 3, name: "Beauty & Skincare", slug: "beauty", parent: 0, count: 38 },
  { id: 4, name: "Prescription", slug: "prescription", parent: 0, count: 15 },
  { id: 5, name: "Mother & Baby", slug: "mother-baby", parent: 0, count: 42 },
  { id: 6, name: "Chronic Care", slug: "chronic-care", parent: 0, count: 19 },
  { id: 7, name: "First Aid", slug: "first-aid", parent: 0, count: 31 },
  { id: 8, name: "Cold & Flu", slug: "cold-flu", parent: 0, count: 22 },
];

type SortOption = "featured" | "price-asc" | "price-desc" | "newest" | "rating";

export function ShopContent() {
  const [products, setProducts] = useState<Product[]>(DEMO_PRODUCTS);
  const [sort, setSort] = useState<SortOption>("featured");
  const [view, setView] = useState<"grid" | "list">("grid");

  useEffect(() => {
    const sorted = [...DEMO_PRODUCTS];
    switch (sort) {
      case "price-asc":
        sorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case "price-desc":
        sorted.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case "rating":
        sorted.sort((a, b) => parseFloat(b.average_rating) - parseFloat(a.average_rating));
        break;
      case "newest":
        sorted.reverse();
        break;
    }
    setProducts(sorted);
  }, [sort]);

  return (
    <div className="w-full px-6 py-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-omp-dark">Shop All Products</h1>
          <p className="text-sm text-omp-gray mt-1">{products.length} products available</p>
        </div>
        <div className="flex items-center gap-3">
          {/* View toggle */}
          <div className="hidden sm:flex items-center border border-omp-gray-light rounded-medical overflow-hidden">
            <button
              onClick={() => setView("grid")}
              className={`p-2 ${view === "grid" ? "bg-omp-blue text-white" : "text-omp-gray hover:bg-omp-slate"} transition-colors`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                <path d="M1 2.5A1.5 1.5 0 012.5 1h3A1.5 1.5 0 017 2.5v3A1.5 1.5 0 015.5 7h-3A1.5 1.5 0 011 5.5v-3zm8 0A1.5 1.5 0 0110.5 1h3A1.5 1.5 0 0115 2.5v3A1.5 1.5 0 0113.5 7h-3A1.5 1.5 0 019 5.5v-3zm-8 8A1.5 1.5 0 012.5 9h3A1.5 1.5 0 017 10.5v3A1.5 1.5 0 015.5 15h-3A1.5 1.5 0 011 13.5v-3zm8 0A1.5 1.5 0 0110.5 9h3a1.5 1.5 0 011.5 1.5v3a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 019 13.5v-3z" />
              </svg>
            </button>
            <button
              onClick={() => setView("list")}
              className={`p-2 ${view === "list" ? "bg-omp-blue text-white" : "text-omp-gray hover:bg-omp-slate"} transition-colors`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M2.5 12a.5.5 0 01.5-.5h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5zm0-4a.5.5 0 01.5-.5h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5zm0-4a.5.5 0 01.5-.5h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5z" />
              </svg>
            </button>
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="text-sm border border-omp-gray-light rounded-medical px-4 py-2.5 bg-omp-white focus:outline-none focus:ring-2 focus:ring-omp-blue"
          >
            <option value="featured">Sort by: Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="newest">Newest First</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <FacetedSidebar
          categories={DEMO_CATEGORIES}
          onFilterChange={() => {
            // Will connect to WooCommerce filtering
          }}
        />

        {/* Product Grid */}
        <div className="flex-1">
          <div
            className={
              view === "grid"
                ? "grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4"
                : "space-y-4"
            }
          >
            {products.map((product, i) => (
              <div
                key={product.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* Load more */}
          <div className="mt-8 text-center">
            <button className="bg-omp-blue text-white font-semibold px-8 py-3 rounded-medical hover:bg-omp-blue-light transition-colors">
              Load More Products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
