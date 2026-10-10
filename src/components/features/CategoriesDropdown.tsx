"use client";

import React, { useState } from "react";
import Image from "next/image";
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
                  <Image
                    src="/figma/node_750_3558.svg"
                    alt=""
                    width={18}
                    height={18}
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
                <Image
                  src="/figma/node_750_3509.svg"
                  alt=""
                  width={14}
                  height={14}
                  className={styles.itemIcon}
                />
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
                <Image
                  src="/figma/node_750_3509.svg"
                  alt=""
                  width={14}
                  height={14}
                  className={styles.itemIcon}
                />
                <span className={styles.itemText}>{item}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Footer: See all Skills CTA */}
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
