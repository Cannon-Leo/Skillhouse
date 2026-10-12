"use client";

import React from "react";
import Image from "next/image";
import { CategorySkillGrid, SkillCategoryItem } from "./CategorySkillGrid";
import styles from "./HeroSection.module.css";

export interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  onSeeAllSkills?: () => void;
  onSubmitSkill?: () => void;
  onSelectCategory?: (category: SkillCategoryItem) => void;
  className?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title = "Agent Skills for\neveryday use",
  subtitle = "Turn everyday tasks into simple, repeatable workflows with skills built for your agent.",
  onSeeAllSkills,
  onSubmitSkill,
  onSelectCategory,
  className = "",
}) => {
  return (
    <section
      className={`${styles.heroSection} ${className}`}
      aria-label="Agent Skills Hero section"
      data-testid="hero-section"
    >
      <div className={styles.heroContent}>
        {/* Title & Description Frame (Figma 751:4777) */}
        <div className={styles.headerGroup}>
          <h1 className={styles.title}>
            {title.split("\n").map((line, idx) => (
              <React.Fragment key={idx}>
                {line}
                {idx < title.split("\n").length - 1 && <br className={styles.titleBreak} />}
              </React.Fragment>
            ))}
          </h1>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>

        {/* CTA Buttons (Figma 751:4780) */}
        <div className={styles.ctaButtonGroup}>
          <button
            type="button"
            className={styles.primaryCta}
            onClick={onSeeAllSkills}
            aria-label="See all Skills"
          >
            See all Skills
          </button>
          <button
            type="button"
            className={styles.secondaryCta}
            onClick={onSubmitSkill}
            aria-label="Submit a Skill"
          >
            Submit a Skill
          </button>
        </div>

        {/* Joined Category Skills Discovery Matrix (Figma 751:4789) */}
        <div className={styles.gridContainer}>
          <CategorySkillGrid onSelectCategory={onSelectCategory} />
        </div>

        {/* Works with AI Agents Badges (Figma 751:4840) */}
        <div
          className={styles.worksWithWrapper}
          aria-label="Supported AI Agents"
        >
          <Image
            src="/figma/works_with_badges.png"
            alt="Works with Claude Code, Antigravity, Kimi, Gemini CLI, Codex, and Cursor"
            width={240}
            height={91}
            className={styles.worksWithBadges}
            priority
            unoptimized
          />
        </div>
      </div>
    </section>
  );
};
