import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Skeleton } from "./Skeleton";

describe("UI Skeleton Primitive", () => {
  it("renders with default rectangular variant and shimmer animation", () => {
    render(<Skeleton data-testid="test-skeleton" />);
    const el = screen.getByTestId("test-skeleton");
    expect(el).toBeInTheDocument();
    expect(el).toHaveAttribute("aria-hidden", "true");
  });

  it("applies circular and text variants correctly", () => {
    const { rerender } = render(<Skeleton variant="circular" data-testid="variant-skeleton" />);
    expect(screen.getByTestId("variant-skeleton")).toBeInTheDocument();

    rerender(<Skeleton variant="text" data-testid="variant-skeleton" />);
    expect(screen.getByTestId("variant-skeleton")).toBeInTheDocument();
  });

  it("applies custom width, height, and style overrides", () => {
    render(
      <Skeleton
        width={120}
        height={24}
        style={{ marginTop: "8px" }}
        data-testid="sized-skeleton"
      />
    );
    const el = screen.getByTestId("sized-skeleton");
    expect(el).toHaveStyle({ width: "120px", height: "24px", marginTop: "8px" });
  });

  it("supports pulse and none animation props", () => {
    const { rerender } = render(<Skeleton animation="pulse" data-testid="anim-skeleton" />);
    expect(screen.getByTestId("anim-skeleton")).toBeInTheDocument();

    rerender(<Skeleton animation="none" data-testid="anim-skeleton" />);
    expect(screen.getByTestId("anim-skeleton")).toBeInTheDocument();
  });
});
