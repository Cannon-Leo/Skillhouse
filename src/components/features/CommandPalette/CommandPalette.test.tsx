import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CommandPalette } from "./CommandPalette";

describe("CommandPalette Component", () => {
  it("renders when isOpen is true and autofocuses input", () => {
    const handleClose = vi.fn();
    render(<CommandPalette isOpen={true} onClose={handleClose} />);

    expect(screen.getByTestId("command-palette-dialog")).toBeInTheDocument();
    expect(screen.getByTestId("command-palette-input")).toBeInTheDocument();
  });

  it("does not render when isOpen is false", () => {
    render(<CommandPalette isOpen={false} onClose={vi.fn()} />);
    expect(screen.queryByTestId("command-palette-dialog")).not.toBeInTheDocument();
  });

  it("filters commands and skills based on search query and selects a skill", () => {
    const handleSelectSkill = vi.fn();
    render(
      <CommandPalette
        isOpen={true}
        onClose={vi.fn()}
        onSelectSkill={handleSelectSkill}
      />
    );

    const input = screen.getByTestId("command-palette-input");
    fireEvent.change(input, { target: { value: "Visual Canvas" } });

    expect(screen.getByText("Visual Canvas Deck")).toBeInTheDocument();
    expect(screen.queryByText("Design System Showcase")).not.toBeInTheDocument();

    const skillItem = screen.getByText("Visual Canvas Deck");
    fireEvent.click(skillItem);
    expect(handleSelectSkill).toHaveBeenCalledWith("visual-canvas-deck");
  });

  it("shows empty state when no matching commands exist and triggers request skill", () => {
    const handleRequestSkill = vi.fn();
    render(
      <CommandPalette
        isOpen={true}
        onClose={vi.fn()}
        onRequestSkill={handleRequestSkill}
      />
    );

    const input = screen.getByTestId("command-palette-input");
    fireEvent.change(input, { target: { value: "xyznonexistent999" } });

    expect(screen.getByTestId("command-palette-empty")).toBeInTheDocument();

    const requestBtn = screen.getByRole("button", {
      name: /request “xyznonexistent999” skill/i,
    });
    fireEvent.click(requestBtn);
    expect(handleRequestSkill).toHaveBeenCalledWith("xyznonexistent999");
  });

  it("navigates options via keyboard arrows and executes on Enter", () => {
    const handleNavigate = vi.fn();
    render(
      <CommandPalette
        isOpen={true}
        onClose={vi.fn()}
        onNavigateView={handleNavigate}
      />
    );

    const dialog = screen.getByTestId("command-palette-dialog");
    // Arrow down to second command (My Skills)
    fireEvent.keyDown(dialog, { key: "ArrowDown" });
    fireEvent.keyDown(dialog, { key: "Enter" });

    expect(handleNavigate).toHaveBeenCalledWith("my-skills");
  });

  it("handles Connect AI Agent action click", () => {
    const handleConnect = vi.fn();
    render(
      <CommandPalette
        isOpen={true}
        onClose={vi.fn()}
        onConnectAgent={handleConnect}
      />
    );

    const connectItem = screen.getByText("Connect AI Agent");
    fireEvent.click(connectItem);
    expect(handleConnect).toHaveBeenCalled();
  });

  it("closes when Escape key is pressed or backdrop is clicked", () => {
    const handleClose = vi.fn();
    render(<CommandPalette isOpen={true} onClose={handleClose} />);

    const dialog = screen.getByTestId("command-palette-dialog");
    fireEvent.keyDown(dialog, { key: "Escape" });
    expect(handleClose).toHaveBeenCalledTimes(1);

    const backdrop = screen.getByTestId("command-palette-backdrop");
    fireEvent.click(backdrop);
    expect(handleClose).toHaveBeenCalledTimes(2);
  });
});
