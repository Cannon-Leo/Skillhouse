"use client";

import React from "react";
import { FilterSection } from "./FilterSection";
import { FilterItem } from "./FilterItem";
import styles from "./FilterSidebar.module.css";

export interface FilterState {
  recommendations: string[];
  outputs: string[];
  roles: string[];
  useCases: string[];
}

export interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  className?: string;
}

interface FilterDef {
  id: string;
  label: string;
  count?: number;
  iconName?: "monitor" | "presentation" | "video" | "image" | string;
}

export const RECOMMENDATIONS: FilterDef[] = [
  { id: "all", label: "All skills", count: 387 },
  { id: "free", label: "Free", count: 42 },
  { id: "featured", label: "Featured", count: 33 },
];

export const OUTPUTS: FilterDef[] = [
  { id: "web", label: "Web", count: 113, iconName: "monitor" },
  { id: "slides", label: "Slides", count: 47, iconName: "presentation" },
  { id: "video", label: "Video", count: 144, iconName: "video" },
  { id: "image", label: "Image", count: 83, iconName: "image" },
];

export const ROLES: FilterDef[] = [
  { id: "content-creator", label: "Content creator", count: 194 },
  { id: "founder", label: "Founder", count: 124 },
  { id: "ecommerce", label: "Ecommerce seller", count: 28 },
  { id: "swe", label: "Software Engineer", count: 28 },
  { id: "designer", label: "Designer", count: 183 },
  { id: "consultant", label: "Consultant", count: 10 },
  { id: "teacher", label: "Teacher", count: 54 },
  { id: "marketer", label: "Marketer", count: 41 },
  { id: "researcher", label: "Researcher", count: 22 },
];

export const USE_CASES: FilterDef[] = [
  { id: "publishing", label: "Content publishing", count: 148 },
  { id: "education", label: "Education explainers", count: 31 },
  { id: "brand-identity", label: "Brand identity", count: 56 },
  { id: "social-media", label: "Social media", count: 42 },
  { id: "product-launch", label: "Product launch", count: 139 },
  { id: "ecommerce-conversion", label: "Ecommerce conversion", count: 4 },
  { id: "client-reporting", label: "Client reporting", count: 46 },
  { id: "sales-fundraising", label: "Sales fundraising", count: 3 },
  { id: "research-communication", label: "Research communication", count: 33 },
  { id: "creative-previsualization", label: "Creative previsualization", count: 19 },
  { id: "web-design", label: "Web design", count: 160 },
];

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
  className = "",
}) => {
  const toggleItem = (category: keyof FilterState, id: string) => {
    const current = filters[category];
    const next = current.includes(id)
      ? current.filter((item) => item !== id)
      : [...current, id];

    onFilterChange({
      ...filters,
      [category]: next,
    });
  };

  const totalActive =
    filters.recommendations.length +
    filters.outputs.length +
    filters.roles.length +
    filters.useCases.length;

  const handleClearAll = () => {
    onFilterChange({
      recommendations: [],
      outputs: [],
      roles: [],
      useCases: [],
    });
  };

  return (
    <aside className={`${styles.sidebar} ${className}`} aria-label="Filter sidebar">
      <div className={styles.topBar}>
        <div className={styles.heading}>
          <span>Filters</span>
          {totalActive > 0 && (
            <span className={styles.activeCountBadge} data-testid="active-filter-count">{totalActive}</span>
          )}
        </div>
        {totalActive > 0 && (
          <button
            type="button"
            className={styles.clearButton}
            onClick={handleClearAll}
          >
            Clear all
          </button>
        )}
      </div>

      <FilterSection title="Recommendations" defaultOpen={true}>
        {RECOMMENDATIONS.map((item) => (
          <FilterItem
            key={item.id}
            {...item}
            checked={filters.recommendations.includes(item.id)}
            onChange={() => toggleItem("recommendations", item.id)}
          />
        ))}
      </FilterSection>

      <FilterSection title="By output" defaultOpen={true}>
        {OUTPUTS.map((item) => (
          <FilterItem
            key={item.id}
            {...item}
            checked={filters.outputs.includes(item.id)}
            onChange={() => toggleItem("outputs", item.id)}
          />
        ))}
      </FilterSection>

      <FilterSection title="By role" defaultOpen={true}>
        {ROLES.map((item) => (
          <FilterItem
            key={item.id}
            {...item}
            checked={filters.roles.includes(item.id)}
            onChange={() => toggleItem("roles", item.id)}
          />
        ))}
      </FilterSection>

      <FilterSection title="By use case" defaultOpen={true} showDivider={false}>
        {USE_CASES.map((item) => (
          <FilterItem
            key={item.id}
            {...item}
            checked={filters.useCases.includes(item.id)}
            onChange={() => toggleItem("useCases", item.id)}
          />
        ))}
      </FilterSection>
    </aside>
  );
};
