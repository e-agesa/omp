/**
 * Parse OMP Excel and generate product catalog JSON
 * Auto-categorizes products based on name keywords
 */

import XLSX from "xlsx";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const wb = XLSX.readFile(path.join(ROOT, "..", "items_export-omp.xlsx"));
const ws = wb.Sheets[wb.SheetNames[0]];
const raw = XLSX.utils.sheet_to_json(ws);

// Category rules: keyword → category slug
const CATEGORY_RULES = [
  { keywords: ["tablet", "tabs", "capsule", "caps", "syrup", "suspension", "injection", "amoxicillin", "paracetamol", "ibuprofen", "metformin", "losartan", "omeprazole", "azithromycin", "ciproflox", "doxycycl", "fluconaz", "ceftriax", "diclofenac", "aspirin", "prednis", "cetiriz", "loratad"], slug: "medicines", name: "Medicines" },
  { keywords: ["pain", "painkiller", "analgesic", "relief", "brufen", "voltaren", "panadol", "hedex", "mara moja", "tramadol"], slug: "pain-relief", name: "Pain Relief" },
  { keywords: ["vitamin", "supplement", "multivit", "omega", "calcium", "iron tab", "folic", "zinc", "magnesium", "b-complex", "b12", "collagen", "probiot", "pregnacare", "centrum", "wellman", "wellwoman", "vegan", "gummies", "cod liver"], slug: "supplements", name: "Vitamins & Supplements" },
  { keywords: ["cream", "lotion", "moistur", "sunscreen", "spf", "cleanser", "serum", "toner", "face wash", "body wash", "shampoo", "conditioner", "lip", "mascara", "foundation", "concealer", "beauty", "skincare", "derma", "cetaphil", "cerave", "nivea", "vaseline", "dove", "garnier", "olay", "neutrogena", "eucerin", "bioderma", "vichy", "roche-posay", "aveeno", "palmer"], slug: "beauty", name: "Beauty & Skincare" },
  { keywords: ["diaper", "nappy", "baby", "infant", "pediatr", "pampers", "huggies", "formula", "lactogen", "nan ", "similac", "gripe water", "teether", "pacifier", "bottle feed", "prenatal", "maternity", "antenatal"], slug: "mother-baby", name: "Mother & Baby" },
  { keywords: ["diabetes", "insulin", "metformin", "glibencl", "glucometer", "test strip", "hypertens", "blood pressure", "amlodip", "atenolol", "enalapril", "nifedip", "ramipril", "statin", "atorvast", "simvast", "cholesterol", "thyroid", "levothyr"], slug: "chronic-care", name: "Chronic Care" },
  { keywords: ["bandage", "plaster", "gauze", "cotton wool", "antiseptic", "dettol", "betadine", "first aid", "wound", "surgical", "glove", "syringe", "needle", "catheter", "cannula", "suture"], slug: "first-aid", name: "First Aid & Surgical" },
  { keywords: ["cold", "flu", "cough", "throat", "nasal", "inhaler", "decongest", "antihistam", "strepsil", "vicks", "olbas", "lemsip", "benylin", "expector", "mucolytic", "sinusit"], slug: "cold-flu", name: "Cold & Flu" },
  { keywords: ["condom", "durex", "contracepti", "lubric", "pregnancy test", "hiv test", "sti", "sexual"], slug: "sexual-health", name: "Sexual Health" },
  { keywords: ["antacid", "laxative", "digestive", "probiotic", "omeprazole", "ranitid", "gaviscon", "eno", "charcoal", "buscopan", "loperamid", "oral rehydrat", "ors"], slug: "digestive-health", name: "Digestive Health" },
  { keywords: ["eye drop", "ear drop", "optic", "contact lens", "solution", "visine", "refresh"], slug: "eye-ear-care", name: "Eye & Ear Care" },
  { keywords: ["toothpaste", "mouthwash", "toothbrush", "dental", "floss", "oral-b", "colgate", "sensodyne", "listerine"], slug: "oral-care", name: "Oral Care" },
  { keywords: ["thermometer", "bp monitor", "nebuliz", "oximeter", "wheelchair", "crutch", "walker", "glucometer", "stethoscope", "scale", "weighing"], slug: "medical-devices", name: "Medical Devices" },
  { keywords: ["plate", "screw", "implant", "prosthe", "orthopaed", "orthoped", "bone", "surgical"], slug: "orthopaedic", name: "Orthopaedic Supplies" },
  { keywords: ["abena", "incontinence", "adult diaper", "pad ", "pant ", "slip ", "catheter bag"], slug: "incontinence", name: "Incontinence Care" },
];

function categorize(name) {
  const lower = name.toLowerCase();
  for (const rule of CATEGORY_RULES) {
    if (rule.keywords.some((kw) => lower.includes(kw))) {
      return { slug: rule.slug, name: rule.name };
    }
  }
  return { slug: "general", name: "General Health" };
}

function slugify(str) {
  return str.toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .substring(0, 80);
}

function cleanName(name) {
  return name.trim()
    .replace(/^\d{10,}\s*/, "") // remove leading barcodes
    .replace(/\s+/g, " ")
    .split(" ")
    .map(w => w.length <= 3 ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

// Process products
const products = [];
const categories = {};
let id = 1;

for (const row of raw) {
  const name = (row["Item Name"] || "").trim();
  const price = parseFloat(row["Selling Price"]) || 0;
  const costPrice = parseFloat(row["Cost Price"]) || 0;
  const qty = parseInt(row["Quantity"]) || 0;

  // Skip items with no name, no price, or zero price
  if (!name || price <= 0) continue;

  const cat = categorize(name);
  const cleanedName = cleanName(name);
  const slug = slugify(cleanedName);

  // Track categories
  if (!categories[cat.slug]) {
    categories[cat.slug] = { name: cat.name, slug: cat.slug, count: 0 };
  }
  categories[cat.slug].count++;

  products.push({
    id: id++,
    name: cleanedName,
    slug,
    price,
    regular_price: price,
    sale_price: costPrice > 0 && costPrice < price ? null : null,
    category: cat.slug,
    category_name: cat.name,
    in_stock: qty > 0,
    stock_quantity: qty,
    sku: row["Item Number"] || "",
  });
}

// Sort products by name
products.sort((a, b) => a.name.localeCompare(b.name));

// Write products JSON
const outputDir = path.join(ROOT, "src", "data");
fs.mkdirSync(outputDir, { recursive: true });

fs.writeFileSync(
  path.join(outputDir, "products.json"),
  JSON.stringify(products, null, 0) // compact
);

// Write categories JSON
const categoryList = Object.values(categories).sort((a, b) => b.count - a.count);
fs.writeFileSync(
  path.join(outputDir, "categories.json"),
  JSON.stringify(categoryList, null, 2)
);

console.log(`\n  Seeded ${products.length} products across ${categoryList.length} categories\n`);
categoryList.forEach((c) => console.log(`  ${c.name}: ${c.count} products`));
console.log(`\n  Output: src/data/products.json & src/data/categories.json\n`);
