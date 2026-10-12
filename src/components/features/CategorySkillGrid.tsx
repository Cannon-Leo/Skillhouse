"use client";

import React from "react";
import Image from "next/image";
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

export const CategorySkillGrid: React.FC<CategorySkillGridProps> = ({
  categories = DEFAULT_SKILL_CATEGORIES,
  backgroundColor = "#EBD5C0",
  onSelectCategory,
  className = "",
  style,
}) => {
  return (
    <div
      className={`${styles.gridWrapper} ${className}`}
      style={style}
      data-testid="category-skill-grid"
    >
      {/* =========================================================================
          Desktop Cross-Bridges (Figma Node 751:4789):
          Solid continuous terracotta fillets connecting real adjacent cards.
          ========================================================================= */}
      <div className={`${styles.decorationsOverlay} ${styles.desktopDecorations}`} aria-hidden="true">
        {/* Row 1 horizontal connectors (Card 1 - Card 2 - Card 3 - Card 4) */}
        <div className={`${styles.bridgeV} ${styles.dBridgeV1_1}`}>
          <Image src="/figma/grid_bridge_v.svg" alt="" width={33} height={55} className={styles.bridgeImg} unoptimized />
        </div>
        <div className={`${styles.bridgeV} ${styles.dBridgeV1_2}`}>
          <Image src="/figma/grid_bridge_v.svg" alt="" width={33} height={55} className={styles.bridgeImg} unoptimized />
        </div>
        <div className={`${styles.bridgeV} ${styles.dBridgeV1_3}`}>
          <Image src="/figma/grid_bridge_v.svg" alt="" width={33} height={55} className={styles.bridgeImg} unoptimized />
        </div>

        {/* Row 2 horizontal connectors (Card 5 - Card 6 - Card 7). Slot 8 is empty so no 3rd bridge! */}
        <div className={`${styles.bridgeV} ${styles.dBridgeV2_1}`}>
          <Image src="/figma/grid_bridge_v.svg" alt="" width={33} height={55} className={styles.bridgeImg} unoptimized />
        </div>
        <div className={`${styles.bridgeV} ${styles.dBridgeV2_2}`}>
          <Image src="/figma/grid_bridge_v.svg" alt="" width={33} height={55} className={styles.bridgeImg} unoptimized />
        </div>

        {/* Vertical connectors between Row 1 and Row 2 (under Card 1, 2, 3 connecting to 5, 6, 7) */}
        <div className={`${styles.bridgeH} ${styles.dBridgeH1}`}>
          <Image src="/figma/grid_bridge_h.svg" alt="" width={55} height={31} className={styles.bridgeImg} unoptimized />
        </div>
        <div className={`${styles.bridgeH} ${styles.dBridgeH2}`}>
          <Image src="/figma/grid_bridge_h.svg" alt="" width={55} height={31} className={styles.bridgeImg} unoptimized />
        </div>
        <div className={`${styles.bridgeH} ${styles.dBridgeH3}`}>
          <Image src="/figma/grid_bridge_h.svg" alt="" width={55} height={31} className={styles.bridgeImg} unoptimized />
        </div>
      </div>

      {/* =========================================================================
          Tablet Cross-Bridges (2 columns joined together)
          ========================================================================= */}
      <div className={`${styles.decorationsOverlay} ${styles.tabletDecorations}`} aria-hidden="true">
        <div className={`${styles.bridgeV} ${styles.tBridgeV} ${styles.tBridgeV1}`}>
          <Image src="/figma/grid_bridge_v.svg" alt="" width={33} height={55} className={styles.bridgeImg} unoptimized />
        </div>
        <div className={`${styles.bridgeV} ${styles.tBridgeV} ${styles.tBridgeV2}`}>
          <Image src="/figma/grid_bridge_v.svg" alt="" width={33} height={55} className={styles.bridgeImg} unoptimized />
        </div>
        <div className={`${styles.bridgeV} ${styles.tBridgeV} ${styles.tBridgeV3}`}>
          <Image src="/figma/grid_bridge_v.svg" alt="" width={33} height={55} className={styles.bridgeImg} unoptimized />
        </div>

        <div className={`${styles.bridgeH} ${styles.tBridgeH_Col1} ${styles.tBridgeH_Row1_1}`}>
          <Image src="/figma/grid_bridge_h.svg" alt="" width={55} height={31} className={styles.bridgeImg} unoptimized />
        </div>
        <div className={`${styles.bridgeH} ${styles.tBridgeH_Col2} ${styles.tBridgeH_Row1_2}`}>
          <Image src="/figma/grid_bridge_h.svg" alt="" width={55} height={31} className={styles.bridgeImg} unoptimized />
        </div>
        <div className={`${styles.bridgeH} ${styles.tBridgeH_Col1} ${styles.tBridgeH_Row2_1}`}>
          <Image src="/figma/grid_bridge_h.svg" alt="" width={55} height={31} className={styles.bridgeImg} unoptimized />
        </div>
        <div className={`${styles.bridgeH} ${styles.tBridgeH_Col2} ${styles.tBridgeH_Row2_2}`}>
          <Image src="/figma/grid_bridge_h.svg" alt="" width={55} height={31} className={styles.bridgeImg} unoptimized />
        </div>
        <div className={`${styles.bridgeH} ${styles.tBridgeH_Col1} ${styles.tBridgeH_Row3_1}`}>
          <Image src="/figma/grid_bridge_h.svg" alt="" width={55} height={31} className={styles.bridgeImg} unoptimized />
        </div>
      </div>

      {/* =========================================================================
          Mobile Cross-Bridges (1 column stack joined together vertically)
          ========================================================================= */}
      <div className={`${styles.decorationsOverlay} ${styles.mobileDecorations}`} aria-hidden="true">
        <div className={`${styles.bridgeH} ${styles.mBridgeH} ${styles.mBridgeH1}`}>
          <Image src="/figma/grid_bridge_h.svg" alt="" width={55} height={31} className={styles.bridgeImg} unoptimized />
        </div>
        <div className={`${styles.bridgeH} ${styles.mBridgeH} ${styles.mBridgeH2}`}>
          <Image src="/figma/grid_bridge_h.svg" alt="" width={55} height={31} className={styles.bridgeImg} unoptimized />
        </div>
        <div className={`${styles.bridgeH} ${styles.mBridgeH} ${styles.mBridgeH3}`}>
          <Image src="/figma/grid_bridge_h.svg" alt="" width={55} height={31} className={styles.bridgeImg} unoptimized />
        </div>
        <div className={`${styles.bridgeH} ${styles.mBridgeH} ${styles.mBridgeH4}`}>
          <Image src="/figma/grid_bridge_h.svg" alt="" width={55} height={31} className={styles.bridgeImg} unoptimized />
        </div>
        <div className={`${styles.bridgeH} ${styles.mBridgeH} ${styles.mBridgeH5}`}>
          <Image src="/figma/grid_bridge_h.svg" alt="" width={55} height={31} className={styles.bridgeImg} unoptimized />
        </div>
        <div className={`${styles.bridgeH} ${styles.mBridgeH} ${styles.mBridgeH6}`}>
          <Image src="/figma/grid_bridge_h.svg" alt="" width={55} height={31} className={styles.bridgeImg} unoptimized />
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
