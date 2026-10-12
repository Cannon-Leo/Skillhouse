"use client";

import { BookmarkIcon } from "../ui/BookmarkIcon";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./SkillCard.module.css";

export interface SkillCardProps {
  id?: string;
  title: string;
  category?: string;
  previewImage?: string;
  models?: string[];
  isBookmarked?: boolean;
  onBookmarkToggle?: (isBookmarked: boolean) => void;
  onClick?: () => void;
  className?: string;
}

export const SkillCard: React.FC<SkillCardProps> = ({
  id,
  title = "Pixel Promo Video",
  category = "Design",
  previewImage = "/figma/skill-card-preview.png",
  models = [
    "/figma/logo-1.png",
    "/figma/logo-2.png",
    "/figma/logo-3.png",
    "/figma/logo-4.png",
  ],
  isBookmarked: controlledBookmarked,
  onBookmarkToggle,
  onClick,
  className = "",
}) => {
  const [internalBookmarked, setInternalBookmarked] = useState(false);
  const isBookmarked = controlledBookmarked !== undefined ? controlledBookmarked : internalBookmarked;

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const nextState = !isBookmarked;
    if (controlledBookmarked === undefined) {
      setInternalBookmarked(nextState);
    }
    onBookmarkToggle?.(nextState);
  };

  return (
    <div
      id={id}
      className={`${styles.card} ${className}`}
      onClick={onClick}
      role="article"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      <div className={styles.imageContainer}>
        <Image
          src={previewImage}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={styles.previewImage}
          unoptimized
        />
        
        <div className={styles.imageOverlays}>
          {category ? (
            <span className={styles.pill}>{category}</span>
          ) : <span />}
          <button 
            type="button"
            onPointerDown={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            className={`${styles.bookmarkBtn} ${isBookmarked ? styles.bookmarked : ""}`} 
            onClick={handleBookmarkClick}
            aria-label={isBookmarked ? "Remove from saved skills" : "Save skill to bookmarks"}
            aria-pressed={isBookmarked}
            title={isBookmarked ? "Saved" : "Bookmark skill"}
          >
            <BookmarkIcon
              size={14}
              filled={isBookmarked}
              className={styles.bookmarkIcon}
            />
          </button>
        </div>
      </div>

      <div className={styles.footer}>
        <h3 className={styles.title} title={title}>
          {title}
        </h3>

        <div className={styles.logomarksRow} aria-label="Supported models">
          {models.slice(0, 4).map((logo, index) => (
            <div
              key={index}
              className={styles.logomarkItem}
              title={`Supported model ${index + 1}`}
            >
              <Image
                src={logo}
                alt=""
                width={12}
                height={12}
                className={styles.logoImage}
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
