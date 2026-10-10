import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { SkillCard } from "./SkillCard";

describe("Features SkillCard Component", () => {
  const defaultProps = {
    title: "Pixel Promo Video",
    category: "Design",
    previewImage: "/figma/skill-card-preview.png",
  };

  it("renders title, category, and image alt text", () => {
    render(<SkillCard {...defaultProps} />);
    expect(screen.getByText("Pixel Promo Video")).toBeInTheDocument();
    expect(screen.getByText("Design")).toBeInTheDocument();
    expect(screen.getByAltText("Pixel Promo Video")).toBeInTheDocument();
  });

  it("triggers onClick when the card is clicked", () => {
    const handleClick = vi.fn();
    render(<SkillCard {...defaultProps} onClick={handleClick} />);
    fireEvent.click(screen.getByRole("article"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("triggers onClick via Enter and Space keyboard navigation", () => {
    const handleClick = vi.fn();
    render(<SkillCard {...defaultProps} onClick={handleClick} />);
    const card = screen.getByRole("article");
    
    fireEvent.keyDown(card, { key: "Enter" });
    expect(handleClick).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(card, { key: " " });
    expect(handleClick).toHaveBeenCalledTimes(2);
  });

  it("handles uncontrolled bookmark toggle and stops propagation to card", () => {
    const handleCardClick = vi.fn();
    const handleToggle = vi.fn();
    render(
      <SkillCard
        {...defaultProps}
        onClick={handleCardClick}
        onBookmarkToggle={handleToggle}
      />
    );

    const bookmarkBtn = screen.getByRole("button", {
      name: /save skill to bookmarks/i,
    });
    expect(bookmarkBtn).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(bookmarkBtn);
    expect(handleToggle).toHaveBeenCalledWith(true);
    expect(handleCardClick).not.toHaveBeenCalled();
    expect(bookmarkBtn).toHaveAttribute("aria-pressed", "true");
  });

  it("handles controlled bookmark state", () => {
    const handleToggle = vi.fn();
    const { rerender } = render(
      <SkillCard
        {...defaultProps}
        isBookmarked={true}
        onBookmarkToggle={handleToggle}
      />
    );

    const bookmarkBtn = screen.getByRole("button", {
      name: /remove from saved skills/i,
    });
    expect(bookmarkBtn).toHaveAttribute("aria-pressed", "true");

    fireEvent.click(bookmarkBtn);
    expect(handleToggle).toHaveBeenCalledWith(false);

    rerender(
      <SkillCard
        {...defaultProps}
        isBookmarked={false}
        onBookmarkToggle={handleToggle}
      />
    );
    expect(bookmarkBtn).toHaveAttribute("aria-pressed", "false");
  });

  it("renders up to 4 model logo marks", () => {
    const models = ["/logo-1.png", "/logo-2.png", "/logo-3.png", "/logo-4.png", "/logo-5.png"];
    render(<SkillCard {...defaultProps} models={models} />);
    const modelRow = screen.getByLabelText("Supported models");
    expect(modelRow.children.length).toBe(4); // 4 logos
  });
});

  it("renders without category pill when category is not provided", () => {
    const { container } = render(<SkillCard title="Minimal Card" category={undefined} />);
    expect(screen.getByText("Minimal Card")).toBeInTheDocument();
    expect(container.querySelector("._pill_246e7f")).not.toBeInTheDocument();
  });
