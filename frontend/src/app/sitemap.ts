import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://onlinemegapharmacy.co.ke";

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
    "/category/pain-relief",
    "/category/supplements",
    "/category/beauty",
    "/category/mother-baby",
    "/category/chronic-care",
    "/category/cold-flu",
    "/category/first-aid",
    "/category/sexual-health",
    "/category/digestive-health",
    "/category/eye-ear-care",
    "/category/oral-care",
    "/category/medical-devices",
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
