import type { Metadata } from "next";
import Link from "next/link";
import categoriesData from "@/data/categories.json";

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse all product categories at Our Mall Pharmacy — medicines, supplements, beauty, and more.",
};

const CAT_COLORS: Record<string, string> = {
  medicines: "bg-blue-500",
  general: "bg-gray-500",
  beauty: "bg-pink-500",
  supplements: "bg-omp-green",
  "cold-flu": "bg-sky-500",
  "eye-ear-care": "bg-cyan-500",
  "first-aid": "bg-amber-500",
  "sexual-health": "bg-purple-500",
  "mother-baby": "bg-rose-400",
  "medical-devices": "bg-slate-500",
  "digestive-health": "bg-emerald-500",
  "pain-relief": "bg-red-500",
  "oral-care": "bg-teal-500",
  "chronic-care": "bg-omp-blue",
  orthopaedic: "bg-orange-500",
  incontinence: "bg-violet-500",
};

export default function CategoriesPage() {
  return (
    <div className="w-full px-6 py-8">
      <h1 className="text-2xl font-bold text-omp-dark mb-6">Shop by Category</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {categoriesData.map((cat: { name: string; slug: string; count: number }) => (
          <Link
            key={cat.slug}
            href={`/category/${cat.slug}/`}
            className="group bg-omp-white rounded-medical shadow-card p-5 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
          >
            <div className={`w-12 h-12 rounded-medical ${CAT_COLORS[cat.slug] || "bg-gray-500"} mb-3 opacity-80 group-hover:opacity-100 transition-opacity`} />
            <h3 className="font-semibold text-sm text-omp-dark">{cat.name}</h3>
            <p className="text-xs text-omp-gray mt-0.5">{cat.count} products</p>
            <svg
              className="w-4 h-4 text-omp-gray-light group-hover:text-omp-blue mt-1 group-hover:translate-x-1 transition-all"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        ))}
      </div>
    </div>
  );
}
