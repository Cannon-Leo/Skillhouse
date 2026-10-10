"use client";

import React from "react";
import Image from "next/image";
import styles from "./UserMenuPopover.module.css";

export interface UserMenuPopoverProps {
  onDirectoryHistory?: () => void;
  onProfile?: () => void;
  onAccountSettings?: () => void;
  onHelpCenter?: () => void;
  onSwitchHost?: () => void;
  onSwitchServiceProvider?: () => void;
  onMyListings?: () => void;
  onLogout?: () => void;
  className?: string;
}

export const UserMenuPopover: React.FC<UserMenuPopoverProps> = ({
  onDirectoryHistory,
  onProfile,
  onAccountSettings,
  onHelpCenter,
  onSwitchHost,
  onSwitchServiceProvider,
  onMyListings,
  onLogout,
  className = "",
}) => {
  return (
    <div
      className={`${styles.popoverContainer} ${className}`}
      role="menu"
      aria-label="User Account Menu"
    >
      <div className={styles.menuBody}>
        {/* Section 1: Directory history & Profile */}
        <div className={styles.menuGroup}>
          <button
            type="button"
            className={styles.menuItem}
            role="menuitem"
            onClick={onDirectoryHistory}
          >
            <Image
              src="/figma/node_753_11908.svg"
              alt=""
              width={18}
              height={18}
              className={styles.itemIcon}
            />
            <span className={styles.itemLabel}>Directory history</span>
          </button>

          <button
            type="button"
            className={styles.menuItem}
            role="menuitem"
            onClick={onProfile}
          >
            <Image
              src="/figma/node_753_11920.svg"
              alt=""
              width={18}
              height={18}
              className={styles.itemIcon}
            />
            <span className={styles.itemLabel}>Profile</span>
          </button>
        </div>

        <div className={styles.divider} aria-hidden="true" />

        {/* Section 2: Account settings & Help center */}
        <div className={styles.menuGroup}>
          <button
            type="button"
            className={styles.menuItem}
            role="menuitem"
            onClick={onAccountSettings}
          >
            <Image
              src="/figma/node_753_11928.svg"
              alt=""
              width={18}
              height={18}
              className={styles.itemIcon}
            />
            <span className={styles.itemLabel}>Account settings</span>
          </button>

          <button
            type="button"
            className={styles.menuItem}
            role="menuitem"
            onClick={onHelpCenter}
          >
            <Image
              src="/figma/node_753_11944.svg"
              alt=""
              width={18}
              height={18}
              className={styles.itemIcon}
            />
            <span className={styles.itemLabel}>Help center</span>
          </button>
        </div>

        <div className={styles.divider} aria-hidden="true" />

        {/* Section 3: Switch to */}
        <div className={styles.switchGroup}>
          <span className={styles.switchHeader}>Switch to</span>

          <button
            type="button"
            className={styles.menuItemSubtle}
            role="menuitem"
            onClick={onSwitchHost}
          >
            <span className={styles.itemLabel}>Host</span>
          </button>

          <button
            type="button"
            className={styles.menuItemSubtle}
            role="menuitem"
            onClick={onSwitchServiceProvider}
          >
            <span className={styles.itemLabel}>Service Provider</span>
          </button>

          <button
            type="button"
            className={styles.menuItemSubtle}
            role="menuitem"
            onClick={onMyListings}
          >
            <span className={styles.itemLabel}>My Listings &amp; Services</span>
          </button>
        </div>

        <div className={styles.divider} aria-hidden="true" />

        {/* Section 4: Logout */}
        <div className={styles.menuGroup}>
          <button
            type="button"
            className={`${styles.menuItem} ${styles.logoutItem}`}
            role="menuitem"
            onClick={onLogout}
          >
            <Image
              src="/figma/node_753_11990.svg"
              alt=""
              width={18}
              height={18}
              className={styles.itemIcon}
            />
            <span className={styles.itemLabel}>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};
