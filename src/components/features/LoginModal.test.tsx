import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { LoginModal } from "./LoginModal";

describe("Features LoginModal Component", () => {
  it("renders modal with title, description, and OAuth buttons when isOpen is true", () => {
    render(<LoginModal isOpen={true} onClose={() => {}} />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Welcome to Skillhouse")).toBeInTheDocument();
    expect(
      screen.getByText(
        /Skillhouse designs original Agent Skills for Claude Code/i
      )
    ).toBeInTheDocument();
    expect(screen.getByText("Continue with Google")).toBeInTheDocument();
    expect(screen.getByText("Continue with Github")).toBeInTheDocument();
  });

  it("does not render when isOpen is false", () => {
    render(<LoginModal isOpen={false} onClose={() => {}} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    const handleClose = vi.fn();
    render(<LoginModal isOpen={true} onClose={handleClose} />);

    const closeBtn = screen.getByRole("button", { name: /close dialog/i });
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("calls onLogin with 'google' when Google button is clicked", () => {
    const handleLogin = vi.fn();
    render(<LoginModal isOpen={true} onClose={() => {}} onLogin={handleLogin} />);

    const googleBtn = screen.getByTestId("login-google-btn");
    fireEvent.click(googleBtn);
    expect(handleLogin).toHaveBeenCalledWith("google");
  });

  it("calls onLogin with 'github' when Github button is clicked", () => {
    const handleLogin = vi.fn();
    render(<LoginModal isOpen={true} onClose={() => {}} onLogin={handleLogin} />);

    const githubBtn = screen.getByTestId("login-github-btn");
    fireEvent.click(githubBtn);
    expect(handleLogin).toHaveBeenCalledWith("github");
  });
  it("handles fallback timeout and calls onClose when onLogin is omitted", () => {
    vi.useFakeTimers();
    const handleClose = vi.fn();
    render(<LoginModal isOpen={true} onClose={handleClose} />);

    const googleBtn = screen.getByTestId("login-google-btn");
    fireEvent.click(googleBtn);

    vi.advanceTimersByTime(800);
    expect(handleClose).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });
});
