"use client";

import React, { useState, useEffect, Suspense, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { NavBar } from "@/components/features/NavBar";
import { HeroSection } from "@/components/features/HeroSection";
import { ConnectAgentBanner } from "@/components/features/ConnectAgentBanner";
import { MarketplaceView } from "@/components/features/MarketplaceView";
import { LoginModal } from "@/components/features/LoginModal";
import { RequestSkillModal } from "@/components/features/RequestSkillModal";
import { Footer } from "@/components/features/Footer";
import styles from "./home-screen/page.module.css";

function MainContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const categoryParam = searchParams.get("category") || "";
  const viewParam = searchParams.get("view") || "";
  const searchParam = searchParams.get("search") || searchParams.get("q") || "";

  const [activeViewOverride, setActiveViewOverride] = useState<"home" | "marketplace" | null>(null);
  const [selectedCategoryOverride, setSelectedCategoryOverride] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState(searchParam);

  const activeView =
    activeViewOverride ??
    (viewParam === "marketplace" || Boolean(categoryParam) || Boolean(searchParam)
      ? "marketplace"
      : "home");

  const selectedCategory = selectedCategoryOverride ?? categoryParam;

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRequestSkillOpen, setIsRequestSkillOpen] = useState(false);

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

  const navigateHome = useCallback(() => {
    setActiveViewOverride("home");
    setSelectedCategoryOverride("");
    setSearchValue("");

    if (typeof window !== "undefined") {
      window.history.pushState(null, "", "/");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  // When activeView is marketplace, render the full Agent Skills Marketplace (Figma Node 751:4572)
  if (activeView === "marketplace") {
    return (
      <MarketplaceView
        initialCategory={selectedCategory}
        initialSearch={searchValue}
        onNavigateHome={navigateHome}
        onSelectSkillDetail={(id) => router.push(`/skills/${id}`)}
      />
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
        onSelectCategory={(category: string, _tab?: string) => {
          navigateToMarketplace(category);
        }}
        onOpenLoginModal={() => setIsLoginOpen(true)}
        onRequestSkill={() => setIsRequestSkillOpen(true)}
        onGetStarted={() => setIsLoginOpen(true)}
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

      {/* Modals */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />

      <RequestSkillModal
        isOpen={isRequestSkillOpen}
        onClose={() => setIsRequestSkillOpen(false)}
        onSubmitSuccess={() => setIsRequestSkillOpen(false)}
      />
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
