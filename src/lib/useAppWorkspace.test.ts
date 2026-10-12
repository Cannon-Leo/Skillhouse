import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { useAppWorkspace } from "./useAppWorkspace";

describe("useAppWorkspace Hook", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("initializes empty and toggles bookmarks with localStorage persistence", () => {
    const { result } = renderHook(() => useAppWorkspace());

    expect(result.current.savedSkillIds).toEqual([]);
    expect(result.current.isBookmarked("visual-canvas-deck")).toBe(false);

    // Toggle bookmark on
    act(() => {
      result.current.toggleBookmark("visual-canvas-deck");
    });

    expect(result.current.savedSkillIds).toContain("visual-canvas-deck");
    expect(result.current.isBookmarked("visual-canvas-deck")).toBe(true);
    expect(
      JSON.parse(window.localStorage.getItem("skillhouse_saved_skills") || "[]")
    ).toContain("visual-canvas-deck");

    // Toggle bookmark off
    act(() => {
      result.current.toggleBookmark("visual-canvas-deck");
    });

    expect(result.current.savedSkillIds).not.toContain("visual-canvas-deck");
    expect(result.current.isBookmarked("visual-canvas-deck")).toBe(false);
  });

  it("toggles skill install state with persistence", () => {
    const { result } = renderHook(() => useAppWorkspace());

    expect(result.current.isInstalled("pixel-promo-video")).toBe(false);

    act(() => {
      result.current.toggleInstall("pixel-promo-video");
    });

    expect(result.current.isInstalled("pixel-promo-video")).toBe(true);
    expect(result.current.installedSkillIds).toContain("pixel-promo-video");
  });
});
