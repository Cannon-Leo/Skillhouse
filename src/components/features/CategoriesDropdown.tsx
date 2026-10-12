"use client";

import React, { useState } from "react";
import {
  Layout,
  Palette,
  Share2,
  BookOpen,
  Rocket,
  BarChart3,
  Search,
  FileText,
  Video,
  ShoppingBag,
  Briefcase,
  Megaphone,
  Code2,
  Compass,
  PenTool,
  GraduationCap,
  Image as ImageIcon,
  Presentation,
  Monitor,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import styles from "./CategoriesDropdown.module.css";

export type CategoryTab = "use-case" | "role" | "output";

export interface CategoryItem {
  name: string;
  onClick?: () => void;
}

export interface CategoriesDropdownProps {
  initialTab?: CategoryTab;
  activeTab?: CategoryTab;
  onTabChange?: (tab: CategoryTab) => void;
  onSelectCategory?: (category: string, tab: CategoryTab) => void;
  onSeeAllSkills?: () => void;
  className?: string;
}

export const CATEGORIES_DATA: Record<CategoryTab, { title: string; col1: string[]; col2: string[] }> = {
  "use-case": {
    title: "By use-case",
    col1: [
      "Web design",
      "Brand identity",
      "Social media",
      "Education explainers",
    ],
    col2: [
      "Product launch",
      "Client reporting",
      "Research communication",
      "Content publishing",
    ],
  },
  "role": {
    title: "By role",
    col1: [
      "Content creator",
      "e-Commerce seller",
      "Consultant",
      "Marketer",
      "Software engineer",
    ],
    col2: [
      "Founder",
      "Designer",
      "Teacher",
      "Researcher",
    ],
  },
  "output": {
    title: "By output",
    col1: [
      "Images",
      "Presentations",
    ],
    col2: [
      "Video",
      "Web & HTML",
    ],
  },
};

const TABS: { id: CategoryTab; label: string }[] = [
  { id: "use-case", label: "By use-case" },
  { id: "role", label: "By role" },
  { id: "output", label: "By output" },
];

/**
 * Returns semantically accurate, contextual Lucide icon for each category item
 */
export const getCategoryIcon = (categoryName: string, className = styles.itemIcon) => {
  switch (categoryName) {
    // By use-case
    case "Web design":
      return <Layout size={14} className={className} strokeWidth={1.8} aria-hidden="true" />;
    case "Brand identity":
      return <Palette size={14} className={className} strokeWidth={1.8} aria-hidden="true" />;
    case "Social media":
      return <Share2 size={14} className={className} strokeWidth={1.8} aria-hidden="true" />;
    case "Education explainers":
      return <BookOpen size={14} className={className} strokeWidth={1.8} aria-hidden="true" />;
    case "Product launch":
      return <Rocket size={14} className={className} strokeWidth={1.8} aria-hidden="true" />;
    case "Client reporting":
      return <BarChart3 size={14} className={className} strokeWidth={1.8} aria-hidden="true" />;
    case "Research communication":
      return <Search size={14} className={className} strokeWidth={1.8} aria-hidden="true" />;
    case "Content publishing":
      return <FileText size={14} className={className} strokeWidth={1.8} aria-hidden="true" />;

    // By role
    case "Content creator":
      return <Video size={14} className={className} strokeWidth={1.8} aria-hidden="true" />;
    case "e-Commerce seller":
      return <ShoppingBag size={14} className={className} strokeWidth={1.8} aria-hidden="true" />;
    case "Consultant":
      return <Briefcase size={14} className={className} strokeWidth={1.8} aria-hidden="true" />;
    case "Marketer":
      return <Megaphone size={14} className={className} strokeWidth={1.8} aria-hidden="true" />;
    case "Software engineer":
      return <Code2 size={14} className={className} strokeWidth={1.8} aria-hidden="true" />;
    case "Founder":
      return <Compass size={14} className={className} strokeWidth={1.8} aria-hidden="true" />;
    case "Designer":
      return <PenTool size={14} className={className} strokeWidth={1.8} aria-hidden="true" />;
    case "Teacher":
      return <GraduationCap size={14} className={className} strokeWidth={1.8} aria-hidden="true" />;
    case "Researcher":
      return <Search size={14} className={className} strokeWidth={1.8} aria-hidden="true" />;

    // By output
    case "Images":
      return <ImageIcon size={14} className={className} strokeWidth={1.8} aria-hidden="true" />;
    case "Presentations":
      return <Presentation size={14} className={className} strokeWidth={1.8} aria-hidden="true" />;
    case "Video":
      return <Video size={14} className={className} strokeWidth={1.8} aria-hidden="true" />;
    case "Web & HTML":
      return <Monitor size={14} className={className} strokeWidth={1.8} aria-hidden="true" />;

    default:
      return <Sparkles size={14} className={className} strokeWidth={1.8} aria-hidden="true" />;
  }
};

/**
 * Category item icon component
 */
export const CategoryItemIcon: React.FC<{ categoryName?: string; className?: string }> = ({
  categoryName = "",
  className = styles.itemIcon,
}) => {
  return getCategoryIcon(categoryName, className);
};

/**
 * Lucide chevron right icon for category tabs
 */
export const TabChevronIcon: React.FC<{ className?: string }> = ({ className }) => (
  <ChevronRight size={16} className={className} aria-hidden="true" />
);

export const CategoriesDropdown: React.FC<CategoriesDropdownProps> = ({
  initialTab = "use-case",
  activeTab: controlledTab,
  onTabChange,
  onSelectCategory,
  onSeeAllSkills,
  className = "",
}) => {
  const [internalTab, setInternalTab] = useState<CategoryTab>(initialTab);
  const currentTab = controlledTab !== undefined ? controlledTab : internalTab;

  const handleTabClick = (tab: CategoryTab) => {
    if (controlledTab === undefined) {
      setInternalTab(tab);
    }
    onTabChange?.(tab);
  };

  const currentData = CATEGORIES_DATA[currentTab];

  return (
    <div 
      className={`${styles.dropdownContainer} ${className}`}
      role="menu"
      aria-label="Categories Mega Menu"
    >
      {/* Top Body: Sidebar Tabs + 2 Item Columns */}
      <div className={styles.bodyWrapper}>
        {/* Left Sidebar Tabs (Width: 150px) */}
        <div className={styles.sidebarTabs} role="tablist" aria-orientation="vertical">
          {TABS.map((tab) => {
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                tabIndex={0}
                className={`${styles.tabButton} ${isActive ? styles.activeTab : styles.inactiveTab}`}
                onClick={() => handleTabClick(tab.id)}
              >
                <span className={styles.tabLabel}>{tab.label}</span>
                <span className={styles.tabArrowWrapper} aria-hidden="true">
                  <ChevronRight
                    size={16}
                    className={`${styles.tabArrow} ${isActive ? styles.activeArrow : ""}`}
                    strokeWidth={isActive ? 2.2 : 1.8}
                  />
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Content Columns */}
        <div className={styles.contentColumns} role="tabpanel" aria-label={currentData.title}>
          {/* Column 1 */}
          <div className={styles.column}>
            {currentData.col1.map((item) => (
              <button
                key={item}
                type="button"
                className={styles.itemRow}
                onClick={() => onSelectCategory?.(item, currentTab)}
              >
                {getCategoryIcon(item)}
                <span className={styles.itemText}>{item}</span>
              </button>
            ))}
          </div>

          {/* Column 2 */}
          <div className={styles.column}>
            {currentData.col2.map((item) => (
              <button
                key={item}
                type="button"
                className={styles.itemRow}
                onClick={() => onSelectCategory?.(item, currentTab)}
              >
                {getCategoryIcon(item)}
                <span className={styles.itemText}>{item}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Footer: See all Skills CTA (Figma Node 751:7947) */}
      <div className={styles.footerRow}>
        <button
          type="button"
          className={styles.seeAllButton}
          onClick={onSeeAllSkills}
        >
          See all Skills
        </button>
      </div>
    </div>
  );
};
