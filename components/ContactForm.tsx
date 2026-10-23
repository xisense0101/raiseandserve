"use client";

import { useRef, useState } from "react";
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import Turnstile, { type TurnstileHandle } from "@/components/security/Turnstile";

export const INQUIRY_TYPES = ["general", "donation", "volunteer", "partnership", "events"] as const;
export type InquiryType = (typeof INQUIRY_TYPES)[number];

export default function ContactForm({ initialTopic }: { initialTopic?: InquiryType }) {
  const empty = { fullName: "", email: "", inquiryType: initialTopic ?? "", message: "" };
  const [formData, setFormData] = useState(empty);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileHandle>(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, turnstileToken }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit. Please try again later.");
      }

      setSubmitted(true);
      setFormData(empty);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      turnstileRef.current?.reset();
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-accent-2-100/50 border border-accent-2-200 rounded-soft-lg p-8 text-center space-y-4 animate-fade-in">
        <div className="mx-auto w-12 h-12 rounded-full bg-accent-2-100 flex items-center justify-center text-accent-2-600">
          <CheckCircle2 size={24} />
        </div>
        <h3 className="text-xl font-bold text-ink">Message Sent!</h3>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
          Thank you for reaching out to RISE. We have received your inquiry and our team will get back to you as soon as possible.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-accent-2-600 hover:bg-accent-2-700 text-white font-semibold rounded-soft text-xs transition-colors cursor-pointer"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="flex items-start gap-2.5 p-4 bg-red-50 border border-red-200 rounded-soft text-xs text-red-700 font-semibold animate-fade-in">
          <AlertCircle size={16} className="shrink-0 text-red-500 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-neutral-700">Full Name *</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            required
            disabled={isSubmitting}
            className="w-full px-5 py-3.5 rounded-soft border border-neutral-300 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-ink bg-page shadow-sm disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
            placeholder="Your full name"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-neutral-700">Email Address *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            disabled={isSubmitting}
            className="w-full px-5 py-3.5 rounded-soft border border-neutral-300 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-ink bg-page shadow-sm disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
            placeholder="Your email address"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-neutral-700">How can we help? *</label>
        <div className="relative">
          <select
            name="inquiryType"
            value={formData.inquiryType}
            onChange={handleInputChange}
            required
            disabled={isSubmitting}
            className="w-full px-5 py-3.5 rounded-soft border border-neutral-300 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-ink bg-page shadow-sm appearance-none disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
          >
            <option value="" disabled>Select an inquiry type</option>
            <option value="general">General Question</option>
            <option value="donation">Donation Support</option>
            <option value="volunteer">Volunteer Opportunities</option>
            <option value="partnership">Community Partnership</option>
            <option value="events">Events</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-5 pointer-events-none text-neutral-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-neutral-700">Message *</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          rows={5}
          required
          disabled={isSubmitting}
          className="w-full px-5 py-3.5 rounded-soft border border-neutral-300 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-ink bg-page shadow-sm resize-none disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
          placeholder="Your message"
        ></textarea>
      </div>

      <Turnstile action="contact" onToken={setTurnstileToken} ref={turnstileRef} />

      <button
        type="submit"
        disabled={isSubmitting || !turnstileToken}
        className="w-full group px-8 py-4 bg-primary hover:bg-primary-dark text-white rounded-soft text-lg font-bold transition-all shadow-lg hover:shadow-primary/30 flex items-center justify-center gap-2 disabled:bg-primary/75 disabled:cursor-not-allowed cursor-pointer"
      >
        {isSubmitting ? (
          <>
            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Sending Message...
          </>
        ) : (
          <>
            Send Message
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </button>
    </form>
  );
}
