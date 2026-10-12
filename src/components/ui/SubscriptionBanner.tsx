"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import styles from "./SubscriptionBanner.module.css";

export interface SubscriptionBannerProps {
  /** Title text. Defaults to Figma exact string: "Subsribe - All Skills, one subscription" */
  title?: string;
  /** Subtitle text. Defaults to Figma exact string: "No exclusions. Access all curated, verified and continuously updated skills" */
  subtitle?: string;
  /** Whether the user is currently subscribed */
  isSubscribed?: boolean;
  /** Click/activation handler */
  onSubscribe?: () => void;
  /** Additional custom class */
  className?: string;
  /** Custom test ID. Defaults to 'premium-subscription-banner' */
  testId?: string;
  /** Accessible label */
  ariaLabel?: string;
}

/**
 * SubscriptionBanner Component (Figma Node 751:5654 "add journey")
 *
 * Core brand banner providing instant access to the All-Skills subscription.
 * - Solid #FB6320 background with 16px padding and 0px radius
 * - Horizontal flex layout: Title + Subtitle stack on left, Line arrow-right on right
 * - Typography: Geist Pixel Square (16px) title + Geist Regular (13px) subtitle in #FFE3D7
 */
export const SubscriptionBanner: React.FC<SubscriptionBannerProps> = ({
  title,
  subtitle = "No exclusions. Access all curated, verified and continuously updated skills",
  isSubscribed = false,
  onSubscribe,
  className = "",
  testId = "premium-subscription-banner",
  ariaLabel = "Subscribe to All Skills",
}) => {
  const displayTitle =
    title ?? (isSubscribed ? "All-Access Subscription Active" : "Subsribe - All Skills, one subscription");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (onSubscribe && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onSubscribe();
    }
  };

  return (
    <div
      className={`${styles.banner} ${className}`.trim()}
      onClick={onSubscribe}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
      data-testid={testId}
    >
      <div className={styles.textContainer}>
        <span className={styles.title}>{displayTitle}</span>
        <span className={styles.subtitle}>{subtitle}</span>
      </div>

      <div className={styles.arrowContainer} data-testid="subscription-banner-arrow">
        <ArrowRight size={16} aria-hidden="true" />
      </div>
    </div>
  );
};
