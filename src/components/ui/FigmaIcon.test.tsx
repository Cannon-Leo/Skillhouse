import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { FigmaIcon } from "./FigmaIcon";

describe("UI FigmaIcon Component (Lucide unified)", () => {
  it("renders with default hidden aria state when alt is empty", () => {
    const { container } = render(<FigmaIcon name="search-normal" />);
    const span = container.firstChild as HTMLElement;
    expect(span).toHaveAttribute("aria-hidden", "true");
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("sets accessible aria-label and img role when alt is provided", () => {
    render(<FigmaIcon name="monitor" alt="Monitor Icon" />);
    const iconWrapper = screen.getByRole("img", { name: "Monitor Icon" });
    expect(iconWrapper).toBeInTheDocument();
  });

  it("applies custom size styles", () => {
    const { container } = render(<FigmaIcon name="arrow-right" size={24} />);
    const span = container.firstChild as HTMLElement;
    expect(span.style.width).toBe("24px");
    expect(span.style.height).toBe("24px");
  });
});
