"use client";

import React, { useState } from "react";
import { Bookmark, Bot, ArrowRight, Zap, DownloadCloud, Terminal, CheckCircle2 } from "lucide-react";
import { NavBar } from "@/components/features/NavBar";
import { SkillCard } from "@/components/features/SkillCard";
import { MARKETPLACE_SKILLS, SkillItem } from "@/components/features/MarketplaceView";
import { Footer } from "@/components/features/Footer";
import styles from "./MySkillsWorkspace.module.css";

export interface MySkillsWorkspaceProps {
  savedSkillIds: string[];
  installedSkillIds: string[];
  onToggleBookmark: (skillId: string) => void;
  onToggleInstall: (skillId: string) => void;
  onNavigateHome: () => void;
  onNavigateMarketplace: () => void;
  onNavigateDesignSystem?: () => void;
  onSelectSkillDetail?: (skillId: string) => void;
  onOpenCommandPalette?: () => void;
  onRequestSkill?: () => void;
  onOpenLoginModal?: () => void;
  isSignedIn?: boolean;
}

export const MySkillsWorkspace: React.FC<MySkillsWorkspaceProps> = ({
  savedSkillIds,
  installedSkillIds,
  onToggleBookmark,
  onToggleInstall,
  onNavigateHome,
  onNavigateMarketplace,
  onNavigateDesignSystem,
  onSelectSkillDetail,
  onOpenCommandPalette,
  onRequestSkill,
  onOpenLoginModal,
  isSignedIn = false,
}) => {
  const [activeTab, setActiveTab] = useState<"saved" | "installed">("saved");

  const savedSkills: SkillItem[] = MARKETPLACE_SKILLS.filter((s) =>
    savedSkillIds.includes(s.id)
  );

  const installedSkills: SkillItem[] = MARKETPLACE_SKILLS.filter((s) =>
    installedSkillIds.includes(s.id)
  );

  const currentList = activeTab === "saved" ? savedSkills : installedSkills;

  return (
    <div className={styles.workspaceContainer} data-testid="my-skills-workspace-page">
      {/* 1. App Navigation */}
      <NavBar
        currentView="my-skills"
        onViewChange={(view) => {
          if (view === "home") onNavigateHome();
          else if (view === "marketplace") onNavigateMarketplace();
          else if (view === "design-system") onNavigateDesignSystem?.();
        }}
        onOpenCommandPalette={onOpenCommandPalette}
        onRequestSkill={onRequestSkill}
        onOpenLoginModal={onOpenLoginModal}
        isSignedIn={isSignedIn}
        savedSkillsCount={savedSkillIds.length}
      />

      <main className={styles.mainContent}>
        {/* Workspace Header Banner */}
        <div className={styles.headerBanner}>
          <div className={styles.bannerHeaderRow}>
            <div className={styles.titleArea}>
              <div className={styles.categoryPill}>
                <Bot size={14} className={styles.categoryIcon} aria-hidden="true" />
                <span>Agent Workspace</span>
              </div>
              <h1 className={styles.heading}>My Skills &amp; Active Tools</h1>
              <p className={styles.subheading}>
                Manage your saved workflows, active agent stacks, and local CLI integrations.
              </p>
            </div>

            {/* Quick Action Button to Marketplace */}
            <div className={styles.actionButtonsRow}>
              <button
                type="button"
                className={styles.secondaryBtn}
                onClick={onOpenCommandPalette}
                aria-label="Search all skills with command palette"
              >
                <span>Quick Search</span>
                <kbd className={styles.kbd}>⌘K</kbd>
              </button>
              <button
                type="button"
                className={styles.primaryBtn}
                onClick={onNavigateMarketplace}
              >
                <span>Browse Marketplace</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Connected Agent Mini Bar */}
          <div className={styles.agentStatusBar}>
            <div className={styles.statusDot} />
            <div className={styles.agentStatusText}>
              <strong>Active Agent Environment:</strong> Claude Code &middot; Antigravity IDE &middot; Cursor
            </div>
            <div className={styles.agentSyncBadge}>
              <CheckCircle2 size={14} />
              <span>Synced Locally</span>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className={styles.tabBar} role="tablist" aria-label="Workspace tabs">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "saved"}
            className={`${styles.tabBtn} ${activeTab === "saved" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("saved")}
            data-testid="tab-saved-skills"
          >
            <Bookmark size={16} aria-hidden="true" />
            <span>Saved Skills</span>
            <span className={styles.tabBadge}>{savedSkillIds.length}</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "installed"}
            className={`${styles.tabBtn} ${activeTab === "installed" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("installed")}
            data-testid="tab-installed-skills"
          >
            <DownloadCloud size={16} aria-hidden="true" />
            <span>Installed Tools</span>
            <span className={styles.tabBadge}>{installedSkillIds.length}</span>
          </button>
        </div>

        {/* Skills Grid or Empty State */}
        <div className={styles.contentSection}>
          {currentList.length === 0 ? (
            <div className={styles.emptyContainer} data-testid="workspace-empty-state">
              <div className={styles.emptyIconBox}>
                {activeTab === "saved" ? (
                  <Bookmark size={32} />
                ) : (
                  <Terminal size={32} />
                )}
              </div>
              <h2 className={styles.emptyTitle}>
                {activeTab === "saved"
                  ? "No saved skills yet"
                  : "No installed tools configured"}
              </h2>
              <p className={styles.emptyDescription}>
                {activeTab === "saved"
                  ? "Save your favorite AI agent workflows from the marketplace to build your tailored team stack."
                  : "Install workflows using our 1-click CLI prompt to configure your agent's live runtime."}
              </p>
              <button
                type="button"
                className={styles.exploreMarketplaceBtn}
                onClick={onNavigateMarketplace}
              >
                <Zap size={16} />
                <span>Explore Skills Marketplace</span>
              </button>
            </div>
          ) : (
            <div className={styles.skillsGrid} data-testid="workspace-skills-grid">
              {currentList.map((skill) => (
                <SkillCard
                  key={skill.id}
                  id={`skill-${skill.id}`}
                  title={skill.title}
                  category={skill.category}
                  previewImage={skill.previewImage}
                  models={skill.models}
                  isBookmarked={savedSkillIds.includes(skill.id)}
                  onBookmarkToggle={() => {
                    if (activeTab === "saved") {
                      onToggleBookmark(skill.id);
                    } else if (onToggleInstall) {
                      onToggleInstall(skill.id);
                    }
                  }}
                  onClick={() => onSelectSkillDetail?.(skill.id)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Global Footer */}
      <Footer
        onSelectCategory={() => onNavigateMarketplace()}
        onNavigateMarketplace={onNavigateMarketplace}
      />
    </div>
  );
};
