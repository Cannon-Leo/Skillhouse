"use client";

import React from "react";
import { Checkbox } from "../ui/Checkbox";
import {
  Monitor,
  Presentation,
  Video,
  Image as ImageIcon,
  Archive,
  Upload,
  Download,
  FolderOpen,
  ShieldCheck,
  Search,
  Tag,
  Code2,
} from "lucide-react";
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

const FILTER_ICON_MAP: Record<
  string,
  React.ComponentType<{ size?: number; className?: string; "aria-hidden"?: boolean }>
> = {
  monitor: Monitor,
  presentation: Presentation,
  video: Video,
  image: ImageIcon,
  archive: Archive,
  upload: Upload,
  import: Download,
  "folder-open": FolderOpen,
  "shield-tick": ShieldCheck,
  "search-normal": Search,
  tag: Tag,
  code: Code2,
};

export const FilterItem: React.FC<FilterItemProps> = ({
  id,
  label,
  count,
  iconName,
  checked,
  onChange,
  className = "",
}) => {
  const IconComponent = iconName ? FILTER_ICON_MAP[iconName] || Monitor : null;

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
          {IconComponent && (
            <span className={styles.iconWrapper} aria-hidden="true" data-testid={`filter-icon-${iconName}`}>
              <IconComponent size={16} />
            </span>
          )}
          <span className={styles.label}>{label}</span>
        </div>

        {count !== undefined && <span className={styles.count}>{count}</span>}
      </div>
    </label>
  );
};
