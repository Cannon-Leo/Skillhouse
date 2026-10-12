import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CategorySkillCard } from "./CategorySkillCard";

describe("CategorySkillCard (Figma Node 751:4797)", () => {
  it("renders card title and applies custom background", () => {
    render(
      <CategorySkillCard
        cardId="featured"
        title={"Featured \nAgent Skills"}
        backgroundColor="#FFEEDD"
      />
    );

    const card = screen.getByTestId("category-skill-card");
    expect(card).toBeInTheDocument();
    expect(screen.getByText(/Featured/)).toBeInTheDocument();
    expect(screen.getByText(/Agent Skills/)).toBeInTheDocument();
    expect(card).toHaveStyle({ "--card-bg": "#FFEEDD" });
    expect(card).toHaveAttribute("data-card-id", "featured");
  });

  it("renders as a button and triggers onClick and onHoverChange", () => {
    const handleClick = vi.fn();
    const handleHover = vi.fn();
    render(
      <CategorySkillCard
        cardId="roles"
        title="Skills by Roles"
        onClick={handleClick}
        onHoverChange={handleHover}
      />
    );

    const button = screen.getByRole("button", { name: "Skills by Roles" });
    fireEvent.mouseEnter(button);
    expect(handleHover).toHaveBeenCalledWith(true);

    fireEvent.mouseLeave(button);
    expect(handleHover).toHaveBeenCalledWith(false);

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders authentic arrow icon with #54392D color", () => {
    const { container } = render(
      <CategorySkillCard
        title="Free Agent Skills"
      />
    );

    const arrowSvg = container.querySelector("svg");
    expect(arrowSvg).toBeInTheDocument();
    const paths = arrowSvg?.querySelectorAll("path");
    expect(paths && paths.length > 0).toBe(true);
    paths?.forEach((path) => {
      expect(path).toHaveAttribute("stroke", "#54392D");
    });
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

  it("calls onHoverChange on mouseEnter, mouseLeave, focus, and blur for button", () => {
    const handleHover = vi.fn();
    render(
      <CategorySkillCard
        title="Hover Test"
        onHoverChange={handleHover}
        isHovered={true}
      />
    );

    const btn = screen.getByRole("button", { name: "Hover Test" });
    fireEvent.mouseEnter(btn);
    expect(handleHover).toHaveBeenCalledWith(true);

    fireEvent.mouseLeave(btn);
    expect(handleHover).toHaveBeenCalledWith(false);

    fireEvent.focus(btn);
    expect(handleHover).toHaveBeenCalledWith(true);

    fireEvent.blur(btn);
    expect(handleHover).toHaveBeenCalledWith(false);
  });

  it("calls onHoverChange and handles onClick on link", () => {
    const handleHover = vi.fn();
    const handleClick = vi.fn();
    render(
      <CategorySkillCard
        title="Link Hover Test"
        href="/test"
        onHoverChange={handleHover}
        onClick={handleClick}
      />
    );

    const link = screen.getByRole("link", { name: "Link Hover Test" });
    fireEvent.mouseEnter(link);
    expect(handleHover).toHaveBeenCalledWith(true);

    fireEvent.mouseLeave(link);
    expect(handleHover).toHaveBeenCalledWith(false);

    fireEvent.focus(link);
    expect(handleHover).toHaveBeenCalledWith(true);

    fireEvent.blur(link);
    expect(handleHover).toHaveBeenCalledWith(false);

    fireEvent.click(link);
    expect(handleClick).toHaveBeenCalled();
  });

});
