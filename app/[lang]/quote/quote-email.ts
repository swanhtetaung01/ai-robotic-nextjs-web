import { getRobot } from "@/lib/robots";

export type Lead = {
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

/** Lead fields are attacker-controlled and land inside an HTML email body. */
function esc(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const FONT =
  "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

function detailRows(lead: Lead) {
  return [
    ["Email", lead.email],
    ["Phone", lead.phone],
    ["Company", lead.company],
    ["Address", lead.address],
    ["Facility type and size", lead.facility],
  ].filter(([, v]) => v) as [string, string][];
}

function robotLabel(lead: Lead) {
  const robot = lead.robot ? getRobot(lead.robot) : undefined;
  if (robot) return `${robot.model} — ${robot.kind}`;
  return "Not sure yet — asked for a recommendation";
}

export function quoteSubject(lead: Lead) {
  const robot = lead.robot ? getRobot(lead.robot) : undefined;
  const who = lead.company ? `${lead.name}, ${lead.company}` : lead.name;
  return robot
    ? `Quote request · ${robot.model} — ${who}`
    : `Quote request — ${who}`;
}

/** Plain-text part. Sent alongside the HTML: a multipart message with a real
 *  text alternative scores better with filters than HTML alone. */
export function quoteText(lead: Lead) {
  const lines = [
    "NEW QUOTE REQUEST",
    "",
    lead.name,
    lead.company ?? "",
    "",
    `Interested in: ${robotLabel(lead)}`,
    "",
    ...detailRows(lead).map(([k, v]) => `${k}: ${v}`),
  ];

  if (lead.message) {
    lines.push("", "Message:", lead.message);
  }

  lines.push(
    "",
    `Reply directly to this email to reach ${lead.name} at ${lead.email}.`,
    "",
    "—",
    `Sent by the quote form at airoboticsth.com`,
    new Date(lead.receivedAt).toUTCString()
  );

  return lines.filter((l, i, a) => !(l === "" && a[i - 1] === "")).join("\n");
}

/** Table-based layout with inline styles — email clients strip <style> blocks
 *  and ignore flex/grid. Light body: dark backgrounds render unpredictably and
 *  some clients force-invert them. */
export function quoteHtml(lead: Lead) {
  const firstName = lead.name.split(" ")[0];
  const received = new Date(lead.receivedAt).toUTCString();

  const rows = detailRows(lead)
    .map(
      ([k, v]) => `
          <tr>
            <td style="padding:7px 16px 7px 0;font-size:13px;color:#4c515b;vertical-align:top;white-space:nowrap">${esc(
              k
            )}</td>
            <td style="padding:7px 0;font-size:14px;color:#0a0b0e;font-weight:600">${esc(
              v
            )}</td>
          </tr>`
    )
    .join("");

  const messageBlock = lead.message
    ? `
        <tr>
          <td style="padding:4px 28px 0">
            <p style="margin:0 0 6px;font-size:11px;letter-spacing:1.2px;text-transform:uppercase;color:#4c515b">Message</p>
            <p style="margin:0;font-size:14px;line-height:1.6;color:#0a0b0e;white-space:pre-wrap">${esc(
              lead.message
            )}</p>
          </td>
        </tr>`
    : "";

  return `<div style="display:none;max-height:0;overflow:hidden;opacity:0">New quote request from ${esc(
    lead.name
  )} — ${esc(robotLabel(lead))}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f1f0ec;padding:24px 12px;font-family:${FONT}">
  <tr>
    <td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#ffffff;border:1px solid #e4e6ea;border-radius:2px">

        <tr>
          <td style="background:#12141a;padding:18px 28px">
            <span style="color:#ffffff;font-size:15px;font-weight:700;letter-spacing:2px">AI ROBOTICS</span>
          </td>
        </tr>
        <tr><td style="height:4px;background:#ff9a1f;font-size:0;line-height:0">&nbsp;</td></tr>

        <tr>
          <td style="padding:26px 28px 0">
            <p style="margin:0;font-size:11px;letter-spacing:1.4px;text-transform:uppercase;color:#4c515b">New quote request</p>
            <h1 style="margin:8px 0 0;font-size:22px;line-height:1.25;color:#0a0b0e;font-weight:700">${esc(
              lead.name
            )}</h1>
            ${
              lead.company
                ? `<p style="margin:4px 0 0;font-size:14px;color:#4c515b">${esc(
                    lead.company
                  )}</p>`
                : ""
            }
          </td>
        </tr>

        <tr>
          <td style="padding:18px 28px 0">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f1f0ec;border-left:3px solid #ff9a1f">
              <tr>
                <td style="padding:12px 16px">
                  <p style="margin:0;font-size:11px;letter-spacing:1.2px;text-transform:uppercase;color:#4c515b">Interested in</p>
                  <p style="margin:5px 0 0;font-size:16px;font-weight:700;color:#0a0b0e">${esc(
                    robotLabel(lead)
                  )}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td style="padding:20px 28px 4px">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${rows}
            </table>
          </td>
        </tr>
${messageBlock}
        <tr>
          <td style="padding:24px 28px 28px">
            <a href="mailto:${esc(lead.email)}" style="display:inline-block;background:#ff9a1f;color:#0a0b0e;padding:12px 26px;text-decoration:none;font-size:14px;font-weight:700;border-radius:2px">Reply to ${esc(
              firstName
            )}</a>
            <p style="margin:12px 0 0;font-size:12px;color:#4c515b">Or just hit reply — this email is addressed back to ${esc(
              lead.email
            )}.</p>
          </td>
        </tr>

        <tr>
          <td style="background:#f1f0ec;border-top:1px solid #e4e6ea;padding:16px 28px">
            <p style="margin:0;font-size:12px;line-height:1.5;color:#4c515b">
              Sent by the quote form at <a href="https://airoboticsth.com" style="color:#4c515b">airoboticsth.com</a><br>
              Received ${esc(received)}
            </p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>`;
}
