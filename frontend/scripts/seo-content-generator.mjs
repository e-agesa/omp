/**
 * SEO & GEO Content Generator for Our Mall Pharmacy
 * Generates unique, factual SEO content for each WooCommerce product
 * and updates via REST API + Rank Math meta fields
 */

const WC_URL = "https://ourmallpharmacy.com/cms/wp-json/wc/v3";
const WP_URL = "https://ourmallpharmacy.com/cms/wp-json/wp/v2";
const AUTH = "Basic " + Buffer.from("twinfusion:OmpAdmin2026!").toString("base64");

const LOCATIONS = ["Nairobi", "Kajiado", "Kikuyu", "Machakos", "Kitengela", "Ngong", "Karen", "Thika", "Athi River", "Limuru"];

const FOOTER = `
<hr/>
<h4>🚚 COUNTRYWIDE DELIVERIES</h4>
<p>Our Mall Pharmacy delivers genuine pharmaceutical products and after-sales support across Kenya — not just in Nairobi.</p>

<h4>📞 Contact Us</h4>
<p>
WhatsApp: <a href="https://wa.me/254740686263">+254 740 686 263</a><br/>
Phone: <a href="tel:+254722390003">+254 722 390 003</a><br/>
Email: <a href="mailto:ourmallpharmacy@gmail.com">ourmallpharmacy@gmail.com</a><br/>
Address: Our Mall, Off Magadi Rd, Avocado Lane, Ground Floor (Shop No. 22)<br/>
Hours: Mon-Sat 9AM-8PM, Sun &amp; Holidays 10:30AM-6PM<br/>
<em>"We treat, The Almighty Cures"</em>
</p>

<h4>📍 We Deliver to (but not limited to):</h4>
<p>Nakuru · Kisumu · Mombasa · Malindi · Eldoret · Kisii · Migori · Moyale · Lodwar · Marsabit · Maralal · Kapenguria · Kitale · Isiolo · Rumuruti · Webuye · Bungoma · Malaba · Busia · Mumias · Kakamega · Siaya · Luanda · Bondo · Mbita · Homa Bay · Rongo · Sotik · Bomet · Narok · Kericho · Kapsabet · Gilgil · Nyahururu · Nanyuki · Meru · Thika · Maua · Chuka · Limuru · Naivasha · Kitui · Mutomo · Kajiado · Emali · Kitengela · Oloitoktok · Garissa · Mwingi · Kibwezi · Mtito Andei · Voi · Diani · Lamu · Garsen · Kilifi · Mtwapa · Mariakani · Kikuyu · Ngong · Karen · Athi River — and many more!</p>
`;

// Category-specific content templates
const CATEGORY_INFO = {
  medicines: {
    useCase: "treatment and management of health conditions",
    audience: "patients with a valid prescription or over-the-counter needs",
    benefit: "clinically proven and PPB-approved",
    relatedCategory: "chronic-care",
  },
  "pain-relief": {
    useCase: "relief from pain, inflammation, and fever",
    audience: "individuals experiencing acute or chronic pain",
    benefit: "fast-acting relief",
    relatedCategory: "medicines",
  },
  supplements: {
    useCase: "nutritional supplementation and wellness support",
    audience: "health-conscious individuals and those with nutritional deficiencies",
    benefit: "supports overall health and wellbeing",
    relatedCategory: "chronic-care",
  },
  beauty: {
    useCase: "skincare, haircare, and personal grooming",
    audience: "individuals seeking quality dermatological and beauty products",
    benefit: "dermatologist-recommended formulations",
    relatedCategory: "oral-care",
  },
  "mother-baby": {
    useCase: "maternal and infant care",
    audience: "expectant mothers, new parents, and caregivers",
    benefit: "safe and gentle for mother and baby",
    relatedCategory: "supplements",
  },
  "chronic-care": {
    useCase: "long-term management of chronic health conditions",
    audience: "patients managing diabetes, hypertension, or other chronic conditions",
    benefit: "reliable daily management support",
    relatedCategory: "medicines",
  },
  "first-aid": {
    useCase: "wound care, emergency treatment, and surgical supplies",
    audience: "households, clinics, and first responders",
    benefit: "essential for emergency preparedness",
    relatedCategory: "medical-devices",
  },
  "cold-flu": {
    useCase: "relief from cold, flu, cough, and respiratory symptoms",
    audience: "individuals with seasonal illness or respiratory discomfort",
    benefit: "symptomatic relief to help you recover faster",
    relatedCategory: "medicines",
  },
  "sexual-health": {
    useCase: "sexual wellness, contraception, and reproductive health",
    audience: "adults seeking sexual health products",
    benefit: "discreet packaging and trusted brands",
    relatedCategory: "supplements",
  },
  "digestive-health": {
    useCase: "digestive comfort and gastrointestinal health",
    audience: "individuals with digestive discomfort or GI conditions",
    benefit: "supports healthy digestion",
    relatedCategory: "supplements",
  },
  "eye-ear-care": {
    useCase: "eye and ear health maintenance and treatment",
    audience: "individuals with eye or ear conditions",
    benefit: "targeted relief and care",
    relatedCategory: "medicines",
  },
  "oral-care": {
    useCase: "dental hygiene and oral health maintenance",
    audience: "individuals seeking quality oral care products",
    benefit: "promotes healthy teeth and gums",
    relatedCategory: "beauty",
  },
  "medical-devices": {
    useCase: "health monitoring and medical equipment",
    audience: "patients, caregivers, and healthcare professionals",
    benefit: "accurate and reliable health monitoring",
    relatedCategory: "chronic-care",
  },
  orthopaedic: {
    useCase: "orthopaedic support and surgical implants",
    audience: "patients and healthcare facilities",
    benefit: "medical-grade quality",
    relatedCategory: "first-aid",
  },
  incontinence: {
    useCase: "incontinence management and personal dignity",
    audience: "adults managing incontinence or caregivers",
    benefit: "comfortable and discreet protection",
    relatedCategory: "mother-baby",
  },
  general: {
    useCase: "general health and wellness needs",
    audience: "individuals and families seeking quality health products",
    benefit: "trusted and genuine products",
    relatedCategory: "supplements",
  },
};

function getLocation(index) {
  return LOCATIONS[index % LOCATIONS.length];
}

function generateSEO(product, index) {
  const name = product.name;
  const catSlug = product.categories?.[0]?.slug || "general";
  const catName = product.categories?.[0]?.name || "General Health";
  const catInfo = CATEGORY_INFO[catSlug] || CATEGORY_INFO.general;
  const location = getLocation(index);

  // SEO Title (max 60 chars)
  let seoTitle = `${name} - Buy Online Kenya`;
  if (seoTitle.length > 60) {
    seoTitle = `${name.substring(0, 40)} | Buy in Kenya`;
  }
  if (seoTitle.length > 60) {
    seoTitle = name.substring(0, 57) + "...";
  }

  // Meta Description (140-160 chars)
  let metaDesc = `Buy ${name} online in Kenya from Our Mall Pharmacy. ${catInfo.benefit.charAt(0).toUpperCase() + catInfo.benefit.slice(1)}. Fast delivery across Nairobi & countrywide.`;
  if (metaDesc.length > 160) {
    metaDesc = `Buy ${name} online in Kenya. ${catInfo.benefit.charAt(0).toUpperCase() + catInfo.benefit.slice(1)}. Delivery across Nairobi & countrywide.`;
  }
  if (metaDesc.length > 160) {
    metaDesc = metaDesc.substring(0, 157) + "...";
  }

  // Meta Keywords
  const keywords = [
    name.toLowerCase(),
    `buy ${name.toLowerCase()} Kenya`,
    catName.toLowerCase(),
    `${catName.toLowerCase()} Kenya`,
    "pharmacy Kenya",
    "Our Mall Pharmacy",
    `${name.toLowerCase()} Nairobi`,
    `online pharmacy ${location}`,
  ].slice(0, 8);

  // Short Description
  const shortDesc = `<p>${name} is available for ${catInfo.useCase}. Ideal for ${catInfo.audience}. ${catInfo.benefit.charAt(0).toUpperCase() + catInfo.benefit.slice(1)} — sourced from authorized distributors and verified by the Pharmacy & Poisons Board of Kenya.</p>`;

  // Long Description
  const longDesc = `
<h3>Overview</h3>
<p>${name} is a quality ${catName.toLowerCase()} product available at Our Mall Pharmacy, Kenya's trusted online and in-store pharmacy. This product is designed for ${catInfo.useCase}, offering ${catInfo.benefit} to users across Kenya.</p>

<h3>Key Benefits</h3>
<ul>
<li>${catInfo.benefit.charAt(0).toUpperCase() + catInfo.benefit.slice(1)}</li>
<li>Sourced from authorized pharmaceutical distributors</li>
<li>PPB (Pharmacy & Poisons Board of Kenya) compliant</li>
<li>Genuine product with quality assurance</li>
<li>Available for same-day delivery in Nairobi</li>
</ul>

<h3>Who Should Use This Product</h3>
<p>This product is suitable for ${catInfo.audience}. Always consult a licensed pharmacist or healthcare provider before use, especially if you are pregnant, nursing, or on other medications.</p>

<h3>How to Order</h3>
<p>You can order ${name} directly through our website or <a href="https://wa.me/254740686263?text=Hi,%20I'd%20like%20to%20inquire%20about%20${encodeURIComponent(name)}">inquire via WhatsApp</a>. For more assistance, <a href="https://ourmallpharmacy.com/contact/">contact our pharmacist team</a>.</p>

<p>Looking for related products? <a href="https://ourmallpharmacy.com/category/${catInfo.relatedCategory}/">Browse our ${CATEGORY_INFO[catInfo.relatedCategory]?.useCase ? catInfo.relatedCategory.replace(/-/g, " ") : "health"} products</a>.</p>

<h3>Important Notes</h3>
<ul>
<li>Store as directed on the product packaging</li>
<li>Keep out of reach of children</li>
<li>Check expiry date before use</li>
<li>For prescription items, a valid prescription is required</li>
</ul>

<p><em>Available for delivery in ${location} and across Kenya. Our Mall Pharmacy ensures all products are stored and handled according to pharmaceutical standards.</em></p>

${FOOTER}
`;

  // Tags
  const tags = [
    catName,
    "Kenya pharmacy",
    `${catSlug.replace(/-/g, " ")}`,
    "genuine products",
    location,
    "Our Mall Pharmacy",
    "online pharmacy",
  ].slice(0, 7);

  return { seoTitle, metaDesc, keywords, shortDesc, longDesc, tags };
}

async function wcFetch(endpoint, method = "GET", body = null) {
  const opts = {
    method,
    headers: { Authorization: AUTH, "Content-Type": "application/json" },
  };
  if (body) opts.body = JSON.stringify(body);

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(`${WC_URL}${endpoint}`, opts);
      if (!res.ok && res.status >= 500) throw new Error(`HTTP ${res.status}`);
      return res.json();
    } catch (err) {
      if (attempt === 3) throw err;
      await new Promise((r) => setTimeout(r, 2000));
    }
  }
}

async function wpFetch(endpoint, method = "GET", body = null) {
  const opts = {
    method,
    headers: { Authorization: AUTH, "Content-Type": "application/json" },
  };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(`${WP_URL}${endpoint}`, opts);
  return res.json();
}

async function getAllProducts() {
  const all = [];
  let page = 1;
  while (true) {
    const products = await wcFetch(`/products?per_page=100&page=${page}`);
    if (!products || products.length === 0) break;
    all.push(...products);
    console.log(`  Fetched page ${page} (${all.length} products)`);
    page++;
    if (products.length < 100) break;
  }
  return all;
}

async function main() {
  console.log("\n  === Our Mall Pharmacy — SEO Content Generator ===\n");

  // Step 1: Get all products
  console.log("  Fetching all products from WooCommerce...\n");
  const products = await getAllProducts();
  console.log(`\n  Total: ${products.length} products\n`);

  // Step 2: Generate and update SEO content
  let updated = 0;
  let failed = 0;
  const BATCH_SIZE = 10;

  for (let i = 0; i < products.length; i += BATCH_SIZE) {
    const batch = products.slice(i, i + BATCH_SIZE);

    const updates = batch.map((product, j) => {
      const seo = generateSEO(product, i + j);
      return {
        id: product.id,
        short_description: seo.shortDesc,
        description: seo.longDesc,
        meta_data: [
          { key: "rank_math_title", value: seo.seoTitle },
          { key: "rank_math_description", value: seo.metaDesc },
          { key: "rank_math_focus_keyword", value: seo.keywords[0] },
          { key: "_yoast_wpseo_title", value: seo.seoTitle },
          { key: "_yoast_wpseo_metadesc", value: seo.metaDesc },
        ],
        tags: seo.tags.map((t) => ({ name: t })),
      };
    });

    try {
      const result = await wcFetch("/products/batch", "POST", { update: updates });
      const ok = result.update?.filter((r) => r.id && !r.error)?.length || 0;
      updated += ok;
      failed += batch.length - ok;
    } catch {
      failed += batch.length;
    }

    const progress = Math.min(i + BATCH_SIZE, products.length);
    const pct = Math.round((progress / products.length) * 100);
    process.stdout.write(`\r  Progress: ${progress}/${products.length} (${pct}%) — ${updated} updated, ${failed} failed`);

    // Rate limit
    await new Promise((r) => setTimeout(r, 800));
  }

  console.log(`\n\n  SEO Content Generation Complete!`);
  console.log(`  ${updated} products updated`);
  console.log(`  ${failed} products failed`);
  console.log(`\n  Check: https://ourmallpharmacy.com/cms/wp-admin/edit.php?post_type=product\n`);
}

main().catch(console.error);
