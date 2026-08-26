/* The home-page FAQ, in display order.
 *
 * Only the ids live here — the questions and answers are dictionary strings
 * under HOME.faq.<id>_q and HOME.faq.<id>_a, so they translate alongside the
 * rest of the copy. The rendered section and the FAQPage structured data both
 * read this list, so the two can never drift apart, and reordering or removing
 * an entry is a one-line change here.
 *
 * Ids are named rather than numbered: a numbered scheme silently reassigns
 * every answer below the one you delete. */
export const faqIds = [
  "tops",
  "which",
  "staff",
  "operate",
  "layout",
  "runtime",
  "safety",
  "support",
  "demo",
] as const;

export type FaqId = (typeof faqIds)[number];
