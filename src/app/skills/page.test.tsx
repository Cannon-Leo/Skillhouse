import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import SkillsPage from "./page";

let mockSearchParams = new URLSearchParams();
const mockPush = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    back: vi.fn(),
  }),
  useSearchParams: () => mockSearchParams,
}));

describe("SkillsPage (/skills)", () => {
  it("renders MarketplaceView when no id param is provided and handles navigation", () => {
    mockSearchParams = new URLSearchParams();
    render(<SkillsPage />);

    expect(screen.getByText("Agent Skills Marketplace")).toBeInTheDocument();

    // Click skill card navigates to skill with id
    const skillCard = screen.getByText("Visual Canvas Deck");
    fireEvent.click(skillCard);
    expect(mockPush).toHaveBeenCalledWith("/skills?id=visual-canvas-deck");
  });

  it("renders SkillDetailPage and executes navigation callbacks when id param is present", () => {
    mockSearchParams = new URLSearchParams("id=visual-canvas-deck");
    render(<SkillsPage />);

    expect(screen.getByRole("heading", { level: 1, name: "Visual Canvas Deck" })).toBeInTheDocument();
    expect(screen.getByTestId("skill-detail-main-preview")).toBeInTheDocument();

    // 1. Breadcrumb navigation to Home
    const breadcrumbNav = screen.getByRole("navigation", { name: /breadcrumb/i });
    fireEvent.click(within(breadcrumbNav).getByText("Home"));
    expect(mockPush).toHaveBeenCalledWith("/");

    // 2. Similar skill navigation
    const similarGrid = screen.getByTestId("similar-skills-grid");
    const cards = within(similarGrid).getAllByRole("article");
    fireEvent.click(cards[0]);
    expect(mockPush).toHaveBeenCalled();
  });

  it("handles matched custom skill when id corresponds to marketplace item", () => {
    mockSearchParams = new URLSearchParams("id=pixel-promo-video");
    render(<SkillsPage />);

    expect(screen.getByRole("heading", { level: 1, name: "Pixel Promo Video" })).toBeInTheDocument();
  });
});
