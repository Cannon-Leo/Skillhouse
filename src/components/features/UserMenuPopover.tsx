"use client";

import React, { useEffect, useRef } from "react";
import {
  User,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { BookmarkIcon } from "../ui/BookmarkIcon";
import styles from "./UserMenuPopover.module.css";

export type UserMenuItemId =
  | "bookmarks"
  | "profile"
  | "settings"
  | "help"
  | "logout"
  | "host"
  | "service-provider"
  | "my-listings";

export interface UserMenuPopoverProps {
  /**
   * Dropdown variant.
   * "attending" matches Figma Node 760:12903 ("drop down menu/attending")
   * "extended" matches Figma Node 753:11852 (includes Switch to section)
   */
  variant?: "attending" | "extended";
  activeItem?: UserMenuItemId | string;
  onBookmarks?: () => void;
  onDirectoryHistory?: () => void; // alias for backwards compatibility
  onProfile?: () => void;
  onAccountSettings?: () => void;
  onHelpCenter?: () => void;
  onSwitchHost?: () => void;
  onSwitchServiceProvider?: () => void;
  onMyListings?: () => void;
  onLogout?: () => void;
  onClose?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const UserMenuPopover: React.FC<UserMenuPopoverProps> = ({
  variant = "attending",
  activeItem,
  onBookmarks,
  onDirectoryHistory,
  onProfile,
  onAccountSettings,
  onHelpCenter,
  onSwitchHost,
  onSwitchServiceProvider,
  onMyListings,
  onLogout,
  onClose,
  className = "",
  style,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLButtonElement | null)[]>([]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        onClose?.();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  // Keyboard navigation across menu items
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const validButtons = itemsRef.current.filter(
      (btn): btn is HTMLButtonElement => btn !== null && !btn.disabled
    );
    if (!validButtons.length) return;

    const currentIndex = validButtons.findIndex(
      (btn) => btn === document.activeElement
    );

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (currentIndex === -1 || currentIndex === validButtons.length - 1) {
          validButtons[0].focus();
        } else {
          validButtons[currentIndex + 1].focus();
        }
        break;

      case "ArrowUp":
        e.preventDefault();
        if (currentIndex <= 0) {
          validButtons[validButtons.length - 1].focus();
        } else {
          validButtons[currentIndex - 1].focus();
        }
        break;

      case "Home":
        e.preventDefault();
        validButtons[0].focus();
        break;

      case "End":
        e.preventDefault();
        validButtons[validButtons.length - 1].focus();
        break;

      case "Escape":
        e.preventDefault();
        onClose?.();
        break;

      default:
        break;
    }
  };

  const handleBookmarksClick = () => {
    if (onBookmarks) {
      onBookmarks();
    } else if (onDirectoryHistory) {
      onDirectoryHistory();
    }
  };

  const registerItem = (el: HTMLButtonElement | null) => {
    if (el) {
      if (!itemsRef.current.includes(el)) {
        itemsRef.current.push(el);
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={`${styles.popoverContainer} ${className}`}
      style={style}
      role="menu"
      aria-label="User Account Menu"
      data-testid="user-menu-popover"
      data-variant={variant}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.menuBody}>
        {/* Section 1: Bookmarks / Directory history & Profile (Figma 760:12907) */}
        <div className={styles.menuGroup} role="group" aria-label="Personal items">
          <button
            ref={registerItem}
            type="button"
            className={`${styles.menuItem} ${
              activeItem === "bookmarks" || activeItem === "directory-history"
                ? styles.activeItem
                : ""
            }`}
            role="menuitem"
            tabIndex={0}
            onClick={handleBookmarksClick}
            data-testid="user-menu-item-bookmarks"
          >
            <BookmarkIcon size={18} className={styles.itemIcon} aria-hidden="true" />
            <span className={styles.itemLabel}>
              {variant === "extended" && onDirectoryHistory && !onBookmarks
                ? "Directory history"
                : "Bookmarks"}
            </span>
          </button>

          <button
            ref={registerItem}
            type="button"
            className={`${styles.menuItem} ${
              activeItem === "profile" ? styles.activeItem : ""
            }`}
            role="menuitem"
            tabIndex={0}
            onClick={onProfile}
            data-testid="user-menu-item-profile"
          >
            <User size={18} className={styles.itemIcon} aria-hidden="true" />
            <span className={styles.itemLabel}>Profile</span>
          </button>
        </div>

        {/* Divider 1 (Figma Node 760:12973) */}
        <hr className={styles.divider} aria-hidden="true" />

        {/* Section 2: Account settings & Help center (Figma 760:12978, 760:12981) */}
        <div className={styles.menuGroup} role="group" aria-label="Preferences and Help">
          <button
            ref={registerItem}
            type="button"
            className={`${styles.menuItem} ${
              activeItem === "settings" ? styles.activeItem : ""
            }`}
            role="menuitem"
            tabIndex={0}
            onClick={onAccountSettings}
            data-testid="user-menu-item-settings"
          >
            <Settings size={18} className={styles.itemIcon} aria-hidden="true" />
            <span className={styles.itemLabel}>Account settings</span>
          </button>

          <button
            ref={registerItem}
            type="button"
            className={`${styles.menuItem} ${
              activeItem === "help" ? styles.activeItem : ""
            }`}
            role="menuitem"
            tabIndex={0}
            onClick={onHelpCenter}
            data-testid="user-menu-item-help"
          >
            <HelpCircle size={18} className={styles.itemIcon} aria-hidden="true" />
            <span className={styles.itemLabel}>Help center</span>
          </button>
        </div>

        {/* Section 3: Switch to (Commented out until creators / host mode are introduced to the platform) */}
        {/*
        {variant === "extended" && (
          <>
            <hr className={styles.divider} aria-hidden="true" />
            <div className={styles.switchGroup} role="group" aria-label="Switch account mode">
              <span className={styles.switchHeader}>Switch to</span>

              <button
                ref={registerItem}
                type="button"
                className={styles.menuItemSubtle}
                role="menuitem"
                tabIndex={0}
                onClick={onSwitchHost}
              >
                <span className={styles.itemLabel}>Host</span>
              </button>

              <button
                ref={registerItem}
                type="button"
                className={styles.menuItemSubtle}
                role="menuitem"
                tabIndex={0}
                onClick={onSwitchServiceProvider}
              >
                <span className={styles.itemLabel}>Service Provider</span>
              </button>

              <button
                ref={registerItem}
                type="button"
                className={styles.menuItemSubtle}
                role="menuitem"
                tabIndex={0}
                onClick={onMyListings}
              >
                <span className={styles.itemLabel}>My Listings &amp; Services</span>
              </button>
            </div>
          </>
        )}
        */}

        {/* Divider 2 (Figma Node 760:13003) */}
        <hr className={styles.divider} aria-hidden="true" />

        {/* Section 4: Logout (Figma Node 760:13028 / 760:13041) */}
        <div className={styles.menuGroup} role="group" aria-label="Session">
          <button
            ref={registerItem}
            type="button"
            className={`${styles.menuItem} ${styles.logoutItem}`}
            role="menuitem"
            tabIndex={0}
            onClick={onLogout}
            data-testid="user-menu-item-logout"
          >
            <LogOut size={18} className={styles.itemIcon} aria-hidden="true" />
            <span className={styles.itemLabel}>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};
