import { NextResponse } from "next/server";
import { site } from "@/data/site";

/**
 * Receives every enquiry form on the site and forwards it by email.
 *
 * Delivery uses Resend's REST API when these environment variables are set on Vercel:
 *   RESEND_API_KEY  — API key from resend.com
 *   ENQUIRY_TO      — inbox that receives enquiries (comma-separated for several)
 *   ENQUIRY_FROM    — verified sender, e.g. "Fantasia Website <enquiries@fantasia.lk>"
 * Without them the enquiry is logged on the server and the visitor still sees the
 * success message, so the site can be reviewed before the mailbox is confirmed.
 */

export const runtime = "nodejs";

const MAX_FILES = 3;
const MAX_TOTAL_BYTES = 4 * 1024 * 1024;
const ALLOWED_TYPES = /^(image\/|application\/pdf|application\/msword|application\/vnd\.openxmlformats-officedocument\.|application\/vnd\.ms-excel)/;

const LABELS: Record<string, string> = {
  name: "Name",
  company: "Company",
  role: "Role",
  email: "Email",
  phone: "Phone",
  country: "Country",
  area: "Business area",
  productType: "Product type",
  specification: "Specification or grade",
  endUse: "End use",
  process: "Production process",
  grade: "Polymer type or current grade",
  basePolymer: "Base polymer",
  width: "Width",
  composition: "Composition",
  colour: "Colour",
  stretch: "Stretch requirement",
  quantity: "Quantity",
  requiredDate: "Required date",
  requirement: "Requirement",
  message: "Message",
};

/* Best-effort throttle per IP; resets whenever the function instance is recycled. */
const hits = new Map<string, number[]>();
function throttled(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 8;
}

const clean = (v: FormDataEntryValue | null) => (typeof v === "string" ? v.trim().slice(0, 4000) : "");

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (throttled(ip)) {
    return NextResponse.json({ ok: false, error: "Too many enquiries from this connection. Please try again later." }, { status: 429 });
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid form data" }, { status: 400 });
  }

  // Honeypot: real visitors never see this field.
  if (clean(form.get("website"))) return NextResponse.json({ ok: true });

  const name = clean(form.get("name"));
  const email = clean(form.get("email"));
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Please enter your name and a valid email address." }, { status: 400 });
  }

  const files = form.getAll("files").filter((f): f is File => f instanceof File && f.size > 0);
  const total = files.reduce((n, f) => n + f.size, 0);
  if (files.length > MAX_FILES || total > MAX_TOTAL_BYTES || files.some((f) => !ALLOWED_TYPES.test(f.type))) {
    return NextResponse.json(
      { ok: false, error: "Attachments must be images, PDF or Office documents — up to 3 files and 4 MB in total." },
      { status: 400 },
    );
  }

  const source = clean(form.get("source")) || "/";
  const area = clean(form.get("area"));
  const lines: string[] = [];
  for (const [key, label] of Object.entries(LABELS)) {
    const value = clean(form.get(key));
    if (value) lines.push(`${label}: ${value}`);
  }
  lines.push(`Page: ${source}`);
  if (files.length) lines.push(`Attachments: ${files.map((f) => `${f.name} (${Math.round(f.size / 1024)} KB)`).join(", ")}`);

  const subject = `Website enquiry — ${area || source.replace("/businesses/", "").replace("/", "") || "general"} — ${name}`;
  const text = lines.join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO;
  if (!apiKey || !to) {
    console.info(`[enquiry] (not delivered — RESEND_API_KEY / ENQUIRY_TO unset)\n${subject}\n${text}`);
    return NextResponse.json({ ok: true, delivered: false });
  }

  const attachments = await Promise.all(
    files.map(async (f) => ({ filename: f.name, content: Buffer.from(await f.arrayBuffer()).toString("base64") })),
  );

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.ENQUIRY_FROM ?? `${site.name} Website <onboarding@resend.dev>`,
      to: to.split(",").map((s) => s.trim()),
      reply_to: email,
      subject,
      text,
      attachments,
    }),
  });

  if (!res.ok) {
    console.error("[enquiry] Resend error", res.status, await res.text().catch(() => ""));
    return NextResponse.json({ ok: false }, { status: 502 });
  }
  return NextResponse.json({ ok: true, delivered: true });
}
