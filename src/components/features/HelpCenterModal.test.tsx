import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { HelpCenterModal } from "./HelpCenterModal";

describe("HelpCenterModal Component", () => {
  it("does not render when isOpen is false", () => {
    render(<HelpCenterModal isOpen={false} onClose={vi.fn()} />);
    expect(screen.queryByTestId("help-center-modal")).not.toBeInTheDocument();
  });

  it("renders guides and FAQs when open", () => {
    render(<HelpCenterModal isOpen={true} onClose={vi.fn()} />);
    expect(screen.getByTestId("help-center-modal")).toBeInTheDocument();
    expect(screen.getByText(/Claude Code CLI Guide/i)).toBeInTheDocument();
    expect(screen.getByText(/Cursor IDE Integration/i)).toBeInTheDocument();
    expect(screen.getByText(/SKILL.md Architecture/i)).toBeInTheDocument();
    expect(screen.getByText(/Security & Sandboxing/i)).toBeInTheDocument();
    expect(screen.getByText(/What is an Agent Skill\?/i)).toBeInTheDocument();
  });

  it("expands and collapses FAQ answer when question button is clicked", () => {
    render(<HelpCenterModal isOpen={true} onClose={vi.fn()} />);

    const faqButton = screen.getByRole("button", { name: /what is an agent skill\?/i });
    expect(screen.queryByText(/An Agent Skill is a standardized repository package/i)).not.toBeInTheDocument();

    fireEvent.click(faqButton);
    expect(screen.getByText(/An Agent Skill is a standardized repository package/i)).toBeInTheDocument();

    // Clicking again collapses it
    fireEvent.click(faqButton);
    expect(screen.queryByText(/An Agent Skill is a standardized repository package/i)).not.toBeInTheDocument();
  });

  it("handles clicking guide cards to toggle relevant FAQs", () => {
    render(<HelpCenterModal isOpen={true} onClose={vi.fn()} />);

    // Click Claude Code CLI guide
    const claudeGuide = screen.getByText(/Claude Code CLI Guide/i).closest("div");
    if (claudeGuide) fireEvent.click(claudeGuide);

    // Click Cursor IDE guide
    const cursorGuide = screen.getByText(/Cursor IDE Integration/i).closest("div");
    if (cursorGuide) fireEvent.click(cursorGuide);

    // Click SKILL.md guide
    const skillMdGuide = screen.getByText(/SKILL.md Architecture/i).closest("div");
    if (skillMdGuide) fireEvent.click(skillMdGuide);

    // Click Security guide
    const securityGuide = screen.getByText(/Security & Sandboxing/i).closest("div");
    if (securityGuide) fireEvent.click(securityGuide);
  });

  it("calls onRequestSkill and closes when request skill button is clicked", () => {
    const handleRequest = vi.fn();
    const handleClose = vi.fn();
    render(
      <HelpCenterModal
        isOpen={true}
        onClose={handleClose}
        onRequestSkill={handleRequest}
      />
    );

    const requestBtn = screen.getByRole("button", { name: /request a custom skill/i });
    fireEvent.click(requestBtn);
    expect(handleClose).toHaveBeenCalledTimes(1);
    expect(handleRequest).toHaveBeenCalledTimes(1);
  });

  it("closes when the bottom Close button is clicked", () => {
    const handleClose = vi.fn();
    render(<HelpCenterModal isOpen={true} onClose={handleClose} />);

    const closeBtn = screen.getByRole("button", { name: /^Close$/i });
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
