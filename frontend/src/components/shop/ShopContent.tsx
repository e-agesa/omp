"use client";

import { useState, useMemo } from "react";
import { SimpleProductCard } from "@/components/product/SimpleProductCard";
import productsData from "@/data/products.json";
import categoriesData from "@/data/categories.json";

type SortOption = "name" | "price-asc" | "price-desc";
const PAGE_SIZE = 24;

interface ProductItem {
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
}

export function ShopContent() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sort, setSort] = useState<SortOption>("name");
  const [page, setPage] = useState(1);
  const [stockOnly, setStockOnly] = useState(false);

  const allProducts = productsData as ProductItem[];
  const categories = categoriesData as { name: string; slug: string; count: number }[];

  const filtered = useMemo(() => {
    let items = [...allProducts];

    // Search
    if (search) {
      const q = search.toLowerCase();
      items = items.filter((p) => p.name.toLowerCase().includes(q));
    }

    // Category
    if (selectedCategory) {
      items = items.filter((p) => p.category === selectedCategory);
    }

    // In stock only
    if (stockOnly) {
      items = items.filter((p) => p.in_stock);
    }

    // Sort
    switch (sort) {
      case "price-asc":
        items.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        items.sort((a, b) => b.price - a.price);
        break;
      default:
        items.sort((a, b) => a.name.localeCompare(b.name));
    }

    return items;
  }, [allProducts, search, selectedCategory, sort, stockOnly]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice(0, page * PAGE_SIZE);

  return (
    <div className="w-full px-6 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-omp-dark">Shop All Products</h1>
          <p className="text-sm text-omp-gray mt-1">{filtered.length} products found</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          {/* Search */}
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-omp-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="pl-9 pr-4 py-2.5 text-sm border border-omp-gray-light rounded-medical bg-omp-white focus:outline-none focus:ring-2 focus:ring-omp-blue w-48 sm:w-64"
            />
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="text-sm border border-omp-gray-light rounded-medical px-4 py-2.5 bg-omp-white focus:outline-none focus:ring-2 focus:ring-omp-blue"
          >
            <option value="name">Sort: A-Z</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <aside className="hidden lg:block w-56 shrink-0 space-y-4">
          {/* Categories */}
          <div className="bg-omp-white rounded-medical shadow-card p-4">
            <h3 className="text-sm font-bold text-omp-dark mb-3">Categories</h3>
            <button
              onClick={() => { setSelectedCategory(null); setPage(1); }}
              className={`block w-full text-left text-sm py-1.5 px-2 rounded transition-colors ${!selectedCategory ? "bg-omp-blue/10 text-omp-blue font-medium" : "text-omp-gray hover:text-omp-dark"}`}
            >
              All ({allProducts.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => { setSelectedCategory(cat.slug); setPage(1); }}
                className={`block w-full text-left text-sm py-1.5 px-2 rounded transition-colors ${selectedCategory === cat.slug ? "bg-omp-blue/10 text-omp-blue font-medium" : "text-omp-gray hover:text-omp-dark"}`}
              >
                {cat.name} ({cat.count})
              </button>
            ))}
          </div>

          {/* Stock filter */}
          <div className="bg-omp-white rounded-medical shadow-card p-4">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={stockOnly}
                onChange={(e) => { setStockOnly(e.target.checked); setPage(1); }}
                className="w-4 h-4 rounded border-omp-gray accent-omp-blue"
              />
              <span className="text-omp-dark">In stock only</span>
            </label>
          </div>
        </aside>

        {/* Mobile category filter */}
        <div className="lg:hidden fixed bottom-16 left-0 right-0 z-40 bg-omp-white border-t border-omp-gray-light px-4 py-2 overflow-x-auto flex gap-2 scrollbar-hide">
          <button
            onClick={() => { setSelectedCategory(null); setPage(1); }}
            className={`shrink-0 text-xs px-3 py-1.5 rounded-pill border transition-colors ${!selectedCategory ? "bg-omp-blue text-white border-omp-blue" : "border-omp-gray-light text-omp-gray"}`}
          >
            All
          </button>
          {categories.slice(0, 8).map((cat) => (
            <button
              key={cat.slug}
              onClick={() => { setSelectedCategory(cat.slug); setPage(1); }}
              className={`shrink-0 text-xs px-3 py-1.5 rounded-pill border transition-colors ${selectedCategory === cat.slug ? "bg-omp-blue text-white border-omp-blue" : "border-omp-gray-light text-omp-gray"}`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          {paged.length === 0 ? (
            <div className="text-center py-16">
              <svg className="w-16 h-16 mx-auto text-omp-gray-light mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <p className="text-omp-gray font-medium">No products found</p>
              <p className="text-sm text-omp-gray mt-1">Try adjusting your search or filters</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
                {paged.map((product) => (
                  <SimpleProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Load more */}
              {page * PAGE_SIZE < filtered.length && (
                <div className="mt-8 text-center">
                  <button
                    onClick={() => setPage((p) => p + 1)}
                    className="bg-omp-blue text-white font-semibold px-8 py-3 rounded-medical hover:bg-omp-blue-light transition-colors"
                  >
                    Load More ({filtered.length - paged.length} remaining)
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
