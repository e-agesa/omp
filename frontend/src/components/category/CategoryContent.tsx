"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";
import type { Product } from "@/types";

// Demo products mapped by category slug
const CATEGORY_PRODUCTS: Record<string, Product[]> = {
  "pain-relief": [
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
      id: 10, name: "Ibuprofen 400mg Tablets", slug: "ibuprofen-400", description: "", short_description: "<p>Anti-inflammatory pain relief for muscle and joint pain.</p>",
      price: "180", regular_price: "180", sale_price: "", on_sale: false, stock_status: "instock", stock_quantity: 120,
      images: [{ id: 10, src: "/placeholder.jpg", name: "Ibuprofen", alt: "Ibuprofen" }],
      categories: [{ id: 1, name: "Pain Relief", slug: "pain-relief", parent: 0 }],
      tags: [{ id: 10, name: "Muscle Pain", slug: "muscle-pain" }], attributes: [],
      average_rating: "4.3", rating_count: 87, sku: "IBU-400", weight: "0.05",
      dimensions: { length: "4", width: "2", height: "2" },
    },
    {
      id: 11, name: "Diclofenac Gel 50g", slug: "diclofenac-gel", description: "", short_description: "<p>Topical anti-inflammatory for joint and muscle relief.</p>",
      price: "650", regular_price: "650", sale_price: "", on_sale: false, stock_status: "instock", stock_quantity: 40,
      images: [{ id: 11, src: "/placeholder.jpg", name: "Diclofenac", alt: "Diclofenac Gel" }],
      categories: [{ id: 1, name: "Pain Relief", slug: "pain-relief", parent: 0 }],
      tags: [{ id: 11, name: "Joint Pain", slug: "joint-pain" }], attributes: [],
      average_rating: "4.6", rating_count: 54, sku: "DCL-50G", weight: "0.06",
      dimensions: { length: "5", width: "3", height: "3" },
    },
  ],
  supplements: [
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
      id: 8, name: "Omega-3 Fish Oil 1000mg", slug: "omega-3-fish-oil", description: "", short_description: "<p>Heart & brain health supplement. 90 soft gels.</p>",
      price: "1650", regular_price: "1650", sale_price: "", on_sale: false, stock_status: "instock", stock_quantity: 150,
      images: [{ id: 8, src: "/placeholder.jpg", name: "Omega-3", alt: "Omega-3 Fish Oil" }],
      categories: [{ id: 2, name: "Supplements", slug: "supplements", parent: 0 }],
      tags: [{ id: 8, name: "Heart Health", slug: "heart-health" }], attributes: [],
      average_rating: "4.3", rating_count: 98, sku: "OMG-1000", weight: "0.2",
      dimensions: { length: "7", width: "4", height: "10" },
    },
    {
      id: 12, name: "Vitamin D3 5000 IU", slug: "vitamin-d3-5000", description: "", short_description: "<p>Essential for bone health and immune support.</p>",
      price: "1200", regular_price: "1200", sale_price: "", on_sale: false, stock_status: "instock", stock_quantity: 90,
      images: [{ id: 12, src: "/placeholder.jpg", name: "Vitamin D3", alt: "Vitamin D3" }],
      categories: [{ id: 2, name: "Supplements", slug: "supplements", parent: 0 }],
      tags: [{ id: 12, name: "Bone Health", slug: "bone-health" }], attributes: [],
      average_rating: "4.7", rating_count: 134, sku: "VIT-D5000", weight: "0.08",
      dimensions: { length: "5", width: "3", height: "8" },
    },
  ],
  beauty: [
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
      id: 7, name: "La Roche-Posay Effaclar Duo+", slug: "lrp-effaclar", description: "", short_description: "<p>Anti-blemish corrective gel for oily skin.</p>",
      price: "4500", regular_price: "5200", sale_price: "4500", on_sale: true, stock_status: "instock", stock_quantity: 20,
      images: [{ id: 7, src: "/placeholder.jpg", name: "Effaclar", alt: "La Roche-Posay" }],
      categories: [{ id: 3, name: "Beauty & Skincare", slug: "beauty", parent: 0 }],
      tags: [{ id: 7, name: "Acne", slug: "acne" }], attributes: [],
      average_rating: "4.7", rating_count: 143, sku: "LRP-ED", weight: "0.08",
      dimensions: { length: "6", width: "3", height: "3" },
    },
    {
      id: 13, name: "Nivea Soft Moisturizing Cream 200ml", slug: "nivea-soft-200", description: "", short_description: "<p>Refreshingly soft moisturizing cream for face and body.</p>",
      price: "850", regular_price: "850", sale_price: "", on_sale: false, stock_status: "instock", stock_quantity: 65,
      images: [{ id: 13, src: "/placeholder.jpg", name: "Nivea", alt: "Nivea Soft" }],
      categories: [{ id: 3, name: "Beauty & Skincare", slug: "beauty", parent: 0 }],
      tags: [{ id: 13, name: "Moisturizer", slug: "moisturizer" }], attributes: [],
      average_rating: "4.4", rating_count: 201, sku: "NIV-200", weight: "0.25",
      dimensions: { length: "7", width: "7", height: "5" },
    },
  ],
  "mother-baby": [
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
      id: 14, name: "Johnson's Baby Lotion 500ml", slug: "johnsons-baby-lotion", description: "", short_description: "<p>Gentle daily moisturizer for baby's delicate skin.</p>",
      price: "950", regular_price: "950", sale_price: "", on_sale: false, stock_status: "instock", stock_quantity: 80,
      images: [{ id: 14, src: "/placeholder.jpg", name: "Johnson's", alt: "Johnson's Baby Lotion" }],
      categories: [{ id: 5, name: "Mother & Baby", slug: "mother-baby", parent: 0 }],
      tags: [{ id: 14, name: "Baby Skin", slug: "baby-skin" }], attributes: [],
      average_rating: "4.5", rating_count: 178, sku: "JBL-500", weight: "0.55",
      dimensions: { length: "8", width: "5", height: "18" },
    },
  ],
  "chronic-care": [
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
      id: 15, name: "Digital Blood Pressure Monitor", slug: "bp-monitor-digital", description: "", short_description: "<p>Automatic upper arm BP monitor with memory function.</p>",
      price: "4800", regular_price: "5500", sale_price: "4800", on_sale: true, stock_status: "instock", stock_quantity: 25,
      images: [{ id: 15, src: "/placeholder.jpg", name: "BP Monitor", alt: "Blood Pressure Monitor" }],
      categories: [{ id: 6, name: "Chronic Care", slug: "chronic-care", parent: 0 }],
      tags: [{ id: 15, name: "Hypertension", slug: "hypertension" }], attributes: [],
      average_rating: "4.6", rating_count: 89, sku: "BPM-DIG", weight: "0.4",
      dimensions: { length: "12", width: "10", height: "8" },
    },
  ],
};

// Fallback products for categories without specific demo data
const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 100, name: "Coming Soon", slug: "coming-soon", description: "", short_description: "<p>New products arriving soon in this category.</p>",
    price: "0", regular_price: "0", sale_price: "", on_sale: false, stock_status: "instock", stock_quantity: 0,
    images: [{ id: 100, src: "/placeholder.jpg", name: "Coming Soon", alt: "Coming Soon" }],
    categories: [], tags: [], attributes: [],
    average_rating: "0", rating_count: 0, sku: "", weight: "0",
    dimensions: { length: "0", width: "0", height: "0" },
  },
];

type SortOption = "featured" | "price-asc" | "price-desc" | "rating";

interface CategoryContentProps {
  slug: string;
  title: string;
}

export function CategoryContent({ slug, title }: CategoryContentProps) {
  const baseProducts = CATEGORY_PRODUCTS[slug] || FALLBACK_PRODUCTS;
  const [products, setProducts] = useState<Product[]>(baseProducts);
  const [sort, setSort] = useState<SortOption>("featured");

  useEffect(() => {
    const sorted = [...baseProducts];
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
    }
    setProducts(sorted);
  }, [sort, baseProducts]);

  return (
    <div className="w-full px-6 py-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-omp-gray mb-4 flex items-center gap-1.5">
        <Link href="/" className="hover:text-omp-blue">Home</Link>
        <span>/</span>
        <Link href="/categories" className="hover:text-omp-blue">Categories</Link>
        <span>/</span>
        <span className="text-omp-dark font-medium">{title}</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
        <div>
          <h1 className="text-2xl font-bold text-omp-dark">{title}</h1>
          <p className="text-sm text-omp-gray mt-1">{products.length} products</p>
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          className="text-sm border border-omp-gray-light rounded-medical px-4 py-2.5 bg-omp-white focus:outline-none focus:ring-2 focus:ring-omp-blue"
        >
          <option value="featured">Sort by: Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      {/* Product grid */}
      {products[0]?.id !== 100 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product, i) => (
            <div
              key={product.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <svg className="w-16 h-16 mx-auto text-omp-gray-light mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
          </svg>
          <h2 className="text-lg font-semibold text-omp-dark">Products coming soon</h2>
          <p className="text-sm text-omp-gray mt-1">
            We&apos;re adding new products to this category. Check back soon!
          </p>
          <Link
            href="/shop"
            className="inline-block mt-4 bg-omp-blue text-white font-semibold px-6 py-3 rounded-medical hover:bg-omp-blue-light transition-colors"
          >
            Browse All Products
          </Link>
        </div>
      )}

      {/* Browse more categories */}
      <div className="mt-10 text-center">
        <Link
          href="/categories"
          className="text-sm text-omp-blue font-medium hover:underline"
        >
          &larr; Browse All Categories
        </Link>
      </div>
    </div>
  );
}
