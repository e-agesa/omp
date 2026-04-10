/**
 * Validate all product image URLs and re-fetch broken ones
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PRODUCTS_FILE = path.join(__dirname, "..", "src", "data", "products.json");

async function checkImage(url) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    const res = await fetch(url, {
      method: "HEAD",
      signal: controller.signal,
      headers: { "User-Agent": "Mozilla/5.0" },
      redirect: "follow",
    });
    clearTimeout(timeout);
    const ct = res.headers.get("content-type") || "";
    return res.ok && ct.startsWith("image/");
  } catch {
    return false;
  }
}

async function searchImage(query) {
  try {
    const res = await fetch(`https://duckduckgo.com/?q=${encodeURIComponent(query)}`, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" },
    });
    const text = await res.text();
    const match = text.match(/vqd=['"]([^'"]+)['"]/);
    if (!match) return null;

    const url = `https://duckduckgo.com/i.js?l=us-en&o=json&q=${encodeURIComponent(query)}&vqd=${match[1]}&f=size:Medium`;
    const res2 = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0", "Referer": "https://duckduckgo.com/" },
    });
    const data = await res2.json();
    if (data.results && data.results.length > 0) {
      // Skip the first result (might be same broken one), try alternatives
      for (const r of data.results.slice(1, 5)) {
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

async function main() {
  const products = JSON.parse(fs.readFileSync(PRODUCTS_FILE, "utf8"));
  console.log(`\n  Validating ${products.length} product images...\n`);

  const broken = [];
  const BATCH = 10;

  // Phase 1: Find broken images
  for (let i = 0; i < products.length; i += BATCH) {
    const batch = products.slice(i, i + BATCH);
    const results = await Promise.all(
      batch.map(async (p) => {
        if (!p.image) return { product: p, ok: false };
        const ok = await checkImage(p.image);
        return { product: p, ok };
      })
    );

    for (const r of results) {
      if (!r.ok) broken.push(r.product);
    }

    const progress = Math.min(i + BATCH, products.length);
    process.stdout.write(`\r  Checking: ${progress}/${products.length} — ${broken.length} broken found`);
  }

  console.log(`\n\n  Found ${broken.length} broken images. Re-fetching...\n`);

  // Phase 2: Re-fetch broken images
  let fixed = 0;
  for (let i = 0; i < broken.length; i++) {
    const p = broken[i];
    const newImage = await searchImage(`${p.name} pharmacy product`);
    if (newImage && newImage !== p.image) {
      p.image = newImage;
      fixed++;
    }
    process.stdout.write(`\r  Re-fetching: ${i + 1}/${broken.length} — ${fixed} fixed`);
    await new Promise((r) => setTimeout(r, 1500));
  }

  fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 0));
  console.log(`\n\n  Done! ${fixed} images re-fetched out of ${broken.length} broken\n`);
}

main().catch(console.error);
