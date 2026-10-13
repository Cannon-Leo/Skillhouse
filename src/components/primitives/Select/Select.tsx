"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useId,
  useCallback,
  useMemo,
} from "react";
import { ChevronDown, Check, X, Search } from "lucide-react";
import {
  SelectContext,
  useSelectContext,
  type SelectSize,
  type SelectPlacement,
  type SelectOptionItem,
} from "./SelectContext";
import styles from "./Select.module.css";

/* ==========================================================================
   Root Select Component
   ========================================================================== */
export interface SelectProps {
  id?: string;
  name?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onChange?: (value: string) => void;
  placeholder?: string;
  size?: SelectSize;
  disabled?: boolean;
  error?: boolean;
  required?: boolean;
  isClearable?: boolean;
  isLoading?: boolean;
  searchable?: boolean;
  className?: string;
  children?: React.ReactNode;
  /** Convenience prop: array of options for simple declarative usage */
  options?: readonly (string | SelectOptionItem)[] | (string | SelectOptionItem)[];
  ariaLabel?: string;
}

export const Select: React.FC<SelectProps> = ({
  id: explicitId,
  name,
  value: controlledValue,
  defaultValue = "",
  onValueChange,
  onChange,
  placeholder = "Select an option",
  size = "md",
  disabled = false,
  error = false,
  required = false,
  isClearable = false,
  isLoading = false,
  searchable = false,
  className = "",
  children,
  options: declarativeOptions,
  ariaLabel,
}) => {
  const generatedId = useId();
  const id = explicitId || generatedId;

  // Controlled vs Uncontrolled state
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState<string>(defaultValue);
  const activeValue = isControlled ? controlledValue : internalValue;

  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [searchQuery, setSearchQuery] = useState("");
  const [placement, setPlacement] = useState<SelectPlacement>("bottom");
  const [isMobile, setIsMobile] = useState(false);

  // Dynamic Options Registry (for compound children)
  const [registeredOptions, setRegisteredOptions] = useState<SelectOptionItem[]>([]);

  // Timer for fast typeahead typing
  const typeaheadTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const typeaheadBufferRef = useRef<string>("");

  const focusTrigger = useCallback(() => {
    if (typeof document !== "undefined") {
      const trigger = document.getElementById(`${id}-custom-trigger`);
      trigger?.focus();
    }
  }, [id]);

  // Normalize declarative options if provided
  const parsedDeclarativeOptions = useMemo<SelectOptionItem[]>(() => {
    if (!declarativeOptions) return [];
    return declarativeOptions.map((opt) => {
      if (typeof opt === "string") {
        return { value: opt, label: opt };
      }
      return opt;
    });
  }, [declarativeOptions]);

  // Combined options: declarative + registered
  const allOptions = useMemo<SelectOptionItem[]>(() => {
    if (parsedDeclarativeOptions.length > 0) {
      return parsedDeclarativeOptions;
    }
    return registeredOptions;
  }, [parsedDeclarativeOptions, registeredOptions]);

  // Filtered options based on search query
  const filteredOptions = useMemo<SelectOptionItem[]>(() => {
    if (!searchQuery.trim()) return allOptions;
    const query = searchQuery.toLowerCase().trim();
    return allOptions.filter(
      (opt) =>
        opt.label.toLowerCase().includes(query) ||
        (opt.description && opt.description.toLowerCase().includes(query))
    );
  }, [allOptions, searchQuery]);

  const handleValueChange = useCallback(
    (newValue: string) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
      onChange?.(newValue);
    },
    [isControlled, onValueChange, onChange]
  );

  const handleClear = useCallback(() => {
    handleValueChange("");
    setSearchQuery("");
    focusTrigger();
  }, [handleValueChange, focusTrigger]);

  const openMenu = useCallback(() => {
    if (disabled) return;
    const currentIdx = filteredOptions.findIndex(
      (opt) => opt.value === activeValue && !opt.disabled
    );
    setHighlightedIndex(currentIdx >= 0 ? currentIdx : 0);
    setSearchQuery("");
    setIsOpen(true);
  }, [disabled, filteredOptions, activeValue]);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    setHighlightedIndex(-1);
    setSearchQuery("");
  }, []);

  const toggleMenu = useCallback(() => {
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }, [isOpen, closeMenu, openMenu]);

  // Responsive mobile viewport check (<= 640px)
  useEffect(() => {
    const checkMobile = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth <= 640);
      }
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Viewport Collision Detection (Flip between bottom and top)
  useEffect(() => {
    if (!isOpen || isMobile) return;

    const checkCollision = () => {
      const trigger = document.getElementById(`${id}-custom-trigger`);
      if (!trigger) return;
      const rect = trigger.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      const estimatedContentHeight = 260;

      if (spaceBelow < estimatedContentHeight && spaceAbove > spaceBelow) {
        setPlacement("top");
      } else {
        setPlacement("bottom");
      }
    };

    checkCollision();
    window.addEventListener("scroll", checkCollision, true);
    window.addEventListener("resize", checkCollision);
    return () => {
      window.removeEventListener("scroll", checkCollision, true);
      window.removeEventListener("resize", checkCollision);
    };
  }, [isOpen, isMobile, id]);

  // Outside click dismissal
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as Node;
      const container = document.getElementById(`${id}-select-container`);
      const mobileSheet = document.getElementById(`${id}-mobile-sheet`);

      if (
        container &&
        !container.contains(target) &&
        (!mobileSheet || !mobileSheet.contains(target))
      ) {
        closeMenu();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, closeMenu, id]);

  // Form Reset integration
  useEffect(() => {
    const triggerEl = document.getElementById(`${id}-custom-trigger`);
    if (!triggerEl) return;
    const form = triggerEl.closest("form");
    if (!form) return;

    const handleFormReset = () => {
      if (!isControlled) {
        setInternalValue(defaultValue);
      }
      onValueChange?.(defaultValue);
      onChange?.(defaultValue);
    };

    form.addEventListener("reset", handleFormReset);
    return () => {
      form.removeEventListener("reset", handleFormReset);
    };
  }, [isControlled, defaultValue, onValueChange, onChange, id]);

  // Options registration helpers
  const registerOption = useCallback((option: SelectOptionItem) => {
    setRegisteredOptions((prev) => {
      const idx = prev.findIndex((o) => o.value === option.value);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = option;
        return copy;
      }
      return [...prev, option];
    });
  }, []);

  const unregisterOption = useCallback((optValue: string) => {
    setRegisteredOptions((prev) => prev.filter((o) => o.value !== optValue));
  }, []);

  // Keyboard navigation & Typeahead handler
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;

    const enabledIndices = filteredOptions
      .map((opt, idx) => (!opt.disabled ? idx : -1))
      .filter((idx) => idx !== -1);

    switch (e.key) {
      case "ArrowDown": {
        e.preventDefault();
        if (!isOpen) {
          openMenu();
        } else if (enabledIndices.length > 0) {
          const currentPos = enabledIndices.indexOf(highlightedIndex);
          const nextPos =
            currentPos < enabledIndices.length - 1 ? currentPos + 1 : 0;
          setHighlightedIndex(enabledIndices[nextPos]);
        }
        break;
      }

      case "ArrowUp": {
        e.preventDefault();
        if (!isOpen) {
          openMenu();
        } else if (enabledIndices.length > 0) {
          const currentPos = enabledIndices.indexOf(highlightedIndex);
          const prevPos =
            currentPos > 0 ? currentPos - 1 : enabledIndices.length - 1;
          setHighlightedIndex(enabledIndices[prevPos]);
        }
        break;
      }

      case "Home": {
        if (isOpen && enabledIndices.length > 0) {
          e.preventDefault();
          setHighlightedIndex(enabledIndices[0]);
        }
        break;
      }

      case "End": {
        if (isOpen && enabledIndices.length > 0) {
          e.preventDefault();
          setHighlightedIndex(enabledIndices[enabledIndices.length - 1]);
        }
        break;
      }

      case "Enter":
      case " ": {
        e.preventDefault();
        if (
          isOpen &&
          highlightedIndex >= 0 &&
          highlightedIndex < filteredOptions.length
        ) {
          const selectedOption = filteredOptions[highlightedIndex];
          if (!selectedOption.disabled) {
            handleValueChange(selectedOption.value);
            closeMenu();
            focusTrigger();
          }
        } else {
          toggleMenu();
        }
        break;
      }

      case "Escape": {
        if (isOpen) {
          e.preventDefault();
          closeMenu();
          focusTrigger();
        }
        break;
      }

      case "Tab": {
        if (isOpen) {
          closeMenu();
        }
        break;
      }

      default: {
        // Fast typeahead search on alphanumeric keys
        if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
          if (typeaheadTimerRef.current) {
            clearTimeout(typeaheadTimerRef.current);
          }
          typeaheadBufferRef.current += e.key.toLowerCase();
          const buffer = typeaheadBufferRef.current;

          const matchIdx = filteredOptions.findIndex(
            (opt) =>
              !opt.disabled && opt.label.toLowerCase().startsWith(buffer)
          );

          if (matchIdx >= 0) {
            setHighlightedIndex(matchIdx);
            if (!isOpen) {
              handleValueChange(filteredOptions[matchIdx].value);
            }
          }

          typeaheadTimerRef.current = setTimeout(() => {
            typeaheadBufferRef.current = "";
          }, 600);
        }
        break;
      }
    }
  };

  const contextValue = useMemo(
    () => ({
      value: activeValue,
      onValueChange: handleValueChange,
      isOpen,
      setIsOpen,
      openMenu,
      closeMenu,
      toggleMenu,
      highlightedIndex,
      setHighlightedIndex,
      searchable,
      searchQuery,
      setSearchQuery,
      options: filteredOptions,
      registerOption,
      unregisterOption,
      size,
      disabled,
      error,
      required,
      id,
      name,
      placeholder,
      isClearable,
      onClear: handleClear,
      isLoading,
      placement,
      setPlacement,
      isMobile,
      focusTrigger,
    }),
    [
      activeValue,
      handleValueChange,
      isOpen,
      openMenu,
      closeMenu,
      toggleMenu,
      highlightedIndex,
      searchable,
      searchQuery,
      filteredOptions,
      registerOption,
      unregisterOption,
      size,
      disabled,
      error,
      required,
      id,
      name,
      placeholder,
      isClearable,
      handleClear,
      isLoading,
      placement,
      isMobile,
      focusTrigger,
    ]
  );

  return (
    <SelectContext.Provider value={contextValue}>
      <div
        id={`${id}-select-container`}
        className={`${styles.container} ${className}`}
        data-testid={`select-container-${id}`}
      >
        {/* Hidden synchronized select for native form submissions, screen readers & unit tests */}
        <select
          id={id}
          name={name || id}
          value={activeValue}
          onChange={(e) => handleValueChange(e.target.value)}
          required={required}
          disabled={disabled}
          aria-hidden="true"
          tabIndex={-1}
          className={styles.visuallyHiddenSelect}
          data-testid={`hidden-select-${id}`}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {allOptions.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Declarative mode vs Compound children mode */}
        {children ? (
          children
        ) : (
          <>
            <SelectTrigger aria-label={ariaLabel} onKeyDown={handleKeyDown}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {allOptions.map((opt) => (
                <SelectItem
                  key={opt.value}
                  value={opt.value}
                  disabled={opt.disabled}
                  description={opt.description}
                  icon={opt.icon}
                >
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </>
        )}
      </div>
    </SelectContext.Provider>
  );
};

/* ==========================================================================
   SelectTrigger
   ========================================================================== */
export interface SelectTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: React.ReactNode;
}

export const SelectTrigger = React.forwardRef<
  HTMLButtonElement,
  SelectTriggerProps
>(({ className = "", children, onClick, onKeyDown, ...props }, ref) => {
  const ctx = useSelectContext();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    if (!e.defaultPrevented) {
      ctx.toggleMenu();
    }
  };

  return (
    <button
      ref={ref}
      type="button"
      id={`${ctx.id}-custom-trigger`}
      role="combobox"
      aria-haspopup="listbox"
      aria-expanded={ctx.isOpen}
      aria-controls={`${ctx.id}-listbox`}
      aria-invalid={ctx.error ? "true" : undefined}
      aria-required={ctx.required ? "true" : undefined}
      disabled={ctx.disabled}
      className={`${styles.trigger} ${styles[ctx.size]} ${
        ctx.isOpen ? styles.triggerOpen : ""
      } ${ctx.error ? styles.triggerError : ""} ${className}`}
      onClick={handleClick}
      onKeyDown={onKeyDown}
      data-testid={`select-trigger-${ctx.id}`}
      {...props}
    >
      <div className={styles.valueWrapper}>{children}</div>

      <div className={styles.controlsWrapper}>
        {ctx.isClearable && ctx.value && !ctx.disabled && (
          <span
            role="button"
            tabIndex={0}
            className={styles.clearButton}
            aria-label="Clear selection"
            onClick={(e) => {
              e.stopPropagation();
              ctx.onClear();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.stopPropagation();
                e.preventDefault();
                ctx.onClear();
              }
            }}
            data-testid={`select-clear-${ctx.id}`}
          >
            <X size={13} aria-hidden="true" />
          </span>
        )}
        <ChevronDown
          size={ctx.size === "sm" ? 14 : ctx.size === "lg" ? 18 : 16}
          className={`${styles.chevron} ${ctx.isOpen ? styles.chevronOpen : ""}`}
          aria-hidden="true"
        />
      </div>
    </button>
  );
});
SelectTrigger.displayName = "SelectTrigger";

/* ==========================================================================
   SelectValue
   ========================================================================== */
export interface SelectValueProps {
  placeholder?: string;
  className?: string;
}

export const SelectValue: React.FC<SelectValueProps> = ({
  placeholder: propPlaceholder,
  className = "",
}) => {
  const ctx = useSelectContext();
  const effectivePlaceholder = propPlaceholder || ctx.placeholder;

  const selectedOption = ctx.options.find((opt) => opt.value === ctx.value);
  const displayLabel = selectedOption
    ? selectedOption.label
    : ctx.value
    ? ctx.value
    : effectivePlaceholder;
  const isPlaceholder = !ctx.value;

  return (
    <span
      className={`${styles.valueText} ${
        isPlaceholder ? styles.placeholderText : ""
      } ${className}`}
      data-testid={`select-value-${ctx.id}`}
    >
      {selectedOption?.icon && (
        <span className={styles.valueIcon} aria-hidden="true">
          {selectedOption.icon}
        </span>
      )}
      {displayLabel}
    </span>
  );
};

/* ==========================================================================
   SelectContent
   ========================================================================== */
export interface SelectContentProps {
  className?: string;
  children?: React.ReactNode;
  title?: string;
}

export const SelectContent: React.FC<SelectContentProps> = ({
  className = "",
  children,
  title,
}) => {
  const ctx = useSelectContext();

  // Auto-focus search input if searchable is true
  useEffect(() => {
    if (ctx.isOpen && ctx.searchable) {
      const searchInput = document.getElementById(`${ctx.id}-search-input`);
      searchInput?.focus();
    }
  }, [ctx.isOpen, ctx.searchable, ctx.id]);

  if (!ctx.isOpen) {
    // Keep children mounted in hidden container so option registration runs
    return (
      <div style={{ display: "none" }} aria-hidden="true">
        {children}
      </div>
    );
  }

  // Search input change handler
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    ctx.setSearchQuery(e.target.value);
  };

  // Mobile Bottom Sheet Presentation
  if (ctx.isMobile) {
    return (
      <>
        <div
          className={styles.mobileBackdrop}
          onClick={ctx.closeMenu}
          aria-hidden="true"
          data-testid="select-mobile-backdrop"
        />
        <div
          id={`${ctx.id}-mobile-sheet`}
          role="dialog"
          aria-modal="true"
          className={`${styles.mobileSheet} ${className}`}
          data-testid={`select-mobile-sheet-${ctx.id}`}
        >
          <div className={styles.mobileSheetHeader}>
            <div className={styles.mobileDragHandle} aria-hidden="true" />
            <div className={styles.mobileTitleRow}>
              <span className={styles.mobileTitle}>
                {title || ctx.placeholder || "Select option"}
              </span>
              <button
                type="button"
                className={styles.mobileCloseBtn}
                onClick={ctx.closeMenu}
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {ctx.searchable && (
            <div className={styles.searchBoxWrapper}>
              <Search size={14} className={styles.searchIcon} aria-hidden="true" />
              <input
                id={`${ctx.id}-search-input`}
                type="text"
                value={ctx.searchQuery}
                onChange={handleSearchChange}
                placeholder="Search..."
                className={styles.searchBox}
                aria-label="Filter options"
              />
            </div>
          )}

          <div
            id={`${ctx.id}-listbox`}
            role="listbox"
            aria-label={ctx.placeholder}
            className={styles.mobileList}
          >
            {ctx.isLoading ? (
              <div className={styles.statusBox}>
                <div className={styles.spinner} aria-hidden="true" />
                <span>Loading options...</span>
              </div>
            ) : ctx.options.length === 0 ? (
              <div className={styles.statusBox}>No matching options</div>
            ) : (
              children
            )}
          </div>
        </div>
      </>
    );
  }

  // Desktop Floating Dropdown
  const placementClass =
    ctx.placement === "top" ? styles.placementTop : styles.placementBottom;

  return (
    <div
      id={`${ctx.id}-listbox`}
      role="listbox"
      aria-label={ctx.placeholder}
      className={`${styles.content} ${placementClass} ${className}`}
      data-testid={`select-content-${ctx.id}`}
    >
      {ctx.searchable && (
        <div className={styles.searchBoxWrapper}>
          <Search size={14} className={styles.searchIcon} aria-hidden="true" />
          <input
            id={`${ctx.id}-search-input`}
            type="text"
            value={ctx.searchQuery}
            onChange={handleSearchChange}
            placeholder="Search options..."
            className={styles.searchBox}
            aria-label="Filter options"
          />
        </div>
      )}

      <div className={styles.list}>
        {ctx.isLoading ? (
          <div className={styles.statusBox}>
            <div className={styles.spinner} aria-hidden="true" />
            <span>Loading options...</span>
          </div>
        ) : ctx.options.length === 0 ? (
          <div className={styles.statusBox}>No matching options</div>
        ) : (
          children
        )}
      </div>
    </div>
  );
};

/* ==========================================================================
   SelectItem
   ========================================================================== */
export interface SelectItemProps {
  value: string;
  disabled?: boolean;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

export const SelectItem: React.FC<SelectItemProps> = ({
  value,
  disabled = false,
  description,
  icon,
  className = "",
  children,
}) => {
  const ctx = useSelectContext();
  const registerOption = ctx.registerOption;
  const unregisterOption = ctx.unregisterOption;
  const label = typeof children === "string" ? children : value;

  // Register option in context
  useEffect(() => {
    registerOption({
      value,
      label,
      disabled,
      description,
      icon,
    });
    return () => {
      unregisterOption(value);
    };
  }, [value, label, disabled, description, icon, registerOption, unregisterOption]);

  // Check if option should be hidden during active search
  if (ctx.searchQuery.trim()) {
    const query = ctx.searchQuery.toLowerCase().trim();
    const matchesLabel = label.toLowerCase().includes(query);
    const matchesDesc = description
      ? description.toLowerCase().includes(query)
      : false;
    if (!matchesLabel && !matchesDesc) {
      return null;
    }
  }

  const isSelected = ctx.value === value;
  const itemIndex = ctx.options.findIndex((opt) => opt.value === value);
  const isHighlighted = itemIndex >= 0 && itemIndex === ctx.highlightedIndex;

  const handleClick = () => {
    if (disabled) return;
    ctx.onValueChange(value);
    ctx.closeMenu();
    ctx.focusTrigger();
  };

  const handleMouseEnter = () => {
    if (disabled) return;
    if (itemIndex >= 0) {
      ctx.setHighlightedIndex(itemIndex);
    }
  };

  return (
    <button
      type="button"
      role="option"
      aria-selected={isSelected}
      aria-disabled={disabled ? "true" : undefined}
      disabled={disabled}
      className={`${styles.item} ${ctx.isMobile ? styles.mobileItem : ""} ${
        isSelected ? styles.itemSelected : ""
      } ${isHighlighted ? styles.itemFocused : ""} ${
        disabled ? styles.itemDisabled : ""
      } ${className}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      data-testid={`select-item-${value}`}
    >
      <div className={styles.itemLeft}>
        {icon && (
          <span className={styles.itemIcon} aria-hidden="true">
            {icon}
          </span>
        )}
        <div className={styles.itemTextGroup}>
          <span className={styles.itemLabel}>{children}</span>
          {description && (
            <span className={styles.itemDescription}>{description}</span>
          )}
        </div>
      </div>

      {isSelected && (
        <Check size={14} className={styles.checkIcon} aria-hidden="true" />
      )}
    </button>
  );
};

/* ==========================================================================
   SelectGroup, SelectLabel, SelectSeparator
   ========================================================================== */
export interface SelectGroupProps {
  children: React.ReactNode;
  className?: string;
}

export const SelectGroup: React.FC<SelectGroupProps> = ({
  children,
  className = "",
}) => {
  return (
    <div role="group" className={`${styles.group} ${className}`}>
      {children}
    </div>
  );
};

export interface SelectLabelProps {
  children: React.ReactNode;
  className?: string;
}

export const SelectLabel: React.FC<SelectLabelProps> = ({
  children,
  className = "",
}) => {
  return <div className={`${styles.groupLabel} ${className}`}>{children}</div>;
};

export const SelectSeparator: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      className={`${styles.separator} ${className}`}
    />
  );
};

/* ==========================================================================
   CustomSelect Backward-Compatible Adapter
   ========================================================================== */
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
  size?: SelectSize;
  isClearable?: boolean;
  searchable?: boolean;
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
  size = "md",
  isClearable = false,
  searchable = false,
}) => {
  return (
    <Select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      error={error}
      ariaLabel={ariaLabel}
      className={className}
      size={size}
      isClearable={isClearable}
      searchable={searchable}
      options={options}
    />
  );
};
