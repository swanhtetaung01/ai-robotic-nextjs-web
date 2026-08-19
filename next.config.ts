import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /* Next 16 restricts /_next/image to an allowlist of quality values —
       without one, any caller could request q=1..100 and mint a hundred
       cache entries per image. 92 is here for the hero plate, whose dark
       gradients band at the default 75. */
    qualities: [75, 92],
  },
};

export default nextConfig;
