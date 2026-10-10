"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Pill } from "../ui/Pill";
import styles from "./SkillRuntimeSpecs.module.css";

export interface SkillRuntimeSpecsProps {
  runsInModels?: string[];
  installGuides?: string[];
  generatesWith?: string[];
  onGuideClick?: (guide: string) => void;
  onGeneratesClick?: (generator: string) => void;
  className?: string;
}

export const SkillRuntimeSpecs: React.FC<SkillRuntimeSpecsProps> = ({
  runsInModels = [
    "/figma/logo-1.png",
    "/figma/logo-2.png",
    "/figma/logo-3.png",
    "/figma/logo-4.png",
    "/figma/logo-5.png",
    "/figma/logo-6.png",
  ],
  installGuides = ["Claude Code", "Cursor"],
  generatesWith = ["Host Agent LLM"],
  onGuideClick,
  onGeneratesClick,
  className = "",
}) => {
  const [activeGuide, setActiveGuide] = useState<string | null>(null);
  const [activeGenerator, setActiveGenerator] = useState<string | null>(null);

  const handleGuide = (guide: string) => {
    setActiveGuide(activeGuide === guide ? null : guide);
    onGuideClick?.(guide);
  };

  const handleGenerator = (gen: string) => {
    setActiveGenerator(activeGenerator === gen ? null : gen);
    onGeneratesClick?.(gen);
  };

  return (
    <div
      className={`${styles.container} ${className}`}
      aria-label="Skill runtime and environment compatibility specifications"
    >
      {/* 1. Runs In Row */}
      <div className={styles.specRow}>
        <span className={styles.label}>Runs in</span>
        <div className={styles.logomarksRow} aria-label="Supported execution environments">
          {runsInModels.map((logo, index) => (
            <div
              key={index}
              className={styles.logomark}
              title={`Runtime environment ${index + 1}`}
              tabIndex={0}
            >
              <Image
                src={logo}
                alt=""
                width={18}
                height={18}
                className={styles.logomarkIcon}
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>

      <hr className={styles.divider} aria-hidden="true" />

      {/* 2. Install Guides Row */}
      <div className={styles.specRow}>
        <span className={styles.label}>Install guides</span>
        <div className={styles.pillsRow}>
          {installGuides.map((guide) => (
            <Pill
              key={guide}
              isSelected={activeGuide === guide}
              onClick={() => handleGuide(guide)}
            >
              {guide}
            </Pill>
          ))}
        </div>
      </div>

      {/* 3. Generates With Row */}
      <div className={styles.specRow}>
        <span className={styles.label}>Generates with</span>
        <div className={styles.pillsRow}>
          {generatesWith.map((gen) => (
            <Pill
              key={gen}
              isSelected={activeGenerator === gen}
              onClick={() => handleGenerator(gen)}
            >
              {gen}
            </Pill>
          ))}
        </div>
      </div>
    </div>
  );
};
