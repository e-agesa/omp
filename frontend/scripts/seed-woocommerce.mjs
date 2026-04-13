/**
 * Seed all products from local JSON into WooCommerce via REST API
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
const categoriesData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "..", "src", "data", "categories.json"), "utf8")
);

async function wcFetch(endpoint, method = "GET", body = null) {
  const opts = {
    method,
    headers: { Authorization: AUTH, "Content-Type": "application/json" },
  };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(`${WC_URL}${endpoint}`, opts);
  return res.json();
}

async function main() {
  console.log("\n  === WooCommerce Product Seeder ===\n");

  // Step 1: Create categories
  console.log("  Creating categories...");
  const catMap = {};

  for (const cat of categoriesData) {
    try {
      const result = await wcFetch("/products/categories", "POST", {
        name: cat.name,
        slug: cat.slug,
      });
      catMap[cat.slug] = result.id;
      console.log(`    ${cat.name} -> ID ${result.id}`);
    } catch (err) {
      // Category might already exist
      const existing = await wcFetch(`/products/categories?slug=${cat.slug}`);
      if (existing.length > 0) {
        catMap[cat.slug] = existing[0].id;
        console.log(`    ${cat.name} -> ID ${existing[0].id} (existing)`);
      }
    }
  }

  console.log(`\n  ${Object.keys(catMap).length} categories ready\n`);

  // Step 2: Seed products in batches of 100 (WooCommerce batch limit)
  console.log(`  Seeding ${productsData.length} products...\n`);

  const BATCH_SIZE = 100;
  let created = 0;
  let failed = 0;

  for (let i = 0; i < productsData.length; i += BATCH_SIZE) {
    const batch = productsData.slice(i, i + BATCH_SIZE);

    const wcProducts = batch.map((p) => ({
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
      const batchCreated = result.create?.filter((r) => r.id)?.length || 0;
      const batchFailed = result.create?.filter((r) => r.error)?.length || 0;
      created += batchCreated;
      failed += batchFailed;
    } catch (err) {
      console.error(`    Batch error at ${i}:`, err.message);
      failed += batch.length;
    }

    const progress = Math.min(i + BATCH_SIZE, productsData.length);
    const pct = Math.round((progress / productsData.length) * 100);
    process.stdout.write(`\r  Progress: ${progress}/${productsData.length} (${pct}%) — ${created} created, ${failed} failed`);

    // Small delay between batches
    await new Promise((r) => setTimeout(r, 500));
  }

  console.log(`\n\n  Seeding complete!`);
  console.log(`  ${created} products created`);
  console.log(`  ${failed} products failed`);
  console.log(`\n  WooCommerce admin: https://ourmallpharmacy.com/cms/wp-admin/\n`);
}

main().catch(console.error);
