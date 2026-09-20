"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/data/site";

export type FormField = {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "date" | "select" | "textarea" | "file";
  required?: boolean;
  options?: string[] | { value: string; label: string }[];
  placeholder?: string;
  hint?: string;
  span?: 1 | 2;
  autoComplete?: string;
};

const MAX_FILES = 3;
const MAX_TOTAL_BYTES = 4 * 1024 * 1024;

type CardProps = {
  fields: FormField[];
  submit: string;
  success: string;
  defaults?: Record<string, string>;
  /** Page the enquiry came from, included in the email subject. */
  source: string;
};

/**
 * The form itself, as a card. Fields are described by data so each business
 * area can ask for exactly what its team needs. Submissions go to
 * /api/enquiry, which forwards them by email.
 */
export function EnquiryFormCard({ fields, submit, success, defaults = {}, source }: CardProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const files = data.getAll("files").filter((f): f is File => f instanceof File && f.size > 0);
    const total = files.reduce((n, f) => n + f.size, 0);
    if (files.length > MAX_FILES || total > MAX_TOTAL_BYTES) {
      setStatus("error");
      setMessage(`Please attach up to ${MAX_FILES} files totalling 4 MB or less.`);
      return;
    }
    data.append("source", source);

    setStatus("sending");
    setMessage(null);
    try {
      const res = await fetch("/api/enquiry", { method: "POST", body: data });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) throw new Error(json.error || "Request failed");
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error && err.message !== "Request failed" ? err.message : null);
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="rounded-[1.6rem] bg-paper p-8 ring-1 ring-black/5 lg:p-10">
        <p className="eyebrow mb-4">Sent</p>
        <p className="display text-[1.8rem] leading-[1.1] text-ink sm:text-[2.2rem]">{success}</p>
        <button type="button" onClick={() => setStatus("idle")} className="btn btn-ghost mt-8">
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="relative rounded-[1.6rem] bg-paper p-6 ring-1 ring-black/5 sm:p-8 lg:p-10">
      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((f) => (
          <Field key={f.name} field={f} defaultValue={defaults[f.name]} />
        ))}
      </div>

      {/* Honeypot — hidden from people, filled by bots. */}
      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden>
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" disabled={status === "sending"} className="btn btn-primary disabled:opacity-60">
          {status === "sending" ? "Sending…" : submit}
          {status !== "sending" && <span className="arrow">→</span>}
        </button>
        <p className="text-[0.8rem] leading-snug text-ink-dim">We use what you share only to respond to this enquiry.</p>
      </div>

      {status === "error" && (
        <p role="alert" className="mt-6 rounded-xl bg-brand-tint px-4 py-3 text-[0.95rem] text-brand-ink">
          {message ?? (
            <>
              We could not send your enquiry. Please try again or email us at{" "}
              <a href={`mailto:${site.email}`} className="font-semibold underline">
                {site.email}
              </a>
              .
            </>
          )}
        </p>
      )}
    </form>
  );
}

/** Full-width enquiry section: heading on the left, form card on the right. */
export default function EnquiryForm({
  id = "enquiry-form",
  headline,
  intro,
  tone = "paper-2",
  ...card
}: CardProps & {
  id?: string;
  headline: string;
  intro?: string;
  tone?: "paper" | "paper-2";
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 border-t border-line py-24 lg:py-36 ${tone === "paper" ? "bg-paper" : "bg-paper-2"}`}
    >
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-5">Enquiry</p>
            <h2 className="display text-[2.4rem] leading-[1.02] text-ink sm:text-[3rem]">{headline}</h2>
            {intro && <p className="mt-6 text-lg leading-relaxed text-ink-muted">{intro}</p>}
            <p className="mt-8 text-[0.95rem] text-ink-muted">
              Prefer email?{" "}
              <a href={`mailto:${site.email}`} className="link-draw">
                {site.email}
              </a>
            </p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <EnquiryFormCard {...card} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ field, defaultValue }: { field: FormField; defaultValue?: string }) {
  const id = `f-${field.name}`;
  const span = field.span === 2 || field.type === "textarea" ? "sm:col-span-2" : "";

  return (
    <div className={`field ${span}`}>
      <label htmlFor={id}>
        {field.label}
        {field.required && (
          <span className="req" aria-hidden>
            *
          </span>
        )}
      </label>
      {field.type === "select" ? (
        <select id={id} name={field.name} required={field.required} defaultValue={defaultValue ?? ""}>
          <option value="" disabled>
            Select…
          </option>
          {(field.options ?? []).map((o) => {
            const opt = typeof o === "string" ? { value: o, label: o } : o;
            return (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            );
          })}
        </select>
      ) : field.type === "textarea" ? (
        <textarea
          id={id}
          name={field.name}
          required={field.required}
          placeholder={field.placeholder}
          defaultValue={defaultValue}
          rows={5}
        />
      ) : field.type === "file" ? (
        <input id={id} name={field.name} type="file" multiple accept="image/*,.pdf,.doc,.docx,.xls,.xlsx" />
      ) : (
        <input
          id={id}
          name={field.name}
          type={field.type}
          required={field.required}
          placeholder={field.placeholder}
          autoComplete={field.autoComplete}
          defaultValue={defaultValue}
        />
      )}
      {field.hint && <p className="hint">{field.hint}</p>}
    </div>
  );
}
