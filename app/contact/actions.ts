"use server";

import { getRobot } from "@/lib/robots";

export type QuoteFormState = {
  status: "idle" | "error" | "success";
  /** field name → message */
  errors?: Record<string, string>;
  message?: string;
};

type Lead = {
  receivedAt: string;
  name: string;
  email: string;
  phone: string;
  company: string | null;
  address: string | null;
  robot: string | null;
  facility: string | null;
  message: string | null;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Local-dev sink, loaded lazily so production never imports node:fs at all.
 *  Serverless filesystems are read-only; email is the real destination. */
async function writeDevSink(lead: Lead) {
  const [{ mkdir, appendFile }, path] = await Promise.all([
    import("node:fs/promises"),
    import("node:path"),
  ]);
  const file = path.join(process.cwd(), "data", "leads.jsonl");
  await mkdir(path.dirname(file), { recursive: true });
  await appendFile(file, `${JSON.stringify(lead)}\n`, "utf8");
}

/** Lead fields are attacker-controlled and land inside an HTML email body. */
function esc(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function rows(lead: Lead) {
  const robot = lead.robot ? getRobot(lead.robot) : undefined;
  return [
    ["Name", lead.name],
    ["Email", lead.email],
    ["Phone", lead.phone],
    ["Company", lead.company],
    ["Address", lead.address],
    ["Interested robot", robot ? `${robot.model} — ${robot.kind}` : lead.robot],
    ["Facility size", lead.facility],
    ["Message", lead.message],
  ].filter(([, v]) => v) as [string, string][];
}

function renderEmail(lead: Lead) {
  const list = rows(lead);
  const text = list.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html = `<table style="border-collapse:collapse;font-family:system-ui,sans-serif;font-size:14px">
${list
  .map(
    ([k, v]) =>
      `<tr><td style="padding:6px 16px 6px 0;color:#4c515b;vertical-align:top">${esc(
        k
      )}</td><td style="padding:6px 0;color:#0a0b0e"><strong>${esc(
        v
      )}</strong></td></tr>`
  )
  .join("\n")}
</table>`;
  return { text, html };
}

/** Resend's REST API directly — one POST, so the SDK would be a dependency
 *  to maintain for no gain. Throws on non-2xx so the caller can log the lead. */
async function sendQuoteEmail(lead: Lead) {
  const apiKey = process.env.RESEND_API_KEY!;
  const from =
    process.env.QUOTE_FROM_EMAIL ?? "AI Robotic <quotes@airoboticsth.com>";
  const to = process.env.QUOTE_TO_EMAIL;
  if (!to) throw new Error("QUOTE_TO_EMAIL is not set");

  const cc = (process.env.QUOTE_CC_EMAILS ?? "")
    .split(",")
    .map((a) => a.trim())
    .filter(Boolean);

  const robot = lead.robot ? getRobot(lead.robot) : undefined;
  const { text, html } = renderEmail(lead);

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      ...(cc.length ? { cc } : {}),
      // so sales can reply straight to the customer
      reply_to: lead.email,
      subject: robot
        ? `Quote request · ${robot.model} — ${lead.name}`
        : `Quote request — ${lead.name}`,
      text,
      html,
    }),
  });

  if (!res.ok) {
    throw new Error(`Resend ${res.status}: ${await res.text()}`);
  }
}

export async function submitQuote(
  _prev: QuoteFormState,
  formData: FormData
): Promise<QuoteFormState> {
  // Nothing below may throw: an uncaught error in a Server Action surfaces as
  // a blank "This page couldn't load" screen instead of a form message.
  try {
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

    const lead: Lead = {
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
      if (process.env.RESEND_API_KEY) {
        await sendQuoteEmail(lead);
      } else {
        // No key configured — local development.
        await writeDevSink(lead);
      }
    } catch (err) {
      // Log the whole lead, not just the error: this is the only remaining
      // copy, and it can be recovered by hand from the platform logs.
      console.error("[quote] DELIVERY FAILED — lead follows", err);
      console.error("[quote] LEAD", JSON.stringify(lead));
      return {
        status: "error",
        message:
          "We couldn’t submit your request. Please email us directly at quotes@airoboticsth.com and we’ll pick it up straight away.",
      };
    }

    console.log("[quote] new lead", lead.email, lead.robot ?? "(no model)");
    return {
      status: "success",
      message:
        "Quote request received. We’ll come back to you within one business day.",
    };
  } catch (err) {
    console.error("[quote] UNEXPECTED ACTION FAILURE", err);
    return {
      status: "error",
      message:
        "Something went wrong. Please email us directly at quotes@airoboticsth.com.",
    };
  }
}
