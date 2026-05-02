import type { NextConfig } from "next";

const DEV_FALLBACK_CMS_HOST = "istch.webtesting.pw";

/** Allow hero/CMS images hosted on the same host as COMPANY_API_DOMAIN. */
function companyApiImagePatterns(): {
  protocol: "http" | "https";
  hostname: string;
}[] {
  const raw = process.env.COMPANY_API_DOMAIN?.trim();
  if (!raw) {
    if (process.env.NODE_ENV === "development") {
      return [{ protocol: "https", hostname: DEV_FALLBACK_CMS_HOST }];
    }
    return [];
  }
  try {
    const base = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
    const u = new URL(base);
    const protocol = u.protocol === "http:" ? "http" : "https";
    if (!u.hostname) return [];
    return [{ protocol, hostname: u.hostname }];
  } catch {
    return [];
  }
}

const nextConfig: NextConfig = {
  images: {
    // Required when `next/image` uses local src with a query string (e.g. CMS returns `?v=2`).
    // Omitting `search` allows any query (or none) for these paths.
    localPatterns: [{ pathname: '/**' }],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
      {
        protocol: 'https',
        hostname: 'backend-lamipak.webtesting.pw',
      },
      {
        protocol: 'http',
        hostname: 'backend-lamipak.webtesting.pw',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      ...companyApiImagePatterns(),
    ],
  },
};

export default nextConfig;
