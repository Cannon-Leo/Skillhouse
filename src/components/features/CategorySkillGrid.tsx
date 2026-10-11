"use client";

import React from "react";
import Image from "next/image";
import { CategorySkillCard } from "./CategorySkillCard";
import styles from "./CategorySkillGrid.module.css";

export interface SkillCategoryItem {
  id: string;
  title: string;
  href?: string;
  onClick?: () => void;
}

export const DEFAULT_SKILL_CATEGORIES: SkillCategoryItem[] = [
  { id: "featured", title: "Featured \nAgent Skills", href: "/skills?category=featured" },
  { id: "free", title: "Free Agent \nSkills", href: "/skills?category=free" },
  { id: "trending", title: "Trending \nAgent Skills", href: "/skills?category=trending" },
  { id: "top-rated", title: "Top-rated \nAgent Skills", href: "/skills?category=top-rated" },
  { id: "use-case", title: "Skills by \nUse-case", href: "/skills?category=use-case" },
  { id: "output", title: "Skills by \nOutput", href: "/skills?category=output" },
  { id: "roles", title: "Skills by \nRoles", href: "/skills?category=roles" },
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
  backgroundColor = "#FFEEDD",
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
      {/* Decorative connecting bridges (Figma Nodes 751:4791, 751:4838) */}
      <div className={styles.decorationsOverlay} aria-hidden="true">
        {/* Row 1 Vertical Bridges */}
        <div className={`${styles.bridgeV} ${styles.bridgeV1_1}`}>
          <Image src="/figma/grid_bridge_v_ffeedd.svg" alt="" width={33} height={55} unoptimized />
        </div>
        <div className={`${styles.bridgeV} ${styles.bridgeV1_2}`}>
          <Image src="/figma/grid_bridge_v_ffeedd.svg" alt="" width={33} height={55} unoptimized />
        </div>
        <div className={`${styles.bridgeV} ${styles.bridgeV1_3}`}>
          <Image src="/figma/grid_bridge_v_ffeedd.svg" alt="" width={33} height={55} unoptimized />
        </div>

        {/* Row 2 Vertical Bridges */}
        <div className={`${styles.bridgeV} ${styles.bridgeV2_1}`}>
          <Image src="/figma/grid_bridge_v_ffeedd.svg" alt="" width={33} height={55} unoptimized />
        </div>
        <div className={`${styles.bridgeV} ${styles.bridgeV2_2}`}>
          <Image src="/figma/grid_bridge_v_ffeedd.svg" alt="" width={33} height={55} unoptimized />
        </div>
        <div className={`${styles.bridgeV} ${styles.bridgeV2_3}`}>
          <Image src="/figma/grid_bridge_v_ffeedd.svg" alt="" width={33} height={55} unoptimized />
        </div>

        {/* Horizontal Bridges between Row 1 and Row 2 */}
        <div className={`${styles.bridgeH} ${styles.bridgeH1}`}>
          <Image src="/figma/grid_bridge_h_ffeedd.svg" alt="" width={55} height={31} unoptimized />
        </div>
        <div className={`${styles.bridgeH} ${styles.bridgeH2}`}>
          <Image src="/figma/grid_bridge_h_ffeedd.svg" alt="" width={55} height={31} unoptimized />
        </div>
        <div className={`${styles.bridgeH} ${styles.bridgeH3}`}>
          <Image src="/figma/grid_bridge_h_ffeedd.svg" alt="" width={55} height={31} unoptimized />
        </div>
        <div className={`${styles.bridgeH} ${styles.bridgeH4}`}>
          <Image src="/figma/grid_bridge_h_ffeedd.svg" alt="" width={55} height={31} unoptimized />
        </div>
      </div>

      {/* Interactive Cards Grid */}
      <div className={styles.cardGrid}>
        {categories.map((cat) => (
          <CategorySkillCard
            key={cat.id}
            title={cat.title}
            href={cat.href}
            backgroundColor={backgroundColor}
            onClick={() => {
              cat.onClick?.();
              onSelectCategory?.(cat);
            }}
          />
        ))}
      </div>
    </div>
  );
};
