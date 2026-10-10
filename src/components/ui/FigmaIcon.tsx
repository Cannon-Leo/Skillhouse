import React from "react";
import Image from "next/image";

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

export const FigmaIcon: React.FC<FigmaIconProps> = ({
  name,
  size = 16,
  alt = "",
  className = "",
  ...props
}) => {
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
      {...props}
    >
      <Image
        src={`/figma/${name}.svg`}
        alt={alt}
        width={size}
        height={size}
        unoptimized
      />
    </span>
  );
};
