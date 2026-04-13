/**
 * Seed remaining products that failed in the first run
 * Uses smaller batches (10) to avoid timeouts
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const WC_URL = "https://ourmallpharmacy.com/cms/wp-json/wc/v3";
const AUTH = "Basic " + Buffer.from("twinfusion:OmpAdmin2026!").toString("base64");

const productsData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "..", "src", "data", "products.json"), "utf8")
);

async function wcFetch(endpoint, method = "GET", body = null) {
  const opts = {
    method,
    headers: { Authorization: AUTH, "Content-Type": "application/json" },
  };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(`${WC_URL}${endpoint}`, opts);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function getExistingSlugs() {
  const slugs = new Set();
  let page = 1;
  while (true) {
    const products = await wcFetch(`/products?per_page=100&page=${page}&_fields=slug`);
    if (products.length === 0) break;
    products.forEach(p => slugs.add(p.slug));
    page++;
    if (products.length < 100) break;
  }
  return slugs;
}

async function main() {
  console.log("\n  Finding products that need seeding...\n");

  // Get existing product slugs from WooCommerce
  const existing = await getExistingSlugs();
  console.log(`  ${existing.size} products already in WooCommerce`);

  // Get category map
  const cats = await wcFetch("/products/categories?per_page=100");
  const catMap = {};
  cats.forEach(c => { catMap[c.slug] = c.id; });

  // Find missing products
  const missing = productsData.filter(p => !existing.has(p.slug));
  console.log(`  ${missing.length} products need seeding\n`);

  if (missing.length === 0) {
    console.log("  All products already seeded!");
    return;
  }

  const BATCH_SIZE = 10;
  let created = 0;
  let failed = 0;

  for (let i = 0; i < missing.length; i += BATCH_SIZE) {
    const batch = missing.slice(i, i + BATCH_SIZE);

    const wcProducts = batch.map(p => ({
      name: p.name,
      slug: p.slug,
      type: "simple",
      regular_price: String(p.price),
      sku: p.sku || undefined,
      manage_stock: true,
      stock_quantity: p.stock_quantity || 0,
      stock_status: p.in_stock ? "instock" : "outofstock",
      categories: catMap[p.category] ? [{ id: catMap[p.category] }] : [],
      images: p.image ? [{ src: p.image, name: p.name }] : [],
      status: "publish",
    }));

    try {
      const result = await wcFetch("/products/batch", "POST", { create: wcProducts });
      const ok = result.create?.filter(r => r.id)?.length || 0;
      const fail = result.create?.filter(r => r.error)?.length || 0;
      created += ok;
      failed += fail;
    } catch {
      failed += batch.length;
    }

    const progress = Math.min(i + BATCH_SIZE, missing.length);
    process.stdout.write(`\r  Progress: ${progress}/${missing.length} — ${created} created, ${failed} failed`);

    await new Promise(r => setTimeout(r, 1000));
  }

  console.log(`\n\n  Done! ${created} more products created (${failed} failed)\n`);
}

main().catch(console.error);
