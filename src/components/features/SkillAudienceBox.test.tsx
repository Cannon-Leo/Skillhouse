import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { SkillAudienceBox } from "./SkillAudienceBox";

describe("Features SkillAudienceBox Component", () => {
  it("renders label, role pills, and last updated date", () => {
    render(
      <SkillAudienceBox
        label="Audience"
        roles={["Designer", "Engineer"]}
        lastUpdated="Updated Oct 2026"
      />
    );
    expect(screen.getByText("Audience")).toBeInTheDocument();
    expect(screen.getByText("Designer")).toBeInTheDocument();
    expect(screen.getByText("Engineer")).toBeInTheDocument();
    expect(screen.getByText("Updated Oct 2026")).toBeInTheDocument();
  });

  it("handles role pill selection and toggling", () => {
    const handleRoleClick = vi.fn();
    render(
      <SkillAudienceBox
        roles={["PM", "Founder"]}
        onRoleClick={handleRoleClick}
      />
    );

    const pmPill = screen.getByRole("button", { name: "PM" });
    fireEvent.click(pmPill);
    expect(handleRoleClick).toHaveBeenCalledWith("PM");
    expect(pmPill.className).toContain("selected");

    // Deselect
    fireEvent.click(pmPill);
    expect(pmPill.className).not.toContain("selected");
  });
});
