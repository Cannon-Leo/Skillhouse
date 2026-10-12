"use client";

import React from "react";
import Link from "next/link";
import styles from "./CategorySkillCard.module.css";

export interface CategorySkillCardProps {
  /**
   * Title text displayed on the card.
   * Newlines ("\n") will be respected as in the Figma mock.
   */
  title: string;

  /**
   * Optional link target if the card navigates.
   */
  href?: string;

  /**
   * Click handler if used as a trigger/filter button.
   */
  onClick?: () => void;

  /**
   * Optional custom background color override (defaults to #FFEEDD).
   */
  backgroundColor?: string;

  /**
   * Accessible aria-label for screen readers.
   */
  ariaLabel?: string;

  /**
   * Optional custom className.
   */
  className?: string;

  /**
   * Optional inline styles.
   */
  style?: React.CSSProperties;
}

export const CategorySkillCard: React.FC<CategorySkillCardProps> = ({
  title,
  href,
  onClick,
  backgroundColor = "#FFEEDD",
  ariaLabel,
  className = "",
  style,
}) => {
  const inlineStyles: React.CSSProperties = {
    "--card-bg": backgroundColor,
    ...style,
  } as React.CSSProperties;

  const accessibleName = ariaLabel || title.replace(/\n/g, " ");

  const cardContent = (
    <>
      <div className={styles.headerRow}>
        <span className={styles.actionButton} aria-hidden="true">
          <svg
            className={styles.arrowIcon}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* 45-degree up-right diagonal arrow based on Figma Node 751:4800 */}
            <path
              d="M6 14L14 6M14 6H8M14 6V12"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
      <h3 className={styles.title}>{title}</h3>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={`${styles.card} ${className}`}
        style={inlineStyles}
        aria-label={accessibleName}
        onClick={(e) => {
          if (onClick) {
            e.preventDefault();
            onClick();
          }
        }}
        data-testid="category-skill-card"
      >
        {cardContent}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={`${styles.card} ${className}`}
      style={inlineStyles}
      aria-label={accessibleName}
      onClick={onClick}
      data-testid="category-skill-card"
    >
      {cardContent}
    </button>
  );
};
