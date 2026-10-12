"use client";

import { useState, useCallback } from "react";

const STORAGE_KEY_BOOKMARKS = "skillhouse_saved_skills";
const STORAGE_KEY_INSTALLED = "skillhouse_installed_skills";

export function useAppWorkspace() {
  const [savedSkillIds, setSavedSkillIds] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = window.localStorage.getItem(STORAGE_KEY_BOOKMARKS);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) return parsed;
        }
      } catch {
        // Fallback
      }
    }
    return [];
  });

  const [installedSkillIds, setInstalledSkillIds] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const installed = window.localStorage.getItem(STORAGE_KEY_INSTALLED);
        if (installed) {
          const parsed = JSON.parse(installed);
          if (Array.isArray(parsed)) return parsed;
        }
      } catch {
        // Fallback
      }
    }
    return [];
  });

  const isLoaded = true;

  // Save to localStorage when bookmarks change
  const toggleBookmark = useCallback((skillId: string) => {
    setSavedSkillIds((prev) => {
      const exists = prev.includes(skillId);
      const next = exists ? prev.filter((id) => id !== skillId) : [...prev, skillId];
      try {
        if (typeof window !== "undefined") {
          window.localStorage.setItem(STORAGE_KEY_BOOKMARKS, JSON.stringify(next));
        }
      } catch {
        // Ignore quota/private browsing errors
      }
      return next;
    });
  }, []);

  // Save to localStorage when installed skills change
  const toggleInstall = useCallback((skillId: string) => {
    setInstalledSkillIds((prev) => {
      const exists = prev.includes(skillId);
      const next = exists ? prev.filter((id) => id !== skillId) : [...prev, skillId];
      try {
        if (typeof window !== "undefined") {
          window.localStorage.setItem(STORAGE_KEY_INSTALLED, JSON.stringify(next));
        }
      } catch {
        // Ignore quota/private browsing errors
      }
      return next;
    });
  }, []);

  const isBookmarked = useCallback(
    (skillId: string) => savedSkillIds.includes(skillId),
    [savedSkillIds]
  );

  const isInstalled = useCallback(
    (skillId: string) => installedSkillIds.includes(skillId),
    [installedSkillIds]
  );

  return {
    savedSkillIds,
    installedSkillIds,
    toggleBookmark,
    toggleInstall,
    isBookmarked,
    isInstalled,
    isLoaded,
  };
}
