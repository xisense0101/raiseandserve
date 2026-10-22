"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { User, BookOpen, FileText, CheckCircle, ArrowRight, ArrowLeft, Upload, Link as LinkIcon, Trash2, HelpCircle, ChevronDown } from "lucide-react";
import Turnstile, { type TurnstileHandle } from "@/components/security/Turnstile";

export default function ApplyPageClient() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileHandle>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isStateOpen, setIsStateOpen] = useState(false);
  const [stateMenuStyle, setStateMenuStyle] = useState<{ top: number; left: number; width: number } | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    educationLevel: "",
    institution: "",
    fieldOfStudy: "",
    graduationYear: "",
    targetCareerArea: "",
    workAuthorization: "",
    availability: "",
    priorExperience: "",
    opportunityTypes: [] as string[],
    linkedinUrl: "",
    referenceContact: "",
    agreement: false,
  });

  const [resume, setResume] = useState<File | null>(null);
  const [portfolio, setPortfolio] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const resumeInputRef = useRef<HTMLInputElement>(null);
  const portfolioInputRef = useRef<HTMLInputElement>(null);
  const stateDropdownRef = useRef<HTMLDivElement>(null);

  const updateStateMenuPosition = () => {
    if (!stateDropdownRef.current) return;

    const rect = stateDropdownRef.current.getBoundingClientRect();
    setStateMenuStyle({
      top: rect.bottom + 6,
      left: rect.left,
      width: rect.width,
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        stateDropdownRef.current &&
        !stateDropdownRef.current.contains(target) &&
        !target.closest("#state-dropdown-portal")
      ) {
        setIsStateOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isStateOpen) return;

    updateStateMenuPosition();

    const handleViewportChange = () => updateStateMenuPosition();

    window.addEventListener("resize", handleViewportChange);
    window.addEventListener("scroll", handleViewportChange, true);

    return () => {
      window.removeEventListener("resize", handleViewportChange);
      window.removeEventListener("scroll", handleViewportChange, true);
    };
  }, [isStateOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      if (errors[name]) {
        const newErrors = { ...errors };
        delete newErrors[name];
        setErrors(newErrors);
      }
      return updated;
    });
  };

  const handleCheckboxChange = (option: string) => {
    setFormData((prev) => {
      const current = prev.opportunityTypes;
      const updated = current.includes(option)
        ? current.filter((item) => item !== option)
        : [...current, option];
      
      if (errors.opportunityTypes) {
        const newErrors = { ...errors };
        delete newErrors.opportunityTypes;
        setErrors(newErrors);
      }
      
      return { ...prev, opportunityTypes: updated };
    });
  };

  // File Handlers
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: "resume" | "portfolio") => {
    const file = e.target.files?.[0] || null;
    if (!file) return;

    const maxSize = type === "resume" ? 10 * 1024 * 1024 : 20 * 1024 * 1024;
    const limitMsg = type === "resume" ? "10MB" : "20MB";

    if (file.size > maxSize) {
      setErrors((prev) => ({ ...prev, [type]: `File size exceeds the ${limitMsg} limit.` }));
      return;
    }

    if (type === "resume") {
      const allowed = [".pdf", ".doc", ".docx"];
      const ext = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
      if (!allowed.includes(ext)) {
        setErrors((prev) => ({ ...prev, resume: "Invalid file type. Please upload .pdf, .doc, or .docx" }));
        return;
      }
      setResume(file);
      setErrors((prev) => {
        const next = { ...prev };
        delete next.resume;
        return next;
      });
    } else {
      setPortfolio(file);
      setErrors((prev) => {
        const next = { ...prev };
        delete next.portfolio;
        return next;
      });
    }
  };

  const removeFile = (type: "resume" | "portfolio") => {
    if (type === "resume") {
      setResume(null);
      if (resumeInputRef.current) resumeInputRef.current.value = "";
    } else {
      setPortfolio(null);
      if (portfolioInputRef.current) portfolioInputRef.current.value = "";
    }
  };

  // Step Validation
  const validateStep = (currentStep: number) => {
    const nextErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.firstName.trim()) nextErrors.firstName = "First name is required.";
      if (!formData.lastName.trim()) nextErrors.lastName = "Last name is required.";
      if (!formData.email.trim()) {
        nextErrors.email = "Email is required.";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        nextErrors.email = "Please enter a valid email address.";
      }
      if (!formData.phone.trim()) nextErrors.phone = "Phone number is required.";
    }

    if (currentStep === 2) {
      if (!formData.educationLevel) nextErrors.educationLevel = "Education level is required.";
      if (!formData.targetCareerArea.trim()) nextErrors.targetCareerArea = "Target career area is required.";
      if (!formData.workAuthorization) nextErrors.workAuthorization = "Work authorization status is required.";
      if (formData.opportunityTypes.length === 0) nextErrors.opportunityTypes = "Select at least one opportunity type.";
      if (!formData.priorExperience.trim()) nextErrors.priorExperience = "Personal statement / experience text is required.";
    }

    if (currentStep === 3) {
      if (!resume) nextErrors.resume = "Resume file is required.";
      if (!formData.referenceContact.trim()) nextErrors.referenceContact = "Reference contact details are required.";
      if (!formData.agreement) nextErrors.agreement = "You must agree to the Participant Agreement.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, val]) => {
        if (key === "opportunityTypes") {
          data.append(key, (val as string[]).join(","));
        } else {
          data.append(key, String(val));
        }
      });

      if (resume) {
        data.append("resume", resume);
      }
      if (portfolio) {
        data.append("portfolio", portfolio);
      }
      data.append("turnstileToken", turnstileToken ?? "");

      const res = await fetch("/api/apply", {
        method: "POST",
        body: data,
      });

      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.error || "Failed to submit application.");
      }

      setSubmitted(true);
    } catch (err: any) {
      setSubmitError(err.message || "An unexpected error occurred. Please try again later.");
    } finally {
      turnstileRef.current?.reset();
      setIsSubmitting(false);
    }
  };

  const statesList = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ];
  const eduLevels = ["Currently enrolled", "Recent graduate", "Some college — did not complete", "High school / GED", "Vocational or trade training", "No formal degree"];
  const workAuths = ["US Citizen", "Permanent Resident", "F-1 CPT", "F-1 OPT / STEM OPT", "H-1B or other visa", "Require sponsorship", "Other"];
  const oppTypes = ["Full-time", "Part-time", "Internship", "Contract", "Remote", "Open to Relocation"];

  // Reusable input styling tokens
  const baseInputStyle = (hasError: boolean) => 
    `w-full px-4 py-3 rounded-xl border bg-slate-50/50 hover:bg-white focus:bg-white text-slate-800 text-sm font-medium outline-none transition-all duration-200 ${
      hasError 
        ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 bg-red-50/10" 
        : "border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10"
    }`;

  const labelStyle = "text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1.5";

  const stateMenu =
    isStateOpen && stateMenuStyle
      ? createPortal(
          <div
            id="state-dropdown-portal"
            className="fixed z-[1000] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl"
            style={{
              top: stateMenuStyle.top,
              left: stateMenuStyle.left,
              width: stateMenuStyle.width,
            }}
          >
            <div className="max-h-60 overflow-y-auto py-1">
              {statesList.map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, state: st }));
                    setIsStateOpen(false);
                  }}
                  className={`block w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-slate-50 ${
                    formData.state === st ? "bg-primary/5 font-semibold text-primary" : "text-slate-700"
                  }`}
                  role="option"
                  aria-selected={formData.state === st}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>,
          document.body
        )
      : null;

  if (submitted) {
    return (
      <div className="bg-background rounded-3xl shadow-2xl border border-border p-8 md:p-12 text-center max-w-xl mx-auto space-y-6 animate-fade-in">
        <div className="mx-auto w-16 h-16 rounded-full bg-green-50 flex items-center justify-center text-green-500 mb-2 shadow-sm">
          <CheckCircle size={40} className="animate-bounce" />
        </div>
        <h2 className="text-3xl font-heading font-extrabold text-slate-900 tracking-tight">Application Submitted!</h2>
        <p className="text-slate-600 leading-relaxed text-sm md:text-base font-body max-w-md mx-auto">
          Thank you for applying to work with RISE. Our team will review your credentials and get back to you within 3–5 business days.
        </p>
        <button
          onClick={() => {
            setFormData({
              firstName: "",
              lastName: "",
              email: "",
              phone: "",
              city: "",
              state: "",
              educationLevel: "",
              institution: "",
              fieldOfStudy: "",
              graduationYear: "",
              targetCareerArea: "",
              workAuthorization: "",
              availability: "",
              priorExperience: "",
              opportunityTypes: [],
              linkedinUrl: "",
              referenceContact: "",
              agreement: false,
            });
            setResume(null);
            setPortfolio(null);
            setStep(1);
            setSubmitted(false);
          }}
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all duration-200 shadow-lg shadow-primary/20 cursor-pointer"
        >
          Submit Another Application
        </button>
      </div>
    );
  }

  return (
    <>
      {stateMenu}
      <div className="bg-background rounded-3xl shadow-2xl border border-border overflow-hidden flex flex-col lg:flex-row min-h-[600px] w-full max-w-4xl mx-auto">
      
      {/* Sidebar Progress Steps */}
      <div className="lg:w-1/3 bg-gradient-to-b from-[#0f1e36] to-[#050c18] text-white p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800 relative">
        <div className="space-y-10 relative z-10">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-accent bg-accent/10 border border-accent/20 px-3 py-1 rounded-full mb-3">
              <span className="w-1 h-1 rounded-full bg-accent animate-pulse" />
              Join Rise
            </span>
            <h2 className="text-2xl font-heading font-extrabold text-white tracking-tight">Apply to RISE</h2>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">Complete the three-step application to share your background, goals, and required documents.</p>
          </div>
          
          <div className="relative">
            {/* Desktop Stepper vertical line connector */}
            <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-slate-800 hidden lg:block -z-10" />
            
            <div className="flex flex-row lg:flex-col gap-4 lg:gap-8 justify-between lg:justify-start">
              
              {/* Step 1 */}
              <div className={`flex items-center gap-3 transition-all duration-300 ${step === 1 ? "opacity-100 scale-100" : "opacity-50 scale-95"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 relative z-10 shrink-0 ${
                  step === 1 
                    ? "bg-accent text-slate-900 shadow-lg shadow-accent/20 border-2 border-accent" 
                    : step > 1 
                      ? "bg-green-500 text-white border border-green-500" 
                      : "bg-slate-900 text-slate-400 border border-slate-850"
                }`}>
                  {step > 1 ? <CheckCircle size={14} /> : <User size={14} />}
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-xs font-bold leading-tight">Step 1</p>
                  <p className="text-[10px] text-slate-400 mt-0.5 leading-none">Personal Info</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className={`flex items-center gap-3 transition-all duration-300 ${step === 2 ? "opacity-100 scale-100" : "opacity-50 scale-95"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 relative z-10 shrink-0 ${
                  step === 2 
                    ? "bg-accent text-slate-900 shadow-lg shadow-accent/20 border-2 border-accent" 
                    : step > 2 
                      ? "bg-green-500 text-white border border-green-500" 
                      : "bg-slate-900 text-slate-400 border border-slate-850"
                }`}>
                  {step > 2 ? <CheckCircle size={14} /> : <BookOpen size={14} />}
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-xs font-bold leading-tight">Step 2</p>
                  <p className="text-[10px] text-slate-400 mt-0.5 leading-none">Background & Goals</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className={`flex items-center gap-3 transition-all duration-300 ${step === 3 ? "opacity-100 scale-100" : "opacity-50 scale-95"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 relative z-10 shrink-0 ${
                  step === 3 
                    ? "bg-accent text-slate-900 shadow-lg shadow-accent/20 border-2 border-accent" 
                    : "bg-slate-900 text-slate-400 border border-slate-850"
                }`}>
                  <FileText size={14} />
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-xs font-bold leading-tight">Step 3</p>
                  <p className="text-[10px] text-slate-400 mt-0.5 leading-none">Documents & Confirm</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-2.5 bg-white/5 rounded-2xl p-4 border border-white/5 text-xs text-slate-400 z-10">
          <HelpCircle size={16} className="text-accent shrink-0" />
          <div className="min-w-0">
            <p className="font-semibold text-slate-300">Need Assistance?</p>
            <a href="tel:9725233544" className="text-accent font-bold hover:text-white transition-colors block mt-0.5">(972) 523-3544</a>
          </div>
        </div>
      </div>

      {/* Main Form Fields Panel */}
      <div className="lg:w-2/3 p-8 md:p-10 flex flex-col justify-between min-w-0 bg-background">
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between gap-8 min-h-0">
          
          <div className="lg:overflow-y-auto lg:max-h-[440px] pr-1 lg:pr-2 space-y-6">
            
            {/* STEP 1: Personal Information */}
            {step === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-xl font-heading font-extrabold text-slate-900 tracking-tight">Personal Information</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Please provide your primary contact details and general location.</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-0.5">
                    <label className={labelStyle}>First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="First name"
                      className={baseInputStyle(!!errors.firstName)}
                    />
                    {errors.firstName && <p className="text-xs text-red-500 mt-1 font-medium">{errors.firstName}</p>}
                  </div>

                  <div className="space-y-0.5">
                    <label className={labelStyle}>Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Last name"
                      className={baseInputStyle(!!errors.lastName)}
                    />
                    {errors.lastName && <p className="text-xs text-red-500 mt-1 font-medium">{errors.lastName}</p>}
                  </div>

                  <div className="space-y-0.5">
                    <label className={labelStyle}>Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      className={baseInputStyle(!!errors.email)}
                    />
                    {errors.email && <p className="text-xs text-red-500 mt-1 font-medium">{errors.email}</p>}
                  </div>

                  <div className="space-y-0.5">
                    <label className={labelStyle}>Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="(000) 000-0000"
                      className={baseInputStyle(!!errors.phone)}
                    />
                    {errors.phone && <p className="text-xs text-red-500 mt-1 font-medium">{errors.phone}</p>}
                  </div>

                  <div className="space-y-0.5">
                    <label className={labelStyle}>City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Your city"
                      className={baseInputStyle(false)}
                    />
                  </div>

                  <div className="space-y-0.5">
                    <label className={labelStyle}>State</label>
                    <div className="relative" ref={stateDropdownRef}>
                      <button
                        type="button"
                        onClick={() => {
                          if (!isStateOpen) {
                            updateStateMenuPosition();
                          }
                          setIsStateOpen((prev) => !prev);
                        }}
                        className={`${baseInputStyle(false)} flex items-center justify-between text-left`}
                        aria-expanded={isStateOpen}
                        aria-haspopup="listbox"
                      >
                        <span className={formData.state ? "text-slate-800" : "text-slate-400"}>
                          {formData.state || "Select State"}
                        </span>
                        <ChevronDown
                          size={16}
                          className={`shrink-0 text-slate-400 transition-transform duration-200 ${isStateOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Background & Goals */}
            {step === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-xl font-heading font-extrabold text-slate-900 tracking-tight">Background & Goals</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Provide information regarding your education, goals, and availability.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-0.5">
                    <label className={labelStyle}>Education Level *</label>
                    <select
                      name="educationLevel"
                      value={formData.educationLevel}
                      onChange={handleInputChange}
                      className={baseInputStyle(!!errors.educationLevel)}
                    >
                      <option value="">Select Education Level</option>
                      {eduLevels.map((lvl) => (
                        <option key={lvl} value={lvl}>{lvl}</option>
                      ))}
                    </select>
                    {errors.educationLevel && <p className="text-xs text-red-500 mt-1 font-medium">{errors.educationLevel}</p>}
                  </div>

                  <div className="space-y-0.5">
                    <label className={labelStyle}>Institution / Program</label>
                    <input
                      type="text"
                      name="institution"
                      value={formData.institution}
                      onChange={handleInputChange}
                      placeholder="University or training program"
                      className={baseInputStyle(false)}
                    />
                  </div>

                  <div className="space-y-0.5">
                    <label className={labelStyle}>Field of Study</label>
                    <input
                      type="text"
                      name="fieldOfStudy"
                      value={formData.fieldOfStudy}
                      onChange={handleInputChange}
                      placeholder="e.g. Computer Science, Nursing"
                      className={baseInputStyle(false)}
                    />
                  </div>

                  <div className="space-y-0.5">
                    <label className={labelStyle}>Graduation Year</label>
                    <input
                      type="text"
                      name="graduationYear"
                      value={formData.graduationYear}
                      onChange={handleInputChange}
                      placeholder="e.g. 2025 or 2026"
                      className={baseInputStyle(false)}
                    />
                  </div>

                  <div className="space-y-0.5">
                    <label className={labelStyle}>Target Career Area *</label>
                    <input
                      type="text"
                      name="targetCareerArea"
                      value={formData.targetCareerArea}
                      onChange={handleInputChange}
                      placeholder="e.g. Software Engineering, Healthcare"
                      className={baseInputStyle(!!errors.targetCareerArea)}
                    />
                    {errors.targetCareerArea && <p className="text-xs text-red-500 mt-1 font-medium">{errors.targetCareerArea}</p>}
                  </div>

                  <div className="space-y-0.5">
                    <label className={labelStyle}>Work Authorization *</label>
                    <select
                      name="workAuthorization"
                      value={formData.workAuthorization}
                      onChange={handleInputChange}
                      className={baseInputStyle(!!errors.workAuthorization)}
                    >
                      <option value="">Select Option</option>
                      {workAuths.map((auth) => (
                        <option key={auth} value={auth}>{auth}</option>
                      ))}
                    </select>
                    {errors.workAuthorization && <p className="text-xs text-red-500 mt-1 font-medium">{errors.workAuthorization}</p>}
                  </div>

                  <div className="space-y-0.5 sm:col-span-2">
                    <label className={labelStyle}>Availability</label>
                    <input
                      type="text"
                      name="availability"
                      value={formData.availability}
                      onChange={handleInputChange}
                      placeholder="e.g. Immediately, June 2026, After graduation"
                      className={baseInputStyle(false)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className={labelStyle}>Opportunity Type (Select all that apply) *</label>
                  <div className="flex flex-wrap gap-2">
                    {oppTypes.map((type) => {
                      const checked = formData.opportunityTypes.includes(type);
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => handleCheckboxChange(type)}
                          className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all duration-200 cursor-pointer ${
                            checked
                              ? "bg-primary text-white border-primary shadow-md shadow-primary/10"
                              : "bg-slate-50/50 text-slate-600 border-slate-200 hover:border-slate-350 hover:bg-white"
                          }`}
                        >
                          {type}
                        </button>
                      );
                    })}
                  </div>
                  {errors.opportunityTypes && <p className="text-xs text-red-500 mt-1 font-medium">{errors.opportunityTypes}</p>}
                </div>

                <div className="space-y-0.5">
                  <label className={labelStyle}>Prior Experience / Personal Statement *</label>
                  <textarea
                    name="priorExperience"
                    value={formData.priorExperience}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Tell us about yourself, your career path, and why you want to work with RISE..."
                    className={baseInputStyle(!!errors.priorExperience) + " resize-none"}
                  />
                  {errors.priorExperience && <p className="text-xs text-red-500 mt-1 font-medium">{errors.priorExperience}</p>}
                </div>
              </div>
            )}

            {/* STEP 3: Documents & References */}
            {step === 3 && (
              <div className="space-y-6 animate-fade-in">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-xl font-heading font-extrabold text-slate-900 tracking-tight">Documents & References</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Upload your resume, add optional work samples, and provide a reference before submitting.</p>
                </div>

                {/* Upload Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  
                  {/* Resume CV */}
                  <div className="space-y-1">
                    <label className={labelStyle}>Resume / CV *</label>
                    <input
                      type="file"
                      ref={resumeInputRef}
                      onChange={(e) => handleFileChange(e, "resume")}
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                    />
                    {resume ? (
                      <div className="flex items-center justify-between bg-green-50/60 border border-green-200 p-4 rounded-2xl transition-all duration-200">
                        <div className="flex items-center gap-3 overflow-hidden">
                          <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                            <FileText size={20} className="text-green-600" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-slate-800 truncate">{resume.name}</p>
                            <p className="text-[10px] text-slate-500 mt-0.5">{(resume.size / (1024 * 1024)).toFixed(2)} MB</p>
                          </div>
                        </div>
                        <button type="button" onClick={() => removeFile("resume")} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors cursor-pointer">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => resumeInputRef.current?.click()}
                        className={`w-full flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-6 hover:bg-slate-50/40 transition-all duration-250 cursor-pointer ${
                          errors.resume
                            ? "border-red-300 bg-red-50/10 focus:ring-4 focus:ring-red-500/10"
                            : "border-slate-200 hover:border-primary/50 focus:border-primary"
                        }`}
                      >
                        <Upload size={22} className="text-slate-400 mb-2" />
                        <span className="text-xs font-bold text-slate-700">Upload Resume</span>
                        <span className="text-[10px] text-slate-400 mt-1">Supports PDF, DOC, DOCX up to 10MB</span>
                      </button>
                    )}
                    {errors.resume && <p className="text-xs text-red-500 mt-1 font-medium">{errors.resume}</p>}
                  </div>

                  {/* Portfolio upload */}
                  <div className="space-y-1">
                    <label className={labelStyle}>Portfolio / Work Samples</label>
                    <input
                      type="file"
                      ref={portfolioInputRef}
                      onChange={(e) => handleFileChange(e, "portfolio")}
                      className="hidden"
                    />
                    {portfolio ? (
                      <div className="flex items-center justify-between bg-slate-50 border border-slate-250 p-4 rounded-2xl transition-all duration-200">
                        <div className="flex items-center gap-3 overflow-hidden">
                          <div className="w-10 h-10 rounded-xl bg-slate-200 flex items-center justify-center shrink-0">
                            <FileText size={20} className="text-slate-600" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-slate-800 truncate">{portfolio.name}</p>
                            <p className="text-[10px] text-slate-500 mt-0.5">{(portfolio.size / (1024 * 1024)).toFixed(2)} MB</p>
                          </div>
                        </div>
                        <button type="button" onClick={() => removeFile("portfolio")} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors cursor-pointer">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => portfolioInputRef.current?.click()}
                        className="w-full flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl p-6 hover:bg-slate-50/40 hover:border-primary/50 transition-all duration-250 cursor-pointer"
                      >
                        <Upload size={22} className="text-slate-400 mb-2" />
                        <span className="text-xs font-bold text-slate-700">Upload Portfolio</span>
                        <span className="text-[10px] text-slate-400 mt-1">Any format up to 20MB</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-0.5">
                    <label className={labelStyle}>
                      <span className="flex items-center gap-1.5">
                        <LinkIcon size={13} className="text-slate-400" />
                        LinkedIn URL
                      </span>
                    </label>
                    <input
                      type="url"
                      name="linkedinUrl"
                      value={formData.linkedinUrl}
                      onChange={handleInputChange}
                      placeholder="https://linkedin.com/in/yourname"
                      className={baseInputStyle(false)}
                    />
                  </div>

                  <div className="space-y-0.5">
                    <label className={labelStyle}>Reference Contact *</label>
                    <input
                      type="text"
                      name="referenceContact"
                      value={formData.referenceContact}
                      onChange={handleInputChange}
                      placeholder="Name, relationship, phone or email"
                      className={baseInputStyle(!!errors.referenceContact)}
                    />
                    {errors.referenceContact && <p className="text-xs text-red-500 mt-1 font-medium">{errors.referenceContact}</p>}
                  </div>
                </div>

                {/* Terms Agreement Checkbox */}
                <div className="pt-4 border-t border-slate-100 space-y-1">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={formData.agreement}
                      onChange={(e) => {
                        setFormData((prev) => ({ ...prev, agreement: e.target.checked }));
                        if (errors.agreement) {
                          const newErrors = { ...errors };
                          delete newErrors.agreement;
                          setErrors(newErrors);
                        }
                      }}
                      className="mt-0.5 rounded border-slate-350 text-primary focus:ring-primary w-4 h-4 cursor-pointer"
                    />
                    <span className="text-xs text-slate-600 group-hover:text-slate-800 transition-colors select-none leading-relaxed">
                      I agree to the RISE Participant Agreement and confirm all information is accurate. *
                    </span>
                  </label>
                  {errors.agreement && <p className="text-xs text-red-500 mt-1 font-medium">{errors.agreement}</p>}
                </div>
              </div>
            )}

          </div>

          {step === 3 && (
            <Turnstile action="apply" onToken={setTurnstileToken} ref={turnstileRef} className="shrink-0" />
          )}

          {submitError && (
            <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-semibold animate-fade-in shrink-0">
              {submitError}
            </div>
          )}

          {/* Form Actions Footer Panel */}
          <div className="flex items-center justify-between pt-5 border-t border-slate-100 mt-auto shrink-0">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                disabled={isSubmitting}
                className="inline-flex items-center gap-1.5 px-5 py-3 border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-xs cursor-pointer"
              >
                <ArrowLeft size={14} />
                Back
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={isSubmitting}
                className="inline-flex items-center gap-1.5 px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md shadow-primary/10 text-xs cursor-pointer"
              >
                Next
                <ArrowRight size={14} />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting || !turnstileToken}
                className="inline-flex items-center gap-1.5 px-7 py-3 bg-primary hover:bg-primary-dark disabled:bg-primary/70 disabled:cursor-not-allowed text-white font-extrabold rounded-xl shadow-lg shadow-primary/20 transition-all duration-200 text-xs cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </button>
            )}
          </div>

        </form>
      </div>

      </div>
    </>
  );
}
