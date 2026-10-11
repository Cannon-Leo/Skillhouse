import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CategorySkillCard } from "./CategorySkillCard";

describe("CategorySkillCard (Figma Node 751:4797)", () => {
  it("renders card title and applies custom background", () => {
    render(
      <CategorySkillCard
        title={"Featured \nAgent Skills"}
        backgroundColor="#FFEEDD"
      />
    );

    const card = screen.getByTestId("category-skill-card");
    expect(card).toBeInTheDocument();
    expect(screen.getByText(/Featured/)).toBeInTheDocument();
    expect(screen.getByText(/Agent Skills/)).toBeInTheDocument();
    expect(card).toHaveStyle({ "--card-bg": "#FFEEDD" });
  });

  it("renders as a button and triggers onClick when clicked", () => {
    const handleClick = vi.fn();
    render(
      <CategorySkillCard
        title="Skills by Roles"
        onClick={handleClick}
      />
    );

    const button = screen.getByRole("button", { name: "Skills by Roles" });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders as an anchor link when href is provided", () => {
    render(
      <CategorySkillCard
        title="Skills by Output"
        href="/skills?category=output"
      />
    );

    const link = screen.getByRole("link", { name: "Skills by Output" });
    expect(link).toHaveAttribute("href", "/skills?category=output");
  });
});
