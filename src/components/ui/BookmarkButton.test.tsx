import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BookmarkButton } from "./BookmarkButton";

describe("UI BookmarkButton Component", () => {
  it("renders unbookmarked by default with correct aria attributes", () => {
    render(<BookmarkButton />);
    const btn = screen.getByRole("button", { name: "Bookmark skill" });
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveAttribute("aria-pressed", "false");
    expect(btn.querySelector("svg")).toHaveAttribute("fill", "none");
  });

  it("renders active bookmarked state with filled icon", () => {
    render(<BookmarkButton isBookmarked={true} />);
    const btn = screen.getByRole("button", { name: "Remove from bookmarks" });
    expect(btn).toHaveAttribute("aria-pressed", "true");
    expect(btn.querySelector("svg")).toHaveAttribute("fill", "currentColor");
  });

  it("triggers onToggle callback with negated state on click", () => {
    const handleToggle = vi.fn();
    render(<BookmarkButton isBookmarked={false} onToggle={handleToggle} />);
    const btn = screen.getByRole("button");
    fireEvent.click(btn);
    expect(handleToggle).toHaveBeenCalledWith(true);
  });

  it("supports both round and square variants", () => {
    const { rerender } = render(<BookmarkButton variant="round" data-testid="bm-btn" />);
    let btn = screen.getByTestId("bm-btn");
    expect(btn.className).toContain("round");

    rerender(<BookmarkButton variant="square" data-testid="bm-btn" />);
    btn = screen.getByTestId("bm-btn");
    expect(btn.className).toContain("square");
  });
});
