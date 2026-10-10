"use client";

import React from "react";
import styles from "./Pill.module.css";

export interface PillProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isSelected?: boolean;
  className?: string;
}

export const Pill: React.FC<PillProps> = ({
  children,
  isSelected = false,
  className = "",
  ...props
}) => {
  return (
    <button
      type="button"
      className={`${styles.pill} ${isSelected ? styles.selected : ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
