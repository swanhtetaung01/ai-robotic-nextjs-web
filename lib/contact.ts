import type { Locale } from "@/lib/i18n/config";

/** Company contact details, in one place so the contact page and anything
 *  added later (footer, structured data) read the same values. */
export const contact = {
  phone: {
    /** as printed */
    display: "02-576-5566",
    /** E.164 for the tel: link — a Bangkok landline, national 0 dropped */
    dial: "+6625765566",
  },
  email: "sales@raaspal.com",
  line: {
    id: "@raaspal",
    qr: "/contact_lineQR.png",
    /** Opens the LINE add-friend page; the id without its leading @ */
    url: "https://line.me/R/ti/p/@raaspal",
  },
};

/** Street address, per locale — a Thai company's address reads differently in
 *  each script, so it isn't one shared string.
 *
 *  Empty until confirmed. The page renders no address block rather than a
 *  placeholder: a wrong address on a contact page is worse than none. */
export const contactAddress: Record<Locale, string[]> = {
  en: [],
  th: [],
};
