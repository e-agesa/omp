import type { Metadata } from "next";
import { getProduct } from "@/lib/woocommerce";
import { ProductDetail } from "@/components/product/ProductDetail";

export async function generateMetadata(
  props: PageProps<"/product/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;

  try {
    const product = await getProduct(slug);
    return {
      title: product.name,
      description: product.short_description.replace(/<[^>]*>/g, ""),
    };
  } catch {
    return { title: "Product Not Found" };
  }
}

export default async function ProductPage(props: PageProps<"/product/[slug]">) {
  const { slug } = await props.params;

  try {
    const product = await getProduct(slug);
    return <ProductDetail product={product} />;
  } catch {
    return (
      <div className="w-full px-6 py-16 text-center">
        <h1 className="text-2xl font-bold text-omp-dark">Product Not Found</h1>
        <p className="text-sm text-omp-gray mt-2">
          The product you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
      </div>
    );
  }
}
