"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { NavBar } from "@/components/features/NavBar";
import { FilterSidebar, FilterState } from "@/components/features/FilterSidebar";
import { SkillCard } from "@/components/features/SkillCard";
import { SkillDetailHeader } from "@/components/features/SkillDetailHeader";
import { LoginModal } from "@/components/features/LoginModal";
import { Button } from "@/components/ui/Button";
import styles from "./page.module.css";

interface SkillItem {
  id: string;
  title: string;
  version: string;
  price: string;
  description: string;
  installPrompt: string;
  previewImage: string;
  models: string[];
  roles: string[];
  output: string;
  category?: string;
  isFree?: boolean;
}

const SKILLS_DATA: SkillItem[] = [
  {
    id: "visual-canvas-deck",
    title: "Visual Canvas Deck",
    version: "v1.0.3",
    price: "$5",
    description:
      "A skill for generating high-converting slide decks and pitch presentations directly in browser canvas or PowerPoint formats with verified design tokens.",
    installPrompt: "npx skillhouse add visual-canvas-deck",
    previewImage: "/figma/skill-card-preview.png",
    models: [
      "/figma/logo-1.png",
      "/figma/logo-2.png",
      "/figma/logo-3.png",
      "/figma/logo-4.png",
    ],
    roles: ["Product Manager", "Graphic Designer"],
    output: "slides",
    category: "Design",
    isFree: false,
  },
  {
    id: "pixel-promo-video",
    title: "Pixel Promo Video",
    version: "v2.1.0",
    price: "Free",
    description:
      "Turn product screenshots and briefs into high-energy promo videos with automated audio synthesis and motion keyframe timing.",
    installPrompt: "npx skillhouse add pixel-promo-video",
    previewImage: "/figma/skill-card-preview.png",
    models: [
      "/figma/logo-2.png",
      "/figma/logo-3.png",
      "/figma/logo-5.png",
      "/figma/logo-6.png",
    ],
    roles: ["Content creator", "Marketer"],
    output: "video",
    category: "Marketing",
    isFree: true,
  },
  {
    id: "api-tester-pro",
    title: "API Tester Pro",
    version: "v1.4.0",
    price: "Free",
    description:
      "Automated test harness generation and schema contract checking across OpenAPI and GraphQL endpoints with coverage reports.",
    installPrompt: "npx skillhouse add api-tester-pro",
    previewImage: "/figma/skill-card-preview.png",
    models: [
      "/figma/logo-1.png",
      "/figma/logo-4.png",
      "/figma/logo-6.png",
    ],
    roles: ["Software Engineer"],
    output: "web",
    category: "Engineering",
    isFree: true,
  },
  {
    id: "brand-identity-suite",
    title: "Brand Identity Suite",
    version: "v1.2.0",
    price: "$8",
    description:
      "Generate complete multi-channel identity guidelines, typographic scales, and color harmonizations for early-stage ventures.",
    installPrompt: "npx skillhouse add brand-identity-suite",
    previewImage: "/figma/skill-card-preview.png",
    models: [
      "/figma/logo-1.png",
      "/figma/logo-2.png",
      "/figma/logo-6.png",
    ],
    roles: ["Founder", "Designer"],
    output: "image",
    category: "Design",
    isFree: false,
  },
];

export default function Home() {
  const router = useRouter();

  const [searchValue, setSearchValue] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    recommendations: ["all"],
    outputs: [],
    roles: [],
    useCases: [],
  });

  const [selectedSkillId, setSelectedSkillId] = useState<string>("visual-canvas-deck");
  const [bookmarkedSkills, setBookmarkedSkills] = useState<Record<string, boolean>>({});
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [mobileFiltersVisible, setMobileFiltersVisible] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  const selectedSkill =
    SKILLS_DATA.find((s) => s.id === selectedSkillId) || SKILLS_DATA[0];

  const handleToggleBookmark = (id: string, isBookmarked: boolean) => {
    setBookmarkedSkills((prev) => ({
      ...prev,
      [id]: isBookmarked,
    }));
  };

  const handleSelectSkill = (skill: SkillItem) => {
    setSelectedSkillId(skill.id);
    if (typeof window !== "undefined" && window.innerWidth <= 1200) {
      setMobileDrawerOpen(true);
    }
  };

  const filteredSkills = SKILLS_DATA.filter((skill) => {
    if (searchValue.trim()) {
      const q = searchValue.toLowerCase();
      const matchTitle = skill.title.toLowerCase().includes(q);
      const matchDesc = skill.description.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc) return false;
    }

    if (filters.recommendations.includes("free") && !skill.isFree) {
      return false;
    }

    if (filters.outputs.length > 0 && !filters.outputs.includes(skill.output)) {
      return false;
    }

    if (filters.roles.length > 0) {
      const skillRoles = skill.roles.map(r => r.toLowerCase().replace(" ", "-").replace("software-engineer", "swe"));
      const matchRole = filters.roles.some(r => skillRoles.some(sr => sr.includes(r) || r.includes(sr)));
      if (!matchRole) return false;
    }

    if (filters.useCases.length > 0) {
      const category = (skill.category || "").toLowerCase();
      const matchUseCase = filters.useCases.some(u => category.includes(u) || skill.description.toLowerCase().includes(u));
      if (!matchUseCase) return false;
    }

    return true;
  });

  return (
    <div className={styles.main}>
      {/* 1. Global Navigation Bar (Figma 744:1024) */}
      <NavBar
        currentView="marketplace"
        onViewChange={(view) => {
          if (view === "design-system") {
            router.push("/design-system");
          }
        }}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        isSignedIn={isSignedIn}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
        onGetStarted={() => setIsLoginModalOpen(true)}
        onSignOut={() => setIsSignedIn(false)}
      />

      {/* 2. Hero Bar */}
      <section className={styles.heroBar}>
        <div className={styles.heroInner}>
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle}>
              Agent Skills for everyday use
            </h1>
            <p className={styles.heroDesc}>
              Turn everyday tasks into simple, repeatable workflows with skills built for your agent.
            </p>
          </div>
          <div className={styles.heroActions}>
            <Button
              variant="brand"
              size="lg"
              onClick={() => {
                const el = document.getElementById("skills-grid");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              See all Skills
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setIsLoginModalOpen(true)}
            >
              {isSignedIn ? "Submit a Skill" : "Sign in / Submit"}
            </Button>
          </div>
        </div>
      </section>

      {/* 3. Main Marketplace Layout Container */}
      <div className={styles.layoutContainer}>
        {/* Mobile Filter Toggle Bar (<900px) */}
        <div className={styles.mobileFilterBar}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setMobileFiltersVisible(!mobileFiltersVisible)}
          >
            {mobileFiltersVisible ? "Hide Filters ▲" : "Filter Skills ▼"}
          </Button>
          <span className={styles.resultsCount}>
            Showing {filteredSkills.length} skills
          </span>
        </div>

        {/* Left Filter Sidebar */}
        <div
          className={`${styles.sidebarWrapper} ${
            mobileFiltersVisible ? styles.mobileVisible : ""
          }`}
        >
          <FilterSidebar filters={filters} onFilterChange={setFilters} />
        </div>

        {/* Center Grid Feed */}
        <main className={styles.feedSection} id="skills-grid">
          <div className={styles.feedHeader}>
            <h2 className={styles.feedTitle}>Trending Skills</h2>
            <span className={styles.resultsCount}>
              Showing {filteredSkills.length} skills
            </span>
          </div>

          {filteredSkills.length > 0 ? (
            <div className={styles.grid}>
              {filteredSkills.map((skill) => (
                <SkillCard
                  key={skill.id}
                  title={skill.title}
                  category={skill.category || (skill.output.charAt(0).toUpperCase() + skill.output.slice(1))}
                  price={skill.price}
                  previewImage={skill.previewImage}
                  models={skill.models}
                  isBookmarked={Boolean(bookmarkedSkills[skill.id])}
                  onBookmarkToggle={(isBookmarked) => handleToggleBookmark(skill.id, isBookmarked)}
                  onClick={() => handleSelectSkill(skill)}
                />
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <h3 className={styles.emptyTitle}>No matching skills found</h3>
              <p className={styles.emptyDesc}>
                Try adjusting your search terms or clearing selected filter criteria.
              </p>
              <Button
                variant="brand"
                size="md"
                onClick={() => {
                  setSearchValue("");
                  setFilters({
                    recommendations: ["all"],
                    outputs: [],
                    roles: [],
                    useCases: [],
                  });
                }}
              >
                Reset all filters
              </Button>
            </div>
          )}
        </main>

        {/* Right Detail Panel (Desktop >1200px) */}
        <aside className={styles.detailSection} aria-label="Selected Skill Details">
          <SkillDetailHeader
            title={selectedSkill.title}
            version={selectedSkill.version}
            price={selectedSkill.price}
            description={selectedSkill.description}
            installPrompt={selectedSkill.installPrompt}
            onBuy={() => alert(`Purchasing ${selectedSkill.title} for ${selectedSkill.price}`)}
            onSubscribe={() => alert("Skillhouse All-Access Subscription")}
          />
        </aside>
      </div>

      {/* 4. Slide-over Detail Drawer (Tablet & Mobile <=1200px) */}
      <div
        className={`${styles.detailDrawerOverlay} ${
          mobileDrawerOpen ? styles.open : ""
        }`}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setMobileDrawerOpen(false);
          }
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Skill details preview"
      >
        <div className={styles.detailDrawerContent}>
          <div className={styles.detailDrawerHeader}>
            <span className={styles.detailDrawerTitle}>Skill Details</span>
            <button
              type="button"
              className={styles.closeDrawerBtn}
              onClick={() => setMobileDrawerOpen(false)}
              aria-label="Close details"
            >
              ✕ Close
            </button>
          </div>

          <SkillDetailHeader
            title={selectedSkill.title}
            version={selectedSkill.version}
            price={selectedSkill.price}
            description={selectedSkill.description}
            installPrompt={selectedSkill.installPrompt}
            onBuy={() => alert(`Purchasing ${selectedSkill.title} for ${selectedSkill.price}`)}
            onSubscribe={() => alert("Skillhouse All-Access Subscription")}
          />
        </div>
      </div>

      {/* 5. Login Modal & Backdrop Overlay (Figma 4621:371148 & 4597:367764) */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={(provider) => {
          setIsSignedIn(true);
          setIsLoginModalOpen(false);
        }}
      />
    </div>
  );
}
