"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
  Search,
  Zap,
  Bookmark,
  Home,
  Palette,
  Bot,
  PlusCircle,
  CornerDownLeft,
  X,
  FileCode,
} from "lucide-react";
import { MARKETPLACE_SKILLS } from "@/components/features/MarketplaceView";
import styles from "./CommandPalette.module.css";

import { type NavView } from "../NavBar";

export interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateView?: (view: NavView) => void;
  onSelectSkill?: (skillId: string) => void;
  onRequestSkill?: (prefillQuery?: string) => void;
  onConnectAgent?: () => void;
  savedSkillIds?: string[];
  installedSkillIds?: string[];
}

interface PaletteCommand {
  id: string;
  type: "nav" | "action" | "skill";
  title: string;
  subtitle?: string;
  category?: string;
  icon?: React.ReactNode;
  badge?: string;
  onSelect: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigateView,
  onSelectSkill,
  onRequestSkill,
  onConnectAgent,
  savedSkillIds = [],
  installedSkillIds = [],
}) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Focus input when opened and reset query
  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => {
        setQuery("");
        setSelectedIndex(0);
        inputRef.current?.focus();
      }, 10);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // Global keyboard shortcut to toggle Command Palette (⌘K / Ctrl+K)
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open triggered by parent state or keyboard event
          // Parent handles opening when listener is passed, but this ensures key trapping
        }
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [isOpen, onClose]);

  // Build commands list based on current query
  const commands: PaletteCommand[] = useMemo(() => {
    const trimmed = query.trim().toLowerCase();

    const staticCommands: PaletteCommand[] = [
      {
        id: "nav-marketplace",
        type: "nav",
        title: "Skills Marketplace",
        subtitle: "Browse all curated agent workflows & models",
        category: "Navigation",
        icon: <Zap size={16} aria-hidden="true" />,
        onSelect: () => {
          onNavigateView?.("marketplace");
          onClose();
        },
      },
      {
        id: "nav-my-skills",
        type: "nav",
        title: "My Skills Workspace",
        subtitle: `${savedSkillIds.length} saved · ${installedSkillIds.length} active agent tools`,
        category: "Navigation",
        icon: <Bookmark size={16} aria-hidden="true" />,
        badge: `${savedSkillIds.length}`,
        onSelect: () => {
          onNavigateView?.("my-skills");
          onClose();
        },
      },
      {
        id: "nav-home",
        type: "nav",
        title: "Discovery Home",
        subtitle: "Featured matrices, works with, and curated stacks",
        category: "Navigation",
        icon: <Home size={16} aria-hidden="true" />,
        onSelect: () => {
          onNavigateView?.("home");
          onClose();
        },
      },
      {
        id: "nav-design-system",
        type: "nav",
        title: "Design System Showcase",
        subtitle: "Live token specs, components, and zero-hallucination rules",
        category: "Navigation",
        icon: <Palette size={16} aria-hidden="true" />,
        onSelect: () => {
          onNavigateView?.("design-system");
          onClose();
        },
      },
      {
        id: "action-connect-agent",
        type: "action",
        title: "Connect AI Agent",
        subtitle: "Setup CLI connection for Claude, Cursor, Codex, or Antigravity",
        category: "Actions",
        icon: <Bot size={16} aria-hidden="true" />,
        onSelect: () => {
          if (onConnectAgent) {
            onConnectAgent();
          } else {
            onNavigateView?.("home");
          }
          onClose();
        },
      },
      {
        id: "action-request-skill",
        type: "action",
        title: "Request a New Skill",
        subtitle: "Submit custom agent capability or integration request",
        category: "Actions",
        icon: <PlusCircle size={16} aria-hidden="true" />,
        onSelect: () => {
          onRequestSkill?.(trimmed || undefined);
          onClose();
        },
      },
    ];

    if (!trimmed) {
      // Return navigation commands + top featured skills
      const featuredSkillCommands: PaletteCommand[] = MARKETPLACE_SKILLS.slice(0, 4).map(
        (skill) => ({
          id: `skill-${skill.id}`,
          type: "skill",
          title: skill.title,
          subtitle: `${skill.category} · ${skill.price || (skill.isFree ? "Free" : "$0")}`,
          category: "Featured Skills",
          badge: skill.isFree ? "Free" : skill.price,
          icon: <FileCode size={16} aria-hidden="true" />,
          onSelect: () => {
            onSelectSkill?.(skill.id);
            onClose();
          },
        })
      );

      return [...staticCommands, ...featuredSkillCommands];
    }

    // Filter static commands
    const matchingStatic = staticCommands.filter(
      (c) =>
        c.title.toLowerCase().includes(trimmed) ||
        (c.subtitle && c.subtitle.toLowerCase().includes(trimmed))
    );

    // Filter skills
    const matchingSkills: PaletteCommand[] = MARKETPLACE_SKILLS.filter(
      (s) =>
        s.title.toLowerCase().includes(trimmed) ||
        s.description.toLowerCase().includes(trimmed) ||
        s.category.toLowerCase().includes(trimmed) ||
        s.output.toLowerCase().includes(trimmed) ||
        s.roles.some((r) => r.toLowerCase().includes(trimmed))
    ).map((s) => ({
      id: `skill-${s.id}`,
      type: "skill",
      title: s.title,
      subtitle: `${s.category} · ${s.description.slice(0, 60)}...`,
      category: "Skills",
      badge: s.isFree ? "Free" : s.price,
      icon: <FileCode size={16} aria-hidden="true" />,
      onSelect: () => {
        onSelectSkill?.(s.id);
        onClose();
      },
    }));

    return [...matchingStatic, ...matchingSkills];
  }, [
    query,
    savedSkillIds,
    installedSkillIds,
    onNavigateView,
    onSelectSkill,
    onRequestSkill,
    onConnectAgent,
    onClose,
  ]);


  // Scroll active item into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.querySelector(
        `[data-command-index="${selectedIndex}"]`
      ) as HTMLElement;
      if (activeEl && typeof activeEl.scrollIntoView === "function") {
        activeEl.scrollIntoView({ block: "nearest" });
      }
    }
  }, [selectedIndex]);

  // Keyboard navigation within palette
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, commands.length));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev === 0 ? Math.max(0, commands.length - 1) : prev - 1
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (commands[selectedIndex]) {
          commands[selectedIndex].onSelect();
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    },
    [commands, selectedIndex, onClose]
  );

  if (!isOpen) return null;

  return (
    <div
      className={styles.backdrop}
      onClick={onClose}
      role="presentation"
      data-testid="command-palette-backdrop"
    >
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-label="Skillhouse Command Palette"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
        data-testid="command-palette-dialog"
      >
        {/* Search Input Bar */}
        <div className={styles.searchBar}>
          <Search size={20} className={styles.searchIcon} aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            className={styles.searchInput}
            placeholder="Search skills, navigate views, or execute actions..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            aria-label="Command search"
            data-testid="command-palette-input"
          />
          {query ? (
            <button
              type="button"
              className={styles.clearBtn}
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              aria-label="Clear query"
            >
              <X size={16} />
            </button>
          ) : (
            <span className={styles.escBadge} onClick={onClose} role="button" tabIndex={0}>
              ESC
            </span>
          )}
        </div>

        {/* Results List */}
        <div
          ref={listRef}
          className={styles.resultsList}
          role="listbox"
          aria-label="Command results"
          data-testid="command-palette-results"
        >
          {commands.length === 0 ? (
            <div className={styles.emptyState} data-testid="command-palette-empty">
              <div className={styles.emptyTitle}>No matching skills or commands</div>
              <p className={styles.emptyDesc}>
                We couldn&apos;t find anything matching &ldquo;{query}&rdquo;. Want to request a skill?
              </p>
              <button
                type="button"
                className={styles.requestSkillPromptBtn}
                onClick={() => {
                  onRequestSkill?.(query);
                  onClose();
                }}
              >
                Request &ldquo;{query}&rdquo; Skill
              </button>
            </div>
          ) : (
            commands.map((cmd, idx) => {
              const isSelected = idx === selectedIndex;
              const isFirstOfCategory =
                idx === 0 || commands[idx - 1].category !== cmd.category;

              return (
                <React.Fragment key={cmd.id}>
                  {isFirstOfCategory && cmd.category && (
                    <div className={styles.categoryHeader} role="presentation">
                      {cmd.category}
                    </div>
                  )}
                  <div
                    role="option"
                    aria-selected={isSelected}
                    data-command-index={idx}
                    className={`${styles.commandItem} ${isSelected ? styles.selected : ""}`}
                    onClick={() => cmd.onSelect()}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    data-testid={`command-item-${cmd.id}`}
                  >
                    <div className={styles.commandIconBox}>{cmd.icon}</div>
                    <div className={styles.commandContent}>
                      <div className={styles.commandTitleRow}>
                        <span className={styles.commandTitle}>{cmd.title}</span>
                        {cmd.badge && (
                          <span className={styles.commandBadge}>{cmd.badge}</span>
                        )}
                      </div>
                      {cmd.subtitle && (
                        <div className={styles.commandSubtitle}>{cmd.subtitle}</div>
                      )}
                    </div>
                    {isSelected && (
                      <span className={styles.enterHint} aria-hidden="true">
                        <CornerDownLeft size={14} />
                      </span>
                    )}
                  </div>
                </React.Fragment>
              );
            })
          )}
        </div>

        {/* Footer Shortcut Hints */}
        <footer className={styles.footer}>
          <div className={styles.hints}>
            <span className={styles.hintItem}>
              <kbd className={styles.kbd}>↑</kbd>
              <kbd className={styles.kbd}>↓</kbd>
              <span>Navigate</span>
            </span>
            <span className={styles.hintItem}>
              <kbd className={styles.kbd}>↵</kbd>
              <span>Select</span>
            </span>
            <span className={styles.hintItem}>
              <kbd className={styles.kbd}>esc</kbd>
              <span>Close</span>
            </span>
          </div>
          <div className={styles.statusIndicator}>
            <span>Skillhouse Web App</span>
          </div>
        </footer>
      </div>
    </div>
  );
};
