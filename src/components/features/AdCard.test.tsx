import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { AdCard } from "./AdCard";

describe("Features AdCard Component", () => {
  const defaultProps = {
    title: "Promoted Agent Framework",
    description: "Build robust autonomous agents with verified safety benchmarks.",
    badgeLabel: "Featured",
    ctaText: "Explore Now",
  };

  it("renders ad title, badge, and CTA text without redundant subtitle", () => {
    render(<AdCard {...defaultProps} />);
    expect(screen.getByText("Promoted Agent Framework")).toBeInTheDocument();
    expect(screen.queryByText("Build robust autonomous agents with verified safety benchmarks.")).not.toBeInTheDocument();
    expect(screen.getByText("Featured")).toBeInTheDocument();
    expect(screen.getByText("Explore Now")).toBeInTheDocument();
  });

  it("triggers onClick when the card is clicked", () => {
    const handleClick = vi.fn();
    render(<AdCard {...defaultProps} onClick={handleClick} />);
    fireEvent.click(screen.getByRole("article"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("triggers onClick via Enter and Space keys", () => {
    const handleClick = vi.fn();
    render(<AdCard {...defaultProps} onClick={handleClick} />);
    const card = screen.getByRole("article");

    fireEvent.keyDown(card, { key: "Enter" });
    expect(handleClick).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(card, { key: " " });
    expect(handleClick).toHaveBeenCalledTimes(2);
  });
});
