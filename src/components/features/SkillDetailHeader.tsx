"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "../ui/Button";
import { SkillAudienceBox } from "./SkillAudienceBox";
import { SkillRuntimeSpecs } from "./SkillRuntimeSpecs";
import styles from "./SkillDetailHeader.module.css";

export interface SkillDetailHeaderProps {
  id?: string;
  title?: string;
  isBookmarked?: boolean;
  onBookmarkToggle?: (isBookmarked: boolean) => void;
  version?: string;
  price?: string;
  isFree?: boolean;
  isSubscribed?: boolean;
  description?: string;
  installPrompt?: string;
  className?: string;
  onBuy?: () => void;
  onSubscribe?: () => void;
}

export const SkillDetailHeader: React.FC<SkillDetailHeaderProps> = ({
  title = "Visual Canvas Deck",
  version = "1.0.3",
  price = "$5",
  isFree = false,
  isSubscribed = false,
  description = "A skill for generating high-converting slide decks and pitch presentations directly in browser canvas or PowerPoint formats with verified design tokens.",
  installPrompt = "npx skillhouse add visual-canvas-deck",
  className = "",
  isBookmarked: controlledBookmarked,
  onBookmarkToggle,
  onBuy,
  onSubscribe,
}) => {
  const [internalBookmarked, setInternalBookmarked] = useState(false);
  const isBookmarked = controlledBookmarked !== undefined ? controlledBookmarked : internalBookmarked;

  const handleBookmarkToggle = () => {
    const next = !isBookmarked;
    if (controlledBookmarked === undefined) setInternalBookmarked(next);
    onBookmarkToggle?.(next);
    setToastMessage(next ? "Skill added to bookmarks!" : "Skill removed from bookmarks");
    setTimeout(() => setToastMessage(null), 2500);
  };
  const [copied, setCopied] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(installPrompt);
      setCopied(true);
      setToastMessage("Install prompt copied to clipboard!");
      setTimeout(() => setCopied(false), 2200);
      setTimeout(() => setToastMessage(null), 3000);
    } catch {
      setToastMessage("Copied to clipboard!");
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  const handleDownloadZip = () => {
    setToastMessage("Preparing skill archive bundle download...");
    setTimeout(() => setToastMessage(null), 3000);
  };

  const modelLogos = [
    "/figma/logo-1.png",
    "/figma/logo-2.png",
    "/figma/logo-3.png",
    "/figma/logo-4.png",
    "/figma/logo-5.png",
    "/figma/logo-6.png",
  ];

  return (
    <section className={`${styles.panel} ${className}`} aria-label="Skill details and actions">
      {/* 1. Header Top Row (Node 725:11246) */}
      <div className={styles.headerTop}>
        <div className={styles.titleArea}>
          <h1 className={styles.title}>{title}</h1>
          <span className={styles.versionBadge}>{version}</span>
        </div>

        <div className={styles.actionIcons}>
          <Button
            variant={isBookmarked ? "brand" : "icon-border"}
            size="icon-sm"
            aria-label={isBookmarked ? "Remove from bookmarks" : "Bookmark skill"}
            aria-pressed={isBookmarked}
            title={isBookmarked ? "Saved in bookmarks" : "Bookmark skill"}
            onClick={handleBookmarkToggle}
          >
            <svg 
              width="14" 
              height="14" 
              viewBox="0 0 24 24" 
              fill={isBookmarked ? "currentColor" : "none"} 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
          </Button>

          <Button
            variant="icon-border"
            size="icon-sm"
            aria-label="Upload variant"
            title="Upload variant"
          >
            <Image
              src="/figma/upload.svg"
              alt=""
              width={14}
              height={14}
              unoptimized
            />
          </Button>
        </div>
      </div>

      {/* 2. Stats & Verification Row (Node 725:11257) */}
      <div className={styles.metaStatsRow}>
        <div className={styles.statsLeft}>
          <span className={styles.statItem} title="Installs">
            <Image
              src="/figma/import.svg"
              alt=""
              width={14}
              height={14}
              unoptimized
            />
            <span>1,420</span>
          </span>

          <span className={styles.statItem} title="Forks">
            <Image
              src="/figma/folder-open.svg"
              alt=""
              width={14}
              height={14}
              unoptimized
            />
            <span>384</span>
          </span>
        </div>

        <div className={styles.statsRight}>
          <span className={styles.verifiedBadge} title="Verified Skill">
            <Image
              src="/figma/shield-tick.svg"
              alt=""
              width={14}
              height={14}
              unoptimized
            />
            <span>Verified</span>
          </span>
        </div>
      </div>

      {/* 3. Monetization Row (Figma Node 749:1756 vs 749:2815 vs Default) */}
      {!isFree && !isSubscribed && (
        <div className={styles.priceRow}>
          <span className={styles.price}>{price}</span>
          <Button
            variant="primary"
            size="lg"
            onClick={onBuy}
          >
            Buy now
          </Button>
        </div>
      )}

      {!isFree && (
        <div
          className={styles.subscriptionBanner}
          onClick={onSubscribe}
          role="button"
          tabIndex={0}
          aria-label="Subscribe to All Skills"
        >
          <div className={styles.bannerContent}>
            <span className={styles.bannerTitle}>
              {isSubscribed ? "All-Access Subscription Active" : "Subscribe — All Skills, one subscription"}
            </span>
            <span className={styles.bannerSubtitle}>
              No exclusions. Access all curated, verified and continuously updated skills
            </span>
          </div>

          <span className={styles.bannerArrow}>
            <Image
              src="/figma/arrow-right.svg"
              alt=""
              width={16}
              height={16}
              unoptimized
            />
          </span>
        </div>
      )}

      {/* 5. Action Buttons Grid (Node 725:11313) */}
      <div className={styles.actionsGrid}>
        <Button
          variant="outline-brand"
          size="lg"
          onClick={handleCopyPrompt}
          leftIcon={
            <Image
              src="/figma/copy.svg"
              alt=""
              width={16}
              height={16}
              unoptimized
            />
          }
        >
          {copied ? "Prompt Copied!" : "Copy install prompt"}
        </Button>

        <Button
          variant="outline"
          size="lg"
          onClick={handleDownloadZip}
          leftIcon={
            <Image
              src="/figma/import.svg"
              alt=""
              width={16}
              height={16}
              unoptimized
            />
          }
        >
          Download ZIP
        </Button>
      </div>

      {/* 6. Description & Info link (Node 725:11321) */}
      <div className={styles.descriptionSection}>
        <p className={styles.descriptionText}>{description}</p>

        <button
          type="button"
          className={styles.infoLink}
          onClick={() => setShowInfo(!showInfo)}
        >
          <Image
            src="/figma/info-circle.svg"
            alt=""
            width={12}
            height={12}
            unoptimized
          />
          <span>What do I get when I buy this Skill?</span>
        </button>

        {showInfo && (
          <div className={styles.infoModalContent}>
            <strong>Included in this package:</strong>
            <ul style={{ paddingLeft: "18px", marginTop: "6px" }}>
              <li>Full SKILL.md system prompt instructions and XML schemas</li>
              <li>Pre-configured scripts for browser export and PPTX compilation</li>
              <li>Ready-to-use template assets for Claude, Cursor, and OpenAI</li>
              <li>Continuous updates and verified security compatibility</li>
            </ul>
          </div>
        )}
      </div>

      {/* 7. Figma Node 725:11328: "This skill is often used by" */}
      <SkillAudienceBox
        label="This skill is often used by"
        roles={["Product Manager", "Graphic Designer", "Art Director"]}
        lastUpdated="Last updated Oct 3, 2026"
      />

      {/* 8. Figma Node 725:11346: "Runs in" + "Install guides" + "Generates with" */}
      <SkillRuntimeSpecs
        runsInModels={modelLogos}
        installGuides={["Claude Code", "Cursor"]}
        generatesWith={["Host Agent LLM"]}
      />

      {/* Toast Feedback */}
      {toastMessage && (
        <div className={styles.toast} role="status">
          <span>✓</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </section>
  );
};
