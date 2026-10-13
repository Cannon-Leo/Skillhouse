"use client";

import React, { createContext, useContext } from "react";

export type SelectSize = "sm" | "md" | "lg";
export type SelectPlacement = "bottom" | "top";

export interface SelectOptionItem {
  value: string;
  label: string;
  disabled?: boolean;
  description?: string;
  group?: string;
  icon?: React.ReactNode;
}

export interface SelectContextValue {
  // Value & state
  value: string;
  onValueChange: (value: string) => void;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;

  // Highlight & keyboard navigation
  highlightedIndex: number;
  setHighlightedIndex: React.Dispatch<React.SetStateAction<number>>;

  // Search & filtering
  searchable: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Options registry
  options: SelectOptionItem[];
  registerOption: (option: SelectOptionItem) => void;
  unregisterOption: (value: string) => void;

  // Configuration
  size: SelectSize;
  disabled: boolean;
  error: boolean;
  required: boolean;
  id: string;
  name?: string;
  placeholder: string;
  isClearable: boolean;
  onClear: () => void;
  isLoading: boolean;

  // Placement & viewport
  placement: SelectPlacement;
  setPlacement: React.Dispatch<React.SetStateAction<SelectPlacement>>;
  isMobile: boolean;

  // Actions
  focusTrigger: () => void;
}

export const SelectContext = createContext<SelectContextValue | null>(null);

export function useSelectContext(): SelectContextValue {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error("useSelectContext must be used within a <Select> component");
  }
  return context;
}
