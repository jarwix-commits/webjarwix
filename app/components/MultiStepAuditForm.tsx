"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiArrowRightLine, RiCheckLine, RiArrowLeftLine } from "@remixicon/react";

interface MultiStepAuditFormProps {
  onClose?: () => void;
  isModal?: boolean;
}

export default function MultiStepAuditForm({ onClose, isModal = false }: MultiStepAuditFormProps) {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    company: "",
    websiteUrl: "",
    revenue: "",
    primaryGoal: "",
    biggestChallenge: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      nextStep();
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Submission failed.");
      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center min-h-[360px]">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ background: "rgba(255,90,31,0.12)" }}>
          <RiCheckLine size={32} style={{ color: "#FF5A1F" }} />
        </div>
        <h3 className="text-2xl font-bold text-[#FFF5F0] mb-3 uppercase" style={{ fontFamily: '"Hanson Bold", serif' }}>Audit Requested!</h3>
        <p className="text-sm text-[rgba(255,245,240,0.6)] mb-8 max-w-sm mx-auto leading-relaxed">
          We've received your information. Our team is analyzing your digital presence and will be in touch shortly to schedule your strategy session.
        </p>
        {isModal && onClose && (
          <button
            onClick={onClose}
            className="px-8 py-3 rounded-xl text-sm font-semibold bg-[#1A1A1A] text-[#FFF5F0] border border-white/10 hover:border-[#FF5A1F] transition-colors cursor-pointer"
          >
            Close Window
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Progress Indicator */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i <= step ? "w-8 bg-[#FF5A1F]" : "w-4 bg-white/10"
              }`}
            />
          ))}
        </div>
        <span className={`text-xs font-medium text-[rgba(255,245,240,0.4)] ${isModal ? 'pr-6' : ''}`}>
          Step {step} of 3
        </span>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col relative w-full">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-4 w-full"
            >
              <h3 className="text-2xl font-bold text-[#FFF5F0] mb-1 uppercase" style={{ fontFamily: '"Hanson Bold", serif' }}>Let's Get Started</h3>
              <p className="text-sm text-[rgba(255,245,240,0.5)] mb-2">First, tell us who we're speaking with.</p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="flex-1 bg-[#1A1A1A] border border-[rgba(255,90,31,0.15)] rounded-xl px-4 py-3.5 text-sm text-[#FFF5F0] outline-none focus:border-[#FF5A1F] transition-colors"
                  required
                />
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Company Name"
                  className="flex-1 bg-[#1A1A1A] border border-[rgba(255,90,31,0.15)] rounded-xl px-4 py-3.5 text-sm text-[#FFF5F0] outline-none focus:border-[#FF5A1F] transition-colors"
                  required
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Work Email Address"
                  className="flex-[3] bg-[#1A1A1A] border border-[rgba(255,90,31,0.15)] rounded-xl px-4 py-3.5 text-sm text-[#FFF5F0] outline-none focus:border-[#FF5A1F] transition-colors"
                  required
                />
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="flex-[2] bg-[#1A1A1A] border border-[rgba(255,90,31,0.15)] rounded-xl px-4 py-3.5 text-sm text-[#FFF5F0] outline-none focus:border-[#FF5A1F] transition-colors"
                />
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-4 w-full"
            >
              <h3 className="text-2xl font-bold text-[#FFF5F0] mb-1 uppercase" style={{ fontFamily: '"Hanson Bold", serif' }}>Digital Footprint</h3>
              <p className="text-sm text-[rgba(255,245,240,0.5)] mb-2">Where can we find your business right now?</p>
              
              <input
                type="url"
                name="websiteUrl"
                value={formData.websiteUrl}
                onChange={handleChange}
                placeholder="Website URL (e.g. https://yourdomain.com)"
                className="w-full bg-[#1A1A1A] border border-[rgba(255,90,31,0.15)] rounded-xl px-4 py-3.5 text-sm text-[#FFF5F0] outline-none focus:border-[#FF5A1F] transition-colors"
              />
              
              <div className="relative">
                <select
                  name="revenue"
                  value={formData.revenue}
                  onChange={handleChange}
                  className="w-full bg-[#1A1A1A] border border-[rgba(255,90,31,0.15)] rounded-xl px-4 py-3.5 text-sm text-[#FFF5F0] outline-none focus:border-[#FF5A1F] transition-colors appearance-none cursor-pointer"
                  required
                >
                  <option value="" disabled className="text-[rgba(255,245,240,0.3)]">Current Monthly Revenue</option>
                  <option value="Pre-revenue">Pre-revenue</option>
                  <option value="$0 - $10k">$0 - $10k / month</option>
                  <option value="$10k - $50k">$10k - $50k / month</option>
                  <option value="$50k - $100k">$50k - $100k / month</option>
                  <option value="$100k+">$100k+ / month</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-4 w-full"
            >
              <h3 className="text-2xl font-bold text-[#FFF5F0] mb-1 uppercase" style={{ fontFamily: '"Hanson Bold", serif' }}>Your Goals</h3>
              <p className="text-sm text-[rgba(255,245,240,0.5)] mb-2">What's holding you back from the next level?</p>
              
              <input
                type="text"
                name="primaryGoal"
                value={formData.primaryGoal}
                onChange={handleChange}
                placeholder="What is your primary growth goal?"
                className="w-full bg-[#1A1A1A] border border-[rgba(255,90,31,0.15)] rounded-xl px-4 py-3.5 text-sm text-[#FFF5F0] outline-none focus:border-[#FF5A1F] transition-colors"
                required
              />
              
              <textarea
                name="biggestChallenge"
                value={formData.biggestChallenge}
                onChange={handleChange}
                placeholder="What is your biggest bottleneck right now?"
                rows={2}
                className="w-full bg-[#1A1A1A] border border-[rgba(255,90,31,0.15)] rounded-xl px-4 py-3.5 text-sm text-[#FFF5F0] outline-none focus:border-[#FF5A1F] transition-colors resize-none"
                required
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="mt-8 flex items-center justify-between w-full">
          {step > 1 ? (
            <button
              type="button"
              onClick={prevStep}
              className="inline-flex items-center gap-2 text-xs font-semibold text-[rgba(255,245,240,0.6)] hover:text-[#FFF5F0] transition-colors cursor-pointer px-2"
            >
              <RiArrowLeftLine size={14} /> Back
            </button>
          ) : (
            <div /> // Spacer
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="group inline-flex items-center gap-2 rounded-xl pl-6 pr-2 py-1.5 font-semibold text-sm transition-all duration-300 hover:gap-3 disabled:opacity-60 cursor-pointer"
            style={{
              background: "linear-gradient(120deg, #0E0E0E, #FF5A1F)",
              color: "#FFF5F0",
              
            }}
          >
            {step === 3 ? (status === "loading" ? "Submitting..." : "Submit Request") : "Continue"}
            <span className="flex items-center justify-center w-8 h-8 rounded-full transition-transform duration-300 group-hover:scale-110" style={{ background: "rgba(0,0,0,0.15)" }}>
              <RiArrowRightLine size={14} style={{ color: "#FFF5F0" }} />
            </span>
          </button>
        </div>
      </form>
      
      {status === "error" && <p className="text-xs text-[#FF5A1F] text-center mt-4">{errorMessage}</p>}
    </div>
  );
}
