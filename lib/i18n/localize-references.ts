import { references as source, type Reference } from "@/lib/references";
import type { Dictionary } from "./dictionary";

/* Customer quotes are attributed to named people. The Thai file translates
 * them; the key scheme keeps each one tied to its source entry so a quote can
 * never be paired with the wrong attribution. */
export function localizeReferences(dict: Dictionary): Reference[] {
  return source.map((ref) => {
    const p = `REF.${ref.slug.replace(/-/g, "")}`;
    const pick = (k: string, fallback: string) => dict[`${p}.${k}`] ?? fallback;
    return {
      ...ref,
      quote: pick("quote", ref.quote),
      role: pick("role", ref.role),
      location: pick("location", ref.location),
      sector: pick("sector", ref.sector),
      outcome: ref.outcome ? pick("outcome", ref.outcome) : undefined,
    };
  });
}
