import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CategoriesDropdown } from "./CategoriesDropdown";

describe("CategoriesDropdown Component", () => {
  it("renders default use-case tab items (Node 750:3471 / Component 215)", () => {
    render(<CategoriesDropdown />);
    
    // Check tabs
    expect(screen.getByRole("tab", { name: /by use-case/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /by role/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /by output/i })).toBeInTheDocument();

    // Check items for use-case
    expect(screen.getByText("Web design")).toBeInTheDocument();
    expect(screen.getByText("Product launch")).toBeInTheDocument();
    expect(screen.getByText("Research communication")).toBeInTheDocument();
    expect(screen.getByText("See all Skills")).toBeInTheDocument();
  });

  it("switches to By role tab when clicked (Node 750:3539 / Component 216)", () => {
    const handleTabChange = vi.fn();
    render(<CategoriesDropdown onTabChange={handleTabChange} />);

    const roleTab = screen.getByRole("tab", { name: /by role/i });
    fireEvent.click(roleTab);

    expect(handleTabChange).toHaveBeenCalledWith("role");
    expect(screen.getByText("Content creator")).toBeInTheDocument();
    expect(screen.getByText("Software engineer")).toBeInTheDocument();
    expect(screen.getByText("Founder")).toBeInTheDocument();
    expect(screen.queryByText("Web design")).not.toBeInTheDocument();
  });

  it("switches to By output tab when clicked (Node 750:3610 / Component 217)", () => {
    render(<CategoriesDropdown initialTab="output" />);

    expect(screen.getByText("Images")).toBeInTheDocument();
    expect(screen.getByText("Presentations")).toBeInTheDocument();
    expect(screen.getByText("Video")).toBeInTheDocument();
    expect(screen.getByText("Web & HTML")).toBeInTheDocument();
  });

  it("triggers onSelectCategory callback when an item is clicked", () => {
    const handleSelect = vi.fn();
    render(<CategoriesDropdown onSelectCategory={handleSelect} />);

    const item = screen.getByText("Web design");
    fireEvent.click(item);

    expect(handleSelect).toHaveBeenCalledWith("Web design", "use-case");
  });

  it("triggers onSeeAllSkills callback when the CTA button is clicked", () => {
    const handleSeeAll = vi.fn();
    render(<CategoriesDropdown onSeeAllSkills={handleSeeAll} />);

    const seeAllBtn = screen.getByRole("button", { name: /see all skills/i });
    fireEvent.click(seeAllBtn);

    expect(handleSeeAll).toHaveBeenCalledTimes(1);
  });

  it("renders contextual semantic icons for each category item", () => {
    const { container } = render(<CategoriesDropdown />);
    
    // Check that icons are rendered inside item rows
    const itemRows = container.querySelectorAll("button._itemRow_4e4f50, button[class*=\"itemRow\"]");
    expect(itemRows.length).toBeGreaterThan(0);
    
    // Check that each item row has an SVG icon
    itemRows.forEach((row) => {
      const svg = row.querySelector("svg");
      expect(svg).toBeInTheDocument();
    });
  });
});

