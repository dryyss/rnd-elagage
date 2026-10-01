import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Les JSON de `content/` sont lus à l'exécution (admin, revalidation) : on les
  // embarque explicitement dans les fonctions serverless (Vercel).
  outputFileTracingIncludes: {
    "/*": ["./content/**/*"],
  },
  images: {
    // Photos envoyées depuis l'admin quand le stockage est Vercel Blob.
    remotePatterns: [{ protocol: "https", hostname: "*.public.blob.vercel-storage.com" }],
    formats: ["image/avif", "image/webp"],
    // Les photos changent rarement : 31 jours de cache pour les variantes optimisées.
    minimumCacheTTL: 2678400,
    qualities: [75, 85],
    deviceSizes: [360, 640, 768, 1024, 1280, 1536],
    imageSizes: [128, 260, 400, 560],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        source: "/images/(.*)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
