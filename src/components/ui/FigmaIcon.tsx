"use client";

import React from "react";
import {
  ChevronDown,
  ArrowRight,
  Search,
  Monitor,
  Presentation,
  Video,
  Image as ImageIcon,
  Check,
  Archive,
  Upload,
  Download,
  FolderOpen,
  ShieldCheck,
  Copy,
  Info,
} from "lucide-react";

export type FigmaIconName =
  | "arrow-down"
  | "arrow-right"
  | "search-normal"
  | "monitor"
  | "presentation"
  | "video"
  | "image"
  | "checkbox-icon"
  | "archive"
  | "upload"
  | "import"
  | "folder-open"
  | "shield-tick"
  | "copy"
  | "info-circle";

interface FigmaIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  name: FigmaIconName;
  size?: number;
  alt?: string;
  className?: string;
}

const ICON_MAP: Record<
  FigmaIconName,
  React.ComponentType<{ size?: number; className?: string; "aria-hidden"?: boolean }>
> = {
  "arrow-down": ChevronDown,
  "arrow-right": ArrowRight,
  "search-normal": Search,
  "monitor": Monitor,
  "presentation": Presentation,
  "video": Video,
  "image": ImageIcon,
  "checkbox-icon": Check,
  "archive": Archive,
  "upload": Upload,
  "import": Download,
  "folder-open": FolderOpen,
  "shield-tick": ShieldCheck,
  "copy": Copy,
  "info-circle": Info,
};

export const FigmaIcon: React.FC<FigmaIconProps> = ({
  name,
  size = 16,
  alt = "",
  className = "",
  ...props
}) => {
  const IconComponent = ICON_MAP[name] || Search;

  return (
    <span
      className={`figma-icon-wrapper ${className}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        flexShrink: 0,
        verticalAlign: "middle",
      }}
      aria-hidden={!alt}
      aria-label={alt || undefined}
      role={alt ? "img" : undefined}
      data-testid={`figma-icon-${name}`}
      {...props}
    >
      <IconComponent size={size} aria-hidden={!alt} />
    </span>
  );
};
