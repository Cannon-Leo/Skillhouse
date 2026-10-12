"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { NavBar } from "./NavBar";
import { SkillDetailHeader } from "./SkillDetailHeader";
import { SkillCard } from "./SkillCard";
import { Footer } from "./Footer";
import { LoginModal } from "./LoginModal";
import { RequestSkillModal } from "./RequestSkillModal";
import styles from "./SkillDetailPage.module.css";

export interface SkillDetailData {
  id: string;
  title: string;
  version: string;
  price: string;
  isFree?: boolean;
  description: string;
  installPrompt: string;
  category: string;
  previewImage: string;
  thumbnails?: string[];
  models?: string[];
  roles?: string[];
}

export const DEFAULT_DETAIL_SKILL: SkillDetailData = {
  id: "visual-canvas-deck",
  title: "Visual Canvas Deck",
  version: "v1.0.1",
  price: "$5",
  isFree: false,
  category: "Presentations",
  description:
    "Create an exploratory presentation that turns a rough brief into editable spatial compositions and a coherent deck. It supports visual iteration through addressable canvases, clear outline approval, and a browser-ready presentation. Every deck can be edited in the browser and exported as an editable PowerPoint file.",
  installPrompt: "npx skillhouse add visual-canvas-deck",
  previewImage: "/figma/node_751_5606.png",
  thumbnails: [
    "/figma/node_751_5606.png",
    "/figma/node_751_5608.png",
    "/figma/node_751_5609.png",
  ],
  models: [
    "/figma/agent-claude.png",
    "/figma/agent-antigravity.png",
    "/figma/agent-cursor.png",
    "/figma/agent-codex.png",
  ],
  roles: ["Product Manager", "Graphic Designer", "Art Director"],
};

export const SIMILAR_SKILLS = [
  {
    id: "pixel-promo-video",
    title: "Pixel Promo Video",
    category: "Video",
    price: "Free",
    previewImage: "/figma/marketplace_sample_card.png",
    models: ["/figma/agent-claude.png", "/figma/agent-antigravity.png"],
  },
  {
    id: "web-dev-pro",
    title: "Web Development Pro",
    category: "Code",
    price: "Free",
    previewImage: "/figma/marketplace_sample_card.png",
    models: ["/figma/agent-cursor.png", "/figma/agent-codex.png"],
  },
  {
    id: "brand-identity-suite",
    title: "Brand Identity Suite",
    category: "Design",
    price: "$8",
    previewImage: "/figma/marketplace_sample_card.png",
    models: ["/figma/agent-claude.png", "/figma/agent-kimi.png"],
  },
  {
    id: "interactive-pitch-deck",
    title: "Interactive Pitch Deck",
    category: "Presentations",
    price: "$12",
    previewImage: "/figma/marketplace_sample_card.png",
    models: ["/figma/agent-claude.png", "/figma/agent-cursor.png"],
  },
];

export interface SkillDetailPageProps {
  skill?: SkillDetailData;
  onBack?: () => void;
  onNavigateSkill?: (id: string) => void;
  onNavigateHome?: () => void;
  onNavigateMarketplace?: () => void;
  className?: string;
}

export const SkillDetailPage: React.FC<SkillDetailPageProps> = ({
  skill = DEFAULT_DETAIL_SKILL,
  onBack,
  onNavigateSkill,
  onNavigateHome,
  onNavigateMarketplace,
  className = "",
}) => {
  const thumbnails = skill.thumbnails && skill.thumbnails.length > 0
    ? skill.thumbnails
    : [skill.previewImage];

  const [activeThumbnailIndex, setActiveThumbnailIndex] = useState(0);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRequestSkillOpen, setIsRequestSkillOpen] = useState(false);
  const [similarSkillsOffset, setSimilarSkillsOffset] = useState(0);

  const router = useRouter();
  const activeImage = thumbnails[activeThumbnailIndex] || skill.previewImage;
  const visibleSimilarSkills = SIMILAR_SKILLS.slice(similarSkillsOffset, similarSkillsOffset + 4);

  const handlePrevSimilar = () => {
    setSimilarSkillsOffset((prev) => Math.max(0, prev - 1));
  };

  const handleNextSimilar = () => {
    setSimilarSkillsOffset((prev) => Math.min(SIMILAR_SKILLS.length - 4, prev + 1));
  };

  return (
    <div
      className={`${styles.pageContainer} ${className}`}
      data-testid="skill-detail-page"
    >
      {/* 1. Header Navigation Bar (Figma Node 751:5943) */}
      <NavBar
        currentView="marketplace"
        onViewChange={(view) => {
          if (view === "home") {
            if (onNavigateHome) onNavigateHome();
            else router.push("/");
          } else if (view === "marketplace") {
            if (onNavigateMarketplace) onNavigateMarketplace();
            else router.push("/skills");
          }
        }}
        onOpenLoginModal={() => setIsLoginOpen(true)}
        onRequestSkill={() => setIsRequestSkillOpen(true)}
      />

      {/* 2. Main Centered 898px Workspace */}
      <main className={styles.mainContent}>
        {/* Breadcrumb Navigation Trail (Figma Node 751:5871) */}
        <nav aria-label="Breadcrumb" className={styles.breadcrumbRow}>
          <button
            type="button"
            className={styles.backButton}
            onClick={() => {
              if (onBack) onBack();
              else if (onNavigateMarketplace) onNavigateMarketplace();
              else router.back();
            }}
            aria-label="Go back to previous page"
            data-testid="skill-detail-back-btn"
          >
            <ChevronLeft size={16} aria-hidden="true" />
            <span>Back</span>
          </button>

          <span className={styles.divider} aria-hidden="true" />

          <div className={styles.breadcrumbTrail}>
            <Link
              href="/"
              className={styles.breadcrumbItem}
              onClick={(e) => {
                if (onNavigateHome) {
                  e.preventDefault();
                  onNavigateHome();
                }
              }}
            >
              Dashboard
            </Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <Link
              href="/?view=marketplace"
              className={styles.breadcrumbItem}
              onClick={(e) => {
                if (onNavigateMarketplace) {
                  e.preventDefault();
                  onNavigateMarketplace();
                }
              }}
            >
              Skills
            </Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <span className={styles.breadcrumbItem}>{skill.category}</span>
            <span className={styles.breadcrumbSeparator}>/</span>
            <span className={styles.breadcrumbCurrent} aria-current="page">
              {skill.title}
            </span>
          </div>
        </nav>

        {/* Two-Column Main Layout (Figma Node 751:5604) */}
        <section className={styles.twoColumnLayout}>
          {/* Left Column: Media Preview Gallery (Figma Node 751:5605) */}
          <div className={styles.galleryColumn}>
            <div
              className={styles.mainPreviewCanvas}
              data-testid="skill-detail-main-preview"
            >
              <Image
                src={activeImage}
                alt={`${skill.title} preview canvas`}
                width={437}
                height={450}
                className={styles.mainPreviewImage}
                priority
                unoptimized
              />
            </div>

            {/* Thumbnail Selectors (Figma Node 751:5607) */}
            <div className={styles.thumbnailsRow} role="tablist" aria-label="Preview gallery thumbnails">
              {thumbnails.map((thumbSrc, idx) => (
                <button
                  key={`${thumbSrc}-${idx}`}
                  type="button"
                  role="tab"
                  aria-selected={activeThumbnailIndex === idx}
                  aria-label={`View preview slide ${idx + 1}`}
                  className={`${styles.thumbnailCard} ${activeThumbnailIndex === idx ? styles.active : ""}`}
                  onClick={() => setActiveThumbnailIndex(idx)}
                  data-testid={`thumbnail-tab-${idx}`}
                >
                  <Image
                    src={thumbSrc}
                    alt={`Thumbnail ${idx + 1}`}
                    width={91}
                    height={80}
                    className={styles.thumbnailImage}
                    unoptimized
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Composite Action Panel (Figma Node 751:5611) */}
          <div className={styles.panelColumn}>
            <SkillDetailHeader
              title={skill.title}
              version={skill.version}
              price={skill.price}
              description={skill.description}
              installPrompt={skill.installPrompt}
              isFree={skill.isFree}
              variant={skill.isFree ? "free" : "premium"}
            />
          </div>
        </section>

        {/* 3. Similar Skills Row (Figma Node 751:5762) */}
        <section className={styles.similarSection} aria-labelledby="similar-skills-heading">
          <div className={styles.similarHeaderRow}>
            <h2 id="similar-skills-heading" className={styles.similarTitle}>
              Similar Skills
            </h2>
            <div className={styles.carouselControls}>
              <button
                type="button"
                className={styles.carouselBtn}
                onClick={handlePrevSimilar}
                aria-label="Previous similar skills"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                className={styles.carouselBtn}
                onClick={handleNextSimilar}
                aria-label="Next similar skills"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div className={styles.similarGrid} data-testid="similar-skills-grid">
            {visibleSimilarSkills.map((simSkill) => (
              <SkillCard
                key={simSkill.id}
                title={simSkill.title}
                category={simSkill.category}
                                previewImage={simSkill.previewImage}
                models={simSkill.models}
                onClick={() => {
                  if (onNavigateSkill) {
                    onNavigateSkill(simSkill.id);
                  } else {
                    router.push(`/skills/${simSkill.id}`);
                  }
                }}
              />
            ))}
          </div>
        </section>
      </main>

      {/* 4. Global Modals */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <RequestSkillModal
        isOpen={isRequestSkillOpen}
        onClose={() => setIsRequestSkillOpen(false)}
      />

      {/* 5. Skillhouse Footer (Figma Node 751:5944) */}
      <Footer />
    </div>
  );
};
