"use client";

import React, { useState } from "react";
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
 * Authentic Figma download/import vector icon (Component 725:676 from public/figma/import.svg)
 */
export const CategoryItemIcon: React.FC<{ className?: string }> = ({ className = styles.itemIcon }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M9.59036 5.19168C11.6904 5.37251 12.5479 6.45168 12.5479 8.81418V8.89001C12.5479 11.4975 11.5037 12.5417 8.89619 12.5417H5.09869C2.49119 12.5417 1.44702 11.4975 1.44702 8.89001V8.81418C1.44702 6.46918 2.29285 5.39001 4.35785 5.19751"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7 1.16667V8.68001"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.95448 7.37918L7.00031 9.33335L5.04614 7.37918"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Authentic Figma chevron right vector icon (Component 750:3438)
 */
export const TabChevronIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M6 3.5L10.5 8L6 12.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Category item icon accessor maintaining backwards-compatibility
 */
export const getCategoryIcon = () => {
  return <CategoryItemIcon />;
};

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
                  <TabChevronIcon
                    className={`${styles.tabArrow} ${isActive ? styles.activeArrow : ""}`}
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
                <CategoryItemIcon />
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
                <CategoryItemIcon />
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
