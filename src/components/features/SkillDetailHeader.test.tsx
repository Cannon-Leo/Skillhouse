import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { SkillDetailHeader } from "./SkillDetailHeader";

describe("Features SkillDetailHeader Component", () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });
  });

  it("renders title, version, and description", () => {
    render(
      <SkillDetailHeader
        title="Custom Header Title"
        version="2.0.0"
        description="Custom skill description text"
      />
    );
    expect(screen.getByRole("heading", { level: 1, name: "Custom Header Title" })).toBeInTheDocument();
    expect(screen.getByText("2.0.0")).toBeInTheDocument();
    expect(screen.getByText("Custom skill description text")).toBeInTheDocument();
  });

  it("handles copy install prompt click and displays copied feedback", async () => {
    render(<SkillDetailHeader installPrompt="npm i test-skill" />);
    const copyBtn = screen.getByRole("button", { name: /copy install prompt/i });
    
    fireEvent.click(copyBtn);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("npm i test-skill");
    await waitFor(() => {
      expect(screen.getByRole("button", { name: /prompt copied!/i })).toBeInTheDocument();
    });
  });

  it("triggers download ZIP action and displays toast message", () => {
    render(<SkillDetailHeader />);
    const downloadBtn = screen.getByRole("button", { name: /download zip/i });
    fireEvent.click(downloadBtn);

    expect(screen.getByRole("status")).toHaveTextContent(/preparing skill archive bundle/i);
  });

  it("toggles info content on info button click", () => {
    render(<SkillDetailHeader />);
    const infoBtn = screen.getByRole("button", { name: /what do i get when i buy this skill\?/i });
    expect(screen.queryByText(/included in this package:/i)).not.toBeInTheDocument();

    fireEvent.click(infoBtn);
    expect(screen.getByText(/included in this package:/i)).toBeInTheDocument();

    fireEvent.click(infoBtn);
    expect(screen.queryByText(/included in this package:/i)).not.toBeInTheDocument();
  });

  it("handles copy failure and falls back gracefully", async () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockRejectedValue(new Error("Permission denied")),
      },
    });
    render(<SkillDetailHeader />);
    const copyBtn = screen.getByRole("button", { name: /copy install prompt/i });
    fireEvent.click(copyBtn);
    await waitFor(() => {
      expect(screen.getByRole("status")).toHaveTextContent(/copied to clipboard!/i);
    });
  });

  it("renders Free state matching Node 749:1756 with no pricing row or subscription banner", () => {
    render(<SkillDetailHeader isFree={true} price="Free" />);
    expect(screen.queryByText("Buy now")).not.toBeInTheDocument();
    expect(screen.queryByText(/subscribe — all skills/i)).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /copy install prompt/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /download zip/i })).toBeInTheDocument();
  });

  it("renders Subscribed state matching Node 749:2815 with subscription banner and no separate buy now row", () => {
    render(<SkillDetailHeader isFree={false} isSubscribed={true} price="" />);
    expect(screen.queryByText("Buy now")).not.toBeInTheDocument();
    expect(screen.getByText(/all-access subscription active/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /copy install prompt/i })).toBeInTheDocument();
  });
});
