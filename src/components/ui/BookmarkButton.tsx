"use client";

import React, { forwardRef } from "react";
import { Bookmark } from "lucide-react";
import styles from "./BookmarkButton.module.css";

export interface BookmarkButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "onToggle"> {
  isBookmarked?: boolean;
  onToggle?: (isBookmarked: boolean) => void;
  variant?: "round" | "square";
  iconSize?: number;
  className?: string;
}

export const BookmarkButton = forwardRef<HTMLButtonElement, BookmarkButtonProps>(
  (
    {
      isBookmarked = false,
      onToggle,
      variant = "round",
      iconSize = 14,
      className = "",
      onClick,
      title,
      "aria-label": ariaLabel,
      ...props
    },
    ref
  ) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      if (!e.defaultPrevented) {
        onToggle?.(!isBookmarked);
      }
    };

    const defaultTitle = isBookmarked ? "Saved in bookmarks" : "Bookmark skill";
    const defaultAriaLabel = isBookmarked ? "Remove from bookmarks" : "Bookmark skill";

    return (
      <button
        ref={ref}
        type="button"
        className={`${styles.button} ${styles[variant]} ${
          isBookmarked ? styles.bookmarked : ""
        } ${className}`}
        onClick={handleClick}
        aria-pressed={isBookmarked}
        aria-label={ariaLabel || defaultAriaLabel}
        title={title || defaultTitle}
        {...props}
      >
        <Bookmark
          size={iconSize}
          aria-hidden="true"
          fill={isBookmarked ? "currentColor" : "none"}
          stroke="currentColor"
          className={styles.icon}
        />
      </button>
    );
  }
);

BookmarkButton.displayName = "BookmarkButton";
