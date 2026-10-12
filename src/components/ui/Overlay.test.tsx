import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Overlay } from "./Overlay";

describe("UI Overlay Component", () => {
  it("renders children when isOpen is true", () => {
    render(
      <Overlay isOpen={true}>
        <div data-testid="child-content">Modal Content</div>
      </Overlay>
    );
    expect(screen.getByTestId("child-content")).toBeInTheDocument();
  });

  it("does not render when isOpen is false", () => {
    render(
      <Overlay isOpen={false}>
        <div data-testid="child-content">Modal Content</div>
      </Overlay>
    );
    expect(screen.queryByTestId("child-content")).not.toBeInTheDocument();
  });

  it("calls onClose when backdrop is clicked", () => {
    const handleClose = vi.fn();
    render(
      <Overlay isOpen={true} onClose={handleClose}>
        <div data-testid="child-content">Modal Content</div>
      </Overlay>
    );
    const backdrop = screen.getByTestId("modal-overlay");
    fireEvent.click(backdrop);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("does not call onClose when child content is clicked", () => {
    const handleClose = vi.fn();
    render(
      <Overlay isOpen={true} onClose={handleClose}>
        <div data-testid="child-content">Modal Content</div>
      </Overlay>
    );
    fireEvent.click(screen.getByTestId("child-content"));
    expect(handleClose).not.toHaveBeenCalled();
  });

  it("calls onClose when Escape key is pressed", () => {
    const handleClose = vi.fn();
    render(
      <Overlay isOpen={true} onClose={handleClose}>
        <div>Content</div>
      </Overlay>
    );
    fireEvent.keyDown(document, { key: "Escape" });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
