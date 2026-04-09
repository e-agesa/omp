"use client";

import { useState, useCallback, useRef } from "react";
import { globalSearch } from "@/lib/omp-api";
import type { SearchResult } from "@/types";

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

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await globalSearch(value);
        setResults(data);
        setIsOpen(data.length > 0);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  return { query, results, loading, isOpen, search, close };
}
