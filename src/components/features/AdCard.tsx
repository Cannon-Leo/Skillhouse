"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import styles from "./AdCard.module.css";

export interface AdCardProps {
  id?: string;
  sponsorName?: string;
  title: string;
  description: string;
  badgeLabel?: string;
  ctaText?: string;
  ctaUrl?: string;
  imageSrc?: string;
  onClick?: () => void;
  className?: string;
}

export const AdCard: React.FC<AdCardProps> = ({
  id,
  sponsorName = "Sponsored",
  title = "Scale Your Agent Workflows",
  description = "Deploy, monitor and evaluate multi-model autonomous agents with enterprise-grade guardrails.",
  badgeLabel = "Promoted",
  ctaText = "Learn more",
  ctaUrl = "#",
  imageSrc,
  onClick,
  className = "",
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (ctaUrl && ctaUrl !== "#") {
      window.open(ctaUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      id={id}
      className={`${styles.card} ${className}`}
      onClick={handleClick}
      role="article"
      tabIndex={0}
      aria-label={`Sponsored ad: ${title}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <div className={styles.imageContainer}>
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={styles.previewImage}
            unoptimized
          />
        ) : (
          <div className={styles.placeholderBanner}>
            <div className={styles.decorativeGrid} />
            <div className={styles.bannerTag}>{sponsorName}</div>
          </div>
        )}

        <div className={styles.imageOverlays}>
          <span className={styles.pill}>{badgeLabel}</span>
          <span className={styles.externalIndicator} title="Sponsored external link">
            <ArrowUpRight size={14} />
          </span>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.headerRow}>
          <h3 className={styles.title} title={title}>
            {title}
          </h3>
          <span className={styles.ctaLabel}>
            <span>{ctaText}</span>
            <ArrowUpRight size={12} className={styles.ctaArrow} />
          </span>
        </div>
      </div>
    </div>
  );
};
