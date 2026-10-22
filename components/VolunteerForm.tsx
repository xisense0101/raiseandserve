"use client";

import { useRef, useState } from "react";
import { ArrowRight, CheckCircle2, AlertCircle, Calendar, Check } from "lucide-react";
import Turnstile, { type TurnstileHandle } from "@/components/security/Turnstile";

interface EventOption {
  id: string;
  name: string;
  date: string;
}

const EVENTS_LIST: EventOption[] = [
  {
    id: "catfish",
    name: "RISE Catfish King Event",
    date: "Upcoming Outreach",
  },
];

const HELP_OPTIONS = [
  "Food serving — distributing plates to guests",
  "Guest welcome & check-in at the entrance",
  "Event setup — arriving at 3:00 PM to prepare",
  "Surface cleanup after the event",
  "Photography / social media coverage",
  "Anywhere I'm needed — flexible",
];

export default function VolunteerForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    volunteeredBefore: "", // "yes" or "no"
  });

  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [helpOptions, setHelpOptions] = useState<string[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileHandle>(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleVolunteeredChange = (val: string) => {
    setFormData((prev) => ({ ...prev, volunteeredBefore: val }));
    if (error) setError(null);
  };

  const toggleEvent = (eventName: string) => {
    setSelectedEvents((prev) => {
      const isSelected = prev.includes(eventName);
      const next = isSelected
        ? prev.filter((item) => item !== eventName)
        : [...prev, eventName];
      
      // If we deselect Catfish King Event, clear the help options
      if (eventName === "RISE Catfish King Event" && isSelected) {
        setHelpOptions([]);
      }
      return next;
    });
    if (error) setError(null);
  };

  const toggleHelpOption = (option: string) => {
    setHelpOptions((prev) => {
      const isSelected = prev.includes(option);
      return isSelected
        ? prev.filter((item) => item !== option)
        : [...prev, option];
    });
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.volunteeredBefore) {
      setError("Please fill in all required fields (Name, Email, and prior volunteering history).");
      return;
    }

    if (selectedEvents.length === 0) {
      setError("Please select at least one event you'd like to volunteer for.");
      return;
    }

    const hasCatfishEvent = selectedEvents.includes("RISE Catfish King Event");
    if (hasCatfishEvent && helpOptions.length === 0) {
      setError("Please select at least one way you would like to help for the RISE Catfish King Event.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/volunteer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          selectedEvents,
          helpOptions: hasCatfishEvent ? helpOptions : [],
          turnstileToken,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit application. Please try again later.");
      }

      setSubmitted(true);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        volunteeredBefore: "",
      });
      setSelectedEvents([]);
      setHelpOptions([]);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      turnstileRef.current?.reset();
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-green-50/50 border border-green-200 rounded-3xl p-8 md:p-12 text-center space-y-6 animate-fade-in max-w-2xl mx-auto shadow-sm">
        <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 shadow-inner">
          <CheckCircle2 size={32} className="animate-bounce" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-heading font-black text-slate-900">Application Submitted!</h3>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-md mx-auto">
            Thank you for applying to volunteer with RISE! We have received your details, and a coordinator will connect with you soon regarding the upcoming events.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl text-sm transition-all shadow-md hover:shadow-green-700/25 cursor-pointer"
        >
          Submit Another Application
        </button>
      </div>
    );
  }

  const showHelpOptions = selectedEvents.includes("RISE Catfish King Event");

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl mx-auto">
      {error && (
        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-2xl text-sm text-red-700 font-semibold animate-fade-in">
          <AlertCircle size={18} className="shrink-0 text-red-500 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Section 1: Contact Details */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm space-y-6">
        <h3 className="text-lg md:text-xl font-heading font-bold text-slate-900 border-b border-slate-100 pb-3">
          1. Contact Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Name *</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
              className="w-full px-5 py-3.5 rounded-xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-gray-800 bg-white disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
              placeholder="Your full name"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
              className="w-full px-5 py-3.5 rounded-xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-gray-800 bg-white disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
              placeholder="Your email address"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Phone number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              disabled={isSubmitting}
              className="w-full px-5 py-3.5 rounded-xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-gray-800 bg-white disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
              placeholder="(000) 000-0000"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Have you volunteered with RISE before? *</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => handleVolunteeredChange("Yes")}
                disabled={isSubmitting}
                className={`py-3.5 rounded-xl border text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  formData.volunteeredBefore === "Yes"
                    ? "bg-primary text-white border-primary shadow-md shadow-primary/15"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                }`}
              >
                {formData.volunteeredBefore === "Yes" && <Check size={16} />}
                Yes
              </button>
              <button
                type="button"
                onClick={() => handleVolunteeredChange("No")}
                disabled={isSubmitting}
                className={`py-3.5 rounded-xl border text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  formData.volunteeredBefore === "No"
                    ? "bg-primary text-white border-primary shadow-md shadow-primary/15"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                }`}
              >
                {formData.volunteeredBefore === "No" && <Check size={16} />}
                No
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Event Selection */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-lg md:text-xl font-heading font-bold text-slate-900">
            2. Select Events to Support *
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Choose the upcoming event you would like to participate in.
          </p>
        </div>

        <div className="flex justify-center">
          {EVENTS_LIST.map((event) => {
            const isSelected = selectedEvents.includes(event.name);
            return (
              <button
                key={event.id}
                type="button"
                onClick={() => toggleEvent(event.name)}
                disabled={isSubmitting}
                className={`p-6 rounded-2xl border text-left flex flex-col justify-between transition-all group relative cursor-pointer max-w-md w-full ${
                  isSelected
                    ? "bg-primary/5 border-primary shadow-md"
                    : "bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50/50"
                }`}
              >
                <div className="space-y-2 w-full">
                  <div className="flex justify-between items-start">
                    <span className={`p-2 rounded-lg ${isSelected ? 'bg-primary text-white' : 'bg-slate-100 text-slate-500'} transition-all`}>
                      <Calendar size={16} />
                    </span>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-white text-[10px] font-bold shadow-sm animate-fade-in">
                        <Check size={10} strokeWidth={3} />
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm md:text-base leading-tight mt-3">
                    {event.name}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium">
                    {event.date}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Section 3: Conditional Catfish Help Options */}
      {showHelpOptions && (
        <div className="bg-slate-50/60 rounded-3xl p-6 md:p-8 border border-primary/10 shadow-sm space-y-6 animate-fade-up">
          <div className="border-b border-primary/10 pb-3">
            <h3 className="text-lg md:text-xl font-heading font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
              How would you like to help? *
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Select all tasks that match your interest and availability for the <strong>RISE Catfish King Event</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {HELP_OPTIONS.map((option) => {
              const isChecked = helpOptions.includes(option);
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => toggleHelpOption(option)}
                  disabled={isSubmitting}
                  className={`p-4 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                    isChecked
                      ? "bg-white border-primary shadow-sm text-slate-900"
                      : "bg-white/50 border-slate-200 text-muted-foreground hover:bg-white hover:border-slate-350"
                  }`}
                >
                  <div className={`w-5 h-5 rounded border flex items-center justify-center mt-0.5 shrink-0 transition-all ${
                    isChecked ? "bg-primary border-primary text-white" : "bg-white border-slate-300"
                  }`}>
                    {isChecked && <Check size={12} strokeWidth={3} />}
                  </div>
                  <span className="text-sm font-semibold leading-snug">
                    {option}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Submit Button */}
      <Turnstile action="volunteer" onToken={setTurnstileToken} ref={turnstileRef} />

      <button
        type="submit"
        disabled={isSubmitting || !turnstileToken}
        className="w-full group px-8 py-4 bg-primary hover:bg-primary-dark text-white rounded-xl text-lg font-bold transition-all shadow-lg hover:shadow-primary/30 flex items-center justify-center gap-2 disabled:bg-primary/75 disabled:cursor-not-allowed cursor-pointer"
      >
        {isSubmitting ? (
          <>
            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Submitting Registration...
          </>
        ) : (
          <>
            Apply for Volunteer
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </button>
    </form>
  );
}
