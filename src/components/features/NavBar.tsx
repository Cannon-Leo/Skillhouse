"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { Button } from "../ui/Button";
import { SearchInput } from "../ui/SearchInput";
import { CategoriesDropdown } from "./CategoriesDropdown";
import { UserMenuPopover } from "./UserMenuPopover";
import styles from "./NavBar.module.css";

export interface NavBarProps {
  currentView?: "marketplace" | "design-system";
  onViewChange?: (view: "marketplace" | "design-system") => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onSelectCategory?: (category: string) => void;
  onRequestSkill?: () => void;
  onGetStarted?: () => void;
  onOpenLoginModal?: () => void;
  isSignedIn?: boolean;
  onSignOut?: () => void;
  user?: {
    name: string;
    email?: string;
    avatarUrl?: string;
  };
  responsiveMode?: "desktop" | "tablet" | "mobile";
  className?: string;
}

export const NavBar: React.FC<NavBarProps> = ({
  currentView = "marketplace",
  onViewChange,
  searchValue = "",
  onSearchChange,
  onSelectCategory,
  onRequestSkill,
  onGetStarted,
  onOpenLoginModal,
  isSignedIn = false,
  onSignOut,
  user = {
    name: "Alex Vance",
    email: "alex@skillhouse.ai",
    avatarUrl: "/figma/header_avatar_figma.png",
  },
  responsiveMode,
  className = "",
}) => {
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const categoriesRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const handleCtaClick = () => {
    if (onOpenLoginModal) {
      onOpenLoginModal();
    } else if (onGetStarted) {
      onGetStarted();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        categoriesRef.current &&
        !categoriesRef.current.contains(event.target as Node)
      ) {
        setCategoriesOpen(false);
      }
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    };
    if (categoriesOpen || userMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [categoriesOpen, userMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setCategoriesOpen(false);
        setUserMenuOpen(false);
      }
    };
    if (categoriesOpen || userMenuOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [categoriesOpen, userMenuOpen]);

  return (
    <header className={`${styles.header} ${responsiveMode === "tablet" ? styles.modeTablet : ""} ${responsiveMode === "mobile" ? styles.modeMobile : ""} ${className}`}>
      <div className={styles.container}>
        {/* Brand Logo (Node 744:1064) */}
        <div
          className={styles.brand}
          onClick={() => {
            onViewChange?.("marketplace");
            setMobileMenuOpen(false);
          }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onViewChange?.("marketplace");
              setMobileMenuOpen(false);
            }
          }}
          aria-label="Skillhouse Home"
        >
          <div className={styles.brandBadge}>
            <Image
              src="/figma/Logo black.svg"
              alt="Skillhouse Logo"
              width={38}
              height={40}
              unoptimized
            />
          </div>
        </div>

        {/* Desktop Navigation Links (Node 744:1077) */}
        <nav className={styles.navLinks} aria-label="Main Navigation">
          <button
            type="button"
            className={`${styles.navItem} ${currentView === "marketplace" ? styles.active : ""}`}
            onClick={() => onViewChange?.("marketplace")}
          >
            Skills
          </button>

          {/* Categories with Mega Menu Dropdown */}
          <div ref={categoriesRef} className={styles.categoriesContainer}>
            <button
              type="button"
              className={`${styles.navItem} ${categoriesOpen ? styles.active : ""}`}
              onClick={() => setCategoriesOpen(!categoriesOpen)}
              aria-expanded={categoriesOpen}
              aria-haspopup="true"
            >
              <span>Categories</span>
              <span
                className={`${styles.dropdownArrow} ${categoriesOpen ? styles.open : ""}`}
                aria-hidden="true"
              >
                {categoriesOpen ? (
                  <Image
                    src="/figma/node_arrow_up.svg"
                    alt=""
                    width={16}
                    height={16}
                    unoptimized
                  />
                ) : (
                  <ChevronDown size={14} />
                )}
              </span>
            </button>

            {categoriesOpen && (
              <>
                {/* Backdrop Overlay per Figma Node 750:4067 */}
                <div
                  className={styles.dropdownBackdrop}
                  onClick={() => setCategoriesOpen(false)}
                  aria-hidden="true"
                  data-testid="categories-backdrop"
                />
                <div className={styles.dropdownPositioner}>
                  <CategoriesDropdown
                    onSelectCategory={(category: string) => {
                      setCategoriesOpen(false);
                      onSelectCategory?.(category);
                    }}
                    onSeeAllSkills={() => {
                      setCategoriesOpen(false);
                      onViewChange?.("marketplace");
                    }}
                  />
                </div>
              </>
            )}
          </div>

          <button
            type="button"
            className={styles.navItem}
            onClick={() => (onRequestSkill ? onRequestSkill() : alert("Request a skill"))}
          >
            Request a skill
          </button>

          <button
            type="button"
            className={styles.navItem}
            onClick={() => alert("Submit a skill modal")}
          >
            Submit a skill
          </button>

          <button
            type="button"
            className={styles.navItem}
            onClick={() => alert("Pricing plans modal")}
          >
            Pricing
          </button>
        </nav>

        {/* Right Actions Container */}
        <div className={styles.rightActions}>
          <div className={styles.searchWrapper}>
            <SearchInput
              value={searchValue}
              onChange={(e) => onSearchChange?.(e.target.value)}
              onClear={() => onSearchChange?.("")}
              placeholder="Search skills / outputs"
            />
          </div>

          {onViewChange && (
            <button
              type="button"
              className={`${styles.docBadge} ${currentView === "design-system" ? styles.active : ""}`}
              onClick={() =>
                onViewChange(
                  currentView === "marketplace" ? "design-system" : "marketplace"
                )
              }
              title="Toggle between Marketplace view and Design System Documentation"
            >
              {currentView === "marketplace" ? "Design System" : "← Marketplace"}
            </button>
          )}

          {/* Signed In vs Logged Out Default CTA */}
          {isSignedIn ? (
            <div ref={userMenuRef} className={styles.userMenuContainer}>
              {/* Orange Action Box (Figma Node 4621:371855) */}
              <button
                type="button"
                className={styles.headerSquareActionButton}
                aria-label="Create skill or workflow"
                title="Create skill or workflow"
                onClick={() => (onRequestSkill ? onRequestSkill() : alert("Create or publish skill"))}
              >
                <Image
                  src="/figma/node_4621_371856.svg"
                  alt=""
                  width={40}
                  height={40}
                  unoptimized
                />
              </button>

              {/* User Avatar with Online Dot + Chevron (Figma Node 4621:371883) */}
              <button
                type="button"
                className={styles.avatarButton}
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                aria-expanded={userMenuOpen}
                aria-haspopup="true"
                aria-label="User profile menu"
                data-testid="header-avatar-button"
              >
                <div className={styles.avatarContainer}>
                  <div className={styles.avatarWrapper}>
                    <Image
                      src={user.avatarUrl || "/figma/header_avatar_figma.png"}
                      alt={user.name}
                      width={40}
                      height={40}
                      className={styles.avatarImage}
                      unoptimized
                    />
                  </div>
                  <span className={styles.onlineIndicator} aria-hidden="true" />
                </div>
                <Image
                  src="/figma/node_4621_371885.svg"
                  alt=""
                  width={18}
                  height={18}
                  className={`${styles.avatarChevron} ${userMenuOpen ? styles.avatarChevronOpen : ""}`}
                  unoptimized
                />
              </button>

              {userMenuOpen && (
                <UserMenuPopover
                  variant="attending"
                  onBookmarks={() => setUserMenuOpen(false)}
                  onDirectoryHistory={() => setUserMenuOpen(false)}
                  onProfile={() => setUserMenuOpen(false)}
                  onAccountSettings={() => setUserMenuOpen(false)}
                  onHelpCenter={() => setUserMenuOpen(false)}
                  onClose={() => setUserMenuOpen(false)}
                  onLogout={() => {
                    setUserMenuOpen(false);
                    onSignOut?.();
                  }}
                />
              )}
            </div>
          ) : (
            <div className={styles.desktopCtaWrapper}>
              <button
                type="button"
                className={styles.getStartedButton}
                onClick={handleCtaClick}
                data-testid="header-get-started-btn"
              >
                Get started
              </button>
            </div>
          )}

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            className={styles.mobileMenuButton}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className={styles.mobileDrawer}
          role="dialog"
          aria-label="Mobile Navigation"
        >
          <div className={styles.mobileDrawerLinks}>
            <button
              type="button"
              className={styles.mobileDrawerLink}
              onClick={() => {
                onViewChange?.("marketplace");
                setMobileMenuOpen(false);
              }}
            >
              <span>Skills Marketplace</span>
              <ChevronRight size={16} />
            </button>
            <button
              type="button"
              className={styles.mobileDrawerLink}
              onClick={() => {
                onViewChange?.("design-system");
                setMobileMenuOpen(false);
              }}
            >
              <span>Design System</span>
              <ChevronRight size={16} />
            </button>
            <button
              type="button"
              className={styles.mobileDrawerLink}
              onClick={() => {
                onRequestSkill?.();
                setMobileMenuOpen(false);
              }}
            >
              <span>Request a skill</span>
              <ChevronRight size={16} />
            </button>
            <button
              type="button"
              className={styles.mobileDrawerLink}
              onClick={() => {
                alert("Submit a skill modal");
                setMobileMenuOpen(false);
              }}
            >
              <span>Submit a skill</span>
              <ChevronRight size={16} />
            </button>
            <button
              type="button"
              className={styles.mobileDrawerLink}
              onClick={() => {
                alert("Pricing plans modal");
                setMobileMenuOpen(false);
              }}
            >
              <span>Pricing</span>
              <ChevronRight size={16} />
            </button>
          </div>

          <div className={styles.mobileDrawerActions}>
            {isSignedIn ? (
              <div className={styles.mobileSignedInBox}>
                <div className={styles.mobileUserRow}>
                  <Image
                    src={user.avatarUrl || "/figma/header_avatar_figma.png"}
                    alt={user.name}
                    width={36}
                    height={36}
                    className={styles.avatarImage}
                    unoptimized
                  />
                  <div>
                    <div className={styles.mobileUserName}>{user.name}</div>
                    <div className={styles.mobileUserEmail}>{user.email}</div>
                  </div>
                </div>
                <button
                  type="button"
                  className={styles.mobileSignOutBtn}
                  onClick={() => {
                    onSignOut?.();
                    setMobileMenuOpen(false);
                  }}
                >
                  <LogOut size={16} />
                  <span>Sign out</span>
                </button>
              </div>
            ) : (
              <Button
                variant="brand"
                size="lg"
                onClick={() => {
                  handleCtaClick();
                  setMobileMenuOpen(false);
                }}
                style={{ width: "100%" }}
              >
                Get started
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
