"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import styles from "./CategorySkillCard.module.css";

export interface CategorySkillCardProps {
  /**
   * Unique category identifier (e.g. "free", "featured").
   */
  cardId?: string;

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
   * Optional custom background color override (defaults to authentic Figma #EBD5C0).
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
  cardId,
  title,
  href,
  onClick,
  backgroundColor = "#EBD5C0",
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
        <span className={styles.actionButton} aria-hidden="true" data-testid="card-action-button">
          <ArrowUpRight
            className={styles.arrowIcon}
            size={15}
            strokeWidth={2}
            aria-hidden="true"
          />
        </span>
      </div>
      <h3 className={styles.title}>{title}</h3>
    </>
  );

  const cardClass = `${styles.card} ${className}`;

  if (href) {
    return (
      <Link
        href={href}
        className={cardClass}
        style={inlineStyles}
        aria-label={accessibleName}
        data-card-id={cardId}
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
      className={cardClass}
      style={inlineStyles}
      aria-label={accessibleName}
      data-card-id={cardId}
      onClick={onClick}
      data-testid="category-skill-card"
    >
      {cardContent}
    </button>
  );
};
