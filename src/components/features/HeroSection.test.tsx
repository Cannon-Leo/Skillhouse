import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { HeroSection } from "./HeroSection";

describe("HeroSection (Figma Nodes 751:4775 & 751:4776)", () => {
  it("renders the hero heading, subtitle, and CTA buttons", () => {
    render(<HeroSection />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/Agent Skills for/i);
    expect(screen.getByText(/Turn everyday tasks into simple/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "See all Skills" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit a Skill" })).toBeInTheDocument();
  });

  it("handles CTA button clicks", () => {
    const handleSeeAll = vi.fn();
    const handleSubmit = vi.fn();
    render(<HeroSection onSeeAllSkills={handleSeeAll} onSubmitSkill={handleSubmit} />);

    fireEvent.click(screen.getByRole("button", { name: "See all Skills" }));
    expect(handleSeeAll).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole("button", { name: "Submit a Skill" }));
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it("renders the joined category grid and works-with badges", () => {
    render(<HeroSection />);
    expect(screen.getByTestId("category-skill-grid")).toBeInTheDocument();
    expect(screen.getByAltText(/Works with Claude Code/i)).toBeInTheDocument();
  });
});
