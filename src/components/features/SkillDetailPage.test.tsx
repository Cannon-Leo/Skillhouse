import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { SkillDetailPage, DEFAULT_DETAIL_SKILL } from "./SkillDetailPage";

const mockPush = vi.fn();
const mockBack = vi.fn();

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    back: mockBack,
  }),
}));

describe("SkillDetailPage Component (Figma Node 751:5602)", () => {
  it("renders breadcrumbs trail, back button, title, and default elements", () => {
    const onBack = vi.fn();
    render(<SkillDetailPage onBack={onBack} />);

    // Breadcrumb bar
    const breadcrumbNav = screen.getByRole("navigation", { name: /breadcrumb/i });
    expect(breadcrumbNav).toBeInTheDocument();

    const backBtn = screen.getByTestId("skill-detail-back-btn");
    expect(backBtn).toBeInTheDocument();
    expect(within(breadcrumbNav).getByText("Dashboard")).toBeInTheDocument();
    expect(within(breadcrumbNav).getByText("Skills")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1, name: DEFAULT_DETAIL_SKILL.title })).toBeInTheDocument();

    // Fire Back button
    fireEvent.click(backBtn);
    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it("renders preview gallery and switches active image when thumbnail tab is clicked", () => {
    render(<SkillDetailPage />);

    const mainPreview = screen.getByTestId("skill-detail-main-preview");
    expect(mainPreview).toBeInTheDocument();

    // Check thumbnails
    const thumb0 = screen.getByTestId("thumbnail-tab-0");
    const thumb1 = screen.getByTestId("thumbnail-tab-1");
    expect(thumb0).toHaveAttribute("aria-selected", "true");
    expect(thumb1).toHaveAttribute("aria-selected", "false");

    // Click second thumbnail
    fireEvent.click(thumb1);
    expect(thumb1).toHaveAttribute("aria-selected", "true");
    expect(thumb0).toHaveAttribute("aria-selected", "false");
  });

  it("renders Similar Skills carousel and triggers skill navigation callback", () => {
    const onNavigateSkill = vi.fn();
    render(<SkillDetailPage onNavigateSkill={onNavigateSkill} />);

    expect(screen.getByRole("heading", { level: 2, name: /similar skills/i })).toBeInTheDocument();
    const similarGrid = screen.getByTestId("similar-skills-grid");
    expect(similarGrid).toBeInTheDocument();

    // Find cards in similar grid
    const cards = within(similarGrid).getAllByRole("article");
    expect(cards.length).toBeGreaterThan(0);

    // Click the first similar skill card
    fireEvent.click(cards[0]);
    expect(onNavigateSkill).toHaveBeenCalled();
  });

  it("handles carousel controls next and previous without errors", () => {
    render(<SkillDetailPage />);

    const prevBtn = screen.getByRole("button", { name: /previous similar skills/i });
    const nextBtn = screen.getByRole("button", { name: /next similar skills/i });

    expect(prevBtn).toBeInTheDocument();
    expect(nextBtn).toBeInTheDocument();

    fireEvent.click(nextBtn);
    fireEvent.click(prevBtn);
  });

  it("invokes navigation callbacks when breadcrumb links are clicked", () => {
    const onNavigateHome = vi.fn();
    const onNavigateMarketplace = vi.fn();

    render(
      <SkillDetailPage
        onNavigateHome={onNavigateHome}
        onNavigateMarketplace={onNavigateMarketplace}
      />
    );

    const breadcrumbNav = screen.getByRole("navigation", { name: /breadcrumb/i });
    fireEvent.click(within(breadcrumbNav).getByText("Dashboard"));
    expect(onNavigateHome).toHaveBeenCalledTimes(1);

    fireEvent.click(within(breadcrumbNav).getByText("Skills"));
    expect(onNavigateMarketplace).toHaveBeenCalledTimes(1);
  });

  it("falls back to router navigation when callbacks are omitted", () => {
    mockPush.mockClear();
    mockBack.mockClear();

    render(<SkillDetailPage />);

    // Click back button falls back to router.back
    const backBtn = screen.getByTestId("skill-detail-back-btn");
    fireEvent.click(backBtn);
    expect(mockBack).toHaveBeenCalledTimes(1);

    // Click similar skill card falls back to router.push
    const similarGrid = screen.getByTestId("similar-skills-grid");
    const cards = within(similarGrid).getAllByRole("article");
    fireEvent.click(cards[0]);
    expect(mockPush).toHaveBeenCalledWith(expect.stringContaining("/skills/"));
  });
});
