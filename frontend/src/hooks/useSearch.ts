"use client";

import { useState, useCallback, useRef } from "react";
import productsData from "@/data/products.json";

interface SearchResult {
  type: string;
  id: number;
  title: string;
  slug: string;
  price?: string;
}

interface ProductItem {
  id: number;
  name: string;
  slug: string;
  price: number;
  category_name: string;
}

const allProducts = productsData as ProductItem[];

export function useSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const search = useCallback((value: string) => {
    setQuery(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (value.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    debounceRef.current = setTimeout(() => {
      setLoading(true);

      const q = value.toLowerCase();
      const matches = allProducts
        .filter((p) => p.name.toLowerCase().includes(q))
        .slice(0, 8)
        .map((p) => ({
          type: "product" as const,
          id: p.id,
          title: p.name,
          slug: p.slug,
        }));

      setResults(matches);
      setIsOpen(matches.length > 0);
      setLoading(false);
    }, 150);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  return { query, results, loading, isOpen, search, close };
}
