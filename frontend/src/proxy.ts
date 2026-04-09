import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Rate limit store (in-memory, resets on restart)
const rateLimit = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 100; // max requests per window

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimit.get(ip);

  if (!record || now > record.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }

  record.count++;
  return record.count > RATE_LIMIT_MAX;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get client IP for rate limiting
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  // Rate limit API-like routes
  if (pathname.startsWith("/api") && isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  const response = NextResponse.next();

  // Remove server info headers
  response.headers.delete("x-powered-by");
  response.headers.delete("server");

  // Add security headers
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  response.headers.set("X-XSS-Protection", "1; mode=block");

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
