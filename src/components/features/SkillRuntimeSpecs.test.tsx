import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { SkillRuntimeSpecs } from "./SkillRuntimeSpecs";

describe("Features SkillRuntimeSpecs Component", () => {
  it("renders logos and interactive pills for guides and generators", () => {
    render(
      <SkillRuntimeSpecs
        installGuides={["Claude Code", "Cursor"]}
        generatesWith={["Host Agent LLM"]}
      />
    );
    expect(screen.getByText("Runs in")).toBeInTheDocument();
    expect(screen.getByText("Install guides")).toBeInTheDocument();
    expect(screen.getByText("Generates with")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Claude Code" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Host Agent LLM" })).toBeInTheDocument();
  });

  it("handles install guide pill click and toggling", () => {
    const handleGuideClick = vi.fn();
    render(
      <SkillRuntimeSpecs
        installGuides={["Cursor"]}
        onGuideClick={handleGuideClick}
      />
    );
    const pill = screen.getByRole("button", { name: "Cursor" });
    fireEvent.click(pill);
    expect(handleGuideClick).toHaveBeenCalledWith("Cursor");
    expect(pill.className).toContain("selected");

    fireEvent.click(pill);
    expect(pill.className).not.toContain("selected");
  });

  it("handles generator pill click and toggling", () => {
    const handleGeneratesClick = vi.fn();
    render(
      <SkillRuntimeSpecs
        generatesWith={["Custom LLM"]}
        onGeneratesClick={handleGeneratesClick}
      />
    );
    const pill = screen.getByRole("button", { name: "Custom LLM" });
    fireEvent.click(pill);
    expect(handleGeneratesClick).toHaveBeenCalledWith("Custom LLM");
    expect(pill.className).toContain("selected");

    fireEvent.click(pill);
    expect(pill.className).not.toContain("selected");
  });
});
