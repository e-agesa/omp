import "server-only";
import type { Product, ProductCategory, Order } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_WOOCOMMERCE_URL!;
const CONSUMER_KEY = process.env.WOOCOMMERCE_CONSUMER_KEY!;
const CONSUMER_SECRET = process.env.WOOCOMMERCE_CONSUMER_SECRET!;

function authParams() {
  return `consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}`;
}

async function wooFetch<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  const query = new URLSearchParams({ ...params });
  const url = `${BASE_URL}/${endpoint}?${authParams()}&${query}`;

  const res = await fetch(url, { next: { revalidate: 60 } });

  if (!res.ok) {
    throw new Error(`WooCommerce API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

// ── Products ──
export async function getProducts(params: Record<string, string> = {}): Promise<Product[]> {
  return wooFetch<Product[]>("products", { per_page: "20", ...params });
}

export async function getProduct(slug: string): Promise<Product> {
  const products = await wooFetch<Product[]>("products", { slug });
  if (!products.length) throw new Error(`Product not found: ${slug}`);
  return products[0];
}

export async function getProductById(id: number): Promise<Product> {
  return wooFetch<Product>(`products/${id}`);
}

export async function searchProducts(query: string): Promise<Product[]> {
  return wooFetch<Product[]>("products", { search: query, per_page: "10" });
}

export async function getProductsByCategory(categoryId: number): Promise<Product[]> {
  return wooFetch<Product[]>("products", { category: String(categoryId), per_page: "20" });
}

// ── Categories ──
export async function getCategories(): Promise<ProductCategory[]> {
  return wooFetch<ProductCategory[]>("products/categories", { per_page: "100", hide_empty: "true" });
}

export async function getCategory(slug: string): Promise<ProductCategory> {
  const categories = await wooFetch<ProductCategory[]>("products/categories", { slug });
  if (!categories.length) throw new Error(`Category not found: ${slug}`);
  return categories[0];
}

// ── Orders ──
export async function getOrder(id: number): Promise<Order> {
  return wooFetch<Order>(`orders/${id}`);
}

export async function createOrder(orderData: Partial<Order>): Promise<Order> {
  const url = `${BASE_URL}/orders?${authParams()}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  });

  if (!res.ok) throw new Error(`Failed to create order: ${res.statusText}`);
  return res.json();
}
