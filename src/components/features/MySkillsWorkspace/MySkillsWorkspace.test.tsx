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
    const handleToggleInstall = vi.fn();
    const handleOpenCommandPalette = vi.fn();
    const handleNavigateHome = vi.fn();
    const handleNavigateDesignSystem = vi.fn();

    render(
      <MySkillsWorkspace
        savedSkillIds={["visual-canvas-deck"]}
        installedSkillIds={["pixel-promo-video"]}
        onToggleBookmark={handleToggleBookmark}
        onToggleInstall={handleToggleInstall}
        onNavigateHome={handleNavigateHome}
        onNavigateMarketplace={vi.fn()}
        onNavigateDesignSystem={handleNavigateDesignSystem}
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

    // Click bookmark button on card in saved tab
    const bookmarkBtns = screen.getAllByRole("button", { name: /remove from saved skills|save skill to bookmarks/i });
    if (bookmarkBtns.length > 0) {
      fireEvent.click(bookmarkBtns[0]);
      expect(handleToggleBookmark).toHaveBeenCalledWith("visual-canvas-deck");
    }

    // Switch to installed tab
    const installedTab = screen.getByTestId("tab-installed-skills");
    fireEvent.click(installedTab);
    expect(screen.getByText("Pixel Promo Video")).toBeInTheDocument();

    // Click bookmark/install button in installed tab
    const installActionBtns = screen.getAllByRole("button", { name: /remove from saved skills|save skill to bookmarks/i });
    if (installActionBtns.length > 0) {
      fireEvent.click(installActionBtns[0]);
      expect(handleToggleInstall).toHaveBeenCalledWith("pixel-promo-video");
    }
  });

  it("renders empty state in installed tab when no tools are installed", () => {
    render(
      <MySkillsWorkspace
        savedSkillIds={["visual-canvas-deck"]}
        installedSkillIds={[]}
        onToggleBookmark={vi.fn()}
        onToggleInstall={vi.fn()}
        onNavigateHome={vi.fn()}
        onNavigateMarketplace={vi.fn()}
      />
    );

    const installedTab = screen.getByTestId("tab-installed-skills");
    fireEvent.click(installedTab);
    expect(screen.getByText("No installed tools configured")).toBeInTheDocument();
  });
  it("renders personalized greeting when user is signed in", () => {
    render(
      <MySkillsWorkspace
        savedSkillIds={[]}
        installedSkillIds={[]}
        isSignedIn={true}
        user={{ name: "Alex Vance", email: "alex@skillhouse.ai" }}
        onToggleBookmark={vi.fn()}
        onToggleInstall={vi.fn()}
        onNavigateHome={vi.fn()}
        onNavigateMarketplace={vi.fn()}
      />
    );
    expect(screen.getByText("Alex Vance’s Workspace")).toBeInTheDocument();
  });
});
