"use client";

import React, { useState } from "react";
import { CategorySkillCard } from "./CategorySkillCard";
import styles from "./CategorySkillGrid.module.css";

export interface SkillCategoryItem {
  id: string;
  title: string;
  href?: string;
  backgroundColor?: string;
  onClick?: () => void;
}

export const DEFAULT_SKILL_CATEGORIES: SkillCategoryItem[] = [
  { id: "free", title: "Free \nAgent Skills", href: "/?category=free" },
  { id: "featured", title: "Featured \nAgent Skills", href: "/?category=featured" },
  { id: "trending", title: "Trending \nAgent Skills", href: "/?category=trending" },
  { id: "top-rated", title: "Top-rated \nAgent Skills", href: "/?category=top-rated" },
  { id: "use-case", title: "Skills by \nUse-case", href: "/?category=use-case" },
  { id: "output", title: "Skills by \nOutput", href: "/?category=output" },
  { id: "roles", title: "Skills by \nRoles", href: "/?category=roles" },
];

export interface CategorySkillGridProps {
  categories?: SkillCategoryItem[];
  backgroundColor?: string;
  onSelectCategory?: (category: SkillCategoryItem) => void;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Vertical / Horizontal Bridge SVGs based on Figma Node 751:4789.
 * Rendered inline for seamless CSS / React hover transition between
 * solid fill (#EBD5C0) and outline wireframe borders (#54392D).
 */
const BridgeV: React.FC<{ active?: boolean; className?: string }> = ({ active, className }) => (
  <svg
    viewBox="0 0 33 55"
    fill="none"
    preserveAspectRatio="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${styles.bridgeSvg} ${active ? styles.bridgeActive : ""} ${className || ""}`}
    aria-hidden="true"
  >
    <path
      d="M0 0C0 17.907 33 17.907 33 0V55C33 34.5349 0 34.5349 0 55V0Z"
      className={styles.bridgePath}
    />
  </svg>
);

const BridgeH: React.FC<{ active?: boolean; className?: string }> = ({ active, className }) => (
  <svg
    viewBox="0 0 55 31"
    fill="none"
    preserveAspectRatio="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${styles.bridgeSvg} ${active ? styles.bridgeActive : ""} ${className || ""}`}
    aria-hidden="true"
  >
    <path
      d="M55 31C37.093 31 37.093 0 55 0L0 0C20.4651 0 20.4651 31 0 31L55 31Z"
      className={styles.bridgePath}
    />
  </svg>
);

export const CategorySkillGrid: React.FC<CategorySkillGridProps> = ({
  categories = DEFAULT_SKILL_CATEGORIES,
  backgroundColor = "#EBD5C0",
  onSelectCategory,
  className = "",
  style,
}) => {
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  const isBridgeActive = (cardA: string, cardB: string) => {
    return hoveredCardId === cardA || hoveredCardId === cardB;
  };

  return (
    <div
      className={`${styles.gridWrapper} ${className}`}
      style={style}
      data-testid="category-skill-grid"
    >
      {/* =========================================================================
          Desktop Cross-Bridges (Figma Node 751:4789):
          Strictly only connecting real adjacent cards.
          Transitions to borders when leading to the hovered card.
          ========================================================================= */}
      <div className={`${styles.decorationsOverlay} ${styles.desktopDecorations}`} aria-hidden="true">
        {/* Row 1 horizontal connectors (Card 1 - Card 2 - Card 3 - Card 4) */}
        <div className={`${styles.bridgeV} ${styles.dBridgeV1_1}`}>
          <BridgeV active={isBridgeActive("free", "featured")} />
        </div>
        <div className={`${styles.bridgeV} ${styles.dBridgeV1_2}`}>
          <BridgeV active={isBridgeActive("featured", "trending")} />
        </div>
        <div className={`${styles.bridgeV} ${styles.dBridgeV1_3}`}>
          <BridgeV active={isBridgeActive("trending", "top-rated")} />
        </div>

        {/* Row 2 horizontal connectors (Card 5 - Card 6 - Card 7). Slot 8 is empty so no 3rd bridge! */}
        <div className={`${styles.bridgeV} ${styles.dBridgeV2_1}`}>
          <BridgeV active={isBridgeActive("use-case", "output")} />
        </div>
        <div className={`${styles.bridgeV} ${styles.dBridgeV2_2}`}>
          <BridgeV active={isBridgeActive("output", "roles")} />
        </div>

        {/* Vertical connectors between Row 1 and Row 2 (under Card 1, 2, 3 connecting to 5, 6, 7) */}
        <div className={`${styles.bridgeH} ${styles.dBridgeH1}`}>
          <BridgeH active={isBridgeActive("free", "use-case")} />
        </div>
        <div className={`${styles.bridgeH} ${styles.dBridgeH2}`}>
          <BridgeH active={isBridgeActive("featured", "output")} />
        </div>
        <div className={`${styles.bridgeH} ${styles.dBridgeH3}`}>
          <BridgeH active={isBridgeActive("trending", "roles")} />
        </div>
      </div>

      {/* =========================================================================
          Tablet Cross-Bridges (2 columns joined together):
          Horizontal bridges between col 1 & 2.
          Vertical bridges between rows.
          ========================================================================= */}
      <div className={`${styles.decorationsOverlay} ${styles.tabletDecorations}`} aria-hidden="true">
        {/* Horizontal bridges between Col 1 and Col 2 */}
        <div className={`${styles.bridgeV} ${styles.tBridgeV} ${styles.tBridgeV1}`}>
          <BridgeV active={isBridgeActive("free", "featured")} />
        </div>
        <div className={`${styles.bridgeV} ${styles.tBridgeV} ${styles.tBridgeV2}`}>
          <BridgeV active={isBridgeActive("trending", "top-rated")} />
        </div>
        <div className={`${styles.bridgeV} ${styles.tBridgeV} ${styles.tBridgeV3}`}>
          <BridgeV active={isBridgeActive("use-case", "output")} />
        </div>

        {/* Vertical bridges between rows */}
        <div className={`${styles.bridgeH} ${styles.tBridgeH_Col1} ${styles.tBridgeH_Row1_1}`}>
          <BridgeH active={isBridgeActive("free", "trending")} />
        </div>
        <div className={`${styles.bridgeH} ${styles.tBridgeH_Col2} ${styles.tBridgeH_Row1_2}`}>
          <BridgeH active={isBridgeActive("featured", "top-rated")} />
        </div>
        <div className={`${styles.bridgeH} ${styles.tBridgeH_Col1} ${styles.tBridgeH_Row2_1}`}>
          <BridgeH active={isBridgeActive("trending", "use-case")} />
        </div>
        <div className={`${styles.bridgeH} ${styles.tBridgeH_Col2} ${styles.tBridgeH_Row2_2}`}>
          <BridgeH active={isBridgeActive("top-rated", "output")} />
        </div>
        <div className={`${styles.bridgeH} ${styles.tBridgeH_Col1} ${styles.tBridgeH_Row3_1}`}>
          <BridgeH active={isBridgeActive("use-case", "roles")} />
        </div>
      </div>

      {/* =========================================================================
          Mobile Cross-Bridges (1 column stack joined together vertically):
          ========================================================================= */}
      <div className={`${styles.decorationsOverlay} ${styles.mobileDecorations}`} aria-hidden="true">
        <div className={`${styles.bridgeH} ${styles.mBridgeH} ${styles.mBridgeH1}`}>
          <BridgeH active={isBridgeActive("free", "featured")} />
        </div>
        <div className={`${styles.bridgeH} ${styles.mBridgeH} ${styles.mBridgeH2}`}>
          <BridgeH active={isBridgeActive("featured", "trending")} />
        </div>
        <div className={`${styles.bridgeH} ${styles.mBridgeH} ${styles.mBridgeH3}`}>
          <BridgeH active={isBridgeActive("trending", "top-rated")} />
        </div>
        <div className={`${styles.bridgeH} ${styles.mBridgeH} ${styles.mBridgeH4}`}>
          <BridgeH active={isBridgeActive("top-rated", "use-case")} />
        </div>
        <div className={`${styles.bridgeH} ${styles.mBridgeH} ${styles.mBridgeH5}`}>
          <BridgeH active={isBridgeActive("use-case", "output")} />
        </div>
        <div className={`${styles.bridgeH} ${styles.mBridgeH} ${styles.mBridgeH6}`}>
          <BridgeH active={isBridgeActive("output", "roles")} />
        </div>
      </div>

      {/* Interactive Cards Grid */}
      <div className={styles.cardGrid}>
        {categories.map((cat) => {
          const cardBg = cat.backgroundColor ?? backgroundColor;

          return (
            <CategorySkillCard
              key={cat.id}
              cardId={cat.id}
              title={cat.title}
              href={cat.href}
              backgroundColor={cardBg}
              isHovered={hoveredCardId === cat.id}
              onHoverChange={(hovered) => {
                setHoveredCardId(hovered ? cat.id : null);
              }}
              onClick={() => {
                cat.onClick?.();
                onSelectCategory?.(cat);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
