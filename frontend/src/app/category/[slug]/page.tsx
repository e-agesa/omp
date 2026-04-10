import type { Metadata } from "next";
import { CategoryContent } from "@/components/category/CategoryContent";
import categoriesData from "@/data/categories.json";

const CATEGORY_META: Record<string, { title: string; description: string }> = {
  medicines: { title: "Medicines", description: "Shop genuine medicines — antibiotics, pain relief, and prescriptions." },
  general: { title: "General Health", description: "Browse general health products and everyday wellness essentials." },
  "pain-relief": { title: "Pain Relief", description: "Shop pain relief medicines — headache, back pain, muscle ache and fever treatments." },
  supplements: { title: "Vitamins & Supplements", description: "Boost your health with vitamins, minerals, and wellness supplements." },
  beauty: { title: "Beauty & Skincare", description: "Premium skincare, haircare, and beauty products from trusted brands." },
  "mother-baby": { title: "Mother & Baby", description: "Everything for mum and baby — diapers, formula, prenatal vitamins, and more." },
  "chronic-care": { title: "Chronic Care", description: "Diabetes, hypertension, and chronic condition management products." },
  "first-aid": { title: "First Aid & Surgical", description: "First aid supplies — bandages, antiseptics, wound care, and emergency kits." },
  "cold-flu": { title: "Cold & Flu", description: "Cold, flu, and cough remedies to get you feeling better fast." },
  "sexual-health": { title: "Sexual Health", description: "Sexual health products — contraceptives, testing kits, and wellness items." },
  "digestive-health": { title: "Digestive Health", description: "Digestive care — antacids, probiotics, and stomach relief treatments." },
  "eye-ear-care": { title: "Eye & Ear Care", description: "Eye drops, ear care solutions, and related health products." },
  "oral-care": { title: "Oral Care", description: "Toothpaste, mouthwash, dental care, and oral hygiene products." },
  "medical-devices": { title: "Medical Devices", description: "Blood pressure monitors, glucometers, thermometers, and medical equipment." },
  orthopaedic: { title: "Orthopaedic Supplies", description: "Orthopaedic implants, plates, screws, and surgical supplies." },
  incontinence: { title: "Incontinence Care", description: "Adult diapers, incontinence pads, and care products." },
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return categoriesData.map((cat: { slug: string }) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const meta = CATEGORY_META[slug];
  return {
    title: meta?.title || "Category",
    description: meta?.description || "Browse products in this category at Our Mall Pharmacy.",
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const meta = CATEGORY_META[slug];

  return (
    <CategoryContent
      slug={slug}
      title={meta?.title || slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
    />
  );
}
