"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import styles from "./FilterSection.module.css";

export interface FilterSectionProps {
  title: string;
  defaultOpen?: boolean;
  showDivider?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const FilterSection: React.FC<FilterSectionProps> = ({
  title,
  defaultOpen = true,
  showDivider = true,
  children,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`${styles.section} ${className}`}>
      <div
        className={styles.header}
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
      >
        <h3 className={styles.title}>{title}</h3>
        <span
          className={`${styles.chevron} ${!isOpen ? styles.collapsed : ""}`}
          aria-hidden="true"
        >
          <ChevronDown size={14} />
        </span>
      </div>

      <div className={`${styles.list} ${!isOpen ? styles.collapsed : ""}`}>
        {children}
      </div>

      {showDivider && <div className={styles.divider} aria-hidden="true" />}
    </div>
  );
};
