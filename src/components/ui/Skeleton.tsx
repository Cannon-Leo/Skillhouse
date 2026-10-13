"use client";

import React from "react";
import styles from "./Skeleton.module.css";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  variant?: "rectangular" | "circular" | "text";
  width?: string | number;
  height?: string | number;
  animation?: "shimmer" | "pulse" | "none";
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = "",
  variant = "rectangular",
  width,
  height,
  animation = "shimmer",
  style,
  ...props
}) => {
  const inlineStyles: React.CSSProperties = {
    ...(width !== undefined ? { width: typeof width === "number" ? `${width}px` : width } : {}),
    ...(height !== undefined ? { height: typeof height === "number" ? `${height}px` : height } : {}),
    ...style,
  };

  const classNames = [
    styles.skeleton,
    styles[variant],
    animation !== "none" ? styles[animation] : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={classNames}
      style={inlineStyles}
      aria-hidden="true"
      data-testid="ui-skeleton"
      {...props}
    />
  );
};
