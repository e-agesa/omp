"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { useSearch } from "@/hooks/useSearch";

export function GlobalSearch() {
  const { query, results, loading, isOpen, search, close } = useSearch();
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        close();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [close]);

  const grouped = {
    product: results.filter((r) => r.type === "product"),
    symptom: results.filter((r) => r.type === "symptom"),
    article: results.filter((r) => r.type === "article"),
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div className="relative">
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-omp-gray"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => search(e.target.value)}
          placeholder="Search medicines, symptoms, or health articles..."
          className="w-full bg-omp-slate rounded-full pl-12 pr-4 py-3 text-sm text-omp-dark placeholder:text-omp-gray focus:outline-none focus:ring-2 focus:ring-omp-blue focus:bg-omp-white transition-all shadow-sm"
        />
        {loading && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-omp-blue border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* Results Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-omp-white rounded-medical shadow-card-hover border border-omp-gray-light overflow-hidden z-50">
          {grouped.product.length > 0 && (
            <ResultGroup title="Products" icon="pill">
              {grouped.product.map((r) => (
                <SearchResultItem key={r.id} result={r} onClick={close} />
              ))}
            </ResultGroup>
          )}

          {grouped.symptom.length > 0 && (
            <ResultGroup title="By Symptom" icon="heart">
              {grouped.symptom.map((r) => (
                <SearchResultItem key={r.id} result={r} onClick={close} />
              ))}
            </ResultGroup>
          )}

          {grouped.article.length > 0 && (
            <ResultGroup title="Health Articles" icon="book">
              {grouped.article.map((r) => (
                <SearchResultItem key={r.id} result={r} onClick={close} />
              ))}
            </ResultGroup>
          )}
        </div>
      )}
    </div>
  );
}

function ResultGroup({
  title,
  children,
}: {
  title: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-omp-gray-light last:border-0">
      <div className="px-4 py-2 bg-omp-slate">
        <span className="text-xs font-semibold text-omp-gray uppercase tracking-wide">
          {title}
        </span>
      </div>
      <ul>{children}</ul>
    </div>
  );
}

function SearchResultItem({
  result,
  onClick,
}: {
  result: { type: string; id: number; title: string; slug: string; price?: string };
  onClick: () => void;
}) {
  const href =
    result.type === "product"
      ? `/product/${result.slug}`
      : result.type === "article"
      ? `/health/${result.slug}`
      : `/search?symptom=${result.slug}`;

  return (
    <li>
      <Link
        href={href}
        onClick={onClick}
        className="flex items-center justify-between px-4 py-2.5 hover:bg-omp-slate transition-colors"
      >
        <span className="text-sm text-omp-dark">{result.title}</span>
        {result.price && (
          <span className="text-sm font-semibold text-omp-blue">
            KES {result.price}
          </span>
        )}
      </Link>
    </li>
  );
}
