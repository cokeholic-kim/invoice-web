import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel 배포 시 standalone 모드로 빌드하여 배포 크기 최소화
  output: "standalone",

  // 보안 헤더 설정
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        {
          key: "X-Frame-Options",
          value: "DENY",
        },
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
        {
          key: "Referrer-Policy",
          value: "strict-origin-when-cross-origin",
        },
      ],
    },
  ],
};

export default nextConfig;
