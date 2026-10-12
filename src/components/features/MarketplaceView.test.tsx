import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MarketplaceView } from "./MarketplaceView";

const mockPush = vi.fn();

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("Features MarketplaceView Component (Figma Node 751:4572)", () => {
  it("renders marketplace title, subtitle, count, sort button, and skills grid", () => {
    render(<MarketplaceView />);

    expect(screen.getByRole("heading", { level: 1, name: /agent skills marketplace/i })).toBeInTheDocument();
    expect(screen.getByText(/works in claude code, codex, cursor, antigravity/i)).toBeInTheDocument();
    expect(screen.getByTestId("skills-count")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sort skills by order/i })).toBeInTheDocument();
    expect(screen.getByTestId("marketplace-grid")).toBeInTheDocument();
  });

  it("filters skills by text search input", () => {
    render(<MarketplaceView />);

    const searchInput = screen.getByPlaceholderText(/search skills \/ outputs/i);
    fireEvent.change(searchInput, { target: { value: "FastAPI" } });

    expect(screen.getByText("FastAPI Microservice Scaffolder")).toBeInTheDocument();
    expect(screen.queryByText("Brand Identity Designer")).not.toBeInTheDocument();
  });

  it("filters skills by recommendations filter (Free)", () => {
    render(<MarketplaceView initialCategory="free" />);

    expect(screen.getByText("Pixel Promo Video")).toBeInTheDocument();
    expect(screen.queryByText("Brand Identity Designer")).not.toBeInTheDocument();
  });

  it("filters skills by output category (video)", () => {
    render(<MarketplaceView initialCategory="video" />);

    expect(screen.getByText("Pixel Promo Video")).toBeInTheDocument();
    expect(screen.queryByText("Web Development Pro")).not.toBeInTheDocument();
  });

  it("handles initialCategory with featured, output, roles, and use-case variants", () => {
    // test timeout handled
    const { unmount: u1 } = render(<MarketplaceView initialCategory="featured" />);
    expect(screen.getByTestId("skills-marketplace-page")).toBeInTheDocument();
    u1();

    const { unmount: u2 } = render(<MarketplaceView initialCategory="output" />);
    expect(screen.getByTestId("skills-marketplace-page")).toBeInTheDocument();
    u2();

    const { unmount: u3 } = render(<MarketplaceView initialCategory="roles" />);
    expect(screen.getByTestId("skills-marketplace-page")).toBeInTheDocument();
    u3();

    const { unmount: u4 } = render(<MarketplaceView initialCategory="use-case" />);
    expect(screen.getByTestId("skills-marketplace-page")).toBeInTheDocument();
    u4();

    const { unmount: u5 } = render(<MarketplaceView initialCategory="founder" />);
    expect(screen.getByTestId("skills-marketplace-page")).toBeInTheDocument();
    u5();

    const { unmount: u6 } = render(<MarketplaceView initialCategory="publishing" />);
    expect(screen.getByTestId("skills-marketplace-page")).toBeInTheDocument();
    u6();
  }, 25000);

  it("displays empty state and allows resetting filters when no items match", () => {
    render(<MarketplaceView />);

    const searchInput = screen.getByPlaceholderText(/search skills \/ outputs/i);
    fireEvent.change(searchInput, { target: { value: "NonExistentSkill12345" } });

    expect(screen.getByText(/no skills found matching your filters/i)).toBeInTheDocument();
    const resetBtn = screen.getByRole("button", { name: /reset all filters/i });
    expect(resetBtn).toBeInTheDocument();

    fireEvent.click(resetBtn);
    expect(screen.getByText("Pixel Promo Video")).toBeInTheDocument();
  });

  it("toggles sort order dropdown and allows selecting options", () => {
    render(<MarketplaceView />);

    const sortButton = screen.getByRole("button", { name: /sort skills by order/i });
    fireEvent.click(sortButton);

    expect(screen.getByRole("option", { name: /most popular/i })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("option", { name: /most popular/i }));
    expect(screen.getByText(/most popular/i)).toBeInTheDocument();

    // Select Alphabetical
    fireEvent.click(screen.getByRole("button", { name: /sort skills by order/i }));
    expect(screen.getByRole("option", { name: /^alphabetical$/i })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("option", { name: /^alphabetical$/i }));
    expect(screen.getByText(/^alphabetical$/i)).toBeInTheDocument();

    // Select Newest
    fireEvent.click(screen.getByRole("button", { name: /sort skills by order/i }));
    expect(screen.getByRole("option", { name: /newest/i })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("option", { name: /newest/i }));
    expect(screen.getByText(/newest/i)).toBeInTheDocument();
  }, 15000);

  it("closes sort dropdown when clicking outside", () => {
    render(<MarketplaceView />);

    const sortButton = screen.getByRole("button", { name: /sort skills by order/i });
    fireEvent.click(sortButton);
    expect(screen.getByRole("listbox")).toBeInTheDocument();

    fireEvent.mouseDown(document.body);
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("opens detail modal when a skill card is clicked and closes on close button or backdrop", () => {
    render(<MarketplaceView />);

    const firstCard = screen.getByText("Pixel Promo Video");
    fireEvent.click(firstCard);

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();

    // Inner sheet click stops propagation
    const innerSheet = dialog.querySelector("div");
    if (innerSheet) {
      fireEvent.click(innerSheet);
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    }

    const closeBtn = screen.getByRole("button", { name: /close skill details/i });
    fireEvent.click(closeBtn);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    // Reopen and test Escape key closes dialog
    fireEvent.click(firstCard);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    // Reopen and click backdrop to close
    fireEvent.click(firstCard);
    const finalDialog = screen.getByRole("dialog");
    fireEvent.click(finalDialog);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("handles mobile filter drawer open, close, and backdrop click", () => {
    const { container } = render(<MarketplaceView />);

    const mobileToggleBtn = screen.getByRole("button", { name: /toggle filter options/i });
    fireEvent.click(mobileToggleBtn);
    expect(screen.getByText("Close Filters")).toBeInTheDocument();

    // Toggle close
    fireEvent.click(mobileToggleBtn);
    expect(screen.getByText("Filter Skills")).toBeInTheDocument();

    // Open and click mobile overlay backdrop
    fireEvent.click(mobileToggleBtn);
    const overlay = container.querySelector("div[class*='mobileFilterOverlay']");
    if (overlay) {
      fireEvent.click(overlay);
    }
  });

  it("handles bookmark toggling from skill card", () => {
    render(<MarketplaceView />);

    const bookmarkBtns = screen.getAllByRole("button", { name: /save skill to bookmarks/i });
    expect(bookmarkBtns.length).toBeGreaterThan(0);
    fireEvent.click(bookmarkBtns[0]);
  });

  it("handles navigation callbacks (home, design-system, request skill, login)", () => {
    const handleHome = vi.fn();
    render(<MarketplaceView onNavigateHome={handleHome} />);

    // Brand click calls onNavigateHome
    const brand = screen.getByRole("button", { name: /skillhouse home/i });
    fireEvent.click(brand);
    expect(handleHome).toHaveBeenCalled();

    // Design system toggle
    const dsBtn = screen.getByRole("button", { name: /design system/i });
    fireEvent.click(dsBtn);
    expect(mockPush).toHaveBeenCalledWith("/design-system");

    // Request skill modal
    const requestBtn = screen.getByRole("button", { name: "Request a skill" });
    fireEvent.click(requestBtn);
    expect(screen.getByRole("heading", { name: /request a skill/i })).toBeInTheDocument();

    const cancelBtn = screen.getByRole("button", { name: "Cancel" });
    fireEvent.click(cancelBtn);

    // Get Started opens login modal
    const getStartedBtn = screen.getByTestId("header-get-started-btn");
    fireEvent.click(getStartedBtn);
    expect(screen.getByText("Welcome to Skillhouse")).toBeInTheDocument();

    const closeLogin = screen.getByRole("button", { name: /close dialog/i });
    fireEvent.click(closeLogin);
  });

  it("handles selecting category from nav mega menu", () => {
    render(<MarketplaceView />);

    const catBtn = screen.getByRole("button", { name: /categories/i });
    fireEvent.click(catBtn);

    const menu = screen.getByRole("menu");
    const webDesignItem = within(menu).getByText("Web design");
    fireEvent.click(webDesignItem);
    expect(screen.getByTestId("skills-marketplace-page")).toBeInTheDocument();
  });

  it("toggles expand and retract components on the filter sidebar matching skillry.dev pattern", () => {
    const { container } = render(<MarketplaceView />);

    const sidebar = container.querySelector("#marketplace-sidebar");
    expect(sidebar).toBeInTheDocument();
    expect(sidebar).not.toHaveClass(/collapsed/);

    // 1. Initially, toggle-filter-sidebar is not shown in toolbar because sidebar is open
    expect(screen.queryByTestId("toggle-filter-sidebar")).not.toBeInTheDocument();

    // 2. Retract from the sidebar header retract button
    const retractBtn = screen.getByTestId("sidebar-retract-btn");
    expect(retractBtn).toBeInTheDocument();
    fireEvent.click(retractBtn);

    // Sidebar should be collapsed and inert
    expect(sidebar?.className).toContain("collapsed");
    expect(sidebar).toHaveAttribute("aria-hidden", "true");

    // 3. Now the expand button appears in the toolbar next to sort
    const expandBtn = screen.getByTestId("toggle-filter-sidebar");
    expect(expandBtn).toBeInTheDocument();
    expect(expandBtn).toHaveTextContent("Filters");

    // 4. Click expand button to restore sidebar
    fireEvent.click(expandBtn);
    expect(sidebar?.className).not.toContain("collapsed");
    expect(sidebar).toHaveAttribute("aria-hidden", "false");
    expect(screen.queryByTestId("toggle-filter-sidebar")).not.toBeInTheDocument();
  });

  it("displays active filter counter badge on the toggle pill when filters are applied and sidebar is collapsed", () => {
    render(<MarketplaceView initialCategory="free" />);

    // Active filter badge is visible in sidebar header
    expect(screen.getByTestId("active-filter-count")).toHaveTextContent("1");

    // Retract sidebar to see badge on expand button in controls toolbar
    const retractBtn = screen.getByTestId("sidebar-retract-btn");
    fireEvent.click(retractBtn);

    const badge = screen.getByTestId("active-filter-badge");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent("1");
  });

  it("renders strategic sponsored ad cards in the skills grid and handles ad clicks", () => {
    const openSpy = vi.spyOn(window, "open").mockImplementation(() => null);
    render(<MarketplaceView />);

    // First strategic ad is inserted at position 5 (index 4)
    expect(screen.getByText("Scale Autonomous Agent Fleets")).toBeInTheDocument();
    expect(screen.getByText("Claude Fleet")).toBeInTheDocument();

    // Click on sponsored card triggers window.open
    const adCard = screen.getByRole("article", { name: /scale autonomous agent fleets/i });
    fireEvent.click(adCard);
    expect(openSpy).toHaveBeenCalledWith("https://claude.ai", "_blank", "noopener,noreferrer");

    openSpy.mockRestore();
  });

  it("triggers onSelectSkillDetail when View Full Page is clicked inside the detail modal", () => {
    const onSelectSkillDetail = vi.fn();
    render(<MarketplaceView onSelectSkillDetail={onSelectSkillDetail} />);

    // Click on a skill card to open modal
    const cards = screen.getAllByRole("article");
    fireEvent.click(cards[0]);

    // Check View Full Page button
    const fullPageBtn = screen.getByTestId("modal-view-full-page-btn");
    expect(fullPageBtn).toBeInTheDocument();
    fireEvent.click(fullPageBtn);

    expect(onSelectSkillDetail).toHaveBeenCalledTimes(1);
  });
});