import React, { Suspense } from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import SkillDynamicPage from "./page";

const mockPush = vi.fn();
const mockBack = vi.fn();

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    back: mockBack,
  }),
  useParams: () => ({
    id: "pixel-promo-video",
  }),
  useSearchParams: () => new URLSearchParams(),
}));

describe("SkillDynamicPage Route Component (/skills/[id])", () => {
  it("renders SkillDetailPage with matched skill and executes all navigation callbacks", async () => {
    render(
      <Suspense fallback={<div>Loading...</div>}>
        <SkillDynamicPage params={{ id: "pixel-promo-video" }} />
      </Suspense>
    );

    expect(await screen.findByRole("heading", { level: 1, name: "Pixel Promo Video" })).toBeInTheDocument();
    expect(screen.getByTestId("skill-detail-main-preview")).toBeInTheDocument();

    // 1. Breadcrumbs links
    const breadcrumbNav = screen.getByRole("navigation", { name: /breadcrumb/i });
    fireEvent.click(within(breadcrumbNav).getByText("Home"));
    expect(mockPush).toHaveBeenCalledWith("/");

    fireEvent.click(within(breadcrumbNav).getByText("Skills"));
    expect(mockPush).toHaveBeenCalledWith("/skills");

    // 3. Similar skill card navigation
    const similarGrid = screen.getByTestId("similar-skills-grid");
    const cards = within(similarGrid).getAllByRole("article");
    fireEvent.click(cards[0]);
    expect(mockPush).toHaveBeenCalled();
  });

  it("handles fallback to default skill when id does not match known skills", async () => {
    render(
      <Suspense fallback={<div>Loading...</div>}>
        <SkillDynamicPage params={{ id: "unknown-skill" }} />
      </Suspense>
    );

    expect(await screen.findByRole("heading", { level: 1, name: "Visual Canvas Deck" })).toBeInTheDocument();
  });
});
