import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse all product categories at OMP — medicines, supplements, beauty, and more.",
};

const PLACEHOLDER_CATEGORIES = [
  { name: "Cold & Flu", slug: "cold-flu", color: "bg-blue-500" },
  { name: "Pain Relief", slug: "pain-relief", color: "bg-red-500" },
  { name: "Vitamins & Supplements", slug: "supplements", color: "bg-omp-green" },
  { name: "Beauty & Skincare", slug: "beauty", color: "bg-pink-500" },
  { name: "Mother & Baby", slug: "mother-baby", color: "bg-rose-400" },
  { name: "Chronic Care", slug: "chronic-care", color: "bg-omp-blue" },
  { name: "First Aid", slug: "first-aid", color: "bg-amber-500" },
  { name: "Sexual Health", slug: "sexual-health", color: "bg-purple-500" },
  { name: "Digestive Health", slug: "digestive-health", color: "bg-emerald-500" },
  { name: "Eye & Ear Care", slug: "eye-ear-care", color: "bg-cyan-500" },
  { name: "Oral Care", slug: "oral-care", color: "bg-teal-500" },
  { name: "Medical Devices", slug: "medical-devices", color: "bg-slate-500" },
];

export default function CategoriesPage() {
  return (
    <div className="w-full px-6 py-8">
      <h1 className="text-2xl font-bold text-omp-dark mb-6">Shop by Category</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {PLACEHOLDER_CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            href={`/category/${cat.slug}`}
            className="group bg-omp-white rounded-medical shadow-card p-5 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
          >
            <div className={`w-12 h-12 rounded-medical ${cat.color} mb-3 opacity-80 group-hover:opacity-100 transition-opacity`} />
            <h3 className="font-semibold text-sm text-omp-dark">{cat.name}</h3>
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
