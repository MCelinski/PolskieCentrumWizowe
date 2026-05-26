"use client";

import { useState, useRef } from "react";
import { useLangContent, useLanguage } from "@/contexts/LanguageContext";

type FormData = {
  email: string;
  citizenship: string;
  purpose: string;
  duration: string;
  job_offer: string;
  family_in_poland: string;
};

type FieldErrors = Partial<Record<keyof FormData, string>>;
type Touched = Partial<Record<keyof FormData, boolean>>;

const initialData: FormData = {
  email: "",
  citizenship: "",
  purpose: "",
  duration: "",
  job_offer: "",
  family_in_poland: "",
};

const FIELD_ORDER: (keyof FormData)[] = ["email", "citizenship", "purpose", "duration", "job_offer", "family_in_poland"];

const FIELD_FOCUS_IDS: Record<keyof FormData, string> = {
  email: "visa-email",
  citizenship: "visa-citizenship",
  purpose: "visa-purpose",
  duration: "visa-duration",
  job_offer: "job_offer_tak",
  family_in_poland: "family_tak",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function describedBy(id: string, error?: string, helperText?: string) {
  if (error) return `${id}-error`;
  if (helperText) return `${id}-hint`;
  return undefined;
}

export default function VisaQualificationForm() {
  const { visa_form } = useLangContent().consultations;
  const { lang } = useLanguage();
  const loadTime = useRef(Date.now());
  const [formData, setFormData] = useState<FormData>(initialData);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Touched>({});

  const validate = (data: FormData): FieldErrors => {
    const e = visa_form.errors;
    const errs: FieldErrors = {};
    if (!data.email || !EMAIL_RE.test(data.email)) errs.email = e.email;
    if (!data.citizenship || data.citizenship.trim().length < 2) errs.citizenship = e.citizenship;
    if (!data.purpose) errs.purpose = e.purpose;
    if (!data.duration) errs.duration = e.duration;
    if (!data.job_offer) errs.job_offer = e.job_offer;
    if (!data.family_in_poland) errs.family_in_poland = e.family_in_poland;
    return errs;
  };

  const handleBlur = (field: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setFieldErrors((prev) => ({ ...prev, [field]: validate(formData)[field] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = Object.keys(initialData).reduce<Touched>((acc, k) => ({ ...acc, [k]: true }), {});
    setTouched(allTouched);
    const errs = validate(formData);
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) {
      const firstErrField = FIELD_ORDER.find((k) => errs[k]);
      if (firstErrField) {
        document.getElementById(FIELD_FOCUS_IDS[firstErrField])?.focus();
      }
      return;
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      setError(visa_form.server_error);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${apiUrl}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formType: "visa", lang, ...formData, _hp: "", _t: Date.now() - loadTime.current }),
      });
      const isJson = res.headers.get("content-type")?.includes("application/json");
      const json = isJson ? await res.json() : {};
      if (!res.ok || !json.success) {
        setError(json.error || visa_form.server_error);
      } else {
        setSubmitted(true);
      }
    } catch {
      setError(visa_form.network_error);
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
          {visa_form.success_title}
        </p>
        <p className="font-sans text-sm" style={{ color: "var(--color-sand-600)" }}>
          {visa_form.success}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Honeypot — ukryte przed ludźmi, widoczne dla botów */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}>
        <label htmlFor="v-website">Strona internetowa</label>
        <input id="v-website" name="website" type="text" defaultValue="" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="space-y-7">
        {/* Email */}
        <FormField
          label={visa_form.fields.email.label}
          id="visa-email"
          required
          error={touched.email ? fieldErrors.email : undefined}
        >
          <input
            id="visa-email"
            type="email"
            name="email"
            autoComplete="email"
            inputMode="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            onBlur={() => handleBlur("email")}
            placeholder={visa_form.fields.email.placeholder}
            aria-invalid={touched.email && !!fieldErrors.email}
            aria-describedby={describedBy("visa-email", touched.email ? fieldErrors.email : undefined)}
            className="pcw-input"
            style={inputStyle(touched.email && !!fieldErrors.email)}
          />
        </FormField>

        {/* Citizenship */}
        <FormField
          label={visa_form.fields.citizenship.label}
          id="visa-citizenship"
          required
          error={touched.citizenship ? fieldErrors.citizenship : undefined}
          helperText={visa_form.fields.citizenship.hint}
        >
          <input
            id="visa-citizenship"
            type="text"
            name="citizenship"
            value={formData.citizenship}
            onChange={(e) => setFormData({ ...formData, citizenship: e.target.value })}
            onBlur={() => handleBlur("citizenship")}
            placeholder={visa_form.fields.citizenship.placeholder}
            aria-invalid={touched.citizenship && !!fieldErrors.citizenship}
            aria-describedby={describedBy(
              "visa-citizenship",
              touched.citizenship ? fieldErrors.citizenship : undefined,
              visa_form.fields.citizenship.hint
            )}
            className="pcw-input"
            style={inputStyle(touched.citizenship && !!fieldErrors.citizenship)}
          />
        </FormField>

        {/* Purpose */}
        <FormField
          label={visa_form.fields.purpose.label}
          id="visa-purpose"
          required
          error={touched.purpose ? fieldErrors.purpose : undefined}
          helperText={visa_form.fields.purpose.hint}
        >
          <SelectWrapper>
            <select
              id="visa-purpose"
              name="purpose"
              value={formData.purpose}
              onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
              onBlur={() => handleBlur("purpose")}
              aria-invalid={touched.purpose && !!fieldErrors.purpose}
              aria-describedby={describedBy(
                "visa-purpose",
                touched.purpose ? fieldErrors.purpose : undefined,
                visa_form.fields.purpose.hint
              )}
              className="pcw-input"
              style={selectStyle(touched.purpose && !!fieldErrors.purpose)}
            >
              <option value="">{visa_form.fields.purpose.placeholder}</option>
              {visa_form.fields.purpose.options.map((o: { value: string; label: string }) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </SelectWrapper>
        </FormField>

        {/* Duration */}
        <FormField
          label={visa_form.fields.duration.label}
          id="visa-duration"
          required
          error={touched.duration ? fieldErrors.duration : undefined}
        >
          <SelectWrapper>
            <select
              id="visa-duration"
              name="duration"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              onBlur={() => handleBlur("duration")}
              aria-invalid={touched.duration && !!fieldErrors.duration}
              aria-describedby={describedBy("visa-duration", touched.duration ? fieldErrors.duration : undefined)}
              className="pcw-input"
              style={selectStyle(touched.duration && !!fieldErrors.duration)}
            >
              <option value="">{visa_form.fields.duration.placeholder}</option>
              {visa_form.fields.duration.options.map((o: { value: string; label: string }) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </SelectWrapper>
        </FormField>

        {/* Divider */}
        <div className="pt-1 pb-0 border-t" style={{ borderColor: "var(--color-sand-200)" }} />

        {/* Job offer */}
        <FormField
          label={visa_form.fields.job_offer.label}
          id="job_offer"
          required
          error={touched.job_offer ? fieldErrors.job_offer : undefined}
        >
          <div
            className="flex flex-col sm:flex-row gap-3 mt-1"
            role="radiogroup"
            aria-labelledby="job_offer-label"
            aria-invalid={touched.job_offer && !!fieldErrors.job_offer}
            aria-describedby={describedBy("job_offer", touched.job_offer ? fieldErrors.job_offer : undefined)}
          >
            {visa_form.fields.job_offer.options.map((o: { value: string; label: string }) => (
              <RadioOption
                key={o.value}
                id={`job_offer_${o.value}`}
                name="job_offer"
                value={o.value}
                label={o.label}
                checked={formData.job_offer === o.value}
                onChange={() => {
                  setFormData({ ...formData, job_offer: o.value });
                  setTouched((prev) => ({ ...prev, job_offer: true }));
                  setFieldErrors((prev) => ({ ...prev, job_offer: undefined }));
                }}
              />
            ))}
          </div>
        </FormField>

        {/* Family in Poland */}
        <FormField
          label={visa_form.fields.family_in_poland.label}
          id="family_in_poland"
          required
          error={touched.family_in_poland ? fieldErrors.family_in_poland : undefined}
        >
          <div
            className="flex gap-4 mt-1"
            role="radiogroup"
            aria-labelledby="family_in_poland-label"
            aria-invalid={touched.family_in_poland && !!fieldErrors.family_in_poland}
            aria-describedby={describedBy(
              "family_in_poland",
              touched.family_in_poland ? fieldErrors.family_in_poland : undefined
            )}
          >
            {visa_form.fields.family_in_poland.options.map((o: { value: string; label: string }) => (
              <RadioOption
                key={o.value}
                id={`family_${o.value}`}
                name="family_in_poland"
                value={o.value}
                label={o.label}
                checked={formData.family_in_poland === o.value}
                onChange={() => {
                  setFormData({ ...formData, family_in_poland: o.value });
                  setTouched((prev) => ({ ...prev, family_in_poland: true }));
                  setFieldErrors((prev) => ({ ...prev, family_in_poland: undefined }));
                }}
              />
            ))}
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
          {loading ? visa_form.loading : visa_form.submit}
        </button>
        <p className="font-sans text-xs mt-4 text-center" style={{ color: "var(--color-sand-500)" }}>
          {visa_form.disclaimer}
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
        id={`${id}-label`}
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

function SelectWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ position: "relative" }}>
      {children}
      <svg
        aria-hidden="true"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        style={{
          position: "absolute",
          right: "0.875rem",
          top: "50%",
          transform: "translateY(-50%)",
          pointerEvents: "none",
          color: "var(--color-sand-500)",
        }}
      >
        <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function RadioOption({
  id,
  name,
  value,
  label,
  checked,
  onChange,
}: {
  id: string;
  name: string;
  value: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label htmlFor={id} className="flex items-center gap-3 cursor-pointer group">
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="peer sr-only"
      />
      <div
        className="w-4 h-4 border flex-shrink-0 flex items-center justify-center transition-colors duration-150 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-red-600"
        style={{
          borderColor: checked ? "var(--color-navy-900)" : "var(--color-sand-400)",
          backgroundColor: checked ? "var(--color-navy-900)" : "transparent",
        }}
        aria-hidden="true"
      >
        {checked && (
          <div className="w-1.5 h-1.5" style={{ backgroundColor: "var(--color-cream)" }} />
        )}
      </div>
      <span className="font-sans text-sm" style={{ color: "var(--color-navy-800)" }}>
        {label}
      </span>
    </label>
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

const selectStyle = (isError?: boolean): React.CSSProperties => ({
  ...inputStyle(isError),
  paddingRight: "2.5rem",
  appearance: "none",
  WebkitAppearance: "none",
});
