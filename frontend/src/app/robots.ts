import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://onlinemegapharmacy.co.ke";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/account/", "/checkout/", "/cart/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
