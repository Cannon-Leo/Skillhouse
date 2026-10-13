"use client";

import React, { useState, useRef, useEffect, useId } from "react";
import { ChevronDown, Check } from "lucide-react";
import styles from "./CustomSelect.module.css";

export interface CustomSelectProps {
  id: string;
  name?: string;
  value: string;
  options: readonly string[] | string[];
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: boolean;
  ariaLabel?: string;
  className?: string;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  id,
  name,
  value,
  options,
  onChange,
  placeholder = "Select an option",
  required = false,
  disabled = false,
  error = false,
  ariaLabel,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();

  const openMenu = () => {
    if (disabled) return;
    const selectedIndex = options.indexOf(value);
    setHighlightedIndex(selectedIndex >= 0 ? selectedIndex : 0);
    setIsOpen(true);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  const toggleMenu = () => {
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSelectOption = (option: string) => {
    onChange(option);
    closeMenu();
    triggerRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!isOpen) {
          openMenu();
        } else {
          setHighlightedIndex((prev) =>
            prev < options.length - 1 ? prev + 1 : 0
          );
        }
        break;

      case "ArrowUp":
        e.preventDefault();
        if (!isOpen) {
          openMenu();
        } else {
          setHighlightedIndex((prev) =>
            prev > 0 ? prev - 1 : options.length - 1
          );
        }
        break;

      case "Home":
        if (isOpen) {
          e.preventDefault();
          setHighlightedIndex(0);
        }
        break;

      case "End":
        if (isOpen) {
          e.preventDefault();
          setHighlightedIndex(options.length - 1);
        }
        break;

      case "Enter":
      case " ":
        e.preventDefault();
        if (isOpen && highlightedIndex >= 0 && highlightedIndex < options.length) {
          handleSelectOption(options[highlightedIndex]);
        } else {
          toggleMenu();
        }
        break;

      case "Escape":
        if (isOpen) {
          e.preventDefault();
          closeMenu();
        }
        break;

      case "Tab":
        if (isOpen) {
          closeMenu();
        }
        break;

      default:
        break;
    }
  };

  const selectedDisplay = value || placeholder;

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${className}`}
      data-testid={`custom-select-container-${id}`}
    >
      {/* Hidden native select for accessibility, screen readers & form test compatibility */}
      <select
        id={id}
        name={name || id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        disabled={disabled}
        aria-hidden="true"
        tabIndex={-1}
        className={styles.visuallyHiddenSelect}
        data-testid={`hidden-select-${id}`}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>

      {/* Custom styled trigger button */}
      <button
        ref={triggerRef}
        type="button"
        id={`${id}-custom-trigger`}
        className={`${styles.trigger} ${isOpen ? styles.triggerOpen : ""} ${
          error ? styles.triggerError : ""
        }`}
        onClick={toggleMenu}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-label={ariaLabel}
        disabled={disabled}
        data-testid={`custom-select-trigger-${id}`}
      >
        <span
          className={`${styles.valueText} ${
            !value ? styles.placeholderText : ""
          }`}
        >
          {selectedDisplay}
        </span>
        <ChevronDown
          size={16}
          className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}
          aria-hidden="true"
        />
      </button>

      {/* Floating custom dropdown menu matching Figma Node 751:7385 specs */}
      {isOpen && (
        <div
          ref={menuRef}
          id={listboxId}
          role="listbox"
          aria-label={ariaLabel || id}
          className={styles.menu}
          data-testid={`custom-select-menu-${id}`}
        >
          {options.map((option, index) => {
            const isSelected = option === value;
            const isHighlighted = index === highlightedIndex;

            return (
              <button
                key={option}
                type="button"
                role="option"
                aria-selected={isSelected}
                className={`${styles.option} ${
                  isSelected ? styles.optionSelected : ""
                } ${isHighlighted ? styles.optionFocused : ""}`}
                onClick={() => handleSelectOption(option)}
                onMouseEnter={() => setHighlightedIndex(index)}
                data-testid={`custom-select-option-${id}-${index}`}
              >
                <span className={styles.optionLabel}>{option}</span>
                {isSelected && (
                  <Check size={14} className={styles.checkIcon} aria-hidden="true" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
