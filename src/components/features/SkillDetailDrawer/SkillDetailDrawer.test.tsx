import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { SkillDetailDrawer } from "./SkillDetailDrawer";
import { MARKETPLACE_SKILLS } from "@/components/features/MarketplaceView";

const mockSkill = MARKETPLACE_SKILLS[0];

describe("SkillDetailDrawer Component", () => {
  it("does not render when isOpen is false", () => {
    render(
      <SkillDetailDrawer
        isOpen={false}
        skill={mockSkill}
        onClose={vi.fn()}
      />
    );
    expect(screen.queryByTestId("skill-detail-drawer")).not.toBeInTheDocument();
  });

  it("renders skill details when open and handles tab switches", () => {
    const handleClose = vi.fn();
    const handleExpand = vi.fn();
    const handleBookmark = vi.fn();
    const handleInstall = vi.fn();

    render(
      <SkillDetailDrawer
        isOpen={true}
        skill={mockSkill}
        onClose={handleClose}
        onExpandFullPage={handleExpand}
        onToggleBookmark={handleBookmark}
        onToggleInstall={handleInstall}
      />
    );

    expect(screen.getByTestId("skill-detail-drawer")).toBeInTheDocument();
    expect(screen.getByText(mockSkill.title)).toBeInTheDocument();

    // Expand to full page
    const expandBtn = screen.getByTestId("drawer-expand-btn");
    fireEvent.click(expandBtn);
    expect(handleExpand).toHaveBeenCalledWith(mockSkill.id);

    // Switch to Overview tab
    const overviewTab = screen.getByTestId("drawer-tab-overview");
    fireEvent.click(overviewTab);
    expect(screen.getByText("Description")).toBeInTheDocument();

    // Switch to Playground tab
    const playgroundTab = screen.getByTestId("drawer-tab-playground");
    fireEvent.click(playgroundTab);
    expect(screen.getByPlaceholderText(/type notes or prompt instructions/i)).toBeInTheDocument();

    // Switch back to Install tab
    const installTab = screen.getByTestId("drawer-tab-install");
    fireEvent.click(installTab);

    // Switch format pill to Cursor
    const cursorPill = screen.getByRole("button", { name: "Cursor" });
    fireEvent.click(cursorPill);
    expect(screen.getByText(/\.cursorrules config for Skillhouse/i)).toBeInTheDocument();

    // Save skill bookmark button
    const bookmarkBtn = screen.getByTestId("drawer-bookmark-btn");
    fireEvent.click(bookmarkBtn);
    expect(handleBookmark).toHaveBeenCalledWith(mockSkill.id);

    // Quick install button
    const installBtn = screen.getByTestId("drawer-quick-install-btn");
    fireEvent.click(installBtn);
    expect(handleInstall).toHaveBeenCalledWith(mockSkill.id);

    // Close button
    const closeBtn = screen.getByTestId("drawer-close-btn");
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalled();
  });
});
