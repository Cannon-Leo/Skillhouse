"use client";

import React, { useState, useEffect, Suspense, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { NavBar } from "@/components/features/NavBar";
import { HeroSection } from "@/components/features/HeroSection";
import { ConnectAgentBanner } from "@/components/features/ConnectAgentBanner";
import { MarketplaceView, MARKETPLACE_SKILLS } from "@/components/features/MarketplaceView";
import { MySkillsWorkspace } from "@/components/features/MySkillsWorkspace/MySkillsWorkspace";
import { SkillDetailDrawer } from "@/components/features/SkillDetailDrawer/SkillDetailDrawer";
import { CommandPalette } from "@/components/features/CommandPalette/CommandPalette";
import { LoginModal } from "@/components/features/LoginModal";
import { RequestSkillModal } from "@/components/features/RequestSkillModal";
import { Footer } from "@/components/features/Footer";
import { useAppWorkspace } from "@/lib/useAppWorkspace";
import styles from "./home-screen/page.module.css";

function MainContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const workspace = useAppWorkspace();

  const categoryParam = searchParams.get("category") || "";
  const viewParam = searchParams.get("view") || "";
  const searchParam = searchParams.get("search") || searchParams.get("q") || "";

  const [activeViewOverride, setActiveViewOverride] = useState<
    "home" | "marketplace" | "my-skills" | null
  >(null);
  const [selectedCategoryOverride, setSelectedCategoryOverride] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState(searchParam);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [selectedDrawerSkillId, setSelectedDrawerSkillId] = useState<string | null>(null);

  const activeView =
    activeViewOverride ??
    (viewParam === "marketplace" || Boolean(categoryParam) || Boolean(searchParam)
      ? "marketplace"
      : viewParam === "my-skills"
      ? "my-skills"
      : "home");

  const selectedCategory = selectedCategoryOverride ?? categoryParam;

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRequestSkillOpen, setIsRequestSkillOpen] = useState(false);

  const selectedDrawerSkill =
    MARKETPLACE_SKILLS.find((s) => s.id === selectedDrawerSkillId) || null;

  // Sync state if browser back/forward button is pressed
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const cat = params.get("category") || "";
      const view = params.get("view") || "";
      const q = params.get("search") || params.get("q") || "";

      if (view === "marketplace" || Boolean(cat) || Boolean(q)) {
        setActiveViewOverride("marketplace");
        setSelectedCategoryOverride(cat);
        setSearchValue(q);
      } else if (view === "my-skills") {
        setActiveViewOverride("my-skills");
        setSelectedCategoryOverride("");
        setSearchValue("");
      } else {
        setActiveViewOverride("home");
        setSelectedCategoryOverride("");
        setSearchValue("");
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigateToMarketplace = useCallback((category?: string, search?: string) => {
    const targetCategory = category !== undefined ? category : "";
    const targetSearch = search !== undefined ? search : "";

    setSelectedCategoryOverride(targetCategory);
    if (search !== undefined) setSearchValue(targetSearch);
    setActiveViewOverride("marketplace");

    if (typeof window !== "undefined") {
      const params = new URLSearchParams();
      params.set("view", "marketplace");
      if (targetCategory) params.set("category", targetCategory);
      if (targetSearch) params.set("search", targetSearch);
      window.history.pushState(null, "", `/?${params.toString()}`);
    }
  }, []);

  const navigateToMySkills = useCallback(() => {
    setActiveViewOverride("my-skills");
    setSelectedCategoryOverride("");
    setSearchValue("");

    if (typeof window !== "undefined") {
      const params = new URLSearchParams();
      params.set("view", "my-skills");
      window.history.pushState(null, "", `/?${params.toString()}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  const navigateHome = useCallback(() => {
    setActiveViewOverride("home");
    setSelectedCategoryOverride("");
    setSearchValue("");

    if (typeof window !== "undefined") {
      window.history.pushState(null, "", "/");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  // Shared Modals and Drawers
  const sharedDrawersAndModals = (
    <>
      <SkillDetailDrawer
        isOpen={Boolean(selectedDrawerSkill)}
        skill={selectedDrawerSkill}
        onClose={() => setSelectedDrawerSkillId(null)}
        onExpandFullPage={(id) => router.push(`/skills/${id}`)}
        isBookmarked={
          selectedDrawerSkill ? workspace.isBookmarked(selectedDrawerSkill.id) : false
        }
        onToggleBookmark={workspace.toggleBookmark}
        isInstalled={
          selectedDrawerSkill ? workspace.isInstalled(selectedDrawerSkill.id) : false
        }
        onToggleInstall={workspace.toggleInstall}
      />

      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigateView={(view) => {
          if (view === "home") navigateHome();
          else if (view === "marketplace") navigateToMarketplace();
          else if (view === "my-skills") navigateToMySkills();
          else if (view === "design-system") router.push("/design-system");
        }}
        onSelectSkill={(id) => setSelectedDrawerSkillId(id)}
        onRequestSkill={() => setIsRequestSkillOpen(true)}
        savedSkillIds={workspace.savedSkillIds}
        installedSkillIds={workspace.installedSkillIds}
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />

      <RequestSkillModal
        isOpen={isRequestSkillOpen}
        onClose={() => setIsRequestSkillOpen(false)}
        onSubmitSuccess={() => setIsRequestSkillOpen(false)}
      />
    </>
  );

  // When activeView is my-skills, render the user's workspace
  if (activeView === "my-skills") {
    return (
      <>
        <MySkillsWorkspace
          savedSkillIds={workspace.savedSkillIds}
          installedSkillIds={workspace.installedSkillIds}
          onToggleBookmark={workspace.toggleBookmark}
          onToggleInstall={workspace.toggleInstall}
          onNavigateHome={navigateHome}
          onNavigateMarketplace={() => navigateToMarketplace()}
          onNavigateDesignSystem={() => router.push("/design-system")}
          onSelectSkillDetail={(id) => setSelectedDrawerSkillId(id)}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          onRequestSkill={() => setIsRequestSkillOpen(true)}
          onOpenLoginModal={() => setIsLoginOpen(true)}
        />
        {sharedDrawersAndModals}
      </>
    );
  }

  // When activeView is marketplace, render the full Agent Skills Marketplace (Figma Node 751:4572)
  if (activeView === "marketplace") {
    return (
      <>
        <MarketplaceView
          initialCategory={selectedCategory}
          initialSearch={searchValue}
          onNavigateHome={navigateHome}
          onSelectSkillDetail={(id) => setSelectedDrawerSkillId(id)}
        />
        {sharedDrawersAndModals}
      </>
    );
  }

  // Otherwise render the Discovery Home Screen (Figma Node 751:4774) with Hero & Joined Category Grid
  return (
    <div className={styles.pageContainer} data-testid="home-screen-page">
      {/* 1. Sticky Navigation Bar */}
      <NavBar
        currentView="home"
        onViewChange={(view) => {
          if (view === "marketplace") {
            navigateToMarketplace();
          } else if (view === "my-skills") {
            navigateToMySkills();
          } else if (view === "design-system") {
            router.push("/design-system");
          } else {
            navigateHome();
          }
        }}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        onSearchSubmit={(val) => {
          if (val.trim()) {
            navigateToMarketplace(undefined, val.trim());
          }
        }}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onSelectCategory={(category: string, _tab?: string) => {
          navigateToMarketplace(category);
        }}
        onOpenLoginModal={() => setIsLoginOpen(true)}
        onRequestSkill={() => setIsRequestSkillOpen(true)}
        onGetStarted={() => setIsLoginOpen(true)}
        savedSkillsCount={workspace.savedSkillIds.length}
      />

      <main className={styles.mainContent}>
        {/* 2. Hero Section with Joined Discovery Matrix & Works With */}
        <HeroSection
          onSeeAllSkills={() => {
            navigateToMarketplace();
          }}
          onSubmitSkill={() => setIsRequestSkillOpen(true)}
          onSelectCategory={(cat) => {
            navigateToMarketplace(cat.id || cat.title);
          }}
        />

        {/* 3. Connect Your Agent Interactive Terminal Banner */}
        <section className={styles.bannerSection} aria-label="Connect Your Agent Section">
          <ConnectAgentBanner />
        </section>
      </main>

      {/* 4. Global Dark Footer */}
      <Footer
        onSelectCategory={(cat) => {
          navigateToMarketplace(cat);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onNavigateMarketplace={() => {
          navigateToMarketplace();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />

      {sharedDrawersAndModals}
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", backgroundColor: "#FFEEDD" }} />}>
      <MainContent />
    </Suspense>
  );
}
