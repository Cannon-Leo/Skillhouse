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
        version="v2.0.0"
        description="Custom skill description text"
      />
    );
    expect(screen.getByRole("heading", { level: 1, name: "Custom Header Title" })).toBeInTheDocument();
    expect(screen.getByText("v2.0.0")).toBeInTheDocument();
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

  it("renders Free state matching Node 752:11245 with Free label and no subscription banner", () => {
    render(<SkillDetailHeader isFree={true} price="Free" variant="free" />);
    expect(screen.getByText("Free")).toBeInTheDocument();
    expect(screen.queryByTestId("premium-subscription-banner")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /copy install prompt/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /download zip/i })).toBeInTheDocument();
  });

  it("renders Premium state matching Node 752:11109 with orange subscription banner", () => {
    render(<SkillDetailHeader isFree={false} price="$5" variant="premium" />);
    expect(screen.getByTestId("premium-subscription-banner")).toBeInTheDocument();
    expect(screen.queryByTestId("free-price-indicator")).not.toBeInTheDocument();
    expect(screen.getByText(/subsribe - all skills, one subscription/i)).toBeInTheDocument();
  });

  it("renders stats items from Figma Node 752:11119 (295 installs, v1.0.1, Secure)", () => {
    render(<SkillDetailHeader />);
    expect(screen.getAllByText("295").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("v1.0.1")).toBeInTheDocument();
    expect(screen.getByText("Secure")).toBeInTheDocument();
  });

  it("renders Subscribed state with active subscription message", () => {
    render(<SkillDetailHeader isFree={false} isSubscribed={true} price="" variant="premium" />);
    expect(screen.getByText(/all-access subscription active/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /copy install prompt/i })).toBeInTheDocument();
  });

  it("handles bookmark toggle and share link click", () => {
    const handleBookmark = vi.fn();
    render(<SkillDetailHeader onBookmarkToggle={handleBookmark} />);
    const bookmarkBtn = screen.getByRole("button", { name: /bookmark skill/i });
    fireEvent.click(bookmarkBtn);
    expect(handleBookmark).toHaveBeenCalledWith(true);

    const shareBtn = screen.getByRole("button", { name: /share skill/i });
    fireEvent.click(shareBtn);
    expect(screen.getByRole("status")).toHaveTextContent(/link copied/i);
  });

  it("triggers onSubscribe when subscription banner is clicked", () => {
    const handleSubscribe = vi.fn();
    render(<SkillDetailHeader isFree={false} onSubscribe={handleSubscribe} variant="premium" />);
    const banner = screen.getByRole("button", { name: /subscribe to all skills/i });
    fireEvent.click(banner);
    expect(handleSubscribe).toHaveBeenCalledTimes(1);
  });
});
