"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
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
  const categoryParam = searchParams.get("category") || "";
  const viewParam = searchParams.get("view") || "";

  const [activeViewOverride, setActiveViewOverride] = useState<"home" | "marketplace" | null>(null);
  const [selectedCategoryOverride, setSelectedCategoryOverride] = useState<string | null>(null);

  const activeView = activeViewOverride ?? (viewParam === "marketplace" || Boolean(categoryParam) ? "marketplace" : "home");
  const selectedCategory = selectedCategoryOverride ?? categoryParam;

  const [searchValue, setSearchValue] = useState("");
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRequestSkillOpen, setIsRequestSkillOpen] = useState(false);

  // When activeView is marketplace, render the full Agent Skills Marketplace (Figma Node 751:4572)
  if (activeView === "marketplace") {
    return (
      <MarketplaceView
        initialCategory={selectedCategory}
        onNavigateHome={() => {
          setActiveViewOverride("home");
          setSelectedCategoryOverride("");
        }}
      />
    );
  }

  // Otherwise render the Discovery Home Screen (Figma Node 751:4774) with Hero & Joined Category Grid
  return (
    <div className={styles.pageContainer} data-testid="home-screen-page">
      {/* 1. Sticky Navigation Bar */}
      <NavBar
        currentView="marketplace"
        onViewChange={(view) => {
          if (view === "marketplace") {
            setActiveViewOverride("marketplace");
          }
        }}
        searchValue={searchValue}
        onSearchChange={(val) => {
          setSearchValue(val);
          if (val.trim()) {
            setActiveViewOverride("marketplace");
          }
        }}
        onSelectCategory={(category: string) => {
          setSelectedCategoryOverride(category);
          setActiveViewOverride("marketplace");
        }}
        onOpenLoginModal={() => setIsLoginOpen(true)}
        onRequestSkill={() => setIsRequestSkillOpen(true)}
        onGetStarted={() => setIsLoginOpen(true)}
      />

      <main className={styles.mainContent}>
        {/* 2. Hero Section with Joined Discovery Matrix & Works With */}
        <HeroSection
          onSeeAllSkills={() => {
            setSelectedCategoryOverride("");
            setActiveViewOverride("marketplace");
          }}
          onSubmitSkill={() => setIsRequestSkillOpen(true)}
          onSelectCategory={(cat) => {
            setSelectedCategoryOverride(cat.id);
            setActiveViewOverride("marketplace");
          }}
        />

        {/* 3. Connect Your Agent Interactive Terminal Banner */}
        <section className={styles.bannerSection} aria-label="Connect Your Agent Section">
          <ConnectAgentBanner />
        </section>
      </main>

      {/* 4. Global Dark Footer */}
      <Footer />

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
