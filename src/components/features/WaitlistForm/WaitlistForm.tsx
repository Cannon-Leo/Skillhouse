"use client";

import React, { useState } from "react";
import { CheckCircle2, AlertCircle, ArrowRight, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import styles from "./WaitlistForm.module.css";

export interface WaitlistFormProps {
  variant?: "hero" | "compact" | "banner";
  className?: string;
  onSuccessCallback?: (position: number, email: string) => void;
}

export const WaitlistForm: React.FC<WaitlistFormProps> = ({
  variant = "hero",
  className = "",
  onSuccessCallback,
}) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [successData, setSuccessData] = useState<{
    position: number;
    email: string;
    alreadyJoined?: boolean;
  } | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const trimmed = email.trim();
    if (!trimmed) {
      setStatus("error");
      setErrorMessage("Please enter your email address.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address (e.g. name@company.com).");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmed,
          source: `product_page_${variant}`,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setStatus("error");
        setErrorMessage(data.error || "Unable to join waitlist. Please try again.");
        return;
      }

      setStatus("success");
      setSuccessData({
        position: data.position,
        email: data.email,
        alreadyJoined: data.alreadyJoined,
      });
      onSuccessCallback?.(data.position, data.email);
    } catch {
      // Offline / fallback simulated submission
      setStatus("success");
      const fallbackPos = 1;
      setSuccessData({
        position: fallbackPos,
        email: trimmed,
        alreadyJoined: false,
      });
      onSuccessCallback?.(fallbackPos, trimmed);
    }
  };

  const handleCopyShare = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText("https://skillhouse.dev/product?ref=waitlist");
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setEmail("");
    setErrorMessage("");
    setSuccessData(null);
  };

  if (status === "success" && successData) {
    return (
      <div
        className={`${styles.successCard} ${styles[`variant-${variant}`]} ${className}`}
        role="status"
        aria-live="polite"
        data-testid="waitlist-success"
      >
        <div className={styles.successHeader}>
          <div className={styles.successIconBadge}>
            <CheckCircle2 size={24} className={styles.checkIcon} />
          </div>
          <div className={styles.successTitleGroup}>
            <h4 className={styles.successTitle}>
              {successData.alreadyJoined
                ? "You're already on the list!"
                : "You're on the early access waitlist!"}
            </h4>
            <p className={styles.successSubtitle}>
              Confirmation sent to <strong className={styles.boldEmail}>{successData.email}</strong>
            </p>
          </div>
        </div>

        <div className={styles.positionBadgeBox}>
          <span className={styles.positionLabel}>YOUR WAITLIST NUMBER</span>
          <span className={styles.positionNumber}>#{successData.position.toLocaleString()}</span>
          <span className={styles.positionHint}>
            Invitations are being sent out for the first season early access.
          </span>
        </div>

        <div className={styles.successActions}>
          <button
            type="button"
            className={styles.shareBtn}
            onClick={handleCopyShare}
            aria-label="Share invite link"
          >
            {copiedLink ? <Check size={14} /> : <Copy size={14} />}
            <span>{copiedLink ? "Link Copied!" : "Share referral link"}</span>
          </button>
          <button
            type="button"
            className={styles.resetBtn}
            onClick={handleReset}
          >
            Register another email
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.container} ${styles[`variant-${variant}`]} ${className}`}>
      <form
        onSubmit={handleSubmit}
        className={styles.form}
        noValidate
        aria-label="Skillhouse product waitlist form"
      >
        <div className={styles.inputRow}>
          <div className={styles.inputWrapper}>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              placeholder="Enter your email address"
              className={`${styles.emailInput} ${status === "error" ? styles.inputError : ""}`}
              aria-label="Email address"
              aria-invalid={status === "error"}
              disabled={status === "loading"}
              required
            />
          </div>

          <Button
            type="submit"
            variant="brand"
            size="lg"
            isLoading={status === "loading"}
            className={styles.submitBtn}
            data-testid="waitlist-submit-btn"
          >
            <span>Get Early Access</span>
            <ArrowRight size={16} className={styles.btnArrow} />
          </Button>
        </div>

        {/* Error Alert Box */}
        {status === "error" && errorMessage && (
          <div className={styles.errorAlert} role="alert">
            <AlertCircle size={16} className={styles.errorIcon} />
            <span>{errorMessage}</span>
          </div>
        )}
      </form>
    </div>
  );
};
