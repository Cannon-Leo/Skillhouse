"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  ChevronDown,
  ChevronRight,
  Monitor,
  Import,
  ShieldCheck,
  FolderOpen,
  Archive,
  Presentation,
  Info,
  Video,
  Menu,
  X,
  Layout,
  FileText,
  LogOut,
  User,
  Settings,
} from "lucide-react";
import { Button } from "../ui/Button";
import { SearchInput } from "../ui/SearchInput";
import styles from "./NavBar.module.css";

export interface NavBarProps {
  currentView?: "marketplace" | "design-system";
  onViewChange?: (view: "marketplace" | "design-system") => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onGetStarted?: () => void;
  onOpenLoginModal?: () => void;
  isSignedIn?: boolean;
  onSignOut?: () => void;
  user?: {
    name: string;
    email?: string;
    avatarUrl?: string;
  };
  className?: string;
}

export const NavBar: React.FC<NavBarProps> = ({
  currentView = "marketplace",
  onViewChange,
  searchValue = "",
  onSearchChange,
  onGetStarted,
  onOpenLoginModal,
  isSignedIn = false,
  onSignOut,
  user = {
    name: "Alex Vance",
    email: "alex@skillhouse.ai",
    avatarUrl: "/figma/header_avatar.png",
  },
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
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuColumns = [
    {
      title: "By Output",
      items: [
        { name: "Slides & Pitch decks", icon: <Presentation size={16} /> },
        { name: "Video & Motion", icon: <Video size={16} /> },
        { name: "Web Design & Code", icon: <Monitor size={16} /> },
        { name: "Document & PDF", icon: <FileText size={16} /> },
      ],
    },
    {
      title: "By Capability",
      items: [
        { name: "Brand Identity", icon: <ShieldCheck size={16} /> },
        { name: "System Templates", icon: <Layout size={16} /> },
        { name: "API & Integrations", icon: <Import size={16} /> },
        { name: "Asset Management", icon: <FolderOpen size={16} /> },
      ],
    },
    {
      title: "Resources",
      items: [
        { name: "Skillhouse Archive", icon: <Archive size={16} /> },
        { name: "Documentation & Guides", icon: <Info size={16} /> },
      ],
    },
  ];

  return (
    <header className={`${styles.header} ${className}`}>
      <div className={styles.container}>
        {/* Brand Logo */}
        <div
          className={styles.brand}
          onClick={() => {
            onViewChange?.("marketplace");
            setMobileMenuOpen(false);
          }}
          role="button"
          tabIndex={0}
          aria-label="Skillhouse Home"
        >
          <div className={styles.brandBadge}>
            <span className={styles.brandTitle}>Skill</span>
            <span className={styles.brandSub}>house</span>
          </div>
          <span className={styles.brandDot} />
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

          <div ref={categoriesRef} className={styles.categoriesContainer}>
            <button
              type="button"
              className={styles.navItem}
              onClick={() => setCategoriesOpen(!categoriesOpen)}
              aria-expanded={categoriesOpen}
              aria-haspopup="true"
            >
              <span>Categories</span>
              <span
                className={`${styles.dropdownArrow} ${categoriesOpen ? styles.open : ""}`}
              >
                <ChevronDown size={14} />
              </span>
            </button>

            {categoriesOpen && (
              <div className={styles.megaMenu} role="menu">
                <div className={styles.megaMenuColumns}>
                  {menuColumns.map((col, colIdx) => (
                    <div key={colIdx} className={styles.megaMenuColumn}>
                      <h4 className={styles.columnTitle}>{col.title}</h4>
                      <ul className={styles.columnList}>
                        {col.items.map((item, itemIdx) => (
                          <li key={itemIdx}>
                            <button
                              className={styles.megaMenuItem}
                              onClick={() => setCategoriesOpen(false)}
                              role="menuitem"
                            >
                              <span className={styles.itemIcon}>{item.icon}</span>
                              <span className={styles.itemName}>{item.name}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className={styles.megaMenuFooterMinimal}>
                  <Button
                    variant="ghost"
                    className={styles.browseAllBtn}
                    onClick={() => setCategoriesOpen(false)}
                  >
                    <span>Browse all skills</span>
                    <ChevronRight size={14} />
                  </Button>
                </div>
              </div>
            )}
          </div>

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

        {/* Right Actions */}
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

          {/* Signed In vs Default Variants (Figma 744:1024) */}
          {isSignedIn ? (
            <div ref={userMenuRef} className={styles.userMenuContainer}>
              <button
                type="button"
                className={styles.avatarButton}
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                aria-expanded={userMenuOpen}
                aria-haspopup="true"
                aria-label="User profile menu"
                data-testid="header-avatar-button"
              >
                <div className={styles.avatarWrapper}>
                  <Image
                    src={user.avatarUrl || "/figma/header_avatar.png"}
                    alt={user.name}
                    width={40}
                    height={40}
                    className={styles.avatarImage}
                    unoptimized
                  />
                </div>
                <ChevronDown
                  size={16}
                  className={`${styles.avatarChevron} ${userMenuOpen ? styles.avatarChevronOpen : ""}`}
                />
              </button>

              {userMenuOpen && (
                <div className={styles.userDropdown} role="menu">
                  <div className={styles.userDropdownHeader}>
                    <span className={styles.userDropdownName}>{user.name}</span>
                    {user.email && (
                      <span className={styles.userDropdownEmail}>{user.email}</span>
                    )}
                  </div>
                  <div className={styles.userDropdownDivider} />
                  <button
                    type="button"
                    className={styles.userDropdownItem}
                    role="menuitem"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <User size={15} />
                    <span>My Saved Skills</span>
                  </button>
                  <button
                    type="button"
                    className={styles.userDropdownItem}
                    role="menuitem"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <Settings size={15} />
                    <span>API Keys & Workflows</span>
                  </button>
                  <div className={styles.userDropdownDivider} />
                  <button
                    type="button"
                    className={`${styles.userDropdownItem} ${styles.signOutItem}`}
                    role="menuitem"
                    onClick={() => {
                      setUserMenuOpen(false);
                      onSignOut?.();
                    }}
                  >
                    <LogOut size={15} />
                    <span>Sign out</span>
                  </button>
                </div>
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
                    src={user.avatarUrl || "/figma/header_avatar.png"}
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
