"use client";

import React, { useState } from "react";
import { NavBar } from "@/components/features/NavBar";
import { HeroSection } from "@/components/features/HeroSection";
import { ConnectAgentBanner } from "@/components/features/ConnectAgentBanner";
import { LoginModal } from "@/components/features/LoginModal";
import { RequestSkillModal, SkillRequestData } from "@/components/features/RequestSkillModal";
import styles from "./page.module.css";

export default function HomeScreenPage() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRequestSkillOpen, setIsRequestSkillOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleSeeAllSkills = () => {
    window.location.href = "/";
  };

  const handleSubmitSkill = () => {
    setIsRequestSkillOpen(true);
  };

  const handleSelectCategory = (cat: { id: string; title: string }) => {
    window.location.href = `/?category=${encodeURIComponent(cat.id)}`;
  };

  const handleRequestSubmitSuccess = (data: SkillRequestData) => {
    // Successfully submitted skill request
    setIsRequestSkillOpen(false);
  };

  return (
    <div className={styles.pageContainer} data-testid="home-screen-page">
      {/* 1. Header Nav (Figma Node 751:4914) */}
      <NavBar
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        onOpenLoginModal={() => setIsLoginOpen(true)}
        onRequestSkill={() => setIsRequestSkillOpen(true)}
        onGetStarted={() => setIsLoginOpen(true)}
      />

      <main className={styles.mainContent}>
        {/* 2. Desktop - 1: Hero Section with Joined Discovery Matrix & Works With (Figma Node 751:4775) */}
        <HeroSection
          onSeeAllSkills={handleSeeAllSkills}
          onSubmitSkill={handleSubmitSkill}
          onSelectCategory={handleSelectCategory}
        />

        {/* 3. Desktop - 3: Connect Your Agent Interactive Terminal & Cli Options (Figma Node 759:12087) */}
        <section className={styles.bannerSection} aria-label="Connect Your Agent Section">
          <ConnectAgentBanner />
        </section>
      </main>

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
