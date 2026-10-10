"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { NavBar } from "@/components/features/NavBar";
import { FilterSidebar, FilterState } from "@/components/features/FilterSidebar";
import { SkillCard } from "@/components/features/SkillCard";
import { SkillDetailHeader } from "@/components/features/SkillDetailHeader";
import { ConnectAgentBanner } from "./ConnectAgentBanner";
import { LoginModal } from "@/components/features/LoginModal";
import { RequestSkillModal } from "@/components/features/RequestSkillModal";
import { Button } from "@/components/ui/Button";
import styles from "@/app/page.module.css";

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

const INITIAL_SKILLS: SkillItem[] = [
  {
    id: "web-dev-pro",
    title: "Web Development Pro",
    version: "1.0.0",
    price: "Free",
    isFree: true,
    description: "Generates modern responsive websites using clean HTML, CSS, and TypeScript with optimal performance and SEO best practices.",
    installPrompt: "npx create-agent-skill web-dev-pro",
    previewImage: "/figma/image_sample.png",
    models: ["Claude 3.5 Sonnet", "GPT-4o"],
    roles: ["Software Engineer", "Fullstack"],
    output: "code",
    category: "Development",
  },
  {
    id: "brand-identity",
    title: "Brand Identity Designer",
    version: "2.1.0",
    price: "$19",
    isFree: false,
    description: "Synthesizes color palettes, typography scales, logo systems, and visual guidelines into an exportable token set.",
    installPrompt: "npx create-agent-skill brand-identity",
    previewImage: "/figma/image_sample.png",
    models: ["Claude 3.5 Sonnet"],
    roles: ["Product Designer", "Brand Director"],
    output: "design",
    category: "Design",
  },
  {
    id: "social-media-copy",
    title: "Social Media Strategist",
    version: "1.2.0",
    price: "Free",
    isFree: true,
    description: "Crafts engaging multi-platform social media posts, threads, and newsletters calibrated to your brand voice.",
    installPrompt: "npx create-agent-skill social-media-copy",
    previewImage: "/figma/image_sample.png",
    models: ["GPT-4o", "Llama 3"],
    roles: ["Marketing Lead", "Copywriter"],
    output: "copy",
    category: "Marketing",
  },
  {
    id: "data-analyst-agent",
    title: "Automated Data Insights",
    version: "3.0.0",
    price: "$29",
    isFree: false,
    description: "Processes CSV, JSON, and SQL tables to generate automated visual reports, outlier detection, and executive summaries.",
    installPrompt: "npx create-agent-skill automated-data-insights",
    previewImage: "/figma/image_sample.png",
    models: ["Claude 3.5 Sonnet", "Gemini 1.5 Pro"],
    roles: ["Data Analyst", "Operations"],
    output: "report",
    category: "Analytics",
  },
];

export function MarketplaceView() {
  const router = useRouter();

  const [skills] = useState<SkillItem[]>(INITIAL_SKILLS);
  const [selectedSkill, setSelectedSkill] = useState<SkillItem>(INITIAL_SKILLS[0]);
  const [bookmarkedSkills, setBookmarkedSkills] = useState<Record<string, boolean>>({});
  const [isUserSubscribed, setIsUserSubscribed] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [mobileFiltersVisible, setMobileFiltersVisible] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  // Request a Skill Modal state
  const [isRequestSkillOpen, setIsRequestSkillOpen] = useState(false);
  const [requestSkillPrefill, setRequestSkillPrefill] = useState("");
  const [requestTriggerSource, setRequestTriggerSource] = useState("homepage");

  const [filters, setFilters] = useState<FilterState>({
    recommendations: ["all"],
    outputs: [],
    roles: [],
    useCases: [],
  });

  const handleSelectSkill = (skill: SkillItem) => {
    setSelectedSkill(skill);
    if (window.innerWidth <= 1200) {
      setMobileDrawerOpen(true);
    }
  };

  const handleToggleBookmark = (skillId: string, isBookmarked: boolean) => {
    setBookmarkedSkills((prev) => ({
      ...prev,
      [skillId]: isBookmarked,
    }));
  };

  const handleOpenRequestSkill = (source: string, prefillTitle: string = "") => {
    setRequestTriggerSource(source);
    setRequestSkillPrefill(prefillTitle);
    setIsRequestSkillOpen(true);
  };

  const filteredSkills = skills.filter((skill) => {
    if (searchValue.trim()) {
      const q = searchValue.toLowerCase();
      const match =
        skill.title.toLowerCase().includes(q) ||
        skill.description.toLowerCase().includes(q) ||
        skill.output.toLowerCase().includes(q) ||
        (skill.category && skill.category.toLowerCase().includes(q));
      if (!match) return false;
    }

    if (filters.recommendations.includes("free") && !skill.isFree && skill.price.toLowerCase() !== "free") {
      return false;
    }
    if (filters.recommendations.includes("paid") && (skill.isFree || skill.price.toLowerCase() === "free")) {
      return false;
    }

    if (filters.outputs.length > 0) {
      const matchOutput = filters.outputs.some(o => skill.output.toLowerCase().includes(o));
      if (!matchOutput) return false;
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
        onRequestSkill={() => handleOpenRequestSkill("navigation")}
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
              onClick={() => handleOpenRequestSkill("homepage")}
            >
              Request a skill
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
            <>
              <div className={styles.grid}>
                {filteredSkills.map((skill) => (
                  <SkillCard
                    key={skill.id}
                    title={skill.title}
                    category={skill.category || (skill.output.charAt(0).toUpperCase() + skill.output.slice(1))}
                    previewImage={skill.previewImage}
                    models={skill.models}
                    isBookmarked={Boolean(bookmarkedSkills[skill.id])}
                    onBookmarkToggle={(isBookmarked) => handleToggleBookmark(skill.id, isBookmarked)}
                    onClick={() => handleSelectSkill(skill)}
                  />
                ))}
              </div>

              {/* End of results CTA (P0 spec) */}
              <div className={styles.browseBottomTrigger}>
                <span className={styles.browseBottomText}>
                  Can’t find what you need? Request a skill.
                </span>
                <button
                  type="button"
                  className={styles.browseBottomBtn}
                  onClick={() => handleOpenRequestSkill("skills_browse_bottom")}
                >
                  Request a skill
                </button>
              </div>
            </>
          ) : (
            <div className={styles.emptyState}>
              <h3 className={styles.emptyTitle}>No matching skills found</h3>
              <p className={styles.emptyDesc}>
                {searchValue.trim()
                  ? `We couldn’t find any skills matching "${searchValue}". You can submit a request and let creators know what you need.`
                  : "Try adjusting your search terms or clearing selected filter criteria."}
              </p>
              <div className={styles.emptyActions}>
                <Button
                  variant="brand"
                  size="md"
                  onClick={() => handleOpenRequestSkill("search_empty_state", searchValue.trim())}
                >
                  Request this skill
                </Button>
                <Button
                  variant="outline"
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
            </div>
          )}
        </main>

        {/* Right Detail Panel (Desktop >1200px) */}
        <aside className={styles.detailSection} aria-label="Selected Skill Details">
          <SkillDetailHeader
            isBookmarked={Boolean(bookmarkedSkills[selectedSkill.id])}
            onBookmarkToggle={(isBookmarked) => handleToggleBookmark(selectedSkill.id, isBookmarked)}
            title={selectedSkill.title}
            version={selectedSkill.version}
            price={selectedSkill.price}
            isFree={selectedSkill.isFree || selectedSkill.price.toLowerCase() === "free"}
            isSubscribed={isUserSubscribed}
            description={selectedSkill.description}
            installPrompt={selectedSkill.installPrompt}
            onBuy={() => alert(`Purchasing ${selectedSkill.title} for ${selectedSkill.price}`)}
            onSubscribe={() => { setIsUserSubscribed(!isUserSubscribed); }}
          />
        </aside>
      </div>

      {/* 3.5 Connect Your Agent Banner Section (Figma 4640:6028) */}
      <ConnectAgentBanner />

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
            isBookmarked={Boolean(bookmarkedSkills[selectedSkill.id])}
            onBookmarkToggle={(isBookmarked) => handleToggleBookmark(selectedSkill.id, isBookmarked)}
            title={selectedSkill.title}
            version={selectedSkill.version}
            price={selectedSkill.price}
            description={selectedSkill.description}
            installPrompt={selectedSkill.installPrompt}
            onBuy={() => alert(`Purchasing ${selectedSkill.title} for ${selectedSkill.price}`)}
            onSubscribe={() => { setIsUserSubscribed(!isUserSubscribed); }}
          />
        </div>
      </div>

      {/* 5. Request a Skill Modal Flow */}
      <RequestSkillModal
        isOpen={isRequestSkillOpen}
        onClose={() => setIsRequestSkillOpen(false)}
        initialTitle={requestSkillPrefill}
        triggerSource={requestTriggerSource}
      />

      {/* 6. Login Modal & Backdrop Overlay (Figma 4621:371148 & 4597:367764) */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={() => {
          setIsSignedIn(true);
          setIsLoginModalOpen(false);
        }}
      />
    </div>
  );
}
