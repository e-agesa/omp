import type { Metadata } from "next";
import { CategoryContent } from "@/components/category/CategoryContent";

// Category metadata map
const CATEGORY_META: Record<string, { title: string; description: string }> = {
  "pain-relief": { title: "Pain Relief", description: "Shop pain relief medicines — headache, back pain, muscle ache and fever treatments." },
  supplements: { title: "Vitamins & Supplements", description: "Boost your health with vitamins, minerals, and wellness supplements." },
  beauty: { title: "Beauty & Skincare", description: "Premium skincare, haircare, and beauty products from trusted brands." },
  prescription: { title: "Prescription Medicines", description: "Upload your prescription and get medicines dispensed by licensed pharmacists." },
  "mother-baby": { title: "Mother & Baby", description: "Everything for mum and baby — diapers, formula, prenatal vitamins, and more." },
  "chronic-care": { title: "Chronic Care", description: "Diabetes, hypertension, and chronic condition management products." },
  "first-aid": { title: "First Aid", description: "First aid supplies — bandages, antiseptics, wound care, and emergency kits." },
  "cold-flu": { title: "Cold & Flu", description: "Cold, flu, and cough remedies to get you feeling better fast." },
  "sexual-health": { title: "Sexual Health", description: "Sexual health products — contraceptives, testing kits, and wellness items." },
  "digestive-health": { title: "Digestive Health", description: "Digestive care — antacids, probiotics, and stomach relief treatments." },
  "eye-ear-care": { title: "Eye & Ear Care", description: "Eye drops, ear care solutions, and related health products." },
  "oral-care": { title: "Oral Care", description: "Toothpaste, mouthwash, dental care, and oral hygiene products." },
  "medical-devices": { title: "Medical Devices", description: "Blood pressure monitors, glucometers, thermometers, and medical equipment." },
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const meta = CATEGORY_META[slug];
  return {
    title: meta?.title || "Category",
    description: meta?.description || "Browse products in this category at OMP Kenya.",
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
