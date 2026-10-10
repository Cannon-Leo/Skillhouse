import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ConnectAgentBanner } from "./ConnectAgentBanner";

describe("Features ConnectAgentBanner Component (Figma 759:12088)", () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });
  });

  it("renders heading, description, installation guide link, and all 6 supported agents", () => {
    render(<ConnectAgentBanner />);

    // Heading & Subtitle
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(/Connect.*your agent/i);
    expect(
      screen.getByText(/Give your AI agent practical,/i)
    ).toBeInTheDocument();
    expect(screen.getByText("Read installation guide")).toBeInTheDocument();

    // 6 Agents
    expect(screen.getByText("Claude Code")).toBeInTheDocument();
    expect(screen.getByText("Antigravity")).toBeInTheDocument();
    expect(screen.getByText("Kimi Code CLI")).toBeInTheDocument();
    expect(screen.getByText("Gemini CLI")).toBeInTheDocument();
    expect(screen.getByText("Codex")).toBeInTheDocument();
    expect(screen.getByText("Cursor")).toBeInTheDocument();

    // Terminal instruction text & steps
    expect(screen.getByText("Ask your agent to install it")).toBeInTheDocument();
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("Discover a skill")).toBeInTheDocument();
    expect(screen.getByText("02")).toBeInTheDocument();
    expect(screen.getByText("Authorize in your browser")).toBeInTheDocument();
    expect(screen.getByText("03")).toBeInTheDocument();
    expect(screen.getByText(/Install and/i)).toBeInTheDocument();
  });

  it("toggles agent selection on click and keyboard press", () => {
    render(<ConnectAgentBanner />);

    const claudeAgent = screen.getByRole("button", { name: /Claude Code/i });
    expect(claudeAgent).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(claudeAgent);
    expect(claudeAgent).toHaveAttribute("aria-pressed", "true");

    // Deselect on click
    fireEvent.click(claudeAgent);
    expect(claudeAgent).toHaveAttribute("aria-pressed", "false");

    // Select with keyboard Enter
    fireEvent.keyDown(claudeAgent, { key: "Enter" });
    expect(claudeAgent).toHaveAttribute("aria-pressed", "true");

    // Select another agent
    const antigravityAgent = screen.getByRole("button", { name: /Antigravity/i });
    fireEvent.click(antigravityAgent);
    expect(antigravityAgent).toHaveAttribute("aria-pressed", "true");
    expect(claudeAgent).toHaveAttribute("aria-pressed", "false");
  });

  it("copies prompt instruction to clipboard when clicking prompt area", () => {
    render(<ConnectAgentBanner />);

    const promptBtn = screen.getByRole("button", { name: "Copy agent instruction prompt" });
    fireEvent.click(promptBtn);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      expect.stringContaining("https://skillry.dev/skills/bs-visual-canvas-deck/install.md")
    );
    expect(screen.getByText("Copied!")).toBeInTheDocument();
  });

  it("handles Connect Skillhouse button click with custom callback", () => {
    const handleConnect = vi.fn();
    render(<ConnectAgentBanner onConnect={handleConnect} />);

    const connectBtn = screen.getByRole("button", { name: "Connect Skillhouse" });
    fireEvent.click(connectBtn);

    expect(handleConnect).toHaveBeenCalledTimes(1);
  });

  it("handles fallback connect copy when no callback is provided", () => {
    render(<ConnectAgentBanner />);

    const connectBtn = screen.getByRole("button", { name: "Connect Skillhouse" });
    fireEvent.click(connectBtn);

    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });

  it("renders custom titles and commands", () => {
    render(
      <ConnectAgentBanner
        title="Custom Title"
        subtitle="Custom Subtitle"
        installCommand="custom-command"
      />
    );

    expect(screen.getByText("Custom Title")).toBeInTheDocument();
    expect(screen.getByText("Custom Subtitle")).toBeInTheDocument();
  });

  it("renders decorative bottom bracket accents (Figma 759:12167) with aria-hidden", () => {
    render(<ConnectAgentBanner />);
    const bracket = screen.getByTestId("bracket-container");
    expect(bracket).toBeInTheDocument();
    expect(bracket).toHaveAttribute("aria-hidden", "true");
  });
});
