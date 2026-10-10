"use client";
import React from 'react';
import Image from 'next/image';
import styles from './SkillCard.module.css';

export interface SkillCardProps {
  title: string;
  imageSrc?: string;
  pillLabel?: string;
  isBookmarked?: boolean;
  titleColor?: 'default' | 'orange';
  price?: string | number;
  onBookmarkClick?: (e: React.MouseEvent) => void;
  models?: Array<'openai' | 'anthropic' | 'google' | 'meta' | string>;
}

export function SkillCard({ 
  title, 
  imageSrc, 
  pillLabel,
  isBookmarked,
  titleColor = 'default',
  price,
  onBookmarkClick,
  models = ['openai', 'anthropic', 'google', 'meta']
}: SkillCardProps) {
  return (
    <div className={styles.skillCard}>
      <div className={styles.imageWrapper}>
        {imageSrc ? (
          <Image src={imageSrc} alt={title} fill className={styles.image} />
        ) : (
          <div className={styles.imagePlaceholder} />
        )}
        
        <div className={styles.imageOverlays}>
          {pillLabel && (
            <span className={styles.pill}>{pillLabel}</span>
          )}
          <button 
            className={styles.bookmarkBtn} 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onBookmarkClick?.(e);
            }}
            aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
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
            >
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
          </button>
        </div>
      </div>

      <div className={styles.footer}>
        <h3 className={`${styles.title} ${titleColor === 'orange' ? styles.titleOrange : ''}`} title={title}>
          {title}
        </h3>
        
        <div className={styles.rightContent}>
          {price !== undefined && (
            <span className={styles.price}>
              {typeof price === 'number' ? `$${price}` : price}
            </span>
          )}
          {models && models.length > 0 && (
            <div className={styles.modelsContainer}>
              {models.map((model, idx) => (
                <div key={idx} className={styles.modelBadge}>
                  {model.charAt(0).toUpperCase()}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
