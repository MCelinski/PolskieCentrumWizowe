"use client";

import { useState } from "react";
import content from "@/content/site-content.json";

type FormData = {
  citizenship: string;
  purpose: string;
  duration: string;
  job_offer: string;
  family_in_poland: string;
};

const initialData: FormData = {
  citizenship: "",
  purpose: "",
  duration: "",
  job_offer: "",
  family_in_poland: "",
};

export default function VisaQualificationForm() {
  const { visa_form } = content.consultations;
  const [formData, setFormData] = useState<FormData>(initialData);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate async submission
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
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
          Dziękujemy!
        </p>
        <p className="font-sans text-sm" style={{ color: "var(--color-sand-600)" }}>
          {visa_form.success}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="space-y-8">
        {/* Citizenship */}
        <FormField label={visa_form.fields.citizenship.label} id="citizenship" required>
          <input
            id="citizenship"
            type="text"
            name="citizenship"
            value={formData.citizenship}
            onChange={(e) => setFormData({ ...formData, citizenship: e.target.value })}
            placeholder={visa_form.fields.citizenship.placeholder}
            required
            className="form-input"
            style={inputStyle}
          />
        </FormField>

        {/* Purpose */}
        <FormField label={visa_form.fields.purpose.label} id="purpose" required>
          <select
            id="purpose"
            name="purpose"
            value={formData.purpose}
            onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
            required
            className="form-select"
            style={inputStyle}
          >
            <option value="">{visa_form.fields.purpose.placeholder}</option>
            {visa_form.fields.purpose.options.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </FormField>

        {/* Duration */}
        <FormField label={visa_form.fields.duration.label} id="duration" required>
          <select
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            required
            style={inputStyle}
          >
            <option value="">{visa_form.fields.duration.placeholder}</option>
            {visa_form.fields.duration.options.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </FormField>

        {/* Job offer */}
        <FormField label={visa_form.fields.job_offer.label} id="job_offer" required>
          <div className="flex flex-col sm:flex-row gap-4 mt-1" role="radiogroup" aria-labelledby="job_offer-label">
            {visa_form.fields.job_offer.options.map((o) => (
              <RadioOption
                key={o.value}
                id={`job_offer_${o.value}`}
                name="job_offer"
                value={o.value}
                label={o.label}
                checked={formData.job_offer === o.value}
                onChange={() => setFormData({ ...formData, job_offer: o.value })}
              />
            ))}
          </div>
        </FormField>

        {/* Family in Poland */}
        <FormField label={visa_form.fields.family_in_poland.label} id="family_in_poland" required>
          <div className="flex gap-4 mt-1" role="radiogroup" aria-labelledby="family_in_poland-label">
            {visa_form.fields.family_in_poland.options.map((o) => (
              <RadioOption
                key={o.value}
                id={`family_${o.value}`}
                name="family_in_poland"
                value={o.value}
                label={o.label}
                checked={formData.family_in_poland === o.value}
                onChange={() => setFormData({ ...formData, family_in_poland: o.value })}
              />
            ))}
          </div>
        </FormField>
      </div>

      {/* Submit */}
      <div className="mt-10">
        <button
          type="submit"
          disabled={loading}
          className="w-full font-sans text-sm font-medium py-4 transition-all duration-200 hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
          style={{
            backgroundColor: "var(--color-navy-900)",
            color: "var(--color-cream)",
          }}
        >
          {loading ? "Wysyłanie..." : visa_form.submit}
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
}: {
  label: string;
  id: string;
  children: React.ReactNode;
  required?: boolean;
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
    <label
      htmlFor={id}
      className="flex items-center gap-3 cursor-pointer group"
    >
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <div
        className="w-4 h-4 border flex-shrink-0 flex items-center justify-center transition-colors duration-150"
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

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.875rem 1rem",
  fontFamily: "var(--font-inter), system-ui, sans-serif",
  fontSize: "0.875rem",
  color: "var(--color-navy-900)",
  backgroundColor: "var(--color-cream)",
  border: "1px solid var(--color-sand-300)",
  outline: "none",
  display: "block",
  appearance: "none",
  WebkitAppearance: "none",
};
