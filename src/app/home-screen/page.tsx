"use client";

import React, { useState } from "react";
import { NavBar } from "@/components/features/NavBar";
import { HeroSection } from "@/components/features/HeroSection";
import { ConnectAgentBanner } from "@/components/features/ConnectAgentBanner";
import { FaqSection } from "@/components/features/FaqSection";
import { LoginModal } from "@/components/features/LoginModal";
import { RequestSkillModal, SkillRequestData } from "@/components/features/RequestSkillModal";
import { Footer } from "@/components/features/Footer";
import styles from "./page.module.css";

export default function HomeScreenPage() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRequestSkillOpen, setIsRequestSkillOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleSeeAllSkills = () => {
    window.location.href = "/?view=marketplace";
  };

  const handleSubmitSkill = () => {
    setIsRequestSkillOpen(true);
  };

  const handleSelectCategory = (cat: { id: string; title: string }) => {
    window.location.href = `/?category=${encodeURIComponent(cat.id)}`;
  };

  const handleRequestSubmitSuccess = (_data: SkillRequestData) => {
    setIsRequestSkillOpen(false);
  };

  return (
    <div className={styles.pageContainer} data-testid="home-screen-page">
      {/* 1. Header Nav */}
      <NavBar
        currentView="home"
        onViewChange={(view) => {
          if (view === "marketplace") {
            window.location.href = "/?view=marketplace";
          } else if (view === "home") {
            window.location.href = "/";
          }
        }}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        onSearchSubmit={(val) => {
          window.location.href = `/?view=marketplace&search=${encodeURIComponent(val)}`;
        }}
        onSelectCategory={(cat) => {
          window.location.href = `/?category=${encodeURIComponent(cat)}`;
        }}
        onOpenLoginModal={() => setIsLoginOpen(true)}
        onRequestSkill={() => setIsRequestSkillOpen(true)}
        onGetStarted={() => setIsLoginOpen(true)}
      />

      <main className={styles.mainContent}>
        {/* 2. Hero Section */}
        <HeroSection
          onSeeAllSkills={handleSeeAllSkills}
          onSubmitSkill={handleSubmitSkill}
          onSelectCategory={handleSelectCategory}
        />

        {/* 3. Connect Your Agent Section */}
        <section className={styles.bannerSection} aria-label="Connect Your Agent Section">
          <ConnectAgentBanner />
        </section>

        {/* 4. Frequently Asked Questions (Figma Node 851:3373) */}
        <FaqSection />
      </main>

      {/* 4. Footer */}
      <Footer
        onSelectCategory={(cat) => {
          window.location.href = `/?category=${encodeURIComponent(cat)}`;
        }}
        onNavigateMarketplace={() => {
          window.location.href = "/?view=marketplace";
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
        onSubmitSuccess={handleRequestSubmitSuccess}
      />
    </div>
  );
}
