"use client";

import React, { useState, useRef, forwardRef, useImperativeHandle } from "react";
import { Search } from "lucide-react";
import styles from "./SearchInput.module.css";

export interface SearchInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: "cream" | "white";
  shortcut?: string;
  onClear?: () => void;
  className?: string;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      onClear,
      placeholder = "Search skills / outputs",
      variant = "cream",
      shortcut = "⌘K",
      className = "",
      ...props
    },
    ref
  ) => {
    const isControlled = value !== undefined;
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue ?? "");
    const [isFocused, setIsFocused] = useState(false);
    const internalRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => internalRef.current as HTMLInputElement);

    const currentValue = isControlled ? value : uncontrolledValue;
    const hasValue = Boolean(currentValue && String(currentValue).length > 0);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setUncontrolledValue(e.target.value);
      }
      onChange?.(e);
    };

    const handleClear = () => {
      if (!isControlled) {
        setUncontrolledValue("");
      }
      onClear?.();
      if (internalRef.current) {
        internalRef.current.value = "";
        const event = new Event("input", { bubbles: true });
        internalRef.current.dispatchEvent(event);
        internalRef.current.focus();
      }
    };

    return (
      <div className={`${styles.container} ${className}`}>
        <div
          className={`${styles.inputWrapper} ${styles[`variant-${variant}`]} ${
            isFocused ? styles.isFocused : ""
          }`}
          onClick={() => internalRef.current?.focus()}
        >
          <span className={styles.icon} aria-hidden="true">
            <Search size={18} />
          </span>

          <input
            ref={internalRef}
            type="search"
            value={isControlled ? value : uncontrolledValue}
            onChange={handleChange}
            placeholder={placeholder}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            className={styles.input}
            {...props}
          />

          {hasValue ? (
            <button
              type="button"
              className={styles.clearButton}
              onClick={(e) => {
                e.stopPropagation();
                handleClear();
              }}
              aria-label="Clear search"
            >
              ✕
            </button>
          ) : (
            shortcut && <span className={styles.shortcutBadge}>{shortcut}</span>
          )}
        </div>
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";
