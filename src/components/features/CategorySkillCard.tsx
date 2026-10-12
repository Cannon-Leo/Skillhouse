"use client";

import React from "react";
import Link from "next/link";
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

  /**
   * Controlled hover state for matrix sync.
   */
  isHovered?: boolean;

  /**
   * Callback fired when card hover/focus state changes.
   */
  onHoverChange?: (isHovered: boolean) => void;
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
  isHovered = false,
  onHoverChange,
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
            aria-hidden="true"
          >
            {/* Authentic Figma Node 751:4800 Line arrow-right with exact color #54392D */}
            <path
              d="M8.12483 6.6118L13.1831 6.09987L13.695 11.1581"
              stroke="#54392D"
              strokeWidth="1.52294"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6.81655 13.8998L13.1192 6.17773"
              stroke="#54392D"
              strokeWidth="1.52294"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
      <h3 className={styles.title}>{title}</h3>
    </>
  );

  const cardClass = `${styles.card} ${isHovered ? styles.cardHovered : ""} ${className}`;

  if (href) {
    return (
      <Link
        href={href}
        className={cardClass}
        style={inlineStyles}
        aria-label={accessibleName}
        data-card-id={cardId}
        onMouseEnter={() => onHoverChange?.(true)}
        onMouseLeave={() => onHoverChange?.(false)}
        onFocus={() => onHoverChange?.(true)}
        onBlur={() => onHoverChange?.(false)}
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
      onMouseEnter={() => onHoverChange?.(true)}
      onMouseLeave={() => onHoverChange?.(false)}
      onFocus={() => onHoverChange?.(true)}
      onBlur={() => onHoverChange?.(false)}
      onClick={onClick}
      data-testid="category-skill-card"
    >
      {cardContent}
    </button>
  );
};
