import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MySkillsWorkspace } from "./MySkillsWorkspace";

describe("MySkillsWorkspace Component", () => {
  it("renders empty state when no saved skills exist", () => {
    const handleMarketplace = vi.fn();
    render(
      <MySkillsWorkspace
        savedSkillIds={[]}
        installedSkillIds={[]}
        onToggleBookmark={vi.fn()}
        onToggleInstall={vi.fn()}
        onNavigateHome={vi.fn()}
        onNavigateMarketplace={handleMarketplace}
      />
    );

    expect(screen.getByTestId("workspace-empty-state")).toBeInTheDocument();
    expect(screen.getByText("No saved skills yet")).toBeInTheDocument();

    const exploreBtn = screen.getByRole("button", {
      name: /explore skills marketplace/i,
    });
    fireEvent.click(exploreBtn);
    expect(handleMarketplace).toHaveBeenCalled();
  });

  it("renders skills grid when saved skills are present and toggles tabs", () => {
    const handleSelectSkill = vi.fn();
    const handleToggleBookmark = vi.fn();
    const handleOpenCommandPalette = vi.fn();

    render(
      <MySkillsWorkspace
        savedSkillIds={["visual-canvas-deck"]}
        installedSkillIds={["pixel-promo-video"]}
        onToggleBookmark={handleToggleBookmark}
        onToggleInstall={vi.fn()}
        onNavigateHome={vi.fn()}
        onNavigateMarketplace={vi.fn()}
        onSelectSkillDetail={handleSelectSkill}
        onOpenCommandPalette={handleOpenCommandPalette}
      />
    );

    // Initial saved tab
    expect(screen.getByTestId("workspace-skills-grid")).toBeInTheDocument();
    expect(screen.getByText("Visual Canvas Deck")).toBeInTheDocument();

    // Click quick search button
    const searchBtn = screen.getByRole("button", { name: /search all skills with command palette/i });
    fireEvent.click(searchBtn);
    expect(handleOpenCommandPalette).toHaveBeenCalled();

    // Click skill card
    const skillCard = screen.getByText("Visual Canvas Deck");
    fireEvent.click(skillCard);
    expect(handleSelectSkill).toHaveBeenCalledWith("visual-canvas-deck");

    // Switch to installed tab
    const installedTab = screen.getByTestId("tab-installed-skills");
    fireEvent.click(installedTab);
    expect(screen.getByText("Pixel Promo Video")).toBeInTheDocument();
  });
});
