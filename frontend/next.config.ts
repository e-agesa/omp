import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""};
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data: https: ${process.env.NEXT_PUBLIC_WORDPRESS_URL || "http://localhost"};
  font-src 'self' data:;
  connect-src 'self' ${process.env.NEXT_PUBLIC_OMP_API_URL || "http://localhost"} ${process.env.NEXT_PUBLIC_WOOCOMMERCE_URL || "http://localhost"} https://api.safaricom.co.ke;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';${isDev ? "" : "\n  upgrade-insecure-requests;"}
`;

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: cspHeader.replace(/\n/g, "").replace(/\s{2,}/g, " ").trim(),
  },
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  ...(isDev
    ? []
    : [
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
      ]),
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(self), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  output: "export",
  allowedDevOrigins: ["192.168.1.119"],
  trailingSlash: true,

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "**.onlinemegapharmacy.co.ke",
      },
      {
        protocol: "https",
        hostname: "**.ourmallpharmacy.com",
      },
    ],
  },

  // Security headers handled by LiteSpeed/.htaccess in production
  // async headers() not supported with output: "export"
};

export default nextConfig;
