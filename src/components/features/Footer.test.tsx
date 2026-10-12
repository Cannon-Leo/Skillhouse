import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Footer } from "./Footer";

describe("Footer Component (Figma Node 751:4917)", () => {
  it("renders accessible footer landmark and watermark", () => {
    render(<Footer />);
    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();
    
    // Watermark text exists with aria-hidden
    const watermarks = screen.getAllByText("Skillhouse");
    expect(watermarks.length).toBeGreaterThanOrEqual(1);
  });

  it("renders brand logo badge linking to home", () => {
    render(<Footer />);
    const homeLink = screen.getByRole("link", { name: /skillhouse home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("renders exact tagline and copyright notice", () => {
    render(<Footer />);
    expect(
      screen.getByText(/Turn everyday tasks into simple/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/© 2026 Skillhouse. All rights reserved/i)
    ).toBeInTheDocument();
  });

  it("renders authentic social media links for X and LinkedIn", () => {
    render(<Footer />);
    const xLink = screen.getByRole("link", { name: /skillhouse on x/i });
    expect(xLink).toHaveAttribute("href", "https://x.com/skillhouse");

    const linkedInLink = screen.getByRole("link", { name: /skillhouse on linkedin/i });
    expect(linkedInLink).toHaveAttribute("href", "https://linkedin.com/company/skillhouse");
  });

  it("renders all 5 column titles from Figma", () => {
    render(<Footer />);
    expect(screen.getByRole("heading", { name: "Explore" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Categories" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "By output" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "By agent" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Skillhouse" })).toBeInTheDocument();
  });

  it("renders all expected links under each column", () => {
    render(<Footer />);
    
    // Explore
    expect(screen.getByRole("link", { name: "Skills" })).toHaveAttribute("href", "/skills");
    expect(screen.getByRole("link", { name: "Pricing" })).toHaveAttribute("href", "/pricing");

    // Categories
    expect(screen.getByRole("link", { name: "Web design" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Product launch" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Brand identity" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Client reporting" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Social media" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Research communication" })).toBeInTheDocument();

    // By output
    expect(screen.getByRole("link", { name: "Images" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Video" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Presentations" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Web & HTML" })).toBeInTheDocument();

    // By agent
    expect(screen.getByRole("link", { name: "Claude Code Skills" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Codex Skills" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Cursor Skills" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Gemini CLI Skills" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "OpenCode Skills" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Antigravity Skills" })).toBeInTheDocument();

    // Skillhouse
    expect(screen.getByRole("link", { name: "Privacy Policy" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Terms of Service" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Cookie Policy" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Third-Party Notices" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Help & Support" })).toBeInTheDocument();
  });

  it("handles navigation and category selection callbacks on link clicks", () => {
    const handleNavigate = vi.fn();
    const handleCategory = vi.fn();
    render(<Footer onNavigateMarketplace={handleNavigate} onSelectCategory={handleCategory} />);
    
    const skillsLink = screen.getByRole("link", { name: "Skills" });
    skillsLink.click();
    expect(handleNavigate).toHaveBeenCalled();

    const webDesignLink = screen.getByRole("link", { name: "Web design" });
    webDesignLink.click();
    expect(handleCategory).toHaveBeenCalledWith("web-design");

    const imagesLink = screen.getByRole("link", { name: "Images" });
    imagesLink.click();
    expect(handleCategory).toHaveBeenCalledWith("image");

    const claudeLink = screen.getByRole("link", { name: "Claude Code Skills" });
    claudeLink.click();
    expect(handleCategory).toHaveBeenCalledWith("claude");
  });
});
