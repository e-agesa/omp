/**
 * Fetch real product images using DuckDuckGo image search
 * Stores image URLs directly in products.json
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PRODUCTS_FILE = path.join(__dirname, "..", "src", "data", "products.json");

// DuckDuckGo vqd token fetch
async function getVqd(query) {
  const res = await fetch(`https://duckduckgo.com/?q=${encodeURIComponent(query)}`, {
    headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" },
  });
  const text = await res.text();
  const match = text.match(/vqd=['"]([^'"]+)['"]/);
  return match ? match[1] : null;
}

// Search DuckDuckGo images
async function searchImage(query) {
  try {
    const vqd = await getVqd(query);
    if (!vqd) return null;

    const url = `https://duckduckgo.com/i.js?l=us-en&o=json&q=${encodeURIComponent(query)}&vqd=${vqd}&f=size:Medium`;
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Referer": "https://duckduckgo.com/",
      },
    });
    const data = await res.json();

    if (data.results && data.results.length > 0) {
      // Pick the first image with a reasonable URL
      for (const r of data.results.slice(0, 3)) {
        if (r.image && r.image.startsWith("https://") && !r.image.includes("x-raw-image")) {
          return r.image;
        }
      }
      return data.results[0]?.image || null;
    }
    return null;
  } catch {
    return null;
  }
}

// Fallback: use a simpler search approach
async function searchImageSimple(productName) {
  try {
    // Try a direct Google-powered approach via serpapi-like services
    const query = `${productName} medicine pharmacy product`;
    const res = await fetch(
      `https://lite.duckduckgo.com/lite/?q=${encodeURIComponent(query)}&kl=us-en`,
      { headers: { "User-Agent": "Mozilla/5.0" } }
    );
    // This won't give images, but let's try the main API first
    return null;
  } catch {
    return null;
  }
}

async function main() {
  const products = JSON.parse(fs.readFileSync(PRODUCTS_FILE, "utf8"));

  console.log(`\n  Processing ${products.length} products for images...\n`);

  let found = 0;
  let failed = 0;
  const BATCH_SIZE = 5;
  const DELAY_MS = 1500; // Rate limit: 1.5s between batches

  // Process in batches
  for (let i = 0; i < products.length; i += BATCH_SIZE) {
    const batch = products.slice(i, i + BATCH_SIZE);
    const promises = batch.map(async (product) => {
      if (product.image) return; // Already has image

      const searchQuery = `${product.name} pharmacy product`;
      const imageUrl = await searchImage(searchQuery);

      if (imageUrl) {
        product.image = imageUrl;
        found++;
      } else {
        failed++;
      }
    });

    await Promise.all(promises);

    const progress = Math.min(i + BATCH_SIZE, products.length);
    const pct = Math.round((progress / products.length) * 100);
    process.stdout.write(`\r  Progress: ${progress}/${products.length} (${pct}%) — ${found} images found, ${failed} failed`);

    // Rate limit
    if (i + BATCH_SIZE < products.length) {
      await new Promise((r) => setTimeout(r, DELAY_MS));
    }
  }

  // Save updated products
  fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 0));
  console.log(`\n\n  Done! ${found} images found out of ${products.length} products\n`);
}

main().catch(console.error);
