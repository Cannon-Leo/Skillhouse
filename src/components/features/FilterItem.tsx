"use client";

import React from "react";
import { Checkbox } from "../ui/Checkbox";
import Image from "next/image";
import styles from "./FilterItem.module.css";

export interface FilterItemProps {
  id: string;
  label: string;
  count?: number | string;
  iconName?: "monitor" | "presentation" | "video" | "image" | string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

export const FilterItem: React.FC<FilterItemProps> = ({
  id,
  label,
  count,
  iconName,
  checked,
  onChange,
  className = "",
}) => {
  return (
    <label
      htmlFor={`cb-${id}`}
      className={`${styles.item} ${checked ? styles.isSelected : ""} ${className}`}
    >
      <Checkbox
        id={`cb-${id}`}
        size="md"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        aria-label={label}
      />

      <div className={styles.contentRow}>
        <div className={styles.labelGroup}>
          {iconName && (
            <span className={styles.iconWrapper}>
              <Image
                src={`/figma/${iconName}.svg`}
                alt=""
                width={16}
                height={16}
                unoptimized
              />
            </span>
          )}
          <span className={styles.label}>{label}</span>
        </div>

        {count !== undefined && <span className={styles.count}>{count}</span>}
      </div>
    </label>
  );
};
