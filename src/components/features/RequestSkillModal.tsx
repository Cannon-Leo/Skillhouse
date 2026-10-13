"use client";

import React, { useState } from "react";
import { Overlay } from "@/components/ui/Overlay";
import { Check, X } from "lucide-react";
import { CustomSelect } from "../ui/CustomSelect";
import styles from "./RequestSkillModal.module.css";

export interface SkillRequestData {
  id: string;
  title: string;
  problemOutcome: string;
  category: string;
  targetAgent?: string;
  accessPreference?: "Free" | "Included in a subscription" | "Either is fine";
  email?: string;
  triggerSource?: string;
  status: "Submitted";
  createdAt: string;
}

export interface RequestSkillModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTitle?: string;
  triggerSource?: string;
  onSubmitSuccess?: (data: SkillRequestData) => void;
}

export const CATEGORY_OPTIONS = [
  "Development & coding",
  "Design & creative",
  "Writing & content",
  "Research & analysis",
  "Business & productivity",
  "Other",
];

export const AGENT_OPTIONS = [
  "Not sure yet",
  "Claude Code",
  "Codex",
  "Cursor",
  "Gemini CLI",
  "OpenCode",
  "Multiple agents",
  "Other",
];

export const RequestSkillModal: React.FC<RequestSkillModalProps> = ({
  isOpen,
  onClose,
  initialTitle = "",
  triggerSource = "homepage",
  onSubmitSuccess,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [prevInitialTitle, setPrevInitialTitle] = useState(initialTitle);

  const [problemOutcome, setProblemOutcome] = useState("");
  const [category, setCategory] = useState(CATEGORY_OPTIONS[0]);
  const [targetAgent, setTargetAgent] = useState("Not sure yet");
  const [accessPreference, setAccessPreference] = useState<
    "Free" | "Included in a subscription" | "Either is fine"
  >("Either is fine");
  const [email, setEmail] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<SkillRequestData | null>(null);

  // Sync state during render when props change (standard React recommended pattern)
  if (initialTitle !== prevInitialTitle) {
    setPrevInitialTitle(initialTitle);
    setTitle(initialTitle);
  }

  const validate = (): boolean => {
    const nextErrors: Record<string, string> = {};

    if (!title.trim()) {
      nextErrors.title = "Request title is required";
    } else if (title.trim().length < 3) {
      nextErrors.title = "Title must be at least 3 characters";
    } else if (title.trim().length > 120) {
      nextErrors.title = "Title cannot exceed 120 characters";
    }

    if (!problemOutcome.trim()) {
      nextErrors.problemOutcome = "Problem and desired outcome description is required";
    } else if (problemOutcome.trim().length < 10) {
      nextErrors.problemOutcome = "Please provide at least a short description (10+ characters)";
    } else if (problemOutcome.trim().length > 2000) {
      nextErrors.problemOutcome = "Description cannot exceed 2000 characters";
    }

    if (!category) {
      nextErrors.category = "Please select a category";
    }

    if (email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        nextErrors.email = "Please enter a valid email address";
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!validate()) return;

    setIsSubmitting(true);

    const newRequest: SkillRequestData = {
      id: `req_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      title: title.trim(),
      problemOutcome: problemOutcome.trim(),
      category,
      targetAgent,
      accessPreference,
      email: email.trim() || undefined,
      triggerSource,
      status: "Submitted",
      createdAt: new Date().toISOString(),
    };

    // Store in localStorage if in browser environment for MVP persistence
    if (typeof window !== "undefined") {
      try {
        const stored = JSON.parse(localStorage.getItem("skill_requests") || "[]");
        stored.push(newRequest);
        localStorage.setItem("skill_requests", JSON.stringify(stored));
      } catch (err) {
        console.error("Failed to store skill request:", err);
      }
    }

    setIsSubmitting(false);
    setSubmittedData(newRequest);
    onSubmitSuccess?.(newRequest);
  };

  const handleResetAndClose = () => {
    setTitle("");
    setProblemOutcome("");
    setCategory(CATEGORY_OPTIONS[0]);
    setTargetAgent("Not sure yet");
    setAccessPreference("Either is fine");
    setEmail("");
    setSubmittedData(null);
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Overlay isOpen={isOpen} onClose={handleResetAndClose}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="request-skill-title"
      >
        <button
          type="button"
          className={styles.closeButton}
          onClick={handleResetAndClose}
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {submittedData ? (
          <div className={styles.successContainer}>
            <div className={styles.successIconWrapper}>
              <Check size={28} />
            </div>
            <h2 className={styles.successTitle}>Request submitted</h2>
            <p className={styles.successMsg}>
              Thanks for sharing what you need. We’ll review your request and use
              it to help prioritise future skills. We can’t guarantee every
              request will be built.
            </p>
            <div className={styles.requestIdTag}>ID: {submittedData.id}</div>
            <button
              type="button"
              className={styles.submitBtn}
              onClick={handleResetAndClose}
              data-testid="back-to-marketplace-btn"
            >
              Back to marketplace
            </button>
          </div>
        ) : (
          <>
            <div className={styles.header}>
              <h2 id="request-skill-title" className={styles.title}>
                Request a skill
              </h2>
              <p className={styles.introCopy}>
                Tell us what you want an AI agent to help you do. Share the task
                or problem you’re trying to solve. We’ll use requests to understand
                what the community needs, but we can’t promise every request will
                be built.
              </p>
            </div>

            <form onSubmit={handleSubmit} className={styles.formBody} noValidate>
              {/* Title */}
              <div className={styles.formGroup}>
                <div className={styles.labelRow}>
                  <label htmlFor="req-title" className={styles.label}>
                    What should the skill help you do?
                    <span className={styles.requiredBadge}>*</span>
                  </label>
                </div>
                <input
                  id="req-title"
                  type="text"
                  className={`${styles.input} ${errors.title ? styles.inputError : ""}`}
                  placeholder="e.g. Automatically generate weekly design critique summaries"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={120}
                  required
                />
                {errors.title && <span className={styles.errorText}>{errors.title}</span>}
              </div>

              {/* Problem and desired outcome */}
              <div className={styles.formGroup}>
                <div className={styles.labelRow}>
                  <label htmlFor="req-problem" className={styles.label}>
                    What are you trying to do, and what would a good result look like?
                    <span className={styles.requiredBadge}>*</span>
                  </label>
                </div>
                <textarea
                  id="req-problem"
                  className={`${styles.textarea} ${errors.problemOutcome ? styles.inputError : ""}`}
                  placeholder="Describe the context, your current manual bottleneck, and what an effective agent skill would produce..."
                  value={problemOutcome}
                  onChange={(e) => setProblemOutcome(e.target.value)}
                  maxLength={2000}
                  rows={4}
                  required
                />
                {errors.problemOutcome && (
                  <span className={styles.errorText}>{errors.problemOutcome}</span>
                )}
              </div>

              {/* Category */}
              <div className={styles.formGroup}>
                <div className={styles.labelRow}>
                  <label htmlFor="req-category" className={styles.label}>
                    Category
                    <span className={styles.requiredBadge}>*</span>
                  </label>
                </div>
                <CustomSelect
                  id="req-category"
                  value={category}
                  options={CATEGORY_OPTIONS}
                  onChange={setCategory}
                  required
                />
              </div>

              {/* Target Agent (Optional) */}
              <div className={styles.formGroup}>
                <div className={styles.labelRow}>
                  <label htmlFor="req-agent" className={styles.label}>
                    Target agent
                  </label>
                  <span className={styles.optionalBadge}>Optional</span>
                </div>
                <CustomSelect
                  id="req-agent"
                  value={targetAgent}
                  options={AGENT_OPTIONS}
                  onChange={setTargetAgent}
                />
              </div>

              {/* Access preference (Optional) */}
              <div className={styles.formGroup}>
                <div className={styles.labelRow}>
                  <span className={styles.label}>Access preference</span>
                  <span className={styles.optionalBadge}>Optional</span>
                </div>
                <div className={styles.radioGroup}>
                  {(["Free", "Included in a subscription", "Either is fine"] as const).map(
                    (pref) => {
                      const isChecked = accessPreference === pref;
                      return (
                        <label
                          key={pref}
                          className={`${styles.radioLabel} ${isChecked ? styles.radioLabelActive : ""}`}
                        >
                          <input
                            type="radio"
                            name="accessPreference"
                            value={pref}
                            checked={isChecked}
                            onChange={() => setAccessPreference(pref)}
                            className={styles.radioInput}
                          />
                          <span
                            className={`${styles.radioIndicator} ${isChecked ? styles.radioIndicatorChecked : ""}`}
                            aria-hidden="true"
                          >
                            {isChecked && <span className={styles.radioDot} />}
                          </span>
                          <span className={styles.radioText}>{pref}</span>
                        </label>
                      );
                    }
                  )}
                </div>
              </div>

              {/* Email for updates (Optional) */}
              <div className={styles.formGroup}>
                <div className={styles.labelRow}>
                  <label htmlFor="req-email" className={styles.label}>
                    Want updates about this request?
                  </label>
                  <span className={styles.optionalBadge}>Optional</span>
                </div>
                <input
                  id="req-email"
                  type="email"
                  className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                <p className={styles.helpText}>
                  We’ll only email you if there’s a status update on this request.
                  No spam or marketing emails.
                </p>
              </div>

              <div className={styles.footer}>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={handleResetAndClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={isSubmitting}
                  data-testid="submit-skill-request-btn"
                >
                  {isSubmitting ? "Submitting..." : "Submit request"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </Overlay>
  );
};
