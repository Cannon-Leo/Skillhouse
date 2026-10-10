"use client";

import React, { forwardRef } from "react";
import styles from "./Button.module.css";

export type ButtonVariant =
  | "primary"
  | "brand"
  | "outline"
  | "outline-brand"
  | "ghost"
  | "icon-border";

export type ButtonSize = "sm" | "md" | "lg" | "icon-sm" | "icon-md";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled = false,
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    const classNames = [
      styles.button,
      styles[`variant-${variant}`],
      styles[`size-${size}`],
      fullWidth ? styles.fullWidth : "",
      isLoading ? styles.loading : "",
      disabled ? styles.disabled : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        ref={ref}
        type={props.type || "button"}
        className={classNames}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <span className={styles.spinner} aria-hidden="true" />
            <span>Loading...</span>
          </>
        ) : (
          <>
            {leftIcon && <span className={styles.iconWrapper}>{leftIcon}</span>}
            {children}
            {rightIcon && <span className={styles.iconWrapper}>{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
