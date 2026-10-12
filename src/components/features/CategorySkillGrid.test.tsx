import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CategorySkillGrid } from "./CategorySkillGrid";

describe("CategorySkillGrid (Figma Node 751:4789)", () => {
  it("renders the 7 default category cards", () => {
    render(<CategorySkillGrid />);

    expect(screen.getByText(/Featured/)).toBeInTheDocument();
    expect(screen.getByText(/Free Agent/)).toBeInTheDocument();
    expect(screen.getByText(/Trending/)).toBeInTheDocument();
    expect(screen.getByText(/Top-rated/)).toBeInTheDocument();
    expect(screen.getByText(/Use-case/)).toBeInTheDocument();
    expect(screen.getByText(/Output/)).toBeInTheDocument();
    expect(screen.getByText(/Roles/)).toBeInTheDocument();

    const allCards = screen.getAllByTestId("category-skill-card");
    expect(allCards).toHaveLength(7);
  });

  it("triggers onSelectCategory callback when a card is clicked", () => {
    const handleSelect = vi.fn();
    render(<CategorySkillGrid onSelectCategory={handleSelect} />);

    const featuredLink = screen.getByRole("link", { name: "Featured Agent Skills" });
    fireEvent.click(featuredLink);
    expect(handleSelect).toHaveBeenCalledTimes(1);
    expect(handleSelect).toHaveBeenCalledWith(
      expect.objectContaining({ id: "featured" })
    );
  });

  it("activates connected bridges when a card is hovered", () => {
    const { container } = render(<CategorySkillGrid />);

    const freeCard = screen.getByRole("link", { name: "Free Agent Skills" });

    // Initially, no bridges have bridgeActive class
    expect(container.querySelectorAll('[class*="bridgeActive"]')).toHaveLength(0);

    // Hover over Free Agent Skills card (connects to dBridgeV1_1 and dBridgeH1)
    fireEvent.mouseEnter(freeCard);
    const activeBridges = container.querySelectorAll('[class*="bridgeActive"]');
    expect(activeBridges.length).toBeGreaterThan(0);

    // Leave hover
    fireEvent.mouseLeave(freeCard);
    expect(container.querySelectorAll('[class*="bridgeActive"]')).toHaveLength(0);
  });
});
