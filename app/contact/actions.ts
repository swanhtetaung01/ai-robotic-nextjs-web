"use server";

import { mkdir, appendFile } from "node:fs/promises";
import path from "node:path";

export type QuoteFormState = {
  status: "idle" | "error" | "success";
  /** field name → message */
  errors?: Record<string, string>;
  message?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Where leads land until a CRM/inbox is wired up (see docs/research). */
const LEADS_FILE = path.join(process.cwd(), "data", "leads.jsonl");

export async function submitQuote(
  _prev: QuoteFormState,
  formData: FormData
): Promise<QuoteFormState> {
  // Honeypot: real users never see or fill this field.
  if (formData.get("website")) {
    return { status: "success", message: "Thanks — we’ll be in touch." };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const address = String(formData.get("address") ?? "").trim();
  const robot = String(formData.get("robot") ?? "").trim();
  const facility = String(formData.get("facility") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Enter your name.";
  if (!EMAIL_RE.test(email)) errors.email = "Enter a valid email address.";
  if (phone.replace(/\D/g, "").length < 6)
    errors.phone = "Enter a phone number we can reach you on.";

  if (Object.keys(errors).length > 0) {
    return { status: "error", errors };
  }

  const lead = {
    receivedAt: new Date().toISOString(),
    name,
    email,
    phone,
    company: company || null,
    address: address || null,
    robot: robot || null,
    facility: facility || null,
    message: message || null,
  };

  try {
    await mkdir(path.dirname(LEADS_FILE), { recursive: true });
    await appendFile(LEADS_FILE, JSON.stringify(lead) + "\n", "utf8");
  } catch (err) {
    console.error("[quote] failed to persist lead", err, lead);
    return {
      status: "error",
      message:
        "Something went wrong on our side. Please try again, or email us directly.",
    };
  }

  console.log("[quote] new lead", lead.email, lead.robot ?? "(no model)");
  return {
    status: "success",
    message:
      "Quote request received. We’ll come back to you within one business day.",
  };
}
