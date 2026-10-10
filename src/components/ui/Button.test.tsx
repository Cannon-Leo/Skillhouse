import React, { createRef } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Button } from "./Button";

describe("UI Button Component", () => {
  it("renders with default type button and children text", () => {
    render(<Button>Get Started</Button>);
    const btn = screen.getByRole("button", { name: /get started/i });
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveAttribute("type", "button");
  });

  it("handles click events when enabled", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByRole("button", { name: /click/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("prevents clicks when disabled", () => {
    const handleClick = vi.fn();
    render(<Button disabled onClick={handleClick}>Disabled</Button>);
    const btn = screen.getByRole("button", { name: /disabled/i });
    expect(btn).toBeDisabled();
    fireEvent.click(btn);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("displays loading state with aria-busy and disables clicks", () => {
    const handleClick = vi.fn();
    render(<Button isLoading onClick={handleClick}>Submit</Button>);
    const btn = screen.getByRole("button", { name: /loading/i });
    expect(btn).toBeDisabled();
    expect(btn).toHaveAttribute("aria-busy", "true");
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    fireEvent.click(btn);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("renders leftIcon and rightIcon when not loading", () => {
    render(
      <Button
        leftIcon={<span data-testid="left-icon">←</span>}
        rightIcon={<span data-testid="right-icon">→</span>}
      >
        Action
      </Button>
    );
    expect(screen.getByTestId("left-icon")).toBeInTheDocument();
    expect(screen.getByTestId("right-icon")).toBeInTheDocument();
    expect(screen.getByText("Action")).toBeInTheDocument();
  });

  it("applies variant, size, and fullWidth classes", () => {
    render(
      <Button variant="outline-brand" size="lg" fullWidth>
        Full Brand
      </Button>
    );
    const btn = screen.getByRole("button", { name: /full brand/i });
    expect(btn.className).toContain("variant-outline-brand");
    expect(btn.className).toContain("size-lg");
    expect(btn.className).toContain("fullWidth");
  });

  it("forwards ref to button element", () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Ref Button</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("respects explicit type submit", () => {
    render(<Button type="submit">Submit Form</Button>);
    const btn = screen.getByRole("button", { name: /submit form/i });
    expect(btn).toHaveAttribute("type", "submit");
  });
});
