"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Home } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/primitives/Breadcrumb";
import { NavBar } from "./NavBar";
import { SkillDetailHeader } from "./SkillDetailHeader";
import { SkillCard } from "./SkillCard";
import { Footer } from "./Footer";
import { UserProfileData } from "./UserProfileModal";
import { AuthProvider, useAuth, useAuthSafe } from "@/lib/AuthContext";
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

export const MODEL_LOGOS = [
  "/figma/logo-1.png",
  "/figma/logo-2.png",
  "/figma/logo-3.png",
  "/figma/logo-4.png",
  "/figma/logo-5.png",
  "/figma/logo-6.png",
];

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
  isSignedIn?: boolean;
  user?: UserProfileData | null;
  onOpenLoginModal?: () => void;
  onOpenProfile?: () => void;
  onOpenSettings?: () => void;
  onOpenHelpCenter?: () => void;
  onSignOut?: () => void;
  className?: string;
}

const SkillDetailPageInner: React.FC<SkillDetailPageProps> = ({
  skill = DEFAULT_DETAIL_SKILL,
  onNavigateSkill,
  onNavigateHome,
  onNavigateMarketplace,
  isSignedIn: propIsSignedIn,
  user: propUser,
  onOpenLoginModal: propOnOpenLoginModal,
  onOpenProfile: propOnOpenProfile,
  onOpenSettings: propOnOpenSettings,
  onOpenHelpCenter: propOnOpenHelpCenter,
  onSignOut: propOnSignOut,
  className = "",
}) => {
  const auth = useAuth();
  const isSignedIn = propIsSignedIn !== undefined ? propIsSignedIn : auth.isSignedIn;
  const user = propUser !== undefined ? propUser : auth.user;

  const thumbnails = skill.thumbnails && skill.thumbnails.length > 0
    ? skill.thumbnails
    : [skill.previewImage];

  const [activeThumbnailIndex, setActiveThumbnailIndex] = useState(0);
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
          } else if (view === "my-skills") {
            router.push("/?view=my-skills");
          } else if (view === "design-system") {
            router.push("/design-system");
          }
        }}
        isSignedIn={isSignedIn}
        user={user || undefined}
        onOpenLoginModal={propOnOpenLoginModal || auth.openLogin}
        onGetStarted={propOnOpenLoginModal || auth.openLogin}
        onRequestSkill={isSignedIn ? auth.openRequestSkill : auth.openLogin}
        onOpenProfile={propOnOpenProfile || (() => auth.openProfile("profile"))}
        onOpenSettings={propOnOpenSettings || (() => auth.openProfile("cli"))}
        onOpenHelpCenter={propOnOpenHelpCenter || auth.openHelpCenter}
        onSignOut={propOnSignOut || auth.logout}
      />

      {/* 2. Main Centered 898px Workspace */}
      <main className={styles.mainContent}>
        {/* Breadcrumb Navigation Trail */}
        <div className={styles.breadcrumbRow}>
          <Breadcrumb className={styles.breadcrumbNav} aria-label="Breadcrumb">
            <BreadcrumbList className={styles.breadcrumbTrail}>
              <BreadcrumbItem>
                <BreadcrumbLink
                  asChild
                  onClick={(e) => {
                    if (onNavigateHome) {
                      e.preventDefault();
                      onNavigateHome();
                    }
                  }}
                >
                  <Link href="/" aria-label="Home page">
                    <Home size={14} className={styles.breadcrumbHomeIcon} />
                    <span>Home</span>
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink
                  asChild
                  onClick={(e) => {
                    if (onNavigateMarketplace) {
                      e.preventDefault();
                      onNavigateMarketplace();
                    }
                  }}
                >
                  <Link href="/skills">Skills</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink
                  asChild
                  onClick={(e) => {
                    if (onNavigateMarketplace) {
                      e.preventDefault();
                      onNavigateMarketplace();
                    }
                  }}
                >
                  <Link href={`/skills?category=${encodeURIComponent(skill.category)}`}>
                    {skill.category}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage aria-current="page">{skill.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Skill Detail Header */}
        <SkillDetailHeader
          title={skill.title}
          version={skill.version}
          price={skill.price}
          isFree={skill.isFree}
          description={skill.description}
          installPrompt={skill.installPrompt}
        />

        {/* Preview Gallery Section */}
        <section className={styles.gallerySection} aria-label="Skill preview media">
          <div className={styles.mainPreviewFrame}>
            <Image
              src={activeImage}
              alt={`${skill.title} preview`}
              fill
              className={styles.mainPreviewImage}
              priority
              sizes="(max-width: 960px) 100vw, 898px"
              unoptimized
              data-testid="skill-detail-main-preview"
            />
          </div>

          {thumbnails.length > 1 && (
            <div className={styles.thumbnailStrip} role="tablist" aria-label="Preview gallery thumbnails">
              {thumbnails.map((thumb, index) => {
                const isSelected = index === activeThumbnailIndex;
                return (
                  <button
                    key={`thumb-${index}`}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    aria-label={`View preview slide ${index + 1}`}
                    className={`${styles.thumbnailButton} ${isSelected ? styles.thumbnailActive : ""}`}
                    onClick={() => setActiveThumbnailIndex(index)}
                    data-testid={`thumbnail-tab-${index}`}
                  >
                    <Image
                      src={thumb}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className={styles.thumbnailImg}
                      unoptimized
                    />
                  </button>
                );
              })}
            </div>
          )}
        </section>

        {/* Full Markdown Documentation Viewer (Figma Node 751:5654) */}
        <section className={styles.docsSection} aria-label="Skill specifications and documentation">
          <div className={styles.docsHeader}>
            <span className={styles.docsBadge}>SPECIFICATION</span>
            <h2 className={styles.docsTitle}>Overview &amp; Workflow Capabilities</h2>
          </div>

          <div className={styles.markdownBody}>
            <p>
              The <strong>{skill.title}</strong> equips AI coding assistants and automation agents with specialized domain knowledge, formatted input schemas, and robust verification loops to streamline autonomous tasks.
            </p>
            <h3>Core Functionality</h3>
            <ul>
              <li><strong>Zero Configuration Setup</strong>: Ingestible immediately via <code>{skill.installPrompt}</code>.</li>
              <li><strong>Agent Tool Integration</strong>: Pre-configured tools and functions tailored for Claude Code, Cursor, Codex, and OpenAI agents.</li>
              <li><strong>Deterministic Output</strong>: Structured artifact generation adhering strictly to professional production guidelines.</li>
            </ul>
          </div>
        </section>

        {/* Similar Skills Carousel */}
        <section className={styles.similarSection} aria-labelledby="similar-skills-heading">
          <div className={styles.similarHeaderRow}>
            <div className={styles.similarTitles}>
              <h2 id="similar-skills-heading" className={styles.similarHeading}>
                Similar Skills
              </h2>
              <p className={styles.similarSubtitle}>
                Explore related agent skills verified for production workflows
              </p>
            </div>
            <div className={styles.carouselControls}>
              <button
                type="button"
                className={styles.carouselArrowBtn}
                onClick={handlePrevSimilar}
                disabled={similarSkillsOffset === 0}
                aria-label="Previous similar skills"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                className={styles.carouselArrowBtn}
                onClick={handleNextSimilar}
                disabled={similarSkillsOffset >= SIMILAR_SKILLS.length - 4}
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
                id={simSkill.id}
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

      {/* 3. Skillhouse Footer (Figma Node 751:5944) */}
      <Footer />
    </div>
  );
};

export const SkillDetailPage: React.FC<SkillDetailPageProps> = (props) => {
  const auth = useAuthSafe();
  if (!auth) {
    return (
      <AuthProvider>
        <SkillDetailPageInner {...props} />
      </AuthProvider>
    );
  }
  return <SkillDetailPageInner {...props} />;
};
