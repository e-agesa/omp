import type { Metadata } from "next";
import { ProductPageClient } from "@/components/product/ProductPageClient";

export const metadata: Metadata = {
  title: "Product",
  description: "View product details at Our Mall Pharmacy.",
};

// Generate a placeholder param for static export — actual product loading is client-side
export function generateStaticParams() {
  return [{ slug: "placeholder" }];
}

export const dynamicParams = false;

export default async function ProductPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  return <ProductPageClient slug={slug} />;
}
