import React, { createRef } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Checkbox } from "./Checkbox";

describe("UI Checkbox Component", () => {
  it("renders with accessible label association and slugified id", () => {
    render(<Checkbox label="Design systems" />);
    const input = screen.getByRole("checkbox", { name: /design systems/i });
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("id", "cb-design-systems");
  });

  it("respects explicit id prop", () => {
    render(<Checkbox id="custom-checkbox-id" label="Web" />);
    const input = screen.getByRole("checkbox", { name: /web/i });
    expect(input).toHaveAttribute("id", "custom-checkbox-id");
  });

  it("handles controlled checked state and renders checkmark", () => {
    const { rerender } = render(<Checkbox label="Free" checked={false} onChange={() => {}} />);
    const input = screen.getByRole("checkbox", { name: /free/i });
    expect(input).not.toBeChecked();

    rerender(<Checkbox label="Free" checked={true} onChange={() => {}} />);
    expect(input).toBeChecked();
  });

  it("calls onChange when toggled by user", () => {
    const handleChange = vi.fn();
    render(<Checkbox label="Option" checked={false} onChange={handleChange} />);
    const input = screen.getByRole("checkbox", { name: /option/i });
    fireEvent.click(input);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("disables interaction when disabled prop is true", () => {
    const handleChange = vi.fn();
    render(<Checkbox label="Locked" disabled onChange={handleChange} />);
    const input = screen.getByRole("checkbox", { name: /locked/i });
    expect(input).toBeDisabled();
    fireEvent.click(input);
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("renders count badge and icon when provided", () => {
    render(
      <Checkbox
        label="Illustrations"
        count={42}
        icon={<span data-testid="test-icon">★</span>}
      />
    );
    expect(screen.getByText("42")).toBeInTheDocument();
    expect(screen.getByTestId("test-icon")).toBeInTheDocument();
  });

  it("forwards ref to native input element", () => {
    const ref = createRef<HTMLInputElement>();
    render(<Checkbox ref={ref} label="Ref check" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});

  it("renders without explicit id or label without crashing", () => {
    render(<Checkbox aria-label="Standalone checkbox" />);
    const input = screen.getByRole("checkbox", { name: /standalone checkbox/i });
    expect(input).toBeInTheDocument();
  });
