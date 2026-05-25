"use client";

import { useState, useRef } from "react";
import { useLangContent, useLanguage } from "@/contexts/LanguageContext";

type FormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;
type Touched = Partial<Record<keyof FormData, boolean>>;

const initialData: FormData = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

const MESSAGE_MAX = 2000;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function GeneralConsultationForm() {
  const { general_form } = useLangContent().consultations;
  const { lang } = useLanguage();
  const loadTime = useRef(Date.now());
  const [formData, setFormData] = useState<FormData>(initialData);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Touched>({});

  const validate = (data: FormData): FieldErrors => {
    const e = general_form.errors;
    const errs: FieldErrors = {};
    if (!data.name || data.name.trim().length < 2) errs.name = e.name;
    if (!data.email || !EMAIL_RE.test(data.email)) errs.email = e.email;
    if (!data.message || data.message.trim().length < 5) errs.message = e.message;
    return errs;
  };

  const handleBlur = (field: "name" | "email" | "message") => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setFieldErrors((prev) => ({ ...prev, [field]: validate(formData)[field] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched: Touched = { name: true, email: true, phone: true, message: true };
    setTouched(allTouched);
    const errs = validate(formData);
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) {
      const firstErr = (["name", "email", "message"] as const).find((k) => errs[k]);
      if (firstErr) document.getElementById(firstErr)?.focus();
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formType: "general", lang, ...formData, _hp: "", _t: Date.now() - loadTime.current }),
      });
      const isJson = res.headers.get("content-type")?.includes("application/json");
      const json = isJson ? await res.json() : {};
      if (!res.ok || !json.success) {
        setError(json.error || general_form.server_error);
      } else {
        setSubmitted(true);
      }
    } catch {
      setError(general_form.network_error);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div
        className="p-10 md:p-12 flex flex-col items-center justify-center text-center min-h-64"
        style={{ border: "1px solid var(--color-sand-300)" }}
        role="status"
        aria-live="polite"
      >
        <div
          className="w-10 h-10 flex items-center justify-center mb-5"
          style={{ backgroundColor: "var(--color-navy-900)" }}
        >
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
            <path d="M1 6L6 11L15 1" stroke="#F8F7F4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="font-serif text-2xl font-medium mb-2" style={{ color: "var(--color-navy-900)" }}>
          {general_form.success_title}
        </p>
        <p className="font-sans text-sm" style={{ color: "var(--color-sand-600)" }}>
          {general_form.success}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Honeypot — ukryte przed ludźmi, widoczne dla botów */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}>
        <label htmlFor="g-website">Strona internetowa</label>
        <input id="g-website" name="website" type="text" defaultValue="" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="space-y-7">
        {/* Name */}
        <FormField
          label={general_form.fields.name.label}
          id="name"
          required
          error={touched.name ? fieldErrors.name : undefined}
        >
          <input
            id="name"
            type="text"
            name="name"
            autoComplete="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            onBlur={() => handleBlur("name")}
            placeholder={general_form.fields.name.placeholder}
            aria-invalid={touched.name && !!fieldErrors.name}
            aria-describedby={touched.name && fieldErrors.name ? "name-error" : undefined}
            className="pcw-input"
            style={inputStyle(touched.name && !!fieldErrors.name)}
          />
        </FormField>

        {/* Email */}
        <FormField
          label={general_form.fields.email.label}
          id="email"
          required
          error={touched.email ? fieldErrors.email : undefined}
        >
          <input
            id="email"
            type="email"
            name="email"
            autoComplete="email"
            inputMode="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            onBlur={() => handleBlur("email")}
            placeholder={general_form.fields.email.placeholder}
            aria-invalid={touched.email && !!fieldErrors.email}
            aria-describedby={touched.email && fieldErrors.email ? "email-error" : undefined}
            className="pcw-input"
            style={inputStyle(touched.email && !!fieldErrors.email)}
          />
        </FormField>

        {/* Phone (optional) */}
        <FormField
          label={general_form.fields.phone.label}
          id="phone"
          helperText={general_form.fields.phone.helper}
        >
          <input
            id="phone"
            type="tel"
            name="phone"
            autoComplete="tel"
            inputMode="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder={general_form.fields.phone.placeholder}
            aria-describedby="phone-hint"
            className="pcw-input"
            style={inputStyle()}
          />
        </FormField>

        {/* Message */}
        <FormField
          label={general_form.fields.message.label}
          id="message"
          required
          error={touched.message ? fieldErrors.message : undefined}
        >
          <div style={{ position: "relative" }}>
            <textarea
              id="message"
              name="message"
              rows={5}
              maxLength={MESSAGE_MAX}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              onBlur={() => handleBlur("message")}
              placeholder={general_form.fields.message.placeholder}
              aria-invalid={touched.message && !!fieldErrors.message}
              aria-describedby={touched.message && fieldErrors.message ? "message-error" : undefined}
              className="pcw-input"
              style={{ ...inputStyle(touched.message && !!fieldErrors.message), resize: "vertical" }}
            />
            <p
              className="font-sans text-xs mt-1.5 text-right tabular-nums"
              style={{ color: formData.message.length > MESSAGE_MAX * 0.9 ? "var(--color-red-600)" : "var(--color-sand-400)" }}
              aria-live="polite"
            >
              {formData.message.length} / {MESSAGE_MAX}
            </p>
          </div>
        </FormField>
      </div>

      {/* Submit */}
      <div className="mt-10">
        {error && (
          <p
            className="font-sans text-sm mb-4 p-3 flex items-start gap-2"
            style={{ color: "var(--color-red-600)", border: "1px solid var(--color-red-600)", backgroundColor: "rgba(196,32,33,0.05)" }}
            role="alert"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="flex-shrink-0 mt-0.5">
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.3" />
              <path d="M8 5v3.5M8 10.5v.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full font-sans text-sm font-medium py-4 transition-all duration-200 hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
          style={{
            backgroundColor: "var(--color-navy-900)",
            color: "var(--color-cream)",
          }}
        >
          {loading ? general_form.loading : general_form.submit}
        </button>
        <p className="font-sans text-xs mt-4 text-center" style={{ color: "var(--color-sand-500)" }}>
          {general_form.disclaimer}
        </p>
      </div>
    </form>
  );
}

function FormField({
  label,
  id,
  children,
  required,
  error,
  helperText,
}: {
  label: string;
  id: string;
  children: React.ReactNode;
  required?: boolean;
  error?: string;
  helperText?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block font-sans text-xs font-medium uppercase tracking-widest mb-2.5"
        style={{ color: "var(--color-navy-700)", letterSpacing: "0.1em" }}
      >
        {label}
        {required && (
          <span className="ml-1" style={{ color: "var(--color-red-600)" }} aria-label="wymagane">
            *
          </span>
        )}
      </label>
      {children}
      {helperText && !error && (
        <p
          id={`${id}-hint`}
          className="font-sans text-xs mt-1.5"
          style={{ color: "var(--color-sand-500)" }}
        >
          {helperText}
        </p>
      )}
      {error && (
        <p
          id={`${id}-error`}
          className="font-sans text-xs mt-1.5 flex items-center gap-1.5"
          style={{ color: "var(--color-red-600)" }}
          role="alert"
          aria-live="polite"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" className="flex-shrink-0">
            <circle cx="6" cy="6" r="5.25" stroke="currentColor" strokeWidth="1.25" />
            <path d="M6 3.75V6.25M6 8v.25" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

const inputStyle = (isError?: boolean): React.CSSProperties => ({
  width: "100%",
  padding: "0.875rem 1rem",
  fontFamily: "var(--font-sans)",
  fontSize: "0.875rem",
  color: "var(--color-navy-900)",
  backgroundColor: "var(--color-cream)",
  border: `1px solid ${isError ? "var(--color-red-600)" : "var(--color-sand-300)"}`,
  outline: "none",
  display: "block",
});
