"use client";

import React, { forwardRef } from "react";
import { BookmarkIcon } from "./BookmarkIcon";
import styles from "./BookmarkButton.module.css";

export interface BookmarkButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "onToggle"> {
  isBookmarked?: boolean;
  onToggle?: (isBookmarked: boolean) => void;
  size?: "sm" | "md";
  variant?: "cream" | "white" | "round" | "square";
  iconSize?: number;
  className?: string;
  stopPropagation?: boolean;
}

/**
 * BookmarkButton Component
 *
 * Unified Skillhouse Bookmark Action Surface.
 * Always fully rounded (circular 50% border-radius) across all instantiations
 * (SkillCard and SkillDetailHeader), supporting cream and white surface variants.
 */
export const BookmarkButton = forwardRef<HTMLButtonElement, BookmarkButtonProps>(
  (
    {
      isBookmarked = false,
      onToggle,
      size = "md",
      variant = "round",
      iconSize,
      className = "",
      onClick,
      onPointerDown,
      onMouseDown,
      onTouchStart,
      title,
      stopPropagation = false,
      "aria-label": ariaLabel,
      ...props
    },
    ref
  ) => {
    const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
      if (stopPropagation) e.stopPropagation();
      onPointerDown?.(e);
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (stopPropagation) e.stopPropagation();
      onMouseDown?.(e);
    };

    const handleTouchStart = (e: React.TouchEvent<HTMLButtonElement>) => {
      if (stopPropagation) e.stopPropagation();
      onTouchStart?.(e);
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (stopPropagation) e.stopPropagation();
      onClick?.(e);
      if (!e.defaultPrevented) {
        onToggle?.(!isBookmarked);
      }
    };

    const defaultTitle = isBookmarked ? "Saved in bookmarks" : "Bookmark skill";
    const defaultAriaLabel = isBookmarked ? "Remove from bookmarks" : "Bookmark skill";
    const resolvedIconSize = iconSize ?? (size === "sm" ? 13 : 14);

    const sizeClass = size === "sm" ? styles.sizeSm : styles.sizeMd;
    const variantClass = styles[variant] || styles.round;

    return (
      <button
        ref={ref}
        type="button"
        className={`${styles.button} ${sizeClass} ${variantClass} ${
          isBookmarked ? styles.bookmarked : ""
        } ${className}`.trim()}
        onClick={handleClick}
        onPointerDown={handlePointerDown}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        aria-pressed={isBookmarked}
        aria-label={ariaLabel || defaultAriaLabel}
        title={title || defaultTitle}
        {...props}
      >
        <BookmarkIcon
          size={resolvedIconSize}
          filled={isBookmarked}
          className={styles.icon}
        />
      </button>
    );
  }
);

BookmarkButton.displayName = "BookmarkButton";
