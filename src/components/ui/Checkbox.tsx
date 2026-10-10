"use client";

import React, { forwardRef } from "react";
import styles from "./Checkbox.module.css";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  size?: "sm" | "md";
  label?: string;
  count?: number | string;
  icon?: React.ReactNode;
  className?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      checked = false,
      onChange,
      disabled = false,
      size = "md",
      label,
      count,
      icon,
      className = "",
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? `cb-${label.toLowerCase().replace(/\s+/g, "-")}` : undefined);

    return (
      <label
        htmlFor={inputId}
        className={`${styles.wrapper} ${disabled ? styles.disabled : ""} ${className}`}
      >
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          checked={checked}
          onChange={(e) => {
            if (disabled) return;
            onChange?.(e);
          }}
          disabled={disabled}
          readOnly={props.readOnly ?? (onChange ? undefined : true)}
          className={styles.nativeInput}
          {...props}
        />
        <div
          className={`${styles.box} ${size === "sm" ? styles.sizeSm : styles.sizeMd} ${
            checked ? styles.checked : ""
          }`}
          aria-hidden="true"
        >
          {checked && (
            <svg
              className={styles.checkIcon}
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M16.2955 9.60543L11.7275 15.6054C11.5395 15.8524 11.2485 15.9984 10.9385 16.0004H10.9315C10.6245 16.0004 10.3345 15.8584 10.1445 15.6164L7.71248 12.5094C7.37248 12.0754 7.44848 11.4464 7.88348 11.1064C8.31848 10.7654 8.94648 10.8414 9.28748 11.2774L10.9205 13.3634L14.7045 8.39443C15.0385 7.95543 15.6665 7.86943 16.1065 8.20443C16.5455 8.53943 16.6305 9.16643 16.2955 9.60543Z"
                fill="white"
              />
            </svg>
          )}
        </div>
        {icon && <span className={styles.iconWrapper}>{icon}</span>}
        {label && <span className={styles.label}>{label}</span>}
        {count !== undefined && <span className={styles.count}>{count}</span>}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";
