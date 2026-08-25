"use client";

import { useActionState } from "react";
import { submitQuote, type QuoteFormState } from "./actions";
import { robots } from "@/lib/robots";

const initialState: QuoteFormState = { status: "idle" };

const inputCls =
  "w-full rounded-sm border border-line bg-surface px-4 py-3 text-sm text-snow placeholder:text-fog/60 focus:border-amber";

function Field({
  label,
  name,
  error,
  required,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="stencil mb-2 block text-fog">
        {label}
        {required && (
          <span className="ml-1 text-amber" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${name}-error`} className="mt-2 text-xs text-danger" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function QuoteForm({ preselect }: { preselect?: string }) {
  const [state, action, pending] = useActionState(submitQuote, initialState);

  if (state.status === "success") {
    return (
      <div className="border border-amber/50 bg-surface p-10 text-center">
        <p className="font-mono text-4xl text-amber" aria-hidden="true">
          ✓
        </p>
        <h2 className="display mt-4 text-2xl text-snow">Request received</h2>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-fog">
          {state.message}
        </p>
      </div>
    );
  }

  const errors = state.errors ?? {};

  return (
    <form action={action} noValidate className="space-y-6">
      {/* Honeypot — hidden from people, tempting to bots */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Name" name="name" required error={errors.name}>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Jane Facility"
            className={inputCls}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
        </Field>
        <Field label="Company" name="company">
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            placeholder="Acme Facilities Group"
            className={inputCls}
          />
        </Field>
        <Field label="Email" name="email" required error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="jane@company.com"
            className={inputCls}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
        </Field>
        <Field label="Phone" name="phone" required error={errors.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="+1 555 000 0000"
            className={inputCls}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
        </Field>
      </div>

      <Field label="Address" name="address">
        <input
          id="address"
          name="address"
          type="text"
          autoComplete="street-address"
          placeholder="Street, city, country (optional)"
          className={inputCls}
        />
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Interested robot" name="robot">
          <select
            id="robot"
            name="robot"
            defaultValue={preselect ?? ""}
            className={inputCls}
          >
            <option value="">Not sure yet — recommend one</option>
            {robots.map((r) => (
              <option key={r.slug} value={r.slug}>
                {r.model} — {r.kind}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Facility size" name="facility">
          <input
            id="facility"
            name="facility"
            type="text"
            placeholder="e.g. 120,000 ft² warehouse"
            className={inputCls}
          />
        </Field>
      </div>

      <Field label="Anything else" name="message">
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Floor types, operating hours, current cleaning setup…"
          className={inputCls}
        />
      </Field>

      {state.message && state.status === "error" && (
        <p className="border border-danger/50 bg-surface p-4 text-sm text-danger" role="alert">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="stencil w-full rounded-sm bg-amber px-7 py-4 text-ink transition-colors hover:bg-amber-hot disabled:cursor-wait disabled:opacity-60 sm:w-auto"
      >
        {pending ? "Sending…" : "Request my quote"}
      </button>
    </form>
  );
}
