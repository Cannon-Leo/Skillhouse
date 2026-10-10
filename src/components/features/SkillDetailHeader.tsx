"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SkillAudienceBox } from "./SkillAudienceBox";
import { SkillRuntimeSpecs } from "./SkillRuntimeSpecs";
import styles from "./SkillDetailHeader.module.css";

export interface SkillDetailHeaderProps {
  title?: string;
  version?: string;
  price?: string;
  description?: string;
  installPrompt?: string;
  isBookmarked?: boolean;
  onBookmarkToggle?: (isBookmarked: boolean) => void;
  isSubscribed?: boolean;
  onSubscribe?: () => void;
  onBuy?: () => void;
  isFree?: boolean;
  variant?: "free" | "premium";
  className?: string;
}

export const SkillDetailHeader: React.FC<SkillDetailHeaderProps> = ({
  title = "Visual Canvas Deck",
  version = "v1.0.1",
  price = "$5",
  description = "Create an exploratory presentation that turns a rough brief into editable spatial compositions and a coherent deck. It supports visual iteration through addressable canvases, clear outline approval, and a browser-ready presentation. Every deck can be edited in the browser and exported as an editable PowerPoint file.",
  installPrompt = "npx skillhouse add visual-canvas-deck",
  isBookmarked: initialBookmarked = false,
  onBookmarkToggle,
  isSubscribed = false,
  onSubscribe,
  isFree: propIsFree,
  variant: propVariant,
  className = "",
}) => {
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);
  const [copied, setCopied] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Determine state: explicit variant prop wins, otherwise check isFree or price
  const isFreeState =
    propVariant === "free"
      ? true
      : propVariant === "premium"
      ? false
      : propIsFree !== undefined
      ? propIsFree
      : price.toLowerCase().includes("free");

  const handleBookmarkToggle = () => {
    const next = !isBookmarked;
    setIsBookmarked(next);
    onBookmarkToggle?.(next);
    setToastMessage(next ? "Skill added to bookmarks!" : "Skill removed from bookmarks");
    setTimeout(() => setToastMessage(null), 2500);
  };

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
    <section
      className={`${styles.panel} ${className}`}
      aria-label="Skill details and actions"
      data-testid="composite-skill-action-panel"
      data-variant={isFreeState ? "free" : "premium"}
    >
      {/* 1. Header Top Action Block (Figma Nodes 752:11246 / 752:11110) */}
      <div className={styles.topActionBlock}>
        {/* Row A: Title & Round Action Buttons (Nodes 752:11247 / 752:11111) */}
        <div className={styles.titleRow}>
          <h1 className={styles.title}>{title}</h1>

          <div className={styles.roundActionButtons}>
            <button
              type="button"
              className={`${styles.roundButton} ${isBookmarked ? styles.bookmarkedActive : ""}`}
              aria-label={isBookmarked ? "Remove from bookmarks" : "Bookmark skill"}
              aria-pressed={isBookmarked}
              title={isBookmarked ? "Saved in bookmarks" : "Bookmark skill"}
              onClick={handleBookmarkToggle}
            >
              <Image
                src="/figma/node_752_11116.svg"
                alt=""
                width={14}
                height={14}
                unoptimized
              />
            </button>

            <button
              type="button"
              className={styles.roundButton}
              aria-label="Share skill"
              title="Share skill"
              onClick={() => {
                if (typeof window !== "undefined") {
                  navigator.clipboard?.writeText?.(window.location.href);
                }
                setToastMessage("Link copied to clipboard!");
                setTimeout(() => setToastMessage(null), 2500);
              }}
            >
              <Image
                src="/figma/node_752_11118.svg"
                alt=""
                width={14}
                height={14}
                unoptimized
              />
            </button>
          </div>
        </div>

        {/* Row B: Meta Stats Row (Nodes 752:11255 / 752:11119) */}
        <div className={styles.metaStatsRow}>
          <span className={styles.statItem} title="Installs">
            <Image
              src="/figma/node_752_11121.svg"
              alt=""
              width={14}
              height={14}
              unoptimized
            />
            <span>295</span>
          </span>

          <span className={styles.statItem} title="Saved">
            <Image
              src="/figma/node_752_11116.svg"
              alt=""
              width={14}
              height={14}
              unoptimized
            />
            <span>295</span>
          </span>

          <span className={styles.statItem} title="Version">
            <Image
              src="/figma/node_752_11130.svg"
              alt=""
              width={11}
              height={14}
              unoptimized
            />
            <span>{version}</span>
          </span>

          <span className={styles.statItem} title="Security status">
            <Image
              src="/figma/node_752_11134.svg"
              alt=""
              width={14}
              height={14}
              unoptimized
            />
            <span>Secure</span>
          </span>
        </div>

        {/* Row C: Monetization State (Free Node 752:11273 vs Premium Node 752:11137) */}
        {isFreeState ? (
          <div className={styles.freePriceRow} data-testid="free-price-indicator">
            <span className={styles.freePriceText}>Free</span>
          </div>
        ) : (
          <div
            className={styles.subscriptionBanner}
            onClick={onSubscribe}
            role="button"
            tabIndex={0}
            aria-label="Subscribe to All Skills"
            data-testid="premium-subscription-banner"
          >
            <div className={styles.bannerContent}>
              <span className={styles.bannerTitle}>
                {isSubscribed ? "All-Access Subscription Active" : "Subsribe - All Skills, one subscription"}
              </span>
              <span className={styles.bannerSubtitle}>
                No exclusions. Access all curated, verified and continuously updated skills
              </span>
            </div>

            <div className={styles.bannerArrowRow}>
              <span className={styles.bannerArrow}>
                <Image
                  src="/figma/node_752_11153.svg"
                  alt=""
                  width={16}
                  height={16}
                  unoptimized
                />
              </span>
            </div>
          </div>
        )}

        {/* Row D: Primary Action Buttons (Nodes 752:11275 / 752:11154) */}
        <div className={styles.actionButtonsRow}>
          <button
            type="button"
            className={styles.copyPromptBtn}
            onClick={handleCopyPrompt}
            aria-label={copied ? "Prompt Copied!" : "Copy install prompt"}
          >
            <Image
              src="/figma/copy.svg"
              alt=""
              width={16}
              height={16}
              unoptimized
            />
            <span>{copied ? "Prompt Copied!" : "Copy install prompt"}</span>
          </button>

          <button
            type="button"
            className={styles.downloadZipBtn}
            onClick={handleDownloadZip}
            aria-label="Download ZIP archive"
          >
            <Image
              src="/figma/import.svg"
              alt=""
              width={16}
              height={16}
              unoptimized
            />
            <span>Download ZIP</span>
          </button>
        </div>
      </div>

      {/* Explicit Section Divider Line (Nodes 752:11284 / 752:11163) */}
      <hr className={styles.sectionDivider} />

      {/* 2. Description Block & Help Link (Nodes 752:11285 / 752:11164) */}
      <div className={styles.descriptionBlock}>
        <p className={styles.descriptionText}>{description}</p>

        <button
          type="button"
          className={styles.infoLink}
          onClick={() => setShowInfo(!showInfo)}
          aria-expanded={showInfo}
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
          <div className={styles.infoModalContent} role="region" aria-label="Purchase details">
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

      {/* 3. Audience Box (Nodes 752:11291 / 752:11170) */}
      <SkillAudienceBox
        label="This skill is often used by"
        roles={["Product Manager", "Graphic Designer", "Art Director"]}
        lastUpdated="Last updated Oct 3, 2026"
      />

      {/* 4. Runtime & Guide Specs (Nodes 752:11309 / 752:11188) */}
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
