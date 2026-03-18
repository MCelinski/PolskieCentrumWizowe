"use client";

import { useState } from "react";
import content from "@/content/site-content.json";

type FormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const initialData: FormData = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

export default function GeneralConsultationForm() {
  const { general_form } = content.consultations;
  const [formData, setFormData] = useState<FormData>(initialData);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
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
          Wiadomość wysłana!
        </p>
        <p className="font-sans text-sm" style={{ color: "var(--color-sand-600)" }}>
          {general_form.success}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="space-y-7">
        {/* Name */}
        <FormField label={general_form.fields.name.label} id="name" required>
          <input
            id="name"
            type="text"
            name="name"
            autoComplete="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder={general_form.fields.name.placeholder}
            required
            style={inputStyle}
          />
        </FormField>

        {/* Email */}
        <FormField label={general_form.fields.email.label} id="email" required>
          <input
            id="email"
            type="email"
            name="email"
            autoComplete="email"
            inputMode="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder={general_form.fields.email.placeholder}
            required
            style={inputStyle}
          />
        </FormField>

        {/* Phone */}
        <FormField label={general_form.fields.phone.label} id="phone">
          <input
            id="phone"
            type="tel"
            name="phone"
            autoComplete="tel"
            inputMode="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder={general_form.fields.phone.placeholder}
            style={inputStyle}
          />
        </FormField>

        {/* Message */}
        <FormField label={general_form.fields.message.label} id="message" required>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder={general_form.fields.message.placeholder}
            required
            style={{ ...inputStyle, resize: "vertical" }}
          />
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
          {loading ? "Wysyłanie..." : general_form.submit}
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
};
