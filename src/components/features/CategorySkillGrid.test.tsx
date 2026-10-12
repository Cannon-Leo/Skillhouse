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
});
