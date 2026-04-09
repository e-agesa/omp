"use client";

import { useState } from "react";
import type { ProductCategory } from "@/types";

interface Filters {
  categories: number[];
  priceRange: [number, number];
  inStockOnly: boolean;
  symptoms: string[];
  brands: string[];
}

interface FacetedSidebarProps {
  categories: ProductCategory[];
  onFilterChange: (filters: Filters) => void;
}

const PRICE_RANGES: { label: string; range: [number, number] }[] = [
  { label: "Under KES 500", range: [0, 500] },
  { label: "KES 500 - 1,000", range: [500, 1000] },
  { label: "KES 1,000 - 2,500", range: [1000, 2500] },
  { label: "KES 2,500 - 5,000", range: [2500, 5000] },
  { label: "Over KES 5,000", range: [5000, 100000] },
];

const COMMON_SYMPTOMS = [
  "Headache",
  "Cold & Flu",
  "Allergy",
  "Stomach Pain",
  "Joint Pain",
  "Skin Care",
  "Cough",
  "Fever",
];

export function FacetedSidebar({ categories, onFilterChange }: FacetedSidebarProps) {
  const [filters, setFilters] = useState<Filters>({
    categories: [],
    priceRange: [0, 100000],
    inStockOnly: false,
    symptoms: [],
    brands: [],
  });

  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    categories: true,
    price: true,
    symptoms: false,
    availability: true,
  });

  const toggleSection = (key: string) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const updateFilters = (update: Partial<Filters>) => {
    const next = { ...filters, ...update };
    setFilters(next);
    onFilterChange(next);
  };

  const toggleCategory = (id: number) => {
    const categories = filters.categories.includes(id)
      ? filters.categories.filter((c) => c !== id)
      : [...filters.categories, id];
    updateFilters({ categories });
  };

  const toggleSymptom = (symptom: string) => {
    const symptoms = filters.symptoms.includes(symptom)
      ? filters.symptoms.filter((s) => s !== symptom)
      : [...filters.symptoms, symptom];
    updateFilters({ symptoms });
  };

  return (
    <aside className="w-full lg:w-64 lg:sticky lg:top-28 lg:self-start space-y-4">
      {/* Categories */}
      <FilterSection
        title="Categories"
        expanded={expandedSections.categories}
        onToggle={() => toggleSection("categories")}
      >
        <ul className="space-y-1.5">
          {categories.map((cat) => (
            <li key={cat.id}>
              <label className="flex items-center gap-2 cursor-pointer text-sm text-omp-dark hover:text-omp-blue transition-colors">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(cat.id)}
                  onChange={() => toggleCategory(cat.id)}
                  className="w-4 h-4 rounded border-omp-gray-light accent-omp-blue"
                />
                {cat.name}
                {cat.count !== undefined && (
                  <span className="ml-auto text-xs text-omp-gray">({cat.count})</span>
                )}
              </label>
            </li>
          ))}
        </ul>
      </FilterSection>

      {/* Price Range */}
      <FilterSection
        title="Price"
        expanded={expandedSections.price}
        onToggle={() => toggleSection("price")}
      >
        <ul className="space-y-1.5">
          {PRICE_RANGES.map((pr) => (
            <li key={pr.label}>
              <label className="flex items-center gap-2 cursor-pointer text-sm text-omp-dark hover:text-omp-blue transition-colors">
                <input
                  type="radio"
                  name="price"
                  checked={filters.priceRange[0] === pr.range[0] && filters.priceRange[1] === pr.range[1]}
                  onChange={() => updateFilters({ priceRange: pr.range })}
                  className="w-4 h-4 accent-omp-blue"
                />
                {pr.label}
              </label>
            </li>
          ))}
        </ul>
      </FilterSection>

      {/* Symptoms */}
      <FilterSection
        title="Shop by Symptom"
        expanded={expandedSections.symptoms}
        onToggle={() => toggleSection("symptoms")}
      >
        <div className="flex flex-wrap gap-1.5">
          {COMMON_SYMPTOMS.map((symptom) => (
            <button
              key={symptom}
              onClick={() => toggleSymptom(symptom)}
              className={`px-3 py-1 rounded-pill text-xs font-medium transition-all ${
                filters.symptoms.includes(symptom)
                  ? "bg-omp-blue text-white"
                  : "bg-omp-slate text-omp-dark hover:bg-omp-gray-light"
              }`}
            >
              {symptom}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Availability */}
      <FilterSection
        title="Availability"
        expanded={expandedSections.availability}
        onToggle={() => toggleSection("availability")}
      >
        <label className="flex items-center gap-2 cursor-pointer text-sm text-omp-dark">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => updateFilters({ inStockOnly: e.target.checked })}
            className="w-4 h-4 rounded accent-omp-blue"
          />
          In Stock at Mall
        </label>
      </FilterSection>

      {/* Clear all */}
      {(filters.categories.length > 0 || filters.symptoms.length > 0 || filters.inStockOnly) && (
        <button
          onClick={() =>
            updateFilters({
              categories: [],
              priceRange: [0, 100000],
              inStockOnly: false,
              symptoms: [],
              brands: [],
            })
          }
          className="w-full py-2 text-sm text-omp-red font-medium hover:underline"
        >
          Clear all filters
        </button>
      )}
    </aside>
  );
}

function FilterSection({
  title,
  expanded,
  onToggle,
  children,
}: {
  title: string;
  expanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-omp-white rounded-medical shadow-card overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-omp-dark"
      >
        {title}
        <svg
          className={`w-4 h-4 text-omp-gray transition-transform ${expanded ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      {expanded && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
}
