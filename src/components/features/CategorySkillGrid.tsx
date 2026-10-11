"use client";

import React from "react";
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
