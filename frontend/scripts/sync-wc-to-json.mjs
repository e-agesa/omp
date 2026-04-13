/**
 * Sync WooCommerce product data (with SEO content) back to local JSON
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const WC_URL = "https://ourmallpharmacy.com/cms/wp-json/wc/v3";
const AUTH = "Basic " + Buffer.from("twinfusion:OmpAdmin2026!").toString("base64");

async function wcFetch(endpoint) {
  const res = await fetch(`${WC_URL}${endpoint}`, {
    headers: { Authorization: AUTH },
  });
  return res.json();
}

async function main() {
  console.log("\n  Syncing WooCommerce products to local JSON...\n");

  const all = [];
  let page = 1;
  while (true) {
    const products = await wcFetch(`/products?per_page=100&page=${page}`);
    if (!products || products.length === 0) break;
    all.push(...products);
    process.stdout.write(`\r  Fetched: ${all.length} products`);
    page++;
    if (products.length < 100) break;
  }

  console.log(`\n  Total: ${all.length} products\n`);

  // Map to local format with SEO content
  const localProducts = all.map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    price: parseFloat(p.regular_price) || parseFloat(p.price) || 0,
    regular_price: parseFloat(p.regular_price) || 0,
    category: p.categories?.[0]?.slug || "general",
    category_name: p.categories?.[0]?.name || "General Health",
    in_stock: p.stock_status === "instock",
    stock_quantity: p.stock_quantity || 0,
    sku: p.sku || "",
    image: p.images?.[0]?.src || "",
    short_description: p.short_description || "",
    description: p.description || "",
    tags: (p.tags || []).map((t) => t.name),
    // Rank Math meta
    seo_title: p.meta_data?.find((m) => m.key === "rank_math_title")?.value || "",
    seo_description: p.meta_data?.find((m) => m.key === "rank_math_description")?.value || "",
    seo_keyword: p.meta_data?.find((m) => m.key === "rank_math_focus_keyword")?.value || "",
  }));

  // Sort by name
  localProducts.sort((a, b) => a.name.localeCompare(b.name));

  // Write products
  const outPath = path.join(__dirname, "..", "src", "data", "products.json");
  fs.writeFileSync(outPath, JSON.stringify(localProducts, null, 0));
  console.log(`  Saved ${localProducts.length} products to src/data/products.json`);

  // Check stats
  const withDesc = localProducts.filter((p) => p.short_description).length;
  const withSEO = localProducts.filter((p) => p.seo_title).length;
  const withImage = localProducts.filter((p) => p.image).length;
  console.log(`  With descriptions: ${withDesc}`);
  console.log(`  With SEO meta: ${withSEO}`);
  console.log(`  With images: ${withImage}\n`);
}

main().catch(console.error);
