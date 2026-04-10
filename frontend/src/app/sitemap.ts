import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ourmallpharmacy.com";

  const staticPages = [
    "",
    "/shop",
    "/categories",
    "/prescription",
    "/health",
    "/find-clinic",
    "/track-order",
    "/about",
    "/contact",
    "/terms",
    "/privacy",
    "/shipping",
    "/returns",
  ];

  const categoryPages = [
    "/category/medicines",
    "/category/general",
    "/category/beauty",
    "/category/supplements",
    "/category/cold-flu",
    "/category/eye-ear-care",
    "/category/first-aid",
    "/category/sexual-health",
    "/category/mother-baby",
    "/category/medical-devices",
    "/category/digestive-health",
    "/category/pain-relief",
    "/category/oral-care",
    "/category/chronic-care",
    "/category/incontinence",
  ];

  return [
    ...staticPages.map((path) => ({
      url: `${siteUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: path === "" ? "daily" as const : "weekly" as const,
      priority: path === "" ? 1 : path === "/shop" ? 0.9 : 0.7,
    })),
    ...categoryPages.map((path) => ({
      url: `${siteUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
