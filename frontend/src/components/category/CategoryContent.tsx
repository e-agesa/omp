"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { SimpleProductCard } from "@/components/product/SimpleProductCard";
import productsData from "@/data/products.json";

const PAGE_SIZE = 24;

interface ProductItem {
  id: number;
  name: string;
  slug: string;
  price: number;
  category: string;
  category_name: string;
  in_stock: boolean;
}

type SortOption = "name" | "price-asc" | "price-desc";

export function CategoryContent({ slug, title }: { slug: string; title: string }) {
  const [sort, setSort] = useState<SortOption>("name");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const allProducts = productsData as ProductItem[];

  const filtered = useMemo(() => {
    let items = allProducts.filter((p) => p.category === slug);

    if (search) {
      const q = search.toLowerCase();
      items = items.filter((p) => p.name.toLowerCase().includes(q));
    }

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
  }, [allProducts, slug, sort, search]);

  const paged = filtered.slice(0, page * PAGE_SIZE);

  return (
    <div className="w-full px-6 py-6">
      {/* Breadcrumb */}
      <nav className="text-xs text-omp-gray mb-4 flex items-center gap-1">
        <Link href="/" className="hover:text-omp-blue transition-colors">Home</Link>
        <span>/</span>
        <Link href="/categories/" className="hover:text-omp-blue transition-colors">Categories</Link>
        <span>/</span>
        <span className="text-omp-dark font-medium">{title}</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-omp-dark">{title}</h1>
          <p className="text-sm text-omp-gray mt-1">{filtered.length} products</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-omp-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              type="text"
              placeholder={`Search in ${title}...`}
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="pl-9 pr-4 py-2.5 text-sm border border-omp-gray-light rounded-medical bg-omp-white focus:outline-none focus:ring-2 focus:ring-omp-blue w-48"
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

      {/* Products */}
      {paged.length === 0 ? (
        <div className="text-center py-16">
          <svg className="w-16 h-16 mx-auto text-omp-gray-light mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
          </svg>
          <p className="text-omp-gray font-medium">No products in this category yet</p>
          <Link href="/shop/" className="text-sm text-omp-blue hover:underline mt-2 inline-block">
            Browse all products
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {paged.map((product) => (
              <SimpleProductCard key={product.id} product={product} />
            ))}
          </div>

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
  );
}
