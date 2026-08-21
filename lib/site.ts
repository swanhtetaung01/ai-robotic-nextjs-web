/** Canonical origin. Vercel sets VERCEL_PROJECT_PRODUCTION_URL automatically,
 *  but the custom domain is the canonical one, so it wins. Override with
 *  NEXT_PUBLIC_SITE_URL if the domain ever changes. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://airoboticsth.com";
