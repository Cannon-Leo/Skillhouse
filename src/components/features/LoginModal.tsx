"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Loader2 } from "lucide-react";
import { Overlay } from "../ui/Overlay";
import styles from "./LoginModal.module.css";

export interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin?: (provider: "google" | "github") => void;
  isLoading?: boolean;
  className?: string;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLogin,
  isLoading: externalLoading = false,
  className = "",
}) => {
  const [internalLoadingProvider, setInternalLoadingProvider] = useState<
    "google" | "github" | null
  >(null);

  const handleProviderLogin = (provider: "google" | "github") => {
    setInternalLoadingProvider(provider);
    if (onLogin) {
      onLogin(provider);
    } else {
      setTimeout(() => {
        setInternalLoadingProvider(null);
        onClose();
      }, 700);
    }
  };

  if (!isOpen) return null;

  return (
    <Overlay isOpen={isOpen} onClose={onClose}>
      <div
        className={`${styles.modal} ${className}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-modal-title"
        aria-describedby="login-modal-desc"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        {/* Header Title */}
        <div className={styles.header}>
          <h2 id="login-modal-title" className={styles.title}>
            Welcome to Skillhouse
          </h2>
        </div>

        {/* Description */}
        <div className={styles.descriptionWrapper}>
          <p id="login-modal-desc" className={styles.description}>
            Skillhouse designs original Agent Skills for Claude Code, Codex and
            Cursor. Install reusable SKILL.md workflows for slides, web pages,
            images and video.
          </p>
        </div>

        {/* OAuth Buttons */}
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.oauthButton}
            onClick={() => handleProviderLogin("google")}
            disabled={externalLoading || internalLoadingProvider !== null}
            data-testid="login-google-btn"
          >
            {internalLoadingProvider === "google" ? (
              <Loader2 className={styles.spinner} size={18} />
            ) : (
              <div className={styles.iconWrapper}>
                <Image
                  src="/figma/google_icon.png"
                  alt="Google logo"
                  width={18}
                  height={18}
                  className={styles.providerIcon}
                  unoptimized
                />
              </div>
            )}
            <span className={styles.buttonText}>Continue with Google</span>
          </button>

          <button
            type="button"
            className={styles.oauthButton}
            onClick={() => handleProviderLogin("github")}
            disabled={externalLoading || internalLoadingProvider !== null}
            data-testid="login-github-btn"
          >
            {internalLoadingProvider === "github" ? (
              <Loader2 className={styles.spinner} size={18} />
            ) : (
              <div className={styles.iconWrapper}>
                <Image
                  src="/figma/github_icon.png"
                  alt="GitHub logo"
                  width={18}
                  height={18}
                  className={styles.providerIcon}
                  unoptimized
                />
              </div>
            )}
            <span className={styles.buttonText}>Continue with Github</span>
          </button>
        </div>
      </div>
    </Overlay>
  );
};
