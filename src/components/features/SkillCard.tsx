"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./SkillCard.module.css";

export interface SkillCardProps {
  id?: string;
  title: string;
  category?: string;
  price?: string;
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
  price,
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
          {category && (
            <span className={styles.pill}>{category}</span>
          )}
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
            <svg 
              width="14" 
              height="14" 
              viewBox="0 0 24 24" 
              fill={isBookmarked ? "currentColor" : "none"} 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className={styles.bookmarkIcon}
            >
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
          </button>
        </div>
      </div>

      <div className={styles.footer}>
        <h3 className={styles.title} title={title}>
          {title}
        </h3>

        <div className={styles.logomarksRow} aria-label="Supported models">
          {price && <span className={styles.price}>{price}</span>}
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
